import React, { useState } from 'react';
import { INSAT_IMAGER_CHANNELS } from '../../data/channelsData';
import { Radio, Layers, Satellite, Zap, Info, ShieldAlert } from 'lucide-react';
import { SounderProfileSimulator } from '../simulators/SounderProfileSimulator';

export const SatelliteLabView: React.FC = () => {
  const [instrument, setInstrument] = useState<'imager' | 'sounder'>('imager');
  const [selectedChannelId, setSelectedChannelId] = useState<string>('tir1');

  const selectedChannel = INSAT_IMAGER_CHANNELS.find(c => c.id === selectedChannelId) || INSAT_IMAGER_CHANNELS[4];

  return (
    <div className="min-h-screen bg-[#faf8f2] text-[#1d1c19] py-6 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Lab Header */}
        <div className="bg-[#10508f] border-2 border-[#2a2825] rounded-2xl p-6 text-white shadow-[3px_3px_0_rgba(42,40,37,0.15)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-blue-200 font-mono text-xs font-bold uppercase tracking-wider mb-1">
                <Satellite className="w-4 h-4 text-white" />
                INSAT Satellite Instrumentation Bay
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white">
                VHRR Imager & 19-Channel Sounder
              </h1>
              <p className="text-xs md:text-sm text-blue-100 mt-1 max-w-2xl leading-relaxed">
                Inspect the electro-optical payload of INSAT-3D/3DR. Discover why each channel has its own spatial resolution, cooled detector technology, and specific atmospheric sensitivity.
              </p>
            </div>

            {/* Instrument Switcher */}
            <div className="flex items-center gap-1.5 bg-white/10 p-1.5 rounded-xl border border-white/30 backdrop-blur-xs">
              <button
                onClick={() => setInstrument('imager')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer border ${
                  instrument === 'imager'
                    ? 'bg-[#fffdf8] text-[#10508f] border-[#2a2825] shadow-[2px_2px_0_#2a2825]'
                    : 'text-blue-100 hover:text-white border-transparent'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>6-Channel VHRR Imager</span>
              </button>

              <button
                onClick={() => setInstrument('sounder')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer border ${
                  instrument === 'sounder'
                    ? 'bg-[#8a3c8f] text-white border-[#2a2825] shadow-[2px_2px_0_#2a2825]'
                    : 'text-blue-100 hover:text-white border-transparent'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span>19-Channel Sounder</span>
              </button>
            </div>
          </div>
        </div>

        {instrument === 'imager' ? (
          /* Imager View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Channel Selector Cards */}
            <div className="lg:col-span-5 space-y-2.5">
              <div className="text-xs font-mono text-[#53504a] font-bold uppercase tracking-wider mb-1 px-1">
                Select VHRR Channel (Documented Table 1)
              </div>
              {INSAT_IMAGER_CHANNELS.map((ch) => {
                const isSelected = ch.id === selectedChannelId;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setSelectedChannelId(ch.id)}
                    className={`w-full text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between group ${
                      isSelected
                        ? 'bg-[#fffdf8] border-[#2a2825] shadow-[3px_3px_0_#2a2825]'
                        : 'bg-white border-[#b9b3a8] hover:border-[#2a2825]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3.5 h-8 rounded-full border border-[#2a2825]"
                        style={{ backgroundColor: ch.primaryColor }}
                      />
                      <div>
                        <div className="text-sm font-black text-[#1d1c19]">
                          {ch.shortName}
                        </div>
                        <div className="text-xs text-[#53504a] font-mono font-bold">
                          {ch.wavelengthBand} &bull; {ch.spatialResolutionKm} km Resolution
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#f4f1ea] text-[#1d1c19] border border-[#2a2825] font-bold">
                      {ch.spectralRegion}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Channel Deep Dive */}
            <div className="lg:col-span-7 bg-[#fffdf8] border-2 border-[#2a2825] rounded-2xl p-6 space-y-4 shadow-[3px_3px_0_rgba(42,40,37,0.15)]">
              <div className="flex justify-between items-start border-b-2 border-[#b9b3a8] pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#e2f3e7] text-[#1b6b3c] border border-[#1b6b3c] font-bold">
                    Channel {selectedChannel.number} Detailed Dossier
                  </span>
                  <h2 className="text-xl font-black text-[#1d1c19] mt-1.5">
                    {selectedChannel.name} ({selectedChannel.centralWavelength} µm)
                  </h2>
                </div>
                <div className="text-right font-mono text-xs text-[#53504a]">
                  <div>Resolution: <strong className="text-[#10508f] font-black">{selectedChannel.spatialResolutionKm} km</strong></div>
                  <div>Bandwidth: {selectedChannel.wavelengthBand}</div>
                </div>
              </div>

              {/* Technical Specifications Matrix */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-[#f4f1ea] rounded-xl border-2 border-[#2a2825]">
                  <div className="text-[#53504a] font-bold">Detector Technology:</div>
                  <div className="text-[#1d1c19] font-black mt-0.5">{selectedChannel.detectorType}</div>
                </div>
                <div className="p-3 bg-[#f4f1ea] rounded-xl border-2 border-[#2a2825]">
                  <div className="text-[#53504a] font-bold">Principal Spectral Regime:</div>
                  <div className="text-[#1d1c19] font-black mt-0.5">{selectedChannel.principalAbsorberOrWindow}</div>
                </div>
              </div>

              {/* What It Sees */}
              <div className="p-3.5 bg-[#f4f1ea] rounded-xl border-2 border-[#2a2825] text-xs">
                <div className="text-[#10508f] font-mono font-black uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#10508f]" />
                  What the Channel Sees
                </div>
                <p className="text-[#1d1c19] font-medium leading-relaxed">{selectedChannel.whatItSees}</p>
              </div>

              {/* Physical Principle */}
              <div className="p-3.5 bg-[#f4f1ea] rounded-xl border-2 border-[#2a2825] text-xs">
                <div className="text-[#8a3c8f] font-mono font-black uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#8a3c8f]" />
                  Governing Physical Principle
                </div>
                <p className="text-[#1d1c19] font-medium leading-relaxed">{selectedChannel.physicalPrinciple}</p>
              </div>

              {/* Meteorological Applications */}
              <div className="space-y-1.5">
                <div className="text-xs font-mono font-black text-[#1d1c19] uppercase tracking-wider">
                  Key Meteorological Applications:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedChannel.meteorologicalApplications.map((app, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-white border-2 border-[#2a2825] text-[#1d1c19] font-medium flex items-start gap-2 shadow-[1px_1px_0_rgba(42,40,37,0.1)]">
                      <span className="text-[#16a34a] font-black">&#10003;</span>
                      <span>{app}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Limitations */}
              <div className="space-y-1.5 pt-3 border-t-2 border-[#b9b3a8]">
                <div className="text-xs font-mono font-black text-[#e11d48] uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#e11d48]" />
                  Physical Limitations & Traps:
                </div>
                <div className="space-y-1 text-xs text-[#991b1b] font-medium">
                  {selectedChannel.limitations.map((lim, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-[#e11d48] font-bold">&bull;</span>
                      <span>{lim}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Sounder View with Interactive Profile Simulator */
          <div className="space-y-6">
            <SounderProfileSimulator />
          </div>
        )}
      </div>
    </div>
  );
};
