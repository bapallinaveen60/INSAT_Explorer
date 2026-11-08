import React, { useState, useMemo } from 'react';
import { Wind, Compass, Play, Pause, ShieldCheck } from 'lucide-react';

export const AmvSimulator: React.FC = () => {
  const [frameIndex, setFrameIndex] = useState<0 | 1 | 2>(1); // t-30m (0), t (1), t+30m (2)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [cloudLevel, setCloudLevel] = useState<'high' | 'mid' | 'low'>('high');

  // Velocity parameters for the cloud tracer
  const velocityProps = useMemo(() => {
    if (cloudLevel === 'high') {
      return { u: 28.5, v: -4.2, p: 200, tb: 212, label: 'Upper-Tropospheric Jet (200 hPa)' };
    } else if (cloudLevel === 'mid') {
      return { u: 14.0, v: 8.5, p: 500, tb: 250, label: 'Mid-Level Monsoon Flow (500 hPa)' };
    } else {
      return { u: 18.2, v: 12.0, p: 850, tb: 282, label: 'Low-Level Somali Jet (850 hPa)' };
    }
  }, [cloudLevel]);

  // Total speed and meteorological direction
  const speedMs = +(Math.sqrt(velocityProps.u ** 2 + velocityProps.v ** 2)).toFixed(1);
  const speedKnots = +(speedMs * 1.94384).toFixed(1);
  const windDirDeg = +((Math.atan2(-velocityProps.u, -velocityProps.v) * 180) / Math.PI + 360) % 360;

  // Pixel displacement in 30 minutes (1800 seconds)
  const dxPerFrame = +(velocityProps.u * 1800 / 4000).toFixed(1);
  const dyPerFrame = +(velocityProps.v * 1800 / 4000).toFixed(1);

  // Cloud position in SVG space (400x280)
  const baseCX = 180;
  const baseCY = 140;
  const frameOffset = frameIndex - 1; // -1, 0, 1
  const cloudX = baseCX + frameOffset * dxPerFrame * 4;
  const cloudY = baseCY + frameOffset * dyPerFrame * 4;

  // Auto animation
  React.useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setFrameIndex(prev => (prev === 2 ? 0 : (prev + 1) as 0 | 1 | 2));
    }, 800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="bg-[#fffdf8] border-2 border-[#2a2825] rounded-2xl p-5 shadow-[3px_3px_0_rgba(42,40,37,0.15)] my-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b-2 border-[#b9b3a8]/60 pb-3 mb-4 gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-md bg-[#8a3c8f] text-white text-xs font-mono font-bold uppercase tracking-wider border border-[#2a2825]">
            Now You Try It
          </span>
          <h4 className="text-sm md:text-base font-black text-[#1d1c19] flex items-center gap-1.5 font-mono">
            <Wind className="w-4 h-4 text-[#8a3c8f]" />
            Atmospheric Motion Vector (AMV) Cloud Tracking
          </h4>
        </div>

        {/* Playback & Frame Selector */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#8a3c8f] hover:bg-[#722d76] text-white text-xs font-mono font-bold transition-all cursor-pointer border border-[#2a2825] shadow-[1px_1px_0_#2a2825]"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause' : 'Animate Triplet'}</span>
          </button>
          <div className="flex bg-[#f4f1ea] rounded-md p-0.5 border border-[#2a2825]">
            {[0, 1, 2].map(f => (
              <button
                key={f}
                onClick={() => {
                  setIsPlaying(false);
                  setFrameIndex(f as any);
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer transition-all ${
                  frameIndex === f ? 'bg-[#10508f] text-white font-bold' : 'text-[#53504a] hover:text-[#1d1c19]'
                }`}
              >
                {f === 0 ? 't-30m' : f === 1 ? 't (Center)' : 't+30m'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* SVG Tracker Canvas */}
        <div className="lg:col-span-7 bg-[#faf8f2] border-2 border-[#2a2825] rounded-xl p-3 relative shadow-inner">
          <div className="flex justify-between items-center text-xs font-mono text-[#53504a] mb-1 font-bold">
            <span>Tracking Window: 32×32 km Target Area</span>
            <span className="text-[#8a3c8f]">Time: {frameIndex === 0 ? '-30 min' : frameIndex === 1 ? '00 min' : '+30 min'}</span>
          </div>

          <svg viewBox="0 0 400 280" className="w-full bg-[#ffffff] rounded-lg border-2 border-[#2a2825] select-none font-sans">
            {/* Grid coordinate lines */}
            {[50, 100, 150, 200, 250, 300, 350].map(x => (
              <line key={x} x1={x} y1="0" x2={x} y2="280" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2 3" />
            ))}
            {[50, 100, 150, 200, 250].map(y => (
              <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2 3" />
            ))}

            {/* Ghost Positions from previous/next frames */}
            <circle cx={baseCX - dxPerFrame * 4} cy={baseCY - dyPerFrame * 4} r="25" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx={baseCX + dxPerFrame * 4} cy={baseCY + dyPerFrame * 4} r="25" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Cloud Tracer Feature at Current Frame Position */}
            <g transform={`translate(${cloudX}, ${cloudY})`}>
              <ellipse rx="34" ry="24" fill="#38bdf8" fillOpacity="0.3" stroke="#0284c7" strokeWidth="1" />
              <ellipse rx="22" ry="16" fill="#38bdf8" fillOpacity="0.6" stroke="#0284c7" strokeWidth="1.2" />
              <circle r="10" fill="#ffffff" stroke="#2a2825" strokeWidth="1.5" />
              <rect x="-45" y="-38" width="90" height="15" fill="#fffdf8" stroke="#2a2825" strokeWidth="1" rx="3" />
              <text x="0" y="-27" fill="#10508f" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                Tracer Tb = {velocityProps.tb} K
              </text>
            </g>

            {/* Cross-Correlation Search Box */}
            <rect
              x={baseCX - 40}
              y={baseCY - 40}
              width="80"
              height="80"
              fill="none"
              stroke="#8a3c8f"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
            <text x={baseCX - 38} y={baseCY - 44} fill="#8a3c8f" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
              Cross-Correlation Search Area
            </text>

            {/* Derived Wind Vector Arrow */}
            <line
              x1={baseCX - dxPerFrame * 4}
              y1={baseCY - dyPerFrame * 4}
              x2={baseCX + dxPerFrame * 4}
              y2={baseCY + dyPerFrame * 4}
              stroke="#16a34a"
              strokeWidth="3"
              markerEnd="url(#arrowGreen)"
            />

            <defs>
              <marker id="arrowGreen" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#16a34a" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* Telemetry and Controls */}
        <div className="lg:col-span-5 space-y-3.5">
          {/* Cloud Height Regime Selector */}
          <div className="bg-[#f4f1ea] border-2 border-[#2a2825] p-3 rounded-xl shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
            <div className="text-xs font-mono text-[#53504a] font-bold mb-2">Select Tracer Atmospheric Level:</div>
            <div className="grid grid-cols-3 gap-1.5">
              {(['high', 'mid', 'low'] as const).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setCloudLevel(lvl)}
                  className={`p-1.5 rounded-md text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                    cloudLevel === lvl
                      ? 'bg-[#10508f] text-white border-[#2a2825] shadow-[1px_1px_0_#2a2825]'
                      : 'bg-white text-[#53504a] border-[#b9b3a8] hover:border-[#2a2825] hover:text-[#1d1c19]'
                  }`}
                >
                  {lvl} Level
                </button>
              ))}
            </div>
            <div className="text-[11px] text-[#8a3c8f] font-mono mt-2 font-bold">
              {velocityProps.label}
            </div>
          </div>

          {/* AMV Mathematical Retrieval Readout */}
          <div className="bg-[#f4f1ea] border-2 border-[#2a2825] p-3.5 rounded-xl space-y-2 text-xs font-mono shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
            <div className="text-[#10508f] font-black border-b border-[#b9b3a8] pb-1 uppercase tracking-wider flex items-center justify-between">
              <span>Derived Vector Telemetry</span>
              <span className="text-[#16a34a] font-bold bg-[#e2f3e7] px-1.5 py-0.5 rounded border border-[#16a34a]/40">QI: 0.94 (High)</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-[#53504a]">Target Brightness Temp:</span>
              <span className="text-[#1d1c19] font-bold">{velocityProps.tb} K</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-[#53504a]">Assigned Pressure Level:</span>
              <span className="text-[#8a3c8f] font-black">{velocityProps.p} hPa</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-[#53504a]">Frame Displacement (Δx, Δy):</span>
              <span className="text-[#1d1c19] font-bold">{dxPerFrame * 2} px, {dyPerFrame * 2} px / 30m</span>
            </div>
            <div className="flex justify-between py-0.5 border-t border-[#b9b3a8]">
              <span className="text-[#53504a]">Zonal & Meridional (u, v):</span>
              <span className="text-[#1d1c19] font-bold">{velocityProps.u} m/s, {velocityProps.v} m/s</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-[#16a34a] font-black">Retrieved Wind Speed:</span>
              <span className="text-[#16a34a] font-black text-sm">{speedMs} m/s ({speedKnots} knots)</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-[#53504a]">Wind Direction:</span>
              <span className="text-[#10508f] font-bold">{Math.round(windDirDeg)}°</span>
            </div>
          </div>
        </div>
      </div>

      {/* Insight */}
      <div className="mt-4 p-3.5 bg-[#fdf6dd] border-2 border-[#2a2825] rounded-xl text-xs text-[#1d1c19] leading-relaxed font-sans flex items-start gap-2.5 shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
        <ShieldCheck className="w-5 h-5 text-[#b45309] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#b45309] font-black uppercase tracking-wide mr-1">Height Assignment is the Hardest Part:</strong>
          <span>
            Tracking the cloud displacement is simple geometry. The real challenge is: <em>at what altitude is that wind blowing?</em> If you assign a 200 hPa jet streak to 850 hPa, your numerical weather model will produce disastrous forecasts! INSAT uses the 10.8 µm brightness temperature collocated with numerical forecast temperature profiles, complemented by the 6.8 µm Water Vapour intercept method, to pin the vector to its exact vertical pressure level.
          </span>
        </div>
      </div>
    </div>
  );
};
