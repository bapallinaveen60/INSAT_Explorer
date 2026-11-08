import React, { useState, useMemo } from 'react';
import { Layers, Activity, AlertCircle } from 'lucide-react';
import { INSAT_SOUNDER_CHANNELS } from '../../data/channelsData';

export const SounderProfileSimulator: React.FC = () => {
  const [selectedChannelNumber, setSelectedChannelNumber] = useState<number>(4); // Default Ch 4 (500 hPa mid-level)
  const [activeBandFilter, setActiveBandFilter] = useState<'All' | 'Longwave' | 'Midwave' | 'Shortwave'>('All');
  const [surfaceTempK, setSurfaceTempK] = useState<number>(300); // Surface temp
  const [lapseRateKPerKm, setLapseRateKPerKm] = useState<number>(6.5); // Standard lapse rate 6.5 K/km

  const selectedChannel = INSAT_SOUNDER_CHANNELS.find((c) => c.number === selectedChannelNumber) || INSAT_SOUNDER_CHANNELS[3];

  // Filter channels by band
  const visibleChannels = useMemo(() => {
    if (activeBandFilter === 'All') return INSAT_SOUNDER_CHANNELS.filter(c => c.number <= 18);
    return INSAT_SOUNDER_CHANNELS.filter(c => c.band === activeBandFilter && c.number <= 18);
  }, [activeBandFilter]);

  // Pressure levels for plot (10 hPa to 1013 hPa)
  const pressureLevels = [10, 20, 30, 50, 70, 100, 150, 200, 250, 300, 400, 500, 600, 700, 850, 925, 1013];

  // Weighting function calculation: W(p) = d(tau)/d(ln p)
  const getWeightingValue = (channelPeakP: number, p: number, bandwidth: number) => {
    const logP = Math.log10(p);
    const logPeak = Math.log10(channelPeakP);
    const width = 0.35 + (bandwidth / 200);
    const diff = (logP - logPeak) / width;
    return Math.exp(-0.5 * diff * diff);
  };

  // Temperature profile calculation
  const temperatureProfile = useMemo(() => {
    return pressureLevels.map((p) => {
      const zKm = 44.33 * (1 - Math.pow(p / 1013.25, 0.1903));
      let temp = surfaceTempK - lapseRateKPerKm * zKm;
      if (zKm > 11) {
        temp = 216.65 + (zKm - 11) * 1.5; // Stratospheric warming
      }
      return { p, zKm: +zKm.toFixed(1), temp: +temp.toFixed(1) };
    });
  }, [surfaceTempK, lapseRateKPerKm]);

  // Sounder derived parameters
  const sounderParams = useMemo(() => {
    const t500 = temperatureProfile.find(pt => pt.p === 500)?.temp || 255;
    const liftedIndex = +(t500 - (surfaceTempK - 42)).toFixed(1);
    const tpw = +(surfaceTempK > 295 ? 48.5 : 32.0).toFixed(1);
    return {
      liftedIndex,
      stability: liftedIndex < -3 ? 'Severe Convective Instability (Storm Hazard)' : liftedIndex < 0 ? 'Marginally Unstable' : 'Stable Air Mass',
      tpw
    };
  }, [temperatureProfile, surfaceTempK]);

  // SVG coordinate transformation
  const svgWidth = 480;
  const svgHeight = 360;
  const pad = { left: 60, right: 30, top: 25, bottom: 35 };
  const plotW = svgWidth - pad.left - pad.right;
  const plotH = svgHeight - pad.top - pad.bottom;

  const logMin = Math.log10(10);
  const logMax = Math.log10(1013.25);
  const toSvgY = (p: number) => {
    const val = Math.log10(p);
    return pad.top + ((val - logMin) / (logMax - logMin)) * plotH;
  };

  const toSvgX_W = (w: number) => pad.left + w * (plotW * 0.45);
  const toSvgX_T = (temp: number) => pad.left + plotW * 0.5 + ((temp - 190) / (320 - 190)) * (plotW * 0.48);

  return (
    <div className="bg-[#fffdf8] border-2 border-[#2a2825] rounded-2xl p-5 shadow-[3px_3px_0_rgba(42,40,37,0.15)] my-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b-2 border-[#b9b3a8]/60 pb-3 mb-4 gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-md bg-[#8a3c8f] text-white text-xs font-mono font-bold uppercase tracking-wider border border-[#2a2825]">
            Now You Try It
          </span>
          <h4 className="text-sm md:text-base font-black text-[#1d1c19] flex items-center gap-1.5 font-mono">
            <Layers className="w-4 h-4 text-[#8a3c8f]" />
            The 19-Channel Sounder: Weighting Functions & Vertical Inversion
          </h4>
        </div>

        {/* Band Filters */}
        <div className="flex items-center gap-1">
          {(['All', 'Longwave', 'Midwave', 'Shortwave'] as const).map((b) => (
            <button
              key={b}
              onClick={() => setActiveBandFilter(b)}
              className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-bold transition-all cursor-pointer border ${
                activeBandFilter === b
                  ? 'bg-[#10508f] text-white border-[#2a2825] shadow-[1px_1px_0_#2a2825]'
                  : 'bg-[#fffdf8] text-[#53504a] border-[#b9b3a8] hover:border-[#2a2825] hover:text-[#1d1c19]'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* SVG Atmospheric Vertical Profile Canvas */}
        <div className="lg:col-span-7 bg-[#faf8f2] border-2 border-[#2a2825] rounded-xl p-3 relative shadow-inner">
          <div className="flex justify-between items-center text-xs font-mono text-[#53504a] mb-1 font-bold">
            <span className="text-[#8a3c8f]">Weighting Function W(p) = ∂τ / ∂ln(p)</span>
            <span className="text-[#e11d48]">Temperature Profile T(p)</span>
          </div>

          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full select-none font-sans">
            {/* Inner background grid */}
            <rect x={pad.left} y={pad.top} width={plotW} height={plotH} fill="#ffffff" stroke="#2a2825" strokeWidth="1.5" />

            {/* Pressure Gridlines */}
            {[20, 50, 100, 200, 300, 500, 700, 850, 1000].map((p) => {
              const y = toSvgY(p);
              return (
                <g key={p}>
                  <line
                    x1={pad.left}
                    y1={y}
                    x2={svgWidth - pad.right}
                    y2={y}
                    stroke="#e2e8f0"
                    strokeWidth="1"
                    strokeDasharray="2 3"
                  />
                  <text x={pad.left - 8} y={y + 3} fill="#53504a" fontSize="9" fontWeight="bold" textAnchor="end" fontFamily="monospace">
                    {p} hPa
                  </text>
                </g>
              );
            })}

            {/* Split boundary line between Weighting Functions and Temperature */}
            <line
              x1={pad.left + plotW * 0.48}
              y1={pad.top}
              x2={pad.left + plotW * 0.48}
              y2={pad.top + plotH}
              stroke="#2a2825"
              strokeWidth="1.5"
            />

            {/* Inactive Channel Weighting curves (faint) */}
            {visibleChannels.map((ch) => {
              const isSelected = ch.number === selectedChannelNumber;
              const points = pressureLevels.map((p) => {
                const w = getWeightingValue(ch.peakWeightingPressureHpa, p, ch.bandwidthCm);
                return `${toSvgX_W(w)},${toSvgY(p)}`;
              }).join(' ');

              let strokeC = '#94a3b8';
              if (isSelected) strokeC = '#8a3c8f';
              else if (ch.band === 'Longwave') strokeC = '#0284c7';
              else if (ch.band === 'Midwave') strokeC = '#0d9488';
              else strokeC = '#d97706';

              return (
                <polyline
                  key={ch.number}
                  points={points}
                  fill="none"
                  stroke={strokeC}
                  strokeWidth={isSelected ? 3.5 : 1.2}
                  opacity={isSelected ? 1.0 : 0.35}
                  className="cursor-pointer"
                  onClick={() => setSelectedChannelNumber(ch.number)}
                />
              );
            })}

            {/* Active Channel Peak Marker */}
            <circle
              cx={toSvgX_W(1.0)}
              cy={toSvgY(selectedChannel.peakWeightingPressureHpa)}
              r="5"
              fill="#8a3c8f"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <rect
              x={toSvgX_W(1.0) + 6}
              y={toSvgY(selectedChannel.peakWeightingPressureHpa) - 8}
              width="135"
              height="16"
              fill="#fffdf8"
              stroke="#2a2825"
              strokeWidth="1"
              rx="3"
            />
            <text
              x={toSvgX_W(1.0) + 10}
              y={toSvgY(selectedChannel.peakWeightingPressureHpa) + 4}
              fill="#8a3c8f"
              fontSize="9"
              fontWeight="bold"
              fontFamily="monospace"
            >
              Ch {selectedChannel.number} Peak ({selectedChannel.peakWeightingPressureHpa} hPa)
            </text>

            {/* Temperature Profile Curve */}
            <polyline
              points={temperatureProfile.map(pt => `${toSvgX_T(pt.temp)},${toSvgY(pt.p)}`).join(' ')}
              fill="none"
              stroke="#e11d48"
              strokeWidth="2.5"
            />

            {/* Temperature Profile Labels */}
            <text x={toSvgX_T(200)} y={pad.top + plotH + 16} fill="#53504a" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              200 K
            </text>
            <text x={toSvgX_T(250)} y={pad.top + plotH + 16} fill="#53504a" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              250 K
            </text>
            <text x={toSvgX_T(300)} y={pad.top + plotH + 16} fill="#53504a" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              300 K
            </text>

            {/* Tropopause Line */}
            <line
              x1={pad.left}
              y1={toSvgY(100)}
              x2={svgWidth - pad.right}
              y2={toSvgY(100)}
              stroke="#d6197f"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
            <text x={svgWidth - pad.right} y={toSvgY(100) - 5} fill="#d6197f" fontSize="8.5" fontWeight="bold" textAnchor="end" fontFamily="monospace">
              Tropopause (~100 hPa / 16 km)
            </text>
          </svg>
        </div>

        {/* Selected Channel Metadata & Sounder Application Parameters */}
        <div className="lg:col-span-5 space-y-3.5">
          {/* Channel Selector Carousel */}
          <div className="bg-[#f4f1ea] border-2 border-[#2a2825] p-3 rounded-xl shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="text-[#53504a] font-bold">Select Sounder Channel:</span>
              <span className="text-[#10508f] font-black bg-white px-1.5 py-0.5 rounded border border-[#2a2825]">
                Ch {selectedChannel.number} of 18 IR
              </span>
            </div>
            <div className="flex gap-1 overflow-x-auto pb-1">
              {INSAT_SOUNDER_CHANNELS.filter(c => c.number <= 18).map((ch) => (
                <button
                  key={ch.number}
                  onClick={() => setSelectedChannelNumber(ch.number)}
                  className={`px-2 py-1 rounded text-[10px] font-mono shrink-0 transition-all cursor-pointer border ${
                    selectedChannelNumber === ch.number
                      ? 'bg-[#10508f] text-white border-[#2a2825] font-bold shadow-[1px_1px_0_#2a2825]'
                      : 'bg-white text-[#53504a] border-[#b9b3a8] hover:border-[#2a2825] hover:text-[#1d1c19]'
                  }`}
                >
                  {ch.number}
                </button>
              ))}
            </div>
          </div>

          {/* Channel Detailed Specs from ATBD Table 2 */}
          <div className="bg-[#f4f1ea] border-2 border-[#2a2825] p-3.5 rounded-xl space-y-2 text-xs font-mono shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
            <div className="text-[#10508f] font-black border-b border-[#b9b3a8] pb-1 uppercase tracking-wider flex items-center justify-between">
              <span>Channel {selectedChannel.number} Specifications</span>
              <span className="text-[#53504a] font-bold">{selectedChannel.band}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-[#53504a]">Central Wavelength (λc):</span>
              <span className="text-[#1d1c19] font-bold">{selectedChannel.centralWavelengthMicrons} µm</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-[#53504a]">Principal Absorbing Gas:</span>
              <span className="text-[#b45309] font-black">{selectedChannel.principalAbsorbingGas}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-[#53504a]">Peak Sensitivity Level:</span>
              <span className="text-[#8a3c8f] font-black">{selectedChannel.targetLayer}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-[#53504a]">Meteorological Purpose:</span>
              <span className="text-[#16a34a] font-bold">{selectedChannel.purpose}</span>
            </div>
          </div>

          {/* Sounder Derived Application Parameters */}
          <div className="bg-[#f4f1ea] border-2 border-[#2a2825] p-3.5 rounded-xl space-y-2 text-xs font-mono shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
            <div className="text-[#10508f] font-black border-b border-[#b9b3a8] pb-1 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#10508f]" />
              Sounder Stability Indices (ATBD Ch 21)
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-[#53504a]">Lifted Index (LI):</span>
              <span className={`font-black ${sounderParams.liftedIndex < -2 ? 'text-[#e11d48]' : 'text-[#16a34a]'}`}>
                {sounderParams.liftedIndex} °C ({sounderParams.stability})
              </span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-[#53504a]">Total Precipitable Water (TPW):</span>
              <span className="text-[#0284c7] font-black">{sounderParams.tpw} mm</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-[#53504a]">Dry Microburst Index (DMI):</span>
              <span className="text-[#b45309] font-bold">Moderate Convective Risk</span>
            </div>
          </div>
        </div>
      </div>

      {/* Insight */}
      <div className="mt-4 p-3.5 bg-[#fdf6dd] border-2 border-[#2a2825] rounded-xl text-xs text-[#1d1c19] leading-relaxed font-sans flex items-start gap-2.5 shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
        <AlertCircle className="w-5 h-5 text-[#b45309] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#b45309] font-black uppercase tracking-wide mr-1">How the Sounder "Peels" the Atmospheric Onion:</strong>
          <span>
            Notice that in Channel 1 (14.67 µm), CO2 absorbs so strongly that radiation emitted below 30 hPa never reaches space. Therefore, the satellite only measures stratospheric temperature! In contrast, in Channel 4 (13.64 µm), absorption is weaker, peaking around 500 hPa (mid-troposphere). By measuring all 19 channels simultaneously and inverting the Radiative Transfer Equation, INSAT reconstructs the entire vertical profile without ever launching a weather balloon!
          </span>
        </div>
      </div>
    </div>
  );
};
