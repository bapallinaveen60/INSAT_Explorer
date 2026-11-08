import React, { useState, useMemo } from 'react';
import { CloudRain, Grid, AlertTriangle } from 'lucide-react';

interface GridCell {
  x: number;
  y: number;
  tempK: number;
  cloudType: 'deep_core' | 'anvil_cirrus' | 'shallow_cumulus' | 'clear';
}

export const GpiSimulator: React.FC = () => {
  const [thresholdK, setThresholdK] = useState<number>(235); // Standard ATBD threshold = 235 K
  const [durationHours, setDurationHours] = useState<number>(3); // 3-hourly operational standard
  const [gridSize, setGridSize] = useState<4 | 8>(8); // 8x8 represents a 1.0° x 1.0° box (~100km)
  const [selectedPreset, setSelectedPreset] = useState<'monsoon_convection' | 'cirrus_anvil' | 'shallow_warm_rain'>('monsoon_convection');

  // Initialize interactive grid cells
  const [cells, setCells] = useState<GridCell[]>(() => generateInitialGrid('monsoon_convection', 8));

  function generateInitialGrid(preset: string, size: number): GridCell[] {
    const list: GridCell[] = [];
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        let temp = 295; // clear warm land/ocean
        let type: GridCell['cloudType'] = 'clear';

        const dist = Math.sqrt((x - size / 2) ** 2 + (y - size / 2) ** 2);

        if (preset === 'monsoon_convection') {
          if (dist < size * 0.28) {
            temp = 205 + Math.floor(Math.random() * 15); // Deep core 205 - 220 K
            type = 'deep_core';
          } else if (dist < size * 0.52) {
            temp = 222 + Math.floor(Math.random() * 12); // Cold anvil 222 - 234 K
            type = 'anvil_cirrus';
          } else if (dist < size * 0.75) {
            temp = 250 + Math.floor(Math.random() * 20); // Warm boundary 250 - 270 K
            type = 'shallow_cumulus';
          }
        } else if (preset === 'cirrus_anvil') {
          // Non-precipitating cold cirrus over the whole box
          temp = 218 + Math.floor(Math.random() * 14); // 218 - 232 K
          type = 'anvil_cirrus';
        } else if (preset === 'shallow_warm_rain') {
          // Typical Western Ghats shallow orographic warm rain (tops at 3-4 km, 255-270 K!)
          if (x < size * 0.6) {
            temp = 260 + Math.floor(Math.random() * 10);
            type = 'shallow_cumulus';
          }
        }

        list.push({ x, y, tempK: temp, cloudType: type });
      }
    }
    return list;
  }

  // Switch preset
  const handlePresetChange = (preset: 'monsoon_convection' | 'cirrus_anvil' | 'shallow_warm_rain') => {
    setSelectedPreset(preset);
    setCells(generateInitialGrid(preset, gridSize));
  };

  // Toggle cell temperature on user click
  const handleCellClick = (idx: number) => {
    setCells((prev) => {
      const next = [...prev];
      const c = next[idx];
      let newTemp = 210;
      let newType: GridCell['cloudType'] = 'deep_core';

      if (c.tempK < 225) {
        newTemp = 240;
        newType = 'shallow_cumulus';
      } else if (c.tempK < 260) {
        newTemp = 295;
        newType = 'clear';
      } else {
        newTemp = 212;
        newType = 'deep_core';
      }

      next[idx] = { ...c, tempK: newTemp, cloudType: newType };
      return next;
    });
  };

  // Calculations: GPI Formula from ISRO ATBD Chapter 4.4.1.1
  // R = 3.0 * F_c * Delta_t
  const totalCells = cells.length;
  const coldCellsCount = cells.filter((c) => c.tempK < thresholdK).length;
  const coldCloudFraction = +(coldCellsCount / totalCells).toFixed(3);
  const instantaneousRainRateMmHr = +(3.0 * coldCloudFraction).toFixed(2);
  const totalRainAccumulationMm = +(3.0 * coldCloudFraction * durationHours).toFixed(2);

  // Ground Reality (Ground Radar Truth) for comparison
  const truePhysicalRainMm = useMemo(() => {
    let rainSum = 0;
    cells.forEach((c) => {
      if (c.cloudType === 'deep_core') {
        rainSum += 14.5 * durationHours; // Deep updraft with heavy precipitation
      } else if (c.cloudType === 'shallow_cumulus' && selectedPreset === 'shallow_warm_rain') {
        rainSum += 6.2 * durationHours; // Shallow orographic monsoon collision-coalescence!
      } else if (c.cloudType === 'anvil_cirrus') {
        rainSum += 0.0; // Cirrus ice anvil: zero surface rain!
      }
    });
    return +(rainSum / totalCells).toFixed(2);
  }, [cells, durationHours, totalCells, selectedPreset]);

  // Discrepancy
  const discrepancyPercent = truePhysicalRainMm > 0
    ? +(((totalRainAccumulationMm - truePhysicalRainMm) / truePhysicalRainMm) * 100).toFixed(0)
    : totalRainAccumulationMm > 0 ? 999 : 0;

  return (
    <div className="bg-[#fffdf8] border-2 border-[#2a2825] rounded-2xl p-5 shadow-[3px_3px_0_rgba(42,40,37,0.15)] my-6">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between border-b-2 border-[#b9b3a8]/60 pb-3 mb-4 gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-md bg-[#8a3c8f] text-white text-xs font-mono font-bold uppercase tracking-wider border border-[#2a2825]">
            Now You Try It
          </span>
          <h4 className="text-sm md:text-base font-black text-[#1d1c19] flex items-center gap-1.5 font-mono">
            <CloudRain className="w-4 h-4 text-[#8a3c8f]" />
            The GOES Precipitation Index (GPI) Laboratory
          </h4>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handlePresetChange('monsoon_convection')}
            className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer border ${
              selectedPreset === 'monsoon_convection'
                ? 'bg-[#10508f] text-white border-[#2a2825] shadow-[1px_1px_0_#2a2825]'
                : 'bg-[#fffdf8] text-[#53504a] border-[#b9b3a8] hover:border-[#2a2825] hover:text-[#1d1c19]'
            }`}
          >
            Deep Monsoon Convection
          </button>
          <button
            onClick={() => handlePresetChange('cirrus_anvil')}
            className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer border ${
              selectedPreset === 'cirrus_anvil'
                ? 'bg-[#b45309] text-white border-[#2a2825] shadow-[1px_1px_0_#2a2825]'
                : 'bg-[#fffdf8] text-[#53504a] border-[#b9b3a8] hover:border-[#2a2825] hover:text-[#1d1c19]'
            }`}
          >
            The Cold Cirrus Trap
          </button>
          <button
            onClick={() => handlePresetChange('shallow_warm_rain')}
            className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer border ${
              selectedPreset === 'shallow_warm_rain'
                ? 'bg-[#1b6b3c] text-white border-[#2a2825] shadow-[1px_1px_0_#2a2825]'
                : 'bg-[#fffdf8] text-[#53504a] border-[#b9b3a8] hover:border-[#2a2825] hover:text-[#1d1c19]'
            }`}
          >
            Western Ghats Warm Rain
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Interactive 2D Grid Canvas */}
        <div className="lg:col-span-6 bg-[#faf8f2] border-2 border-[#2a2825] rounded-xl p-3 shadow-inner">
          <div className="flex justify-between items-center text-xs font-mono text-[#53504a] mb-2 font-bold">
            <span className="flex items-center gap-1.5">
              <Grid className="w-3.5 h-3.5 text-[#10508f]" />
              1.0° × 1.0° Grid Box ({gridSize}×{gridSize} Pixels)
            </span>
            <span className="text-[11px] text-[#86817a]">Click any pixel to cycle Tb</span>
          </div>

          {/* Grid display */}
          <div
            className="grid gap-1.5 aspect-square p-2 bg-[#ffffff] rounded-lg border-2 border-[#2a2825]"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`
            }}
          >
            {cells.map((cell, idx) => {
              const isRainingByGPI = cell.tempK < thresholdK;
              let bg = '#f1f5f9'; // warm ground
              let textC = '#475569';
              let border = 'border-[#cbd5e1]';

              if (cell.tempK < 215) {
                bg = '#be123c'; // deep crimson (extreme cold convective core)
                textC = '#ffffff';
                border = 'border-[#881337]';
              } else if (cell.tempK < 235) {
                bg = '#6366f1'; // indigo (anvil cirrus below 235 K)
                textC = '#ffffff';
                border = 'border-[#4338ca]';
              } else if (cell.tempK < 270) {
                bg = '#0284c7'; // cyan-blue (shallow clouds)
                textC = '#ffffff';
                border = 'border-[#0369a1]';
              }

              return (
                <button
                  key={`${cell.x}-${cell.y}`}
                  onClick={() => handleCellClick(idx)}
                  className={`rounded-md p-1 flex flex-col items-center justify-center transition-all cursor-pointer relative group border-2 ${border} ${
                    isRainingByGPI ? 'shadow-[2px_2px_0_rgba(0,0,0,0.15)] ring-2 ring-[#10508f]/50' : ''
                  }`}
                  style={{ backgroundColor: bg }}
                  title={`(${cell.x}, ${cell.y}): ${cell.tempK} K — ${cell.cloudType}`}
                >
                  <span className="text-[10px] font-mono font-black leading-none" style={{ color: textC }}>
                    {cell.tempK}
                  </span>
                  {isRainingByGPI && (
                    <span className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-white border border-[#2a2825] animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Color legend */}
          <div className="flex flex-wrap items-center justify-between mt-3 text-[10px] font-mono text-[#1d1c19] font-bold px-1 gap-1">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-[#be123c] border border-[#2a2825] inline-block" /> &lt;215 K (Core)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-[#6366f1] border border-[#2a2825] inline-block" /> 215–235 K (Anvil)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-[#0284c7] border border-[#2a2825] inline-block" /> 235–270 K (Warm)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-[#f1f5f9] border border-[#2a2825] inline-block" /> &gt;270 K (Clear)
            </span>
          </div>
        </div>

        {/* Sliders and Live Mathematical Accumulation */}
        <div className="lg:col-span-6 space-y-3.5">
          {/* Threshold Slider */}
          <div className="bg-[#f4f1ea] border-2 border-[#2a2825] p-3.5 rounded-xl shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
            <div className="flex justify-between items-center text-xs font-mono mb-1.5">
              <span className="text-[#53504a] font-bold">Cold-Cloud Temperature Threshold:</span>
              <span className="text-[#8a3c8f] font-black bg-white px-1.5 py-0.5 rounded border border-[#2a2825]">
                {thresholdK} K ({thresholdK - 273}°C)
              </span>
            </div>
            <input
              type="range"
              min="215"
              max="255"
              step="1"
              value={thresholdK}
              onChange={(e) => setThresholdK(parseInt(e.target.value))}
              className="w-full accent-[#8a3c8f] cursor-pointer h-2 bg-[#dcd7cb] rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-[#53504a] font-mono mt-1 font-bold">
              <span>215 K (Overshooting Tops)</span>
              <span>235 K (Official ATBD)</span>
              <span>255 K (Low Clouds)</span>
            </div>
          </div>

          {/* Duration Slider */}
          <div className="bg-[#f4f1ea] border-2 border-[#2a2825] p-3.5 rounded-xl shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
            <div className="flex justify-between items-center text-xs font-mono mb-1.5">
              <span className="text-[#53504a] font-bold">Observation Duration (Δt):</span>
              <span className="text-[#10508f] font-black bg-white px-1.5 py-0.5 rounded border border-[#2a2825]">
                {durationHours} Hours
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="24"
              step="1"
              value={durationHours}
              onChange={(e) => setDurationHours(parseInt(e.target.value))}
              className="w-full accent-[#10508f] cursor-pointer h-2 bg-[#dcd7cb] rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-[#53504a] font-mono mt-1 font-bold">
              <span>1 h (Instantaneous)</span>
              <span>3 h (Operational Standard)</span>
              <span>24 h (Daily Total)</span>
            </div>
          </div>

          {/* Mathematical Step-by-Step Readout */}
          <div className="bg-[#f4f1ea] border-2 border-[#2a2825] p-3.5 rounded-xl space-y-2 text-xs font-mono shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
            <div className="text-[#10508f] font-black border-b border-[#b9b3a8] pb-1 uppercase tracking-wider flex items-center justify-between">
              <span>ATBD Formula Live Evaluation</span>
              <span className="text-[10px] text-[#53504a] font-bold">Chapter 4.4.1.1</span>
            </div>

            <div className="flex justify-between py-0.5">
              <span className="text-[#53504a]">Total Pixels Sampled:</span>
              <span className="text-[#1d1c19] font-bold">{totalCells} pixels</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-[#53504a]">Cold Pixels (Tb &lt; {thresholdK} K):</span>
              <span className="text-[#8a3c8f] font-bold">{coldCellsCount} pixels</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-[#53504a]">Cold-Cloud Fraction (f_c):</span>
              <span className="text-[#8a3c8f] font-black">
                {coldCellsCount} / {totalCells} = {coldCloudFraction}
              </span>
            </div>
            <div className="flex justify-between py-0.5 border-t border-[#b9b3a8]">
              <span className="text-[#53504a]">Instantaneous Rain Rate:</span>
              <span className="text-[#1b6b3c] font-black">{instantaneousRainRateMmHr} mm/h</span>
            </div>
            <div className="flex justify-between py-1 bg-[#e2f3e7] px-2 rounded border border-[#1b6b3c]/40 items-center">
              <span className="text-[#1b6b3c] font-black">GPI Estimated Total (R):</span>
              <span className="text-[#1b6b3c] font-black text-sm">
                3.0 × {coldCloudFraction} × {durationHours} = {totalRainAccumulationMm} mm
              </span>
            </div>

            {/* Validation Comparison vs True Ground Precipitation */}
            <div className="pt-2 border-t border-[#b9b3a8] flex justify-between items-center text-[11px]">
              <span className="text-[#53504a] font-bold">Ground Radar / Gauge Truth:</span>
              <span className="text-[#b45309] font-black">{truePhysicalRainMm} mm</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-[#53504a] font-bold">GPI Estimation Bias:</span>
              <span className={`font-black ${discrepancyPercent > 50 ? 'text-[#e11d48]' : discrepancyPercent < -50 ? 'text-[#b45309]' : 'text-[#16a34a]'}`}>
                {discrepancyPercent > 0 ? `+${discrepancyPercent}% (Overestimating)` : `${discrepancyPercent}% (Underestimating)`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Trap Warning Footer */}
      {selectedPreset === 'cirrus_anvil' && (
        <div className="mt-4 p-3.5 bg-[#fef2f2] border-2 border-[#e11d48] rounded-xl text-xs text-[#991b1b] leading-relaxed font-sans flex items-start gap-2.5 shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
          <AlertTriangle className="w-5 h-5 text-[#e11d48] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#991b1b] font-black uppercase tracking-wide mr-1">The Cirrus Anvil Trap Revealed:</strong>
            <span>
              Notice that because the non-precipitating cirrus clouds are cold (Tb &approx; 220 K), GPI calculated an impressive <strong>{totalRainAccumulationMm} mm</strong> of rain! But the actual ground rain is <strong>0.0 mm</strong>! Cirrus clouds are made of tiny, floating ice crystals that never reach the surface. GPI cannot tell the difference because it only looks at a single infrared threshold.
            </span>
          </div>
        </div>
      )}

      {selectedPreset === 'shallow_warm_rain' && (
        <div className="mt-4 p-3.5 bg-[#fdf6dd] border-2 border-[#b45309] rounded-xl text-xs text-[#92400e] leading-relaxed font-sans flex items-start gap-2.5 shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
          <AlertTriangle className="w-5 h-5 text-[#b45309] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#92400e] font-black uppercase tracking-wide mr-1">The Western Ghats Monsoon Trap:</strong>
            <span>
              Notice that shallow collision-coalescence clouds along the Western Ghats produce torrential rain at the ground (<strong>{truePhysicalRainMm} mm</strong>), but their tops only reach 3–4 km altitude where temperatures are <strong>260 K</strong> (warmer than 235 K). GPI completely missed them and reported <strong>0.0 mm</strong>! This is why ISRO created IMSRA and HEM.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
