import React, { useState, useMemo } from 'react';
import { Flame, Thermometer, Info, Compass, Sparkles } from 'lucide-react';
import { INSAT_IMAGER_CHANNELS } from '../../data/channelsData';

// Constants
const h = 6.62607015e-34; // J s
const c = 2.99792458e8;   // m/s
const kB = 1.380649e-23;  // J/K
const sigma = 5.670374419e-8; // W m^-2 K^-4

/**
 * Planck function: Spectral radiance B_lambda in W / (m^2 sr um)
 * lambda in um, T in K
 */
function planckRadiance(lambdaUm: number, T: number): number {
  if (T <= 0 || lambdaUm <= 0) return 0;
  const lambdaM = lambdaUm * 1e-6;
  const c1 = 2 * h * c * c;
  const c2 = (h * c) / kB;
  const denom = Math.exp(c2 / (lambdaM * T)) - 1;
  if (!isFinite(denom) || denom <= 0) return 0;
  const bM = c1 / (Math.pow(lambdaM, 5) * denom); // W / (m^3 sr)
  return bM * 1e-6; // W / (m^2 sr um)
}

export const PlanckSimulator: React.FC = () => {
  const [temperature, setTemperature] = useState<number>(280); // 180 K to 330 K
  const [emissivity, setEmissivity] = useState<number>(1.0); // 0.1 to 1.0
  const [selectedChannelId, setSelectedChannelId] = useState<string>('tir1');

  // Quick preset targets
  const presets = [
    { name: 'Deep Convective Anvil (Tropopause)', temp: 200, desc: 'High Cb anvil (-73°C)' },
    { name: 'Mid-Level Stratiform Cloud', temp: 245, desc: 'Freezing altitude (~5 km)' },
    { name: 'Tropical Ocean Surface', temp: 300, desc: 'Warm Bay of Bengal (+27°C)' },
    { name: 'Thar Desert Summer Noon', temp: 325, desc: 'Hot bare sand (+52°C)' },
  ];

  // Wien's peak wavelength in um
  const peakWavelength = useMemo(() => {
    return +(2897.8 / temperature).toFixed(2);
  }, [temperature]);

  // Stefan-Boltzmann flux
  const totalFlux = useMemo(() => {
    return +(emissivity * sigma * Math.pow(temperature, 4)).toFixed(1);
  }, [temperature, emissivity]);

  // Wavelength curve data from 1 to 20 um
  const curvePoints = useMemo(() => {
    const points: { lambda: number; radiance: number }[] = [];
    for (let l = 1.0; l <= 20.0; l += 0.25) {
      const b = planckRadiance(l, temperature) * emissivity;
      points.push({ lambda: l, radiance: b });
    }
    return points;
  }, [temperature, emissivity]);

  // Max radiance for SVG scaling
  const maxRadiance = useMemo(() => {
    const peak = planckRadiance(peakWavelength, temperature) * emissivity;
    return Math.max(peak * 1.15, 0.5);
  }, [peakWavelength, temperature, emissivity]);

  // Selected channel data
  const selectedChannel = INSAT_IMAGER_CHANNELS.find(c => c.id === selectedChannelId) || INSAT_IMAGER_CHANNELS[4];
  const channelRadiance = useMemo(() => {
    return +(planckRadiance(selectedChannel.centralWavelength, temperature) * emissivity).toFixed(3);
  }, [selectedChannel, temperature, emissivity]);

  // Brightness temperature calculation for the selected channel (inverting Planck's law assuming eps=1)
  const brightnessTemperature = useMemo(() => {
    const measuredL = channelRadiance; // in W/(m^2 sr um)
    if (measuredL <= 0) return 0;
    const lM = selectedChannel.centralWavelength * 1e-6;
    const c1 = 2 * h * c * c;
    const c2 = (h * c) / kB;
    const bM = measuredL * 1e6; // to W/(m^3 sr)
    const tb = c2 / (lM * Math.log(1 + c1 / (Math.pow(lM, 5) * bM)));
    return +tb.toFixed(1);
  }, [channelRadiance, selectedChannel]);

  // SVG coordinate transformation
  const svgWidth = 540;
  const svgHeight = 240;
  const padding = { left: 55, right: 25, top: 20, bottom: 35 };
  const plotW = svgWidth - padding.left - padding.right;
  const plotH = svgHeight - padding.top - padding.bottom;

  const toSvgX = (lambda: number) => padding.left + ((lambda - 1) / (20 - 1)) * plotW;
  const toSvgY = (rad: number) => padding.top + plotH - (rad / maxRadiance) * plotH;

  const pathD = curvePoints.reduce((acc, pt, i) => {
    const x = toSvgX(pt.lambda);
    const y = toSvgY(pt.radiance);
    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  return (
    <div className="bg-[#fffdf8] border-2 border-[#2a2825] rounded-2xl p-5 shadow-[3px_3px_0_rgba(42,40,37,0.15)] my-6">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between border-b-2 border-[#b9b3a8]/60 pb-3 mb-4 gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-md bg-[#8a3c8f] text-white text-xs font-mono font-bold uppercase tracking-wider border border-[#2a2825]">
            Now You Try It
          </span>
          <h4 className="text-sm md:text-base font-black text-[#1d1c19] flex items-center gap-1.5 font-mono">
            <Flame className="w-4 h-4 text-[#8a3c8f]" />
            Planck’s Law & The Meaning of Brightness Temperature
          </h4>
        </div>

        {/* Presets */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {presets.map((p) => (
            <button
              key={p.name}
              onClick={() => {
                setTemperature(p.temp);
              }}
              className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap border ${
                temperature === p.temp
                  ? 'bg-[#8a3c8f] text-white border-[#2a2825] shadow-[1px_1px_0_#2a2825]'
                  : 'bg-[#fffdf8] text-[#53504a] border-[#b9b3a8] hover:border-[#2a2825] hover:text-[#1d1c19]'
              }`}
              title={p.desc}
            >
              {p.temp} K
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Planck Radiance Curve Canvas */}
        <div className="lg:col-span-8 bg-[#faf8f2] border-2 border-[#2a2825] rounded-xl p-3 relative shadow-inner">
          <div className="flex justify-between items-center text-xs font-mono text-[#53504a] mb-1 font-bold">
            <span>Spectral Radiance B(λ, T) [W / (m² · sr · µm)]</span>
            <span className="text-[#8a3c8f]">Wien Peak λ_max = {peakWavelength} µm</span>
          </div>

          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full select-none font-sans">
            {/* Subtle background grid */}
            <rect x={padding.left} y={padding.top} width={plotW} height={plotH} fill="#ffffff" stroke="#2a2825" strokeWidth="1.5" />

            {/* Gridlines */}
            {[5, 10, 15, 20].map((wl) => (
              <g key={wl}>
                <line
                  x1={toSvgX(wl)}
                  y1={padding.top}
                  x2={toSvgX(wl)}
                  y2={padding.top + plotH}
                  stroke="#e5e0d3"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
                <text x={toSvgX(wl)} y={svgHeight - 12} fill="#53504a" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  {wl} µm
                </text>
              </g>
            ))}

            {/* Y-axis ticks */}
            <text x={padding.left - 8} y={padding.top + 12} fill="#53504a" fontSize="9" fontWeight="bold" textAnchor="end" fontFamily="monospace">
              {maxRadiance.toFixed(2)}
            </text>
            <text x={padding.left - 8} y={padding.top + plotH / 2 + 4} fill="#53504a" fontSize="9" fontWeight="bold" textAnchor="end" fontFamily="monospace">
              {(maxRadiance / 2).toFixed(2)}
            </text>
            <text x={padding.left - 8} y={padding.top + plotH} fill="#53504a" fontSize="9" fontWeight="bold" textAnchor="end" fontFamily="monospace">
              0
            </text>

            {/* INSAT Spectral Band Regions */}
            {INSAT_IMAGER_CHANNELS.filter(c => c.centralWavelength >= 1.0).map((ch) => {
              const cx = toSvgX(ch.centralWavelength);
              const isSelected = ch.id === selectedChannelId;
              return (
                <g key={ch.id} onClick={() => setSelectedChannelId(ch.id)} className="cursor-pointer">
                  {/* Vertical bar */}
                  <line
                    x1={cx}
                    y1={padding.top}
                    x2={cx}
                    y2={padding.top + plotH}
                    stroke={ch.primaryColor}
                    strokeWidth={isSelected ? 2.5 : 1}
                    strokeDasharray={isSelected ? undefined : '3 2'}
                  />
                  <rect
                    x={cx - 15}
                    y={padding.top + 3}
                    width={30}
                    height={15}
                    rx="3"
                    fill="#fffdf8"
                    stroke={ch.primaryColor}
                    strokeWidth={isSelected ? 2 : 1}
                    filter="drop-shadow(1px 1px 0 rgba(0,0,0,0.1))"
                  />
                  <text
                    x={cx}
                    y={padding.top + 14}
                    fill={ch.primaryColor}
                    fontSize="8"
                    fontWeight="black"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {ch.shortName.split(' ')[0]}
                  </text>
                </g>
              );
            })}

            {/* Wien peak vertical dotted line */}
            {peakWavelength >= 1.0 && peakWavelength <= 20.0 && (
              <line
                x1={toSvgX(peakWavelength)}
                y1={toSvgY(planckRadiance(peakWavelength, temperature) * emissivity)}
                x2={toSvgX(peakWavelength)}
                y2={padding.top + plotH}
                stroke="#e11d48"
                strokeWidth="1.5"
                strokeDasharray="3 2"
              />
            )}

            {/* Planck Radiance Fill and Curve */}
            <path
              d={`${pathD} L ${toSvgX(20)} ${padding.top + plotH} L ${toSvgX(1)} ${padding.top + plotH} Z`}
              fill="#8a3c8f"
              fillOpacity="0.12"
            />
            <path d={pathD} fill="none" stroke="#8a3c8f" strokeWidth="2.5" />

            {/* Selected Channel Measurement Dot */}
            <circle
              cx={toSvgX(selectedChannel.centralWavelength)}
              cy={toSvgY(channelRadiance)}
              r="6"
              fill={selectedChannel.primaryColor}
              stroke="#2a2825"
              strokeWidth="2"
            />
          </svg>

          {/* X axis label */}
          <div className="text-center text-xs text-[#53504a] font-mono mt-1 font-bold">
            Wavelength λ (micrometres, µm)
          </div>
        </div>

        {/* Interactive Controls & Physics Readouts */}
        <div className="lg:col-span-4 space-y-3.5">
          {/* Temperature Slider */}
          <div className="bg-[#f4f1ea] border-2 border-[#2a2825] p-3.5 rounded-xl shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
            <div className="flex justify-between items-center text-xs font-mono mb-1.5">
              <span className="text-[#53504a] font-bold flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-[#e11d48]" />
                Physical Temperature (T):
              </span>
              <span className="text-[#e11d48] font-black text-sm bg-white px-1.5 py-0.5 rounded border border-[#2a2825]">
                {temperature} K ({(temperature - 273.15).toFixed(1)}°C)
              </span>
            </div>
            <input
              type="range"
              min="180"
              max="330"
              step="1"
              value={temperature}
              onChange={(e) => setTemperature(parseInt(e.target.value))}
              className="w-full accent-[#e11d48] cursor-pointer h-2 bg-[#dcd7cb] rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-[#53504a] font-mono mt-1 font-bold">
              <span>180 K (Cirrus)</span>
              <span>273 K (0°C)</span>
              <span>330 K (Desert)</span>
            </div>
          </div>

          {/* Emissivity Slider */}
          <div className="bg-[#f4f1ea] border-2 border-[#2a2825] p-3.5 rounded-xl shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
            <div className="flex justify-between items-center text-xs font-mono mb-1.5">
              <span className="text-[#53504a] font-bold">Surface Emissivity (ε):</span>
              <span className="text-[#10508f] font-black text-sm bg-white px-1.5 py-0.5 rounded border border-[#2a2825]">
                {emissivity.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="0.30"
              max="1.00"
              step="0.01"
              value={emissivity}
              onChange={(e) => setEmissivity(parseFloat(e.target.value))}
              className="w-full accent-[#10508f] cursor-pointer h-2 bg-[#dcd7cb] rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-[#53504a] font-mono mt-1 font-bold">
              <span>0.30 (Thin Cloud)</span>
              <span>1.00 (Ideal Blackbody)</span>
            </div>
          </div>

          {/* Telemetry Computed Inversion */}
          <div className="bg-[#f4f1ea] border-2 border-[#2a2825] p-3.5 rounded-xl space-y-2 text-xs font-mono shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
            <div className="text-[#10508f] font-black border-b border-[#b9b3a8] pb-1 uppercase tracking-wider flex items-center justify-between">
              <span>Channel Inversion Probe</span>
              <span style={{ color: selectedChannel.primaryColor }} className="font-bold">{selectedChannel.shortName}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-[#53504a]">Emitted Radiance L_λ:</span>
              <span className="text-[#1d1c19] font-bold">{channelRadiance} W/(m²·sr·µm)</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-[#53504a]">Wien Peak λ_max:</span>
              <span className="text-[#8a3c8f] font-bold">{peakWavelength} µm</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-[#53504a]">Stefan-Boltzmann Flux F:</span>
              <span className="text-[#b45309] font-bold">{totalFlux} W/m²</span>
            </div>
            <div className="flex justify-between pt-1.5 border-t border-[#b9b3a8] items-center bg-[#e2f3e7] px-2 py-1 rounded border border-[#1b6b3c]/40">
              <span className="text-[#1b6b3c] font-black">Brightness Temp (Tb):</span>
              <span className="text-[#1b6b3c] font-black text-sm">
                {brightnessTemperature} K ({(brightnessTemperature - 273.15).toFixed(1)}°C)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Eureka callout */}
      <div className="mt-4 p-3.5 bg-[#fdf6dd] border-2 border-[#2a2825] rounded-xl text-xs text-[#1d1c19] leading-relaxed font-sans flex items-start gap-2.5 shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
        <Info className="w-5 h-5 text-[#b45309] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#b45309] font-black uppercase tracking-wide mr-1">The Crucial Insight:</strong>
          <span>
            Drag the emissivity slider down to <strong>0.70</strong> while keeping the physical temperature at <strong>300 K</strong>. Notice what happens! The physical temperature is warm (300 K / +27°C), but because the object does not emit as an ideal blackbody (&epsilon; &lt; 1), INSAT receives less radiance and inverts it to a colder <strong>Brightness Temperature (Tb &approx; 287 K)</strong>! This is why thin cirrus clouds look colder than they really are, and why water vapor in the atmosphere depresses satellite brightness temperatures.
          </span>
        </div>
      </div>
    </div>
  );
};
