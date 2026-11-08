import React from 'react';

interface SplatCalloutProps {
  level?: 'SPLAT!!!' | 'DOUBLE SPLAT!!!' | 'TRIPLE SPLAT!!!';
  summary: string;
}

export const SplatCallout: React.FC<SplatCalloutProps> = ({
  level = 'SPLAT!!!',
  summary
}) => {
  return (
    <div className="my-5 p-4 rounded-xl border-2 border-[#d6197f] bg-[#fdf0f6] shadow-[3px_3px_0_rgba(214,25,127,0.15)]">
      <div className="splat-text text-2xl md:text-3xl font-extrabold text-[#d6197f] mb-2 select-none">
        {level}
      </div>
      <p className="text-[#1d1c19] text-sm md:text-[15px] font-semibold leading-relaxed">
        {summary}
      </p>
    </div>
  );
};
