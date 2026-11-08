import React, { useState } from 'react';
import { GpiSimulator } from '../simulators/GpiSimulator';
import { ImsraSimulator } from '../simulators/ImsraSimulator';
import { CloudMaskSimulator } from '../simulators/CloudMaskSimulator';
import { AmvSimulator } from '../simulators/AmvSimulator';
import { Cpu, CloudRain, Cloud, Wind, Eye } from 'lucide-react';
import { KaTeXMath } from '../common/KaTeXMath';

export const AlgorithmLabView: React.FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<'gpi' | 'imsra' | 'cloud-mask' | 'amv' | 'sst-fog'>('imsra');

  return (
    <div className="min-h-screen bg-[#faf8f2] text-[#1d1c19] py-6 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-[#10508f] border-2 border-[#2a2825] rounded-2xl p-6 text-white shadow-[3px_3px_0_rgba(42,40,37,0.15)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-blue-200 font-mono text-xs font-bold uppercase tracking-wider mb-1">
                <Cpu className="w-4 h-4 text-white" />
                ISRO Level-2 Geophysical Algorithm Suite
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white">
                The Algorithm Laboratory
              </h1>
              <p className="text-xs md:text-sm text-blue-100 mt-1 max-w-3xl leading-relaxed font-medium">
                Step inside the computational heart of INSAT-3D. Explore the exact algorithms documented in the official ATBD — from historical empirical rainfall indices (GPI) to modern multi-spectral lifecycle models (IMSRA), operational cloud masks, and wind vector trackers.
              </p>
            </div>

            {/* Algorithm Switcher Tabs */}
            <div className="flex flex-wrap gap-1.5 bg-white/10 p-1.5 rounded-xl border border-white/30 backdrop-blur-xs font-mono text-xs">
              <button
                onClick={() => setSelectedAlgorithm('imsra')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer border ${
                  selectedAlgorithm === 'imsra' ? 'bg-[#fffdf8] text-[#10508f] border-[#2a2825] shadow-[2px_2px_0_#2a2825]' : 'text-blue-100 hover:text-white border-transparent'
                }`}
              >
                <CloudRain className="w-3.5 h-3.5" />
                <span>IMSRA Rain</span>
              </button>
              <button
                onClick={() => setSelectedAlgorithm('gpi')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer border ${
                  selectedAlgorithm === 'gpi' ? 'bg-[#8a3c8f] text-white border-[#2a2825] shadow-[2px_2px_0_#2a2825]' : 'text-blue-100 hover:text-white border-transparent'
                }`}
              >
                <CloudRain className="w-3.5 h-3.5" />
                <span>GPI Rain</span>
              </button>
              <button
                onClick={() => setSelectedAlgorithm('cloud-mask')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer border ${
                  selectedAlgorithm === 'cloud-mask' ? 'bg-[#1b6b3c] text-white border-[#2a2825] shadow-[2px_2px_0_#2a2825]' : 'text-blue-100 hover:text-white border-transparent'
                }`}
              >
                <Cloud className="w-3.5 h-3.5" />
                <span>Cloud Mask</span>
              </button>
              <button
                onClick={() => setSelectedAlgorithm('amv')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer border ${
                  selectedAlgorithm === 'amv' ? 'bg-[#0284c7] text-white border-[#2a2825] shadow-[2px_2px_0_#2a2825]' : 'text-blue-100 hover:text-white border-transparent'
                }`}
              >
                <Wind className="w-3.5 h-3.5" />
                <span>AMV Winds</span>
              </button>
              <button
                onClick={() => setSelectedAlgorithm('sst-fog')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer border ${
                  selectedAlgorithm === 'sst-fog' ? 'bg-[#b45309] text-white border-[#2a2825] shadow-[2px_2px_0_#2a2825]' : 'text-blue-100 hover:text-white border-transparent'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>SST & Fog</span>
              </button>
            </div>
          </div>
        </div>

        {/* Selected Algorithm Simulator */}
        {selectedAlgorithm === 'imsra' && <ImsraSimulator />}
        {selectedAlgorithm === 'gpi' && <GpiSimulator />}
        {selectedAlgorithm === 'cloud-mask' && <CloudMaskSimulator />}
        {selectedAlgorithm === 'amv' && <AmvSimulator />}

        {selectedAlgorithm === 'sst-fog' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sea Surface Temperature (SST) Card */}
              <div className="bg-[#fffdf8] border-2 border-[#2a2825] rounded-2xl p-5 space-y-4 shadow-[3px_3px_0_rgba(42,40,37,0.15)]">
                <div className="text-[#10508f] font-mono font-black text-xs uppercase tracking-wider flex items-center justify-between">
                  <span>Sea Surface Temperature (SST) Retrieval</span>
                  <span className="text-[10px] text-[#53504a]">ATBD Chapter 5</span>
                </div>
                <h3 className="text-lg font-black text-[#1d1c19]">Multi-Channel SST (MCSST / NLSST)</h3>
                <p className="text-xs text-[#53504a] leading-relaxed font-medium">
                  Water vapor continuum absorbs thermal radiation. To recover true sea surface skin temperature through humid tropical atmospheres over the Bay of Bengal and Arabian Sea, the split-window difference (T11 - T12) acts as an atmospheric transmission corrector:
                </p>
                <div className="p-3 bg-[#f4f1ea] rounded-xl border border-[#2a2825] overflow-x-auto text-center">
                  <KaTeXMath
                    math="SST = a_0 + a_1 T_{11} + a_2 (T_{11} - T_{12}) + a_3 (T_{11} - T_{12})(\sec\theta - 1)"
                    block={true}
                    className="text-[#1d1c19] text-xs"
                  />
                </div>
                <div className="p-3 bg-[#f4f1ea] rounded-xl border border-[#2a2825] text-[11px] text-[#53504a] space-y-1 font-medium">
                  <div>&bull; &theta;: Satellite Zenith Angle (limb path correction)</div>
                  <div>&bull; Clear sky condition verified by Cloud Mask before calculation</div>
                  <div>&bull; Validated against moored ocean buoys (RAMA / INCOIS network)</div>
                </div>
              </div>

              {/* Nighttime Fog Detection Card */}
              <div className="bg-[#fffdf8] border-2 border-[#2a2825] rounded-2xl p-5 space-y-4 shadow-[3px_3px_0_rgba(42,40,37,0.15)]">
                <div className="text-[#b45309] font-mono font-black text-xs uppercase tracking-wider flex items-center justify-between">
                  <span>Nighttime Fog & Low Stratus</span>
                  <span className="text-[10px] text-[#53504a]">ATBD Chapter 17</span>
                </div>
                <h3 className="text-lg font-black text-[#1d1c19]">The (BT11 - BT3.9) Emissivity Difference</h3>
                <p className="text-xs text-[#53504a] leading-relaxed font-medium">
                  During winter over the Indo-Gangetic Plains (Delhi, Punjab, Uttar Pradesh), dense radiation fog forms near the surface. In single-channel infrared (10.8 µm), fog is almost invisible because its temperature is nearly identical to ground temperature!
                </p>
                <div className="p-3 bg-[#f4f1ea] rounded-xl border border-[#2a2825] overflow-x-auto text-center">
                  <KaTeXMath
                    math="\Delta T_{\text{fog}} = BT_{11} - BT_{3.9} > 3.0\text{ K at night}"
                    block={true}
                    className="text-[#1d1c19] text-xs"
                  />
                </div>
                <div className="p-3 bg-[#f4f1ea] rounded-xl border border-[#2a2825] text-[11px] text-[#53504a] space-y-1 font-medium">
                  <div>&bull; Water droplet emissivity at 3.9 µm &approx; 0.70 vs 10.8 µm &approx; 0.98</div>
                  <div>&bull; Reduced 3.9 µm emission makes fog appear colder in MIR at night</div>
                  <div>&bull; Yields positive difference (BT11 - BT3.9) &gt; 0, lighting up fog like a beacon!</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
