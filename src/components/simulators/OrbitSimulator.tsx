import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Eye, Compass, Satellite, Sparkles } from 'lucide-react';

export const OrbitSimulator: React.FC = () => {
  const [hour, setHour] = useState<number>(12); // 0 - 24 hours
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [orbitMode, setOrbitMode] = useState<'geo' | 'leo' | 'both'>('both');
  const [showFootprint, setShowFootprint] = useState<boolean>(true);
  const [showRayPath, setShowRayPath] = useState<boolean>(true);

  // Playback timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setHour((prev) => (prev + 0.1 > 24 ? 0 : +(prev + 0.1).toFixed(1)));
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Angular calculations
  // Earth rotation: 360 deg in 24 hours = 15 deg/hr
  const earthAngle = (hour / 24) * 360;
  // Geostationary orbit: exactly in sync with Earth rotation
  const geoAngle = earthAngle;
  // LEO satellite (e.g. GPM at 442 km, ~93 min period): completes ~15.5 orbits in 24 hrs
  const leoAngle = ((hour * 60) / 93) * 360;

  // View parameters
  const cx = 280;
  const cy = 200;
  const earthR = 52; // Earth radius in SVG units (6,371 km)
  const geoR = 155; // Geostationary radius (42,164 km)
  const leoR = 64; // LEO radius (6,813 km)

  // Satellite positions
  const geoRad = ((geoAngle - 90) * Math.PI) / 180;
  const geoX = cx + geoR * Math.cos(geoRad);
  const geoY = cy + geoR * Math.sin(geoRad);

  const leoRad = ((leoAngle - 90) * Math.PI) / 180;
  const leoX = cx + leoR * Math.cos(leoRad);
  const leoY = cy + leoR * Math.sin(leoRad);

  // India marker on Earth surface (pointing at ~74°E sub-satellite longitude)
  const indiaRad = ((earthAngle - 90) * Math.PI) / 180;
  const indiaX = cx + earthR * Math.cos(indiaRad);
  const indiaY = cy + earthR * Math.sin(indiaRad);

  // Footprint tangents from INSAT to Earth
  const d = Math.sqrt((geoX - cx) ** 2 + (geoY - cy) ** 2);
  const angleToGeo = Math.atan2(geoY - cy, geoX - cx);
  const alpha = Math.acos(earthR / d); // Tangent angle

  const tan1X = cx + earthR * Math.cos(angleToGeo + alpha);
  const tan1Y = cy + earthR * Math.sin(angleToGeo + alpha);
  const tan2X = cx + earthR * Math.cos(angleToGeo - alpha);
  const tan2Y = cy + earthR * Math.sin(angleToGeo - alpha);

  return (
    <div className="bg-[#fffdf8] border-2 border-[#2a2825] rounded-2xl p-5 shadow-[3px_3px_0_rgba(42,40,37,0.15)] my-6">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between border-b-2 border-[#b9b3a8]/60 pb-3 mb-4 gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-md bg-[#8a3c8f] text-white text-xs font-mono font-bold uppercase tracking-wider border border-[#2a2825]">
            Now You Try It
          </span>
          <h4 className="text-sm md:text-base font-black text-[#1d1c19] flex items-center gap-1.5 font-mono">
            <Satellite className="w-4 h-4 text-[#8a3c8f]" />
            Geostationary (35,786 km) vs Low Earth Orbit (LEO)
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#8a3c8f] hover:bg-[#722d76] border-2 border-[#2a2825] text-white text-xs font-mono font-bold shadow-[2px_2px_0_#2a2825] transition-all cursor-pointer active:translate-y-0.5"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause' : 'Play 24h'}</span>
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setHour(12);
            }}
            className="p-1.5 rounded-lg bg-[#fffdf8] hover:bg-[#faf8f2] border-2 border-[#2a2825] text-[#1d1c19] text-xs shadow-[2px_2px_0_#2a2825] transition-all cursor-pointer active:translate-y-0.5"
            title="Reset to 12:00 UTC"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#10508f]" />
          </button>
        </div>
      </div>

      {/* Main interactive diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* SVG Orbital Canvas */}
        <div className="lg:col-span-8 bg-[#faf8f2] border-2 border-[#2a2825] rounded-xl p-2 relative overflow-hidden flex items-center justify-center shadow-inner">
          <svg viewBox="0 0 560 400" className="w-full max-h-[380px] select-none font-sans">
            {/* Subtle grid lines for book illustration feel */}
            <defs>
              <pattern id="paperGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="0.75" fill="#d5cfc4" />
              </pattern>
            </defs>
            <rect width="560" height="400" fill="url(#paperGrid)" />

            {/* Geostationary Orbit Ring (35,786 km) */}
            <circle
              cx={cx}
              cy={cy}
              r={geoR}
              fill="none"
              stroke="#10508f"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            <text x={cx} y={cy - geoR - 10} fill="#10508f" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              GEOSTATIONARY ORBIT (Altitude: 35,786 km &bull; Period: 23h 56m)
            </text>

            {/* LEO Orbit Ring (442 km, GPM-like) */}
            {(orbitMode === 'leo' || orbitMode === 'both') && (
              <circle
                cx={cx}
                cy={cy}
                r={leoR}
                fill="none"
                stroke="#1b6b3c"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
            )}

            {/* Observation Footprint Cone from INSAT */}
            {showFootprint && (
              <polygon
                points={`${geoX},${geoY} ${tan1X},${tan1Y} ${tan2X},${tan2Y}`}
                fill="#38bdf8"
                fillOpacity="0.18"
                stroke="#0284c7"
                strokeWidth="1"
                strokeDasharray="4 3"
              />
            )}

            {/* Earth Body */}
            <circle cx={cx} cy={cy} r={earthR} fill="#bae6fd" stroke="#0284c7" strokeWidth="2.5" />

            {/* Earth Continents schematic (India marker rotates with Earth) */}
            <g transform={`rotate(${earthAngle}, ${cx}, ${cy})`}>
              {/* Simplified India polygon */}
              <polygon
                points={`${cx},${cy - 24} ${cx - 14},${cy - 10} ${cx - 7},${cy + 16} ${cx + 10},${cy + 12} ${cx + 12},${cy - 6}`}
                fill="#86efac"
                stroke="#166534"
                strokeWidth="1.5"
              />
              <circle cx={cx} cy={cy - 24} r="3.5" fill="#e11d48" stroke="#ffffff" strokeWidth="1" />
              <text x={cx + 16} y={cy - 20} fill="#1d1c19" fontSize="9" fontWeight="bold" fontFamily="monospace">
                74°E (India)
              </text>

              {/* Equator and Meridian axes */}
              <line x1={cx - earthR} y1={cy} x2={cx + earthR} y2={cy} stroke="#0369a1" strokeWidth="0.8" strokeDasharray="2 2" />
              <line x1={cx} y1={cy - earthR} x2={cx} y2={cy + earthR} stroke="#0369a1" strokeWidth="0.8" strokeDasharray="2 2" />
            </g>

            {/* Day / Night Solar Terminator Shadow */}
            <path
              d={`M ${cx} ${cy - earthR} A ${earthR} ${earthR} 0 0 1 ${cx} ${cy + earthR} A ${earthR/2} ${earthR} 0 0 1 ${cx} ${cy - earthR}`}
              fill="rgba(42, 40, 37, 0.25)"
            />

            {/* Line of Sight Ray from INSAT to India */}
            {showRayPath && (
              <line
                x1={geoX}
                y1={geoY}
                x2={indiaX}
                y2={indiaY}
                stroke="#d6197f"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
            )}

            {/* INSAT Geostationary Spacecraft */}
            <g transform={`translate(${geoX}, ${geoY})`}>
              {/* Solar Panels (Gold wings with ink border) */}
              <rect x="-20" y="-4" width="10" height="8" fill="#facc15" stroke="#2a2825" strokeWidth="1.2" rx="1" />
              <rect x="10" y="-4" width="10" height="8" fill="#facc15" stroke="#2a2825" strokeWidth="1.2" rx="1" />
              {/* Main Cube Body */}
              <rect x="-6" y="-6" width="12" height="12" fill="#10508f" stroke="#2a2825" strokeWidth="1.5" rx="2" />
              {/* Antenna Dish */}
              <path d="M 0 0 L -5 9" stroke="#2a2825" strokeWidth="1.5" />
              <circle cx="-5" cy="9" r="3" fill="#ffffff" stroke="#2a2825" strokeWidth="1.2" />
              {/* Label */}
              <rect x="15" y="-12" width="140" height="20" fill="#fffdf8" stroke="#2a2825" strokeWidth="1" rx="4" filter="drop-shadow(1px 1px 0 rgba(0,0,0,0.1))" />
              <text x="20" y="2" fill="#10508f" fontSize="10" fontWeight="bold" fontFamily="monospace">
                INSAT-3D (Stationary)
              </text>
            </g>

            {/* LEO Satellite (Moving fast!) */}
            {(orbitMode === 'leo' || orbitMode === 'both') && (
              <g transform={`translate(${leoX}, ${leoY})`}>
                <circle r="5" fill="#15803d" stroke="#2a2825" strokeWidth="1.5" />
                <line x1="-7" y1="0" x2="7" y2="0" stroke="#16a34a" strokeWidth="2" />
                <rect x="10" y="-8" width="125" height="18" fill="#fffdf8" stroke="#2a2825" strokeWidth="1" rx="4" />
                <text x="14" y="4" fill="#15803d" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  LEO Polar (93 min orbit)
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Telemetry and Controls Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          {/* Time Scrubber */}
          <div className="bg-[#f4f1ea] border-2 border-[#2a2825] p-3.5 rounded-xl shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
            <div className="flex justify-between items-center text-xs font-mono mb-2 min-h-[30px]">
              <span className="text-[#53504a] font-bold shrink-0">Time Elapsed:</span>
              <span className="text-[#10508f] font-black text-sm bg-white px-2.5 py-0.5 rounded border border-[#2a2825] whitespace-nowrap tabular-nums min-w-[95px] text-center shrink-0 shadow-xs">
                {String(Math.floor(hour)).padStart(2, '0')}:{String(Math.round((hour % 1) * 60)).padStart(2, '0')} UTC
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="24"
              step="0.1"
              value={hour}
              onChange={(e) => setHour(parseFloat(e.target.value))}
              className="w-full accent-[#8a3c8f] cursor-pointer h-2 bg-[#dcd7cb] rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-[#53504a] font-mono mt-1 font-bold">
              <span>00:00 (Midnight)</span>
              <span>12:00 (Noon)</span>
              <span>24:00</span>
            </div>
          </div>

          {/* Readout Telemetry Box */}
          <div className="bg-[#f4f1ea] border-2 border-[#2a2825] p-3.5 rounded-xl space-y-2 text-xs font-mono shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
            <div className="text-[#10508f] font-black border-b border-[#b9b3a8] pb-1.5 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#10508f]" />
              Orbital Comparison Metrics
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-[#53504a]">INSAT Altitude:</span>
              <span className="text-[#10508f] font-bold">35,786 km</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-[#53504a]">Sub-satellite Longitude:</span>
              <span className="text-[#1b6b3c] font-bold">74.0°E / 82.0°E</span>
            </div>
            <div className="flex justify-between py-0.5 bg-[#e2f3e7] px-1.5 rounded border border-[#1b6b3c]/40">
              <span className="text-[#1b6b3c] font-bold">Relative Motion to India:</span>
              <span className="text-[#1b6b3c] font-black">0 km/h (LOCKED)</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-[#53504a]">LEO Polar Satellite:</span>
              <span className="text-[#b45309] font-bold">~27,000 km/h</span>
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="bg-[#f4f1ea] border-2 border-[#2a2825] p-3 rounded-xl space-y-2 text-xs font-mono shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[#1d1c19] font-bold">Show Footprint Cone:</span>
              <input
                type="checkbox"
                checked={showFootprint}
                onChange={(e) => setShowFootprint(e.target.checked)}
                className="accent-[#8a3c8f] w-4 h-4 cursor-pointer"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[#1d1c19] font-bold">Show Line of Sight:</span>
              <input
                type="checkbox"
                checked={showRayPath}
                onChange={(e) => setShowRayPath(e.target.checked)}
                className="accent-[#8a3c8f] w-4 h-4 cursor-pointer"
              />
            </label>
            <div className="flex items-center justify-between pt-1.5 border-t border-[#b9b3a8]">
              <span className="text-[#53504a] font-bold">Display Satellite:</span>
              <select
                value={orbitMode}
                onChange={(e) => setOrbitMode(e.target.value as any)}
                className="bg-white border-2 border-[#2a2825] text-[#1d1c19] text-xs rounded-md px-2 py-0.5 font-mono cursor-pointer font-bold"
              >
                <option value="both">Both (GEO + LEO)</option>
                <option value="geo">INSAT GEO Only</option>
                <option value="leo">LEO Polar Only</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Insight footer */}
      <div className="mt-4 p-3.5 bg-[#fdf6dd] border-2 border-[#2a2825] rounded-xl text-xs text-[#1d1c19] leading-relaxed font-sans flex items-start gap-2.5 shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
        <Eye className="w-5 h-5 text-[#b45309] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#b45309] font-black uppercase tracking-wide mr-1">Why this matters:</strong>
          <span>
            Notice how the LEO satellite rushes past India in just 10 minutes and won't return for 12 hours. A severe thunderstorm can explode, dump 100 mm of rain, and dissipate entirely while the polar satellite is on the other side of the planet! Only INSAT's geostationary vantage point can take a fresh scan every 30 minutes (and every 10 minutes in rapid-scan mode) without ever losing sight of the storm.
          </span>
        </div>
      </div>
    </div>
  );
};
