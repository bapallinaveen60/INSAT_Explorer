import React from 'react';
import { PlanckSimulator } from '../simulators/PlanckSimulator';
import { Flame, Sparkles, BookOpen } from 'lucide-react';
import { KaTeXMath } from '../common/KaTeXMath';

export const AtmosphericPhysicsLabView: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#faf8f2] text-[#1d1c19] py-6 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-[#10508f] border-2 border-[#2a2825] rounded-2xl p-6 text-white shadow-[3px_3px_0_rgba(42,40,37,0.15)]">
          <div className="flex items-center gap-2 text-blue-200 font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <Flame className="w-4 h-4 text-white" />
            Atmospheric Radiative Transfer & Planck Inversion
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            Atmospheric Physics Laboratory
          </h1>
          <p className="text-xs md:text-sm text-blue-100 mt-1 max-w-3xl leading-relaxed font-medium">
            Every satellite observation is governed by fundamental quantum physics. Experiment with blackbody radiation, Wien’s displacement law, and observe in real time how emissivity (&epsilon;) changes the measured Brightness Temperature (Tb).
          </p>
        </div>

        {/* Live Simulator */}
        <PlanckSimulator />

        {/* Theory Card: Planck Law and Inversion Formula */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-[#fffdf8] border-2 border-[#2a2825] rounded-2xl p-5 space-y-3 shadow-[3px_3px_0_rgba(42,40,37,0.15)]">
            <div className="flex items-center gap-2 text-[#10508f] font-mono text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#10508f]" />
              Planck’s Radiance Law
            </div>
            <div className="p-3 bg-[#f4f1ea] rounded-xl border border-[#2a2825] overflow-x-auto text-center">
              <KaTeXMath
                math="B_\lambda(T) = \frac{2 h c^2}{\lambda^5 \left( \exp\left(\frac{h c}{\lambda k_B T}\right) - 1 \right)}"
                block={true}
                className="text-[#1d1c19]"
              />
            </div>
            <p className="text-xs text-[#53504a] leading-relaxed font-medium">
              Describes the exact spectral radiance emitted by an ideal blackbody at physical temperature T (Kelvin) for a specific wavelength &lambda; (micrometres).
            </p>
          </div>

          <div className="bg-[#fffdf8] border-2 border-[#2a2825] rounded-2xl p-5 space-y-3 shadow-[3px_3px_0_rgba(42,40,37,0.15)]">
            <div className="flex items-center gap-2 text-[#8a3c8f] font-mono text-xs font-black uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-[#8a3c8f]" />
              Planck Inversion (Brightness Temp Tb)
            </div>
            <div className="p-3 bg-[#f4f1ea] rounded-xl border border-[#2a2825] overflow-x-auto text-center">
              <KaTeXMath
                math="T_b = B_\lambda^{-1}(L_\lambda) = \frac{h c}{k_B \lambda \ln\left(1 + \frac{2 h c^2}{\lambda^5 L_\lambda}\right)}"
                block={true}
                className="text-[#1d1c19]"
              />
            </div>
            <p className="text-xs text-[#53504a] leading-relaxed font-medium">
              When the satellite measures spectral radiance L_&lambda;, it inverts the Planck function assuming blackbody emissivity (&epsilon; = 1.0) to calculate the equivalent Brightness Temperature Tb.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
