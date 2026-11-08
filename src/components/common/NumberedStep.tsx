import React from 'react';

interface NumberedStepProps {
  number: number;
  title?: string;
  leadParagraph?: string;
  children?: React.ReactNode;
}

export const NumberedStep: React.FC<NumberedStepProps> = ({
  number,
  title,
  leadParagraph,
  children
}) => {
  return (
    <div className="relative border-2 border-[#2a2825] bg-[#fffdf8] rounded-xl p-5 mb-5 shadow-[3px_3px_0_rgba(42,40,37,0.12)]">
      <div className="flex items-start gap-4">
        {/* Circled Number Badge (Matching Rain from Orbit) */}
        <div className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full border-2 border-[#2a2825] bg-[#faf8f2] text-[#1d1c19] font-black text-sm">
          {number}
        </div>

        <div className="flex-1 min-w-0">
          {title && (
            <h3 className="text-base font-bold text-[#1d1c19] tracking-tight mb-2">
              {title}
            </h3>
          )}
          {leadParagraph && (
            <p className="text-[#2a2825] text-sm md:text-[15px] font-medium leading-relaxed mb-3">
              {leadParagraph}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};
