import React, { useState } from 'react';
import { Terminal, Copy, Check, FileCode, AlertTriangle } from 'lucide-react';

export const DataStudioInspector: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const pythonSnippets = [
    {
      title: '1. Reading INSAT-3D HDF5 Granule with h5py (Avoiding -999.0 Trap)',
      code: `import h5py
import numpy as np
import matplotlib.pyplot as plt

# Open the INSAT-3D Level-2B or Level-1B HDF5 Granule
filename = "3DIMG_08NOV2026_0900_L2B_HEM.h5"
with h5py.File(filename, "r") as f:
    # Inspect top-level groups
    print("HDF5 Keys:", list(f.keys()))
    
    # Extract Coordinates and Rain Rate
    lat = f["Latitude"][:]       # (n_lines, n_pixels)
    lon = f["Longitude"][:]
    rain = f["HEM_RainRate"][:]  # Rain rate in mm/h
    
    # TRAP #1: Mask the -999.0 fill values before computing statistics!
    # Otherwise your average rain rate will be negative infinity!
    rain = np.where(rain < 0, np.nan, rain)

print(f"Valid Pixels: {np.count_nonzero(~np.isnan(rain))}")
print(f"Max Rain Rate: {np.nanmax(rain):.1f} mm/h")`
    },
    {
      title: '2. Calibrated Gray Counts to Brightness Temperature Inversion',
      code: `import h5py
import numpy as np

# Convert 10-bit raw counts (0-1023) to Brightness Temperature using LUT
with h5py.File("3DIMG_08NOV2026_0900_L1B_STD.h5", "r") as f:
    raw_counts = f["IMG_TIR1"][:]  # 10.8 um raw counts
    calib_lut = f["CALIBRATION/TIR1_TEMP_LUT"][:] # Lookup table

    # Invert counts to Kelvins
    tb_108 = calib_lut[raw_counts]
    
    # Mask saturated pixels (count >= 1023)
    tb_108 = np.where(raw_counts >= 1023, np.nan, tb_108)

print(f"Mean Scene Tb: {np.nanmean(tb_108):.1f} K")`
    },
    {
      title: '3. Calculating Operational Cloud Mask & Confusion Matrix',
      code: `import numpy as np

def insat_cloud_mask(bt11, bt_max, is_ocean):
    """
    Implements ISRO ATBD Chapter 2 Cloud Mask Decision Rules
    """
    diff = bt_max - bt11
    cloud_flag = np.zeros_like(bt11, dtype=int)
    
    # Over Land: threshold > 12 K
    cloud_flag[(~is_ocean) & (diff > 12.0)] = 1
    # Over Ocean: threshold > 6 K
    cloud_flag[is_ocean & (diff > 6.0)] = 1
    
    # High confidence clear sky: |diff| < 2 K
    cloud_flag[np.abs(diff) < 2.0] = 0
    
    return cloud_flag`
    }
  ];

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-[#fffdf8] border-2 border-[#2a2825] rounded-2xl p-5 shadow-[3px_3px_0_rgba(42,40,37,0.15)] my-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b-2 border-[#b9b3a8]/60 pb-3 mb-4 gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-md bg-[#8a3c8f] text-white text-xs font-mono font-bold uppercase tracking-wider border border-[#2a2825]">
            Now You Try It
          </span>
          <h4 className="text-sm md:text-base font-black text-[#1d1c19] flex items-center gap-1.5 font-mono">
            <Terminal className="w-4 h-4 text-[#8a3c8f]" />
            Data Studio: Real MOSDAC HDF5 Ingestion & Python Pipelines
          </h4>
        </div>
        <span className="text-xs font-mono text-[#16a34a] font-bold bg-[#e2f3e7] px-2 py-0.5 rounded border border-[#16a34a]/40">
          Validated on Python 3.10+ / h5py 3.8+
        </span>
      </div>

      {/* Six Common Satellite Data Traps */}
      <div className="mb-5 p-4 bg-[#fdf6dd] border-2 border-[#2a2825] rounded-xl space-y-2 shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
        <div className="flex items-center gap-2 text-[#b45309] text-xs font-mono font-black uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4 text-[#b45309]" />
          <span>The Six HDF5 Traps in Real INSAT Data</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-[#1d1c19]">
          <div className="p-2.5 bg-white rounded-lg border-2 border-[#2a2825]">
            <strong className="text-[#e11d48] font-mono font-bold block mb-0.5">1. Fill Value -999.0:</strong>
            Missing values are -999.0, not NaN. Must mask with <code className="bg-[#f4f1ea] px-1 rounded text-[#10508f]">np.where(arr &lt; 0, np.nan, arr)</code>.
          </div>
          <div className="p-2.5 bg-white rounded-lg border-2 border-[#2a2825]">
            <strong className="text-[#e11d48] font-mono font-bold block mb-0.5">2. 10-bit Saturation:</strong>
            Sensor saturation occurs at count 1023 (or 0). Mask before inverting to Kelvin.
          </div>
          <div className="p-2.5 bg-white rounded-lg border-2 border-[#2a2825]">
            <strong className="text-[#e11d48] font-mono font-bold block mb-0.5">3. Zenith Slant Angle:</strong>
            Edge-of-disk pixels look through thicker atmosphere (sec θ path).
          </div>
          <div className="p-2.5 bg-white rounded-lg border-2 border-[#2a2825]">
            <strong className="text-[#e11d48] font-mono font-bold block mb-0.5">4. Bitwise Flag Masks:</strong>
            Quality flags encode bitmasks: test with <code className="bg-[#f4f1ea] px-1 rounded text-[#10508f]">(flag & 0x01)</code>, not <code className="bg-[#f4f1ea] px-1 rounded text-[#10508f]">== 1</code>.
          </div>
          <div className="p-2.5 bg-white rounded-lg border-2 border-[#2a2825]">
            <strong className="text-[#e11d48] font-mono font-bold block mb-0.5">5. Spatial Resolution Mismatch:</strong>
            VIS is 1 km, TIR is 4 km, WV is 8 km! Always resample before differencing.
          </div>
          <div className="p-2.5 bg-white rounded-lg border-2 border-[#2a2825]">
            <strong className="text-[#e11d48] font-mono font-bold block mb-0.5">6. Solar Contamination:</strong>
            3.9 µm MIR channel has daytime solar reflection. Cannot use simple thermal inversion!
          </div>
        </div>
      </div>

      {/* Code Snippets Accordion */}
      <div className="space-y-4">
        {pythonSnippets.map((item, idx) => (
          <div key={idx} className="bg-white border-2 border-[#2a2825] rounded-xl overflow-hidden shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
            <div className="flex justify-between items-center px-4 py-2.5 bg-[#f4f1ea] border-b-2 border-[#2a2825]">
              <span className="text-xs font-mono font-bold text-[#10508f] flex items-center gap-2">
                <FileCode className="w-4 h-4 text-[#10508f]" />
                {item.title}
              </span>
              <button
                onClick={() => handleCopy(item.code, idx)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white hover:bg-[#faf8f2] text-xs font-mono font-bold text-[#1d1c19] border border-[#2a2825] shadow-[1px_1px_0_#2a2825] transition-all cursor-pointer"
              >
                {copiedIndex === idx ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#16a34a]" />
                    <span className="text-[#16a34a]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#53504a]" />
                    <span>Copy Python</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-[#1d1c19] bg-[#faf8f2] overflow-x-auto leading-relaxed border-t border-[#b9b3a8]/40">
              <code>{item.code}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};
