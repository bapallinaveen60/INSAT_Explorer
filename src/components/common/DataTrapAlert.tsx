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
    <div className="my-5 p-4 rounded-xl border-2 border-[#b2342c] dark:border-[#ef4444] bg-[#fff5f5] dark:bg-[#3b0d0c] shadow-[3px_3px_0_rgba(178,52,44,0.12)] transition-colors">
      <div className="font-bam text-base md:text-lg text-[#b2342c] dark:text-[#f87171] tracking-wide uppercase mb-1.5 flex items-center justify-between">
        <span>A TRAP!!!</span>
        <span className="text-xs font-mono font-normal lowercase tracking-normal text-[#86817a] dark:text-[#fca5a5]">
          (watch your step)
        </span>
      </div>
      <div className="text-[#1d1c19] dark:text-[#fef2f2] text-sm md:text-[15px] font-bold mb-1">
        {title}
      </div>
      <p className="text-[#2a2825] dark:text-[#fee2e2] text-sm leading-relaxed mb-2 font-medium">
        {description}
      </p>
      {codeWarning && (
        <pre className="text-xs text-[#7f1d1d] dark:text-[#fca5a5] bg-[#fee2e2] dark:bg-[#220505] p-2.5 rounded-lg border border-[#fca5a5] dark:border-[#7f1d1d] font-mono overflow-x-auto">
          <code>{codeWarning}</code>
        </pre>
      )}
    </div>
  );
};
