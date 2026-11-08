import React, { useState, useMemo } from 'react';
import { Cloud, Sliders, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

interface MockPixel {
  id: number;
  x: number;
  y: number;
  surface: 'land' | 'ocean';
  trueCloudState: 'cloud' | 'clear' | 'thin_cirrus' | 'low_stratus';
  btMax: number;
  bt11: number;
  bt39: number;
  bt12: number;
}

export const CloudMaskSimulator: React.FC = () => {
  // User adjustable thresholds (from ATBD Chapter 2 defaults)
  const [landDiffThreshold, setLandDiffThreshold] = useState<number>(12); // ATBD: 12 K
  const [oceanDiffThreshold, setOceanDiffThreshold] = useState<number>(6); // ATBD: 6 K
  const [clearThreshold, setClearThreshold] = useState<number>(2); // ATBD: 2 K
  const [cirrusSplitThreshold, setCirrusSplitThreshold] = useState<number>(2.5); // ATBD: 2.5 K
  const [sceneType, setSceneType] = useState<'mixed_subcontinent' | 'monsoon_overcast' | 'winter_north_india_fog'>('mixed_subcontinent');

  // Synthetic satellite pixels grid (10x10 = 100 pixels)
  const mockPixels = useMemo<MockPixel[]>(() => {
    const list: MockPixel[] = [];
    let id = 0;
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const isOcean = y >= 5;
        let trueState: MockPixel['trueCloudState'] = 'clear';
        let btMax = isOcean ? 300 : 308;
        let bt11 = btMax;
        let bt12 = btMax - 1.2;
        let bt39 = btMax;

        if (sceneType === 'mixed_subcontinent') {
          // Central convective cloud cluster
          if (x >= 3 && x <= 6 && y >= 2 && y <= 6) {
            trueState = 'cloud';
            bt11 = 218 + (x + y) * 2;
            bt12 = bt11 - 0.5;
            bt39 = bt11 - 10;
          } else if (x >= 7 && y <= 3) {
            // Thin cirrus fringe
            trueState = 'thin_cirrus';
            bt11 = btMax - 7;
            bt12 = bt11 - 3.2; // High split window difference!
            bt39 = bt11 + 4;
          }
        } else if (sceneType === 'winter_north_india_fog') {
          // Northern low stratus / fog over land (y < 4)
          if (y < 4 && x >= 2 && x <= 8) {
            trueState = 'low_stratus';
            bt11 = btMax - 5.5; // Only 5.5 K colder than surface! Easy to miss with a 12K threshold!
            bt12 = bt11 - 0.8;
            bt39 = bt11 - 14; // Large negative difference during day
          }
        } else {
          // Monsoon overcast
          if (x >= 1 && x <= 8 && y >= 1 && y <= 8) {
            trueState = 'cloud';
            bt11 = 210 + (x + y) * 3;
            bt12 = bt11 - 0.8;
            bt39 = bt11 - 12;
          }
        }

        list.push({
          id: id++,
          x,
          y,
          surface: isOcean ? 'ocean' : 'land',
          trueCloudState: trueState,
          btMax,
          bt11,
          bt12,
          bt39
        });
      }
    }
    return list;
  }, [sceneType]);

  // Run Cloud Mask Algorithm on each pixel (from ATBD Chapter 2 logic)
  const classifiedPixels = useMemo(() => {
    return mockPixels.map((p) => {
      const diffFromMax = p.btMax - p.bt11;
      const splitDiff = p.bt11 - p.bt12;

      let detectedCloud = false;
      let reason = 'Clear Sky';

      // Test 1: Gross temperature threshold vs climatological BTmax
      const threshold = p.surface === 'ocean' ? oceanDiffThreshold : landDiffThreshold;
      if (diffFromMax > threshold) {
        detectedCloud = true;
        reason = `Gross IR Test Failed (diff: ${diffFromMax.toFixed(1)} K > ${threshold} K)`;
      } else if (diffFromMax <= clearThreshold) {
        detectedCloud = false;
        reason = 'Definite Clear Sky';
      } else {
        // Test 2: Split-window thin cirrus test
        if (splitDiff > cirrusSplitThreshold) {
          detectedCloud = true;
          reason = `Split-Window Cirrus Test Triggered (${splitDiff.toFixed(1)} K > ${cirrusSplitThreshold} K)`;
        }
      }

      const isActuallyCloud = p.trueCloudState !== 'clear';

      return {
        ...p,
        detectedCloud,
        isActuallyCloud,
        reason,
        btDiff: +diffFromMax.toFixed(1),
        splitDiff: +splitDiff.toFixed(1)
      };
    });
  }, [mockPixels, landDiffThreshold, oceanDiffThreshold, clearThreshold, cirrusSplitThreshold]);

  // Compute Confusion Matrix
  const stats = useMemo(() => {
    let tp = 0; // True Positive (Cloud detected correctly)
    let fp = 0; // False Positive (Clear sky flagged as cloud - False Alarm)
    let fn = 0; // False Negative (Cloud missed)
    let tn = 0; // True Negative (Clear sky confirmed)

    classifiedPixels.forEach((p) => {
      if (p.detectedCloud && p.isActuallyCloud) tp++;
      else if (p.detectedCloud && !p.isActuallyCloud) fp++;
      else if (!p.detectedCloud && p.isActuallyCloud) fn++;
      else tn++;
    });

    const total = tp + fp + fn + tn;
    const accuracy = total > 0 ? +((tp + tn) / total).toFixed(3) : 0;
    const precision = tp + fp > 0 ? +(tp / (tp + fp)).toFixed(3) : 0;
    const recall = tp + fn > 0 ? +(tp / (tp + fn)).toFixed(3) : 0;
    const f1 = precision + recall > 0 ? +((2 * precision * recall) / (precision + recall)).toFixed(3) : 0;

    return { tp, fp, fn, tn, accuracy, precision, recall, f1 };
  }, [classifiedPixels]);

  return (
    <div className="bg-[#fffdf8] border-2 border-[#2a2825] rounded-2xl p-5 shadow-[3px_3px_0_rgba(42,40,37,0.15)] my-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b-2 border-[#b9b3a8]/60 pb-3 mb-4 gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-md bg-[#8a3c8f] text-white text-xs font-mono font-bold uppercase tracking-wider border border-[#2a2825]">
            Now You Try It
          </span>
          <h4 className="text-sm md:text-base font-black text-[#1d1c19] flex items-center gap-1.5 font-mono">
            <Cloud className="w-4 h-4 text-[#8a3c8f]" />
            Operational Cloud Mask Decision Sandbox & Confusion Matrix
          </h4>
        </div>

        {/* Scene Presets */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSceneType('mixed_subcontinent')}
            className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer border ${
              sceneType === 'mixed_subcontinent'
                ? 'bg-[#10508f] text-white border-[#2a2825] shadow-[1px_1px_0_#2a2825]'
                : 'bg-[#fffdf8] text-[#53504a] border-[#b9b3a8] hover:border-[#2a2825] hover:text-[#1d1c19]'
            }`}
          >
            Subcontinent Mixed Convection
          </button>
          <button
            onClick={() => setSceneType('winter_north_india_fog')}
            className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer border ${
              sceneType === 'winter_north_india_fog'
                ? 'bg-[#10508f] text-white border-[#2a2825] shadow-[1px_1px_0_#2a2825]'
                : 'bg-[#fffdf8] text-[#53504a] border-[#b9b3a8] hover:border-[#2a2825] hover:text-[#1d1c19]'
            }`}
          >
            Indo-Gangetic Winter Fog
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Pixel Visualization Grid */}
        <div className="lg:col-span-5 bg-[#faf8f2] border-2 border-[#2a2825] rounded-xl p-3 shadow-inner">
          <div className="flex justify-between items-center text-xs font-mono text-[#53504a] mb-2 font-bold">
            <span>Satellite Classified Grid (10×10)</span>
            <span className="text-[11px] text-[#10508f] bg-white px-1.5 py-0.5 rounded border border-[#2a2825]">
              F1 Score: {stats.f1}
            </span>
          </div>

          <div className="grid grid-cols-10 gap-1 aspect-square p-2 bg-[#ffffff] rounded-lg border-2 border-[#2a2825]">
            {classifiedPixels.map((p) => {
              let bg = '#e2e8f0'; // Clear sky
              let border = 'border-[#94a3b8]';
              let textC = 'text-[#475569]';

              if (p.detectedCloud) {
                if (p.isActuallyCloud) {
                  bg = '#16a34a'; // True Positive (Correct cloud)
                  border = 'border-[#14532d]';
                  textC = 'text-white font-bold';
                } else {
                  bg = '#e11d48'; // False Positive (False alarm)
                  border = 'border-[#881337]';
                  textC = 'text-white font-bold';
                }
              } else {
                if (p.isActuallyCloud) {
                  bg = '#d97706'; // False Negative (Missed cloud)
                  border = 'border-[#78350f]';
                  textC = 'text-white font-bold';
                } else {
                  bg = '#f1f5f9'; // True Negative (Correct clear)
                  border = 'border-[#cbd5e1]';
                  textC = 'text-[#64748b]';
                }
              }

              return (
                <div
                  key={p.id}
                  className={`rounded p-0.5 flex flex-col items-center justify-center text-[8px] font-mono border ${border}`}
                  style={{ backgroundColor: bg }}
                  title={`(${p.x}, ${p.y}) ${p.surface.toUpperCase()} | BTmax-BT11=${p.btDiff}K | Actual: ${p.trueCloudState} | Classified: ${p.reason}`}
                >
                  <span className={textC}>
                    {p.detectedCloud ? 'CLD' : 'CLR'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Grid Legend */}
          <div className="grid grid-cols-2 gap-2 mt-3 text-[10px] font-mono text-[#1d1c19] font-bold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-[#16a34a] border border-[#2a2825]" />
              <span>True Positive (Cloud)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-[#f1f5f9] border border-[#2a2825]" />
              <span>True Negative (Clear)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-[#e11d48] border border-[#2a2825]" />
              <span>False Alarm (Error)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-[#d97706] border border-[#2a2825]" />
              <span>Missed Cloud (Error)</span>
            </div>
          </div>
        </div>

        {/* Sliders and Confusion Matrix */}
        <div className="lg:col-span-7 space-y-3.5">
          {/* Threshold Sliders */}
          <div className="bg-[#f4f1ea] border-2 border-[#2a2825] p-3.5 rounded-xl space-y-3 shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-1">
                <span className="text-[#53504a] font-bold">Land Threshold: (BTmax - BT11) &gt;</span>
                <span className="text-[#10508f] font-black bg-white px-1.5 py-0.5 rounded border border-[#2a2825]">
                  {landDiffThreshold} K (ATBD: 12 K)
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="20"
                value={landDiffThreshold}
                onChange={(e) => setLandDiffThreshold(parseInt(e.target.value))}
                className="w-full accent-[#10508f] cursor-pointer h-2 bg-[#dcd7cb] rounded-lg"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-1">
                <span className="text-[#53504a] font-bold">Ocean Threshold: (BTmax - BT11) &gt;</span>
                <span className="text-[#1b6b3c] font-black bg-white px-1.5 py-0.5 rounded border border-[#2a2825]">
                  {oceanDiffThreshold} K (ATBD: 6 K)
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="15"
                value={oceanDiffThreshold}
                onChange={(e) => setOceanDiffThreshold(parseInt(e.target.value))}
                className="w-full accent-[#1b6b3c] cursor-pointer h-2 bg-[#dcd7cb] rounded-lg"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-1">
                <span className="text-[#53504a] font-bold">Cirrus Split-Window: (BT11 - BT12) &gt;</span>
                <span className="text-[#8a3c8f] font-black bg-white px-1.5 py-0.5 rounded border border-[#2a2825]">
                  {cirrusSplitThreshold} K (ATBD: 2.5 K)
                </span>
              </div>
              <input
                type="range"
                min="1.0"
                max="5.0"
                step="0.1"
                value={cirrusSplitThreshold}
                onChange={(e) => setCirrusSplitThreshold(parseFloat(e.target.value))}
                className="w-full accent-[#8a3c8f] cursor-pointer h-2 bg-[#dcd7cb] rounded-lg"
              />
            </div>
          </div>

          {/* Confusion Matrix Table */}
          <div className="bg-[#f4f1ea] border-2 border-[#2a2825] p-3.5 rounded-xl text-xs font-mono space-y-2.5 shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
            <div className="flex justify-between items-center border-b border-[#b9b3a8] pb-1.5">
              <span className="text-[#10508f] font-black uppercase tracking-wider">Confusion Matrix & Metrics</span>
              <span className="text-[#1b6b3c] font-black bg-[#e2f3e7] px-2 py-0.5 rounded border border-[#1b6b3c]/40">
                Accuracy: {(stats.accuracy * 100).toFixed(1)}%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center pt-1">
              <div className="bg-white border-2 border-[#16a34a] p-2 rounded-lg">
                <div className="text-[#53504a] text-[10px] font-bold">True Positives (TP)</div>
                <div className="text-base font-black text-[#16a34a]">{stats.tp}</div>
              </div>
              <div className="bg-white border-2 border-[#e11d48] p-2 rounded-lg">
                <div className="text-[#53504a] text-[10px] font-bold">False Alarms (FP)</div>
                <div className="text-base font-black text-[#e11d48]">{stats.fp}</div>
              </div>
              <div className="bg-white border-2 border-[#d97706] p-2 rounded-lg">
                <div className="text-[#53504a] text-[10px] font-bold">Missed Clouds (FN)</div>
                <div className="text-base font-black text-[#d97706]">{stats.fn}</div>
              </div>
              <div className="bg-white border-2 border-[#64748b] p-2 rounded-lg">
                <div className="text-[#53504a] text-[10px] font-bold">True Clear (TN)</div>
                <div className="text-base font-black text-[#475569]">{stats.tn}</div>
              </div>
            </div>

            <div className="flex justify-between pt-2 border-t border-[#b9b3a8] text-[11px] font-bold">
              <span className="text-[#53504a]">Precision: <strong className="text-[#1d1c19]">{stats.precision}</strong></span>
              <span className="text-[#53504a]">Recall: <strong className="text-[#1d1c19]">{stats.recall}</strong></span>
              <span className="text-[#10508f]">F1 Score: <strong>{stats.f1}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Insight */}
      <div className="mt-4 p-3.5 bg-[#fdf6dd] border-2 border-[#2a2825] rounded-xl text-xs text-[#1d1c19] leading-relaxed font-sans flex items-start gap-2.5 shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
        <ShieldCheck className="w-5 h-5 text-[#b45309] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#b45309] font-black uppercase tracking-wide mr-1">The Operational Engineering Dilemma:</strong>
          <span>
            Try lowering the land threshold from 12 K down to <strong>4 K</strong>. What happens? Recall increases (fewer missed clouds), but <strong>False Alarms explode</strong> because normal daytime surface cooling gets misclassified as cloud! Conversely, raising the threshold to 18 K eliminates false alarms, but <strong>misses low fog and shallow stratus entirely</strong>. ISRO's ATBD chose 12 K for land and 6 K for ocean after thousands of collocated radiative transfer simulations.
          </span>
        </div>
      </div>
    </div>
  );
};
