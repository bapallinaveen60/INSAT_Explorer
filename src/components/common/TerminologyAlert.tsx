import React from 'react';

interface TerminologyAlertProps {
  term: string;
  definition: string;
  pitfall: string;
}

export const TerminologyAlert: React.FC<TerminologyAlertProps> = ({
  term,
  definition,
  pitfall
}) => {
  return (
    <div className="my-5 p-4 rounded-xl border-2 border-[#d6197f] bg-[#fdf0f6] shadow-[3px_3px_0_rgba(214,25,127,0.12)]">
      <div className="font-bam text-base md:text-lg text-[#d6197f] tracking-wide uppercase mb-1.5 flex items-center gap-2">
        <span>TERMINOLOGY ALERT!!!</span>
      </div>
      <div className="text-[#1d1c19] text-sm md:text-[15px] font-bold mb-1">
        {term}
      </div>
      <p className="text-[#2a2825] text-sm leading-relaxed mb-2">
        {definition}
      </p>
      <div className="text-xs text-[#831843] bg-[#fce7f3] border-l-3 border-[#d6197f] pl-2.5 py-1.5 font-mono font-medium rounded-r">
        {pitfall}
      </div>
    </div>
  );
};
