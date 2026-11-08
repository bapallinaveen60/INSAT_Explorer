import React, { useState, useMemo } from 'react';
import { Activity, Droplets, Wind, TrendingDown, TrendingUp, CheckCircle } from 'lucide-react';

export const ImsraSimulator: React.FC = () => {
  // Input parameters
  const [tbCurrent, setTbCurrent] = useState<number>(215); // Current 10.8 µm BT (Kelvin)
  const [tbPrevious, setTbPrevious] = useState<number>(225); // BT 30 minutes ago (Kelvin)
  const [tpwMm, setTpwMm] = useState<number>(55); // Total Precipitable Water in mm (20 to 75 mm)
  const [rhPercent, setRhPercent] = useState<number>(80); // Relative Humidity 500 hPa to Surface (30% to 100%)
  const [isCloudMerging, setIsCloudMerging] = useState<boolean>(false);
  const [splitWindowDiff, setSplitWindowDiff] = useState<number>(0.8); // BT10.8 - BT12.0 in K

  // Cloud lifecycle rate dT/dt in K / 30min
  const dTb = useMemo(() => {
    return tbCurrent - tbPrevious;
  }, [tbCurrent, tbPrevious]);

  // Cloud stage diagnosis
  const lifecycleStage = useMemo(() => {
    if (dTb < -4) {
      return { stage: 'Vigorously Developing', multiplier: 1.35, color: 'text-[#e11d48]', icon: TrendingDown, desc: 'Cloud top rising rapidly into cold upper troposphere (+35% rain intensification)' };
    } else if (dTb <= 2 && dTb >= -4) {
      return { stage: 'Mature Convective Core', multiplier: 1.0, color: 'text-[#16a34a]', icon: Activity, desc: 'Steady-state intense convective rainfall' };
    } else {
      return { stage: 'Dissipating / Warming Anvil', multiplier: 0.15, color: 'text-[#64748b]', icon: TrendingUp, desc: 'Cloud top warming as updrafts collapse (rainfall cuts by 85%)' };
    }
  }, [dTb]);

  // Split-window cirrus check (ATBD Chapter 4 & 2)
  const isThinCirrus = splitWindowDiff > 2.5;

  // Microwave-calibrated base rain rate R_base(Tb) from TRMM/GPM collocation
  const baseRainRate = useMemo(() => {
    if (isThinCirrus) return 0.0; // Filtered out as non-precipitating cirrus
    if (tbCurrent > 240) return 0.0;
    // Empirical exponential curve fitted to TRMM TMI collocations documented in ATBD
    // R = a * exp(-b * (Tb - 200))
    const r = 28.0 * Math.exp(-0.065 * (tbCurrent - 200));
    return +Math.max(0, r).toFixed(2);
  }, [tbCurrent, isThinCirrus]);

  // Moisture factor = (TPW / 45 mm) * (RH / 70%)
  const moistureFactor = useMemo(() => {
    const fTpw = tpwMm / 45.0;
    const fRh = rhPercent / 70.0;
    return +(fTpw * fRh).toFixed(2);
  }, [tpwMm, rhPercent]);

  // Merge factor
  const mergeMultiplier = isCloudMerging ? 1.25 : 1.0;

  // Final IMSRA Rain Rate
  const finalRainRate = useMemo(() => {
    if (isThinCirrus) return 0.0;
    const r = baseRainRate * lifecycleStage.multiplier * moistureFactor * mergeMultiplier;
    return +r.toFixed(2);
  }, [baseRainRate, lifecycleStage, moistureFactor, mergeMultiplier, isThinCirrus]);

  // Comparison with naive GPI
  const naiveGpiRate = tbCurrent < 235 ? 3.0 : 0.0;

  return (
    <div className="bg-[#fffdf8] border-2 border-[#2a2825] rounded-2xl p-5 shadow-[3px_3px_0_rgba(42,40,37,0.15)] my-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b-2 border-[#b9b3a8]/60 pb-3 mb-4 gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-md bg-[#8a3c8f] text-white text-xs font-mono font-bold uppercase tracking-wider border border-[#2a2825]">
            Now You Try It
          </span>
          <h4 className="text-sm md:text-base font-black text-[#1d1c19] flex items-center gap-1.5 font-mono">
            <Droplets className="w-4 h-4 text-[#8a3c8f]" />
            IMSRA: Cloud Lifecycle & Microwave Moisture Multipliers
          </h4>
        </div>
        <span className="text-xs font-mono text-[#10508f] font-bold bg-[#eff1f4] px-2 py-0.5 rounded border border-[#b9b3a8]">
          ATBD Chapter 4.4.1.2 Specification
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Sliders Column */}
        <div className="lg:col-span-6 space-y-3.5">
          {/* Current & Previous Brightness Temperature */}
          <div className="bg-[#f4f1ea] border-2 border-[#2a2825] p-3.5 rounded-xl space-y-3 shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-1">
                <span className="text-[#53504a] font-bold">Current Infrared Tb (10.8 µm):</span>
                <span className="text-[#e11d48] font-black bg-white px-1.5 py-0.5 rounded border border-[#2a2825]">
                  {tbCurrent} K ({(tbCurrent - 273.15).toFixed(1)}°C)
                </span>
              </div>
              <input
                type="range"
                min="195"
                max="260"
                value={tbCurrent}
                onChange={(e) => setTbCurrent(parseInt(e.target.value))}
                className="w-full accent-[#e11d48] cursor-pointer h-2 bg-[#dcd7cb] rounded-lg"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-1">
                <span className="text-[#53504a] font-bold">Previous Tb (30 mins ago):</span>
                <span className="text-[#10508f] font-black bg-white px-1.5 py-0.5 rounded border border-[#2a2825]">
                  {tbPrevious} K
                </span>
              </div>
              <input
                type="range"
                min="195"
                max="260"
                value={tbPrevious}
                onChange={(e) => setTbPrevious(parseInt(e.target.value))}
                className="w-full accent-[#10508f] cursor-pointer h-2 bg-[#dcd7cb] rounded-lg"
              />
            </div>
          </div>

          {/* Moisture Fields (TPW & RH) */}
          <div className="bg-[#f4f1ea] border-2 border-[#2a2825] p-3.5 rounded-xl space-y-3 shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-1">
                <span className="text-[#53504a] font-bold flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-[#0284c7]" />
                  Total Precipitable Water (TPW):
                </span>
                <span className="text-[#0284c7] font-black bg-white px-1.5 py-0.5 rounded border border-[#2a2825]">
                  {tpwMm} mm
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="75"
                value={tpwMm}
                onChange={(e) => setTpwMm(parseInt(e.target.value))}
                className="w-full accent-[#0284c7] cursor-pointer h-2 bg-[#dcd7cb] rounded-lg"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-1">
                <span className="text-[#53504a] font-bold flex items-center gap-1">
                  <Wind className="w-3.5 h-3.5 text-[#16a34a]" />
                  Relative Humidity (500 hPa to Surface):
                </span>
                <span className="text-[#16a34a] font-black bg-white px-1.5 py-0.5 rounded border border-[#2a2825]">
                  {rhPercent}%
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={rhPercent}
                onChange={(e) => setRhPercent(parseInt(e.target.value))}
                className="w-full accent-[#16a34a] cursor-pointer h-2 bg-[#dcd7cb] rounded-lg"
              />
            </div>
          </div>

          {/* Cloud Dynamics Toggles */}
          <div className="bg-[#f4f1ea] border-2 border-[#2a2825] p-3 rounded-xl flex items-center justify-between text-xs shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
            <span className="text-[#1d1c19] font-mono font-bold">Cb Cloud Merging Detected:</span>
            <button
              onClick={() => setIsCloudMerging(!isCloudMerging)}
              className={`px-3 py-1.5 rounded-lg font-mono font-bold text-xs border-2 transition-all cursor-pointer ${
                isCloudMerging
                  ? 'bg-[#8a3c8f] text-white border-[#2a2825] shadow-[1px_1px_0_#2a2825]'
                  : 'bg-white text-[#53504a] border-[#b9b3a8] hover:border-[#2a2825]'
              }`}
            >
              {isCloudMerging ? 'YES (+25% Boost)' : 'NO (Normal)'}
            </button>
          </div>
        </div>

        {/* Algorithm Data Flow & Output Column */}
        <div className="lg:col-span-6 bg-[#faf8f2] border-2 border-[#2a2825] rounded-xl p-4 space-y-3 font-mono text-xs shadow-inner">
          <div className="text-[#10508f] font-black border-b border-[#b9b3a8] pb-2 uppercase tracking-wider flex items-center justify-between">
            <span>IMSRA Multi-Stage Pipeline</span>
            <span className="text-[10px] text-[#53504a] font-bold">Live ATBD Chain</span>
          </div>

          {/* 1. Cloud Evolution Check */}
          <div className="p-3 rounded-lg bg-white border-2 border-[#2a2825] space-y-1 shadow-[2px_2px_0_rgba(42,40,37,0.08)]">
            <div className="flex justify-between items-center">
              <span className="text-[#53504a] font-bold">1. Rate of Cloud Top Cooling:</span>
              <span className={`font-black ${dTb < 0 ? 'text-[#e11d48]' : 'text-[#64748b]'}`}>
                ΔTb = {dTb > 0 ? `+${dTb}` : dTb} K / 30min
              </span>
            </div>
            <div className={`text-[11px] font-sans flex items-center gap-1.5 font-bold ${lifecycleStage.color}`}>
              <lifecycleStage.icon className="w-3.5 h-3.5 shrink-0" />
              <span>{lifecycleStage.stage}: {lifecycleStage.desc}</span>
            </div>
          </div>

          {/* 2. Microwave Calibration */}
          <div className="p-3 rounded-lg bg-white border-2 border-[#2a2825] flex justify-between items-center shadow-[2px_2px_0_rgba(42,40,37,0.08)]">
            <span className="text-[#53504a] font-bold">2. GPM/TRMM Collocated Base Rate:</span>
            <span className="text-[#10508f] font-black">{baseRainRate} mm/h</span>
          </div>

          {/* 3. Moisture Factor */}
          <div className="p-3 rounded-lg bg-white border-2 border-[#2a2825] flex justify-between items-center shadow-[2px_2px_0_rgba(42,40,37,0.08)]">
            <span className="text-[#53504a] font-bold">3. Environmental Moisture Factor:</span>
            <span className="text-[#16a34a] font-black">
              ({tpwMm}/45) × ({rhPercent}/70) = {moistureFactor}×
            </span>
          </div>

          {/* Final Results Comparison */}
          <div className="p-3.5 rounded-lg bg-[#e2f3e7] border-2 border-[#16a34a] space-y-2 shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
            <div className="flex justify-between items-center">
              <span className="text-[#166534] font-black font-sans text-sm">Final IMSRA Rain Rate:</span>
              <span className="text-2xl font-black text-[#15803d]">
                {finalRainRate} mm/h
              </span>
            </div>
            <div className="flex justify-between items-center text-[11px] text-[#53504a] pt-1.5 border-t border-[#16a34a]/30 font-bold">
              <span>Old Naive GPI Algorithm:</span>
              <span className="text-[#1d1c19]">{naiveGpiRate} mm/h (Blind to dynamics)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Physical Insight */}
      <div className="mt-4 p-3.5 bg-[#fdf6dd] border-2 border-[#2a2825] rounded-xl text-xs text-[#1d1c19] leading-relaxed font-sans flex items-start gap-2.5 shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
        <CheckCircle className="w-5 h-5 text-[#16a34a] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#b45309] font-black uppercase tracking-wide mr-1">Why IMSRA was a Revolution:</strong>
          <span>
            Set Tb = 210 K (a cold cloud top). Now slide the previous temperature from 200 K to 240 K. Notice that if the cloud top is warming (previous 200 K, current 210 K, +10 K warming), the convective updraft has collapsed and rain plummets to just <strong>{finalRainRate} mm/h</strong>! The naive GPI model would still blindly output heavy rainfall! IMSRA uses temporal satellite physics to prevent false flood alarms.
          </span>
        </div>
      </div>
    </div>
  );
};
