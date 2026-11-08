import React from 'react';

interface DataTrapAlertProps {
  title: string;
  description: string;
  codeWarning?: string;
}

export const DataTrapAlert: React.FC<DataTrapAlertProps> = ({
  title,
  description,
  codeWarning
}) => {
  return (
    <div className="my-5 p-4 rounded-xl border-2 border-[#b2342c] bg-[#fff5f5] shadow-[3px_3px_0_rgba(178,52,44,0.12)]">
      <div className="font-bam text-base md:text-lg text-[#b2342c] tracking-wide uppercase mb-1.5 flex items-center justify-between">
        <span>A TRAP!!!</span>
        <span className="text-xs font-mono font-normal lowercase tracking-normal text-[#86817a]">
          (watch your step)
        </span>
      </div>
      <div className="text-[#1d1c19] text-sm md:text-[15px] font-bold mb-1">
        {title}
      </div>
      <p className="text-[#2a2825] text-sm leading-relaxed mb-2 font-medium">
        {description}
      </p>
      {codeWarning && (
        <pre className="text-xs text-[#7f1d1d] bg-[#fee2e2] p-2.5 rounded-lg border border-[#fca5a5] font-mono overflow-x-auto">
          <code>{codeWarning}</code>
        </pre>
      )}
    </div>
  );
};
