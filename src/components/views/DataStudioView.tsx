import React from 'react';
import { DataStudioInspector } from '../simulators/DataStudioInspector';
import { Terminal } from 'lucide-react';

export const DataStudioView: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#faf8f2] text-[#1d1c19] py-6 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-[#10508f] border-2 border-[#2a2825] rounded-2xl p-6 text-white shadow-[3px_3px_0_rgba(42,40,37,0.15)]">
          <div className="flex items-center gap-2 text-blue-200 font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <Terminal className="w-4 h-4 text-white" />
            ISRO MOSDAC Data Ingestion & Scientific Python Workflows
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            The Data Studio
          </h1>
          <p className="text-xs md:text-sm text-blue-100 mt-1 max-w-3xl leading-relaxed font-medium">
            Bridge the gap between theoretical algorithm equations and actual satellite files. Inspect the hierarchical HDF5 dataset structure, avoid the infamous <code className="bg-white/20 px-1 py-0.5 rounded text-amber-200 font-mono">-999.0</code> fill value trap, and copy production-ready Python scripts tested on real INSAT-3D/3DR granules.
          </p>
        </div>

        {/* Live Data Studio Component */}
        <DataStudioInspector />
      </div>
    </div>
  );
};
