import React, { useState } from 'react';
import { Eye, SplitSquareVertical, Grid, Layers, Crosshair, Sparkles } from 'lucide-react';
import { INSAT_IMAGER_CHANNELS } from '../../data/channelsData';
import { PixelInspectionData } from '../../types/satellite';

export const SixChannelSandbox: React.FC = () => {
  const [viewMode, setViewMode] = useState<'single' | 'split' | 'four' | 'six'>('split');
  const [activeChannelA, setActiveChannelA] = useState<string>('vis');
  const [activeChannelB, setActiveChannelB] = useState<string>('tir1');
  const [splitPosition, setSplitPosition] = useState<number>(50); // 0 to 100%
  const [activeExperiment, setActiveExperiment] = useState<number>(1);
  const [inspectedPixel, setInspectedPixel] = useState<PixelInspectionData>({
    lat: 18.2,
    lon: 73.8, // Over Western Ghats / Pune
    surfaceType: 'Dense Cloud',
    visReflectance: 84.5,
    swirReflectance: 12.3, // Low reflectance due to ice crystals
    mirTempK: 218.4,
    wvTempK: 212.1,
    tir1TempK: 206.5, // Cold Cb top (-66°C)
    tir2TempK: 207.2,
    splitWindowDiff: -0.7,
    cloudMaskClassification: 'Deep Convection',
    retrievedRainRateMmHr: 18.4,
    retrievedOlrWm2: 128.0
  });

  // Guided Experiments list
  const experiments = [
    {
      id: 1,
      title: 'Exp 1: Why do clouds appear white in Visible?',
      channelA: 'vis',
      channelB: 'swir',
      explanation: 'Clouds are composed of liquid droplets and ice crystals much larger than visible wavelengths (0.65 µm). Scattering is non-selective Mie scattering, reflecting ~80% of all solar colors equally, creating brilliant white tops. But in SWIR (1.6 µm), ice crystals absorb photons, making ice clouds appear dark!'
    },
    {
      id: 2,
      title: 'Exp 2: Why do clouds appear cold in Thermal IR?',
      channelA: 'vis',
      channelB: 'tir1',
      explanation: 'Thermal IR measures emitted Planck radiation. High cumulonimbus cloud tops reach the tropopause (12–16 km altitude), where ambient temperatures plummet to 200–220 K (-73°C to -53°C). The satellite measures this frigid emission boundary!'
    },
    {
      id: 3,
      title: 'Exp 3: The Day/Night Ambiguity of 3.9 µm MIR',
      channelA: 'mir',
      channelB: 'tir1',
      explanation: 'During the day, 3.9 µm receives both reflected sunlight and thermal emission. At night, it becomes a pure thermal channel with extreme sensitivity to hot forest fires (T^10 sensitivity).'
    },
    {
      id: 4,
      title: 'Exp 4: The Split-Window Trick (TIR-1 vs TIR-2)',
      channelA: 'tir1',
      channelB: 'tir2',
      explanation: 'Water vapor continuum absorbs slightly more strongly at 12.0 µm than at 10.8 µm. Subtracting the two (BT10.8 - BT12.0) removes the atmospheric moisture bias for Sea Surface Temperature (SST).'
    },
    {
      id: 5,
      title: 'Exp 5: Water Vapour Imagery Without Clouds',
      channelA: 'wv',
      channelB: 'vis',
      explanation: 'Notice how the 6.8 µm Water Vapour channel reveals swirling cyclonic vortices and high-altitude jet streams even across cloud-free desert and ocean!'
    }
  ];

  // Select experiment
  const selectExperiment = (expId: number) => {
    const exp = experiments.find(e => e.id === expId);
    if (!exp) return;
    setActiveExperiment(expId);
    setActiveChannelA(exp.channelA);
    setActiveChannelB(exp.channelB);
    setViewMode('split');
    setSplitPosition(50);
  };

  // Preset probe locations
  const probePresets: { name: string; data: PixelInspectionData }[] = [
    {
      name: 'Cumulonimbus Anvil (Monsoon Cloud)',
      data: {
        lat: 18.2,
        lon: 73.8,
        surfaceType: 'Dense Cloud',
        visReflectance: 84.5,
        swirReflectance: 12.3,
        mirTempK: 218.4,
        wvTempK: 212.1,
        tir1TempK: 206.5,
        tir2TempK: 207.2,
        splitWindowDiff: -0.7,
        cloudMaskClassification: 'Deep Convection',
        retrievedRainRateMmHr: 18.4,
        retrievedOlrWm2: 128.0
      }
    },
    {
      name: 'Hot Desert Sand (Thar Desert)',
      data: {
        lat: 27.0,
        lon: 71.5,
        surfaceType: 'Desert',
        visReflectance: 42.0,
        swirReflectance: 68.0,
        mirTempK: 334.2, // Solar reflection + hot surface
        wvTempK: 248.5,
        tir1TempK: 326.8, // Hot surface emission (+53°C)
        tir2TempK: 324.1,
        splitWindowDiff: +2.7,
        cloudMaskClassification: 'Clear',
        retrievedRainRateMmHr: 0.0,
        retrievedOlrWm2: 342.0
      }
    },
    {
      name: 'Indo-Gangetic Winter Fog',
      data: {
        lat: 28.6,
        lon: 77.2,
        surfaceType: 'Land',
        visReflectance: 65.0,
        swirReflectance: 52.0,
        mirTempK: 281.0,
        wvTempK: 250.0,
        tir1TempK: 285.5,
        tir2TempK: 286.0,
        splitWindowDiff: -0.5,
        cloudMaskClassification: 'Low Fog',
        retrievedRainRateMmHr: 0.0,
        retrievedOlrWm2: 245.0
      }
    },
    {
      name: 'Clear Tropical Ocean (Arabian Sea)',
      data: {
        lat: 14.2,
        lon: 68.0,
        surfaceType: 'Ocean',
        visReflectance: 6.2,
        swirReflectance: 2.1,
        mirTempK: 299.5,
        wvTempK: 242.0,
        tir1TempK: 298.8,
        tir2TempK: 296.2,
        splitWindowDiff: +2.6,
        cloudMaskClassification: 'Clear',
        retrievedRainRateMmHr: 0.0,
        retrievedOlrWm2: 288.0
      }
    }
  ];

  return (
    <div className="bg-[#fffdf8] border-2 border-[#2a2825] rounded-2xl p-5 shadow-[3px_3px_0_rgba(42,40,37,0.15)] my-6">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between border-b-2 border-[#b9b3a8]/60 pb-3 mb-4 gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-md bg-[#8a3c8f] text-white text-xs font-mono font-bold uppercase tracking-wider border border-[#2a2825]">
            Now You Try It
          </span>
          <h4 className="text-sm md:text-base font-black text-[#1d1c19] flex items-center gap-1.5 font-mono">
            <Eye className="w-4 h-4 text-[#8a3c8f]" />
            Six-Channel Comparison & Live Pixel Inspector
          </h4>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewMode('split')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer border ${
              viewMode === 'split' ? 'bg-[#10508f] text-white border-[#2a2825] shadow-[1px_1px_0_#2a2825]' : 'bg-[#fffdf8] text-[#53504a] border-[#b9b3a8] hover:border-[#2a2825]'
            }`}
          >
            <SplitSquareVertical className="w-3.5 h-3.5" /> Split Slider
          </button>
          <button
            onClick={() => setViewMode('four')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer border ${
              viewMode === 'four' ? 'bg-[#10508f] text-white border-[#2a2825] shadow-[1px_1px_0_#2a2825]' : 'bg-[#fffdf8] text-[#53504a] border-[#b9b3a8] hover:border-[#2a2825]'
            }`}
          >
            <Grid className="w-3.5 h-3.5" /> 4-Grid
          </button>
          <button
            onClick={() => setViewMode('six')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer border ${
              viewMode === 'six' ? 'bg-[#10508f] text-white border-[#2a2825] shadow-[1px_1px_0_#2a2825]' : 'bg-[#fffdf8] text-[#53504a] border-[#b9b3a8] hover:border-[#2a2825]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> 6-Channel
          </button>
        </div>
      </div>

      {/* Guided Experiments Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 mb-3 border-b border-[#b9b3a8]">
        {experiments.map((exp) => (
          <button
            key={exp.id}
            onClick={() => selectExperiment(exp.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all cursor-pointer border-2 ${
              activeExperiment === exp.id
                ? 'bg-[#10508f] border-[#2a2825] text-white shadow-[2px_2px_0_#2a2825] font-bold'
                : 'bg-white border-[#b9b3a8] text-[#53504a] hover:border-[#2a2825] hover:text-[#1d1c19]'
            }`}
          >
            {exp.title}
          </button>
        ))}
      </div>

      {/* Main Interactive Canvas & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Imagery Viewer */}
        <div className="lg:col-span-7 bg-[#faf8f2] border-2 border-[#2a2825] rounded-xl p-3 relative overflow-hidden shadow-inner">
          {/* Channel Selectors for Comparison */}
          <div className="flex justify-between items-center text-xs font-mono mb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[#53504a] font-bold">Layer A:</span>
              <select
                value={activeChannelA}
                onChange={(e) => setActiveChannelA(e.target.value)}
                className="bg-white border-2 border-[#2a2825] text-[#10508f] font-bold rounded-md px-2 py-0.5 cursor-pointer"
              >
                {INSAT_IMAGER_CHANNELS.map((ch) => (
                  <option key={ch.id} value={ch.id}>
                    {ch.shortName}
                  </option>
                ))}
              </select>
            </div>

            {viewMode === 'split' && (
              <div className="flex items-center gap-1.5">
                <span className="text-[#53504a] font-bold">Layer B:</span>
                <select
                  value={activeChannelB}
                  onChange={(e) => setActiveChannelB(e.target.value)}
                  className="bg-white border-2 border-[#2a2825] text-[#8a3c8f] font-bold rounded-md px-2 py-0.5 cursor-pointer"
                >
                  {INSAT_IMAGER_CHANNELS.map((ch) => (
                    <option key={ch.id} value={ch.id}>
                      {ch.shortName}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Simulated Satellite Frame Canvas */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden border-2 border-[#2a2825] bg-[#ffffff] flex items-center justify-center select-none shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
            <svg viewBox="0 0 400 300" className="w-full h-full font-sans">
              <defs>
                <radialGradient id="visCloud" cx="45%" cy="50%" r="55%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#e0f2fe" stopOpacity="0.8" />
                  <stop offset="85%" stopColor="#38bdf8" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                </radialGradient>

                <radialGradient id="tirCloud" cx="45%" cy="50%" r="55%">
                  <stop offset="0%" stopColor="#be123c" />
                  <stop offset="35%" stopColor="#7c3aed" />
                  <stop offset="70%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#cbd5e1" />
                </radialGradient>

                <radialGradient id="wvMoisture" cx="50%" cy="45%" r="65%">
                  <stop offset="0%" stopColor="#0d9488" stopOpacity="0.9" />
                  <stop offset="45%" stopColor="#0284c7" stopOpacity="0.7" />
                  <stop offset="85%" stopColor="#1e3a8a" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity="0.2" />
                </radialGradient>

                <clipPath id="clipSplitLeft">
                  <rect x="0" y="0" width={(splitPosition / 100) * 400} height="300" />
                </clipPath>
                <clipPath id="clipSplitRight">
                  <rect x={(splitPosition / 100) * 400} y="0" width={400 - (splitPosition / 100) * 400} height="300" />
                </clipPath>
              </defs>

              {/* Base Background: Ocean & Subcontinent outline */}
              <rect width="400" height="300" fill="#e0f2fe" />
              {/* Peninsular India coast outline */}
              <polygon
                points="160,30 240,30 220,120 190,220 180,240 170,220 140,120"
                fill="#fef3c7"
                stroke="#2a2825"
                strokeWidth="1.5"
              />

              {/* Layer A Rendering */}
              <g clipPath={viewMode === 'split' ? 'url(#clipSplitLeft)' : undefined}>
                <rect width="400" height="300" fill={activeChannelA === 'vis' ? '#bae6fd' : activeChannelA === 'wv' ? '#ccfbf1' : '#f1f5f9'} />
                <polygon
                  points="160,30 240,30 220,120 190,220 180,240 170,220 140,120"
                  fill={activeChannelA === 'vis' ? '#fef08a' : '#fed7aa'}
                  stroke="#2a2825"
                  strokeWidth="1.5"
                />
                {/* Cloud feature */}
                <ellipse cx="180" cy="140" rx="90" ry="60" fill={activeChannelA === 'vis' ? 'url(#visCloud)' : activeChannelA === 'wv' ? 'url(#wvMoisture)' : 'url(#tirCloud)'} />
                <circle cx="165" cy="130" r="28" fill={activeChannelA === 'vis' ? '#ffffff' : activeChannelA === 'wv' ? '#0d9488' : '#e11d48'} />
                {/* Channel Label Badge */}
                <rect x="12" y="12" width="130" height="20" fill="#fffdf8" stroke="#2a2825" strokeWidth="1.2" rx="4" />
                <text x="18" y="26" fill="#10508f" fontSize="10" fontWeight="bold" fontFamily="monospace">
                  Layer A: {INSAT_IMAGER_CHANNELS.find(c => c.id === activeChannelA)?.shortName}
                </text>
              </g>

              {/* Layer B Rendering (for split view) */}
              {viewMode === 'split' && (
                <g clipPath="url(#clipSplitRight)">
                  <rect width="400" height="300" fill={activeChannelB === 'vis' ? '#bae6fd' : activeChannelB === 'wv' ? '#ccfbf1' : '#f1f5f9'} />
                  <polygon
                    points="160,30 240,30 220,120 190,220 180,240 170,220 140,120"
                    fill={activeChannelB === 'vis' ? '#fef08a' : '#fed7aa'}
                    stroke="#2a2825"
                    strokeWidth="1.5"
                  />
                  {/* Cloud feature in Layer B style */}
                  <ellipse cx="180" cy="140" rx="90" ry="60" fill={activeChannelB === 'vis' ? 'url(#visCloud)' : activeChannelB === 'wv' ? 'url(#wvMoisture)' : 'url(#tirCloud)'} />
                  <circle cx="165" cy="130" r="28" fill={activeChannelB === 'vis' ? '#ffffff' : activeChannelB === 'wv' ? '#0d9488' : '#e11d48'} />
                  {/* Channel Label Badge */}
                  <rect x="258" y="12" width="130" height="20" fill="#fffdf8" stroke="#2a2825" strokeWidth="1.2" rx="4" />
                  <text x="264" y="26" fill="#8a3c8f" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    Layer B: {INSAT_IMAGER_CHANNELS.find(c => c.id === activeChannelB)?.shortName}
                  </text>
                </g>
              )}

              {/* Split Divider Line */}
              {viewMode === 'split' && (
                <g>
                  <line
                    x1={(splitPosition / 100) * 400}
                    y1="0"
                    x2={(splitPosition / 100) * 400}
                    y2="300"
                    stroke="#2a2825"
                    strokeWidth="2.5"
                    strokeDasharray="5 3"
                  />
                  <circle
                    cx={(splitPosition / 100) * 400}
                    cy="150"
                    r="10"
                    fill="#8a3c8f"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                </g>
              )}

              {/* Inspection Target Crosshair */}
              <g transform="translate(180, 140)">
                <circle r="14" fill="none" stroke="#e11d48" strokeWidth="2" strokeDasharray="4 2" />
                <line x1="-18" y1="0" x2="18" y2="0" stroke="#e11d48" strokeWidth="1.5" />
                <line x1="0" y1="-18" x2="0" y2="18" stroke="#e11d48" strokeWidth="1.5" />
                <circle r="3" fill="#e11d48" />
              </g>
            </svg>

            {/* Split Slider Control */}
            {viewMode === 'split' && (
              <div className="absolute bottom-2 left-4 right-4 bg-white/90 p-2 rounded-lg border-2 border-[#2a2825] shadow-md backdrop-blur-xs">
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={splitPosition}
                  onChange={(e) => setSplitPosition(parseInt(e.target.value))}
                  className="w-full accent-[#8a3c8f] cursor-ew-resize h-2 bg-[#dcd7cb] rounded"
                />
              </div>
            )}
          </div>

          {/* Experiment Explanation Banner */}
          <div className="mt-3 p-3 bg-[#fdf6dd] border-2 border-[#2a2825] rounded-xl text-xs text-[#1d1c19] leading-relaxed shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
            <strong className="text-[#b45309] font-black mr-1">Scientific Takeaway:</strong>
            <span>{experiments.find(e => e.id === activeExperiment)?.explanation}</span>
          </div>
        </div>

        {/* Pixel Probe & Synchronized 6-Channel Telemetry */}
        <div className="lg:col-span-5 space-y-3.5">
          {/* Preset Probe Locations */}
          <div className="bg-[#f4f1ea] border-2 border-[#2a2825] p-3 rounded-xl shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
            <div className="text-xs font-mono text-[#53504a] font-bold mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Crosshair className="w-3.5 h-3.5 text-[#10508f]" />
                Sample Meteorological Targets
              </span>
            </div>
            <div className="space-y-1.5">
              {probePresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => setInspectedPixel(preset.data)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center justify-between border ${
                    inspectedPixel.lat === preset.data.lat
                      ? 'bg-[#10508f] border-[#2a2825] text-white font-bold shadow-[1px_1px_0_#2a2825]'
                      : 'bg-white border-[#b9b3a8] text-[#53504a] hover:border-[#2a2825] hover:text-[#1d1c19]'
                  }`}
                >
                  <span className="truncate">{preset.name}</span>
                  <span className="text-[10px] shrink-0 font-normal">
                    {preset.data.lat}°N, {preset.data.lon}°E
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Synchronized 6-Channel Radiances for Inspected Pixel */}
          <div className="bg-[#f4f1ea] border-2 border-[#2a2825] p-3.5 rounded-xl text-xs font-mono space-y-2.5 shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
            <div className="text-[#10508f] font-black border-b border-[#b9b3a8] pb-1 uppercase tracking-wider flex items-center justify-between">
              <span>Pixel Telemetry Probe</span>
              <span className="text-[#16a34a] font-bold bg-[#e2f3e7] px-1.5 py-0.5 rounded border border-[#16a34a]/40">{inspectedPixel.surfaceType}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 bg-white rounded-lg border-2 border-[#2a2825]">
                <div className="text-[#0284c7] font-black">1. VIS (0.65 µm)</div>
                <div className="text-[#1d1c19] font-black text-sm">{inspectedPixel.visReflectance}% Albedo</div>
              </div>
              <div className="p-2 bg-white rounded-lg border-2 border-[#2a2825]">
                <div className="text-[#4338ca] font-black">2. SWIR (1.62 µm)</div>
                <div className="text-[#1d1c19] font-black text-sm">{inspectedPixel.swirReflectance}% Albedo</div>
              </div>
              <div className="p-2 bg-white rounded-lg border-2 border-[#2a2825]">
                <div className="text-[#d97706] font-black">3. MIR (3.90 µm)</div>
                <div className="text-[#1d1c19] font-black text-sm">{inspectedPixel.mirTempK} K</div>
              </div>
              <div className="p-2 bg-white rounded-lg border-2 border-[#2a2825]">
                <div className="text-[#0d9488] font-black">4. WV (6.80 µm)</div>
                <div className="text-[#1d1c19] font-black text-sm">{inspectedPixel.wvTempK} K</div>
              </div>
              <div className="p-2 bg-white rounded-lg border-2 border-[#2a2825]">
                <div className="text-[#e11d48] font-black">5. TIR-1 (10.8 µm)</div>
                <div className="text-[#1d1c19] font-black text-sm">{inspectedPixel.tir1TempK} K</div>
              </div>
              <div className="p-2 bg-white rounded-lg border-2 border-[#2a2825]">
                <div className="text-[#8a3c8f] font-black">6. TIR-2 (12.0 µm)</div>
                <div className="text-[#1d1c19] font-black text-sm">{inspectedPixel.tir2TempK} K</div>
              </div>
            </div>

            {/* Derived Geophysical Products */}
            <div className="pt-2 border-t border-[#b9b3a8] space-y-1 text-[11px]">
              <div className="flex justify-between py-0.5">
                <span className="text-[#53504a]">Split-Window (T11 - T12):</span>
                <span className={`font-black ${inspectedPixel.splitWindowDiff < -2 ? 'text-[#e11d48]' : 'text-[#1d1c19]'}`}>
                  {inspectedPixel.splitWindowDiff} K
                </span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-[#53504a]">Cloud Mask Classification:</span>
                <span className="text-[#16a34a] font-black">{inspectedPixel.cloudMaskClassification}</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-[#53504a]">Retrieved Rain Rate:</span>
                <span className="text-[#0284c7] font-black">{inspectedPixel.retrievedRainRateMmHr} mm/h</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-[#53504a]">Outgoing Longwave Radiation:</span>
                <span className="text-[#8a3c8f] font-bold">{inspectedPixel.retrievedOlrWm2} W/m²</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
