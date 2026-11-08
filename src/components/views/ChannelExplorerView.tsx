import React from 'react';
import { SixChannelSandbox } from '../simulators/SixChannelSandbox';
import { Layers } from 'lucide-react';

export const ChannelExplorerView: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#faf8f2] text-[#1d1c19] py-6 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-[#10508f] border-2 border-[#2a2825] rounded-2xl p-6 text-white shadow-[3px_3px_0_rgba(42,40,37,0.15)]">
          <div className="flex items-center gap-2 text-blue-200 font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4 text-white" />
            INSAT-3D Multi-Spectral Comparison Laboratory
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            Channel Explorer & Pixel Telemetry
          </h1>
          <p className="text-xs md:text-sm text-blue-100 mt-1 max-w-3xl leading-relaxed font-medium">
            Compare all six channels of the VHRR imager side-by-side or using the interactive split slider. Inspect individual pixel radiances, test split-window differences (T10.8 - T12.0), and observe how the same geographic location changes its physical signature across the electromagnetic spectrum.
          </p>
        </div>

        <SixChannelSandbox />
      </div>
    </div>
  );
};
