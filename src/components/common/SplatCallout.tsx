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
    <div className="my-5 p-4 rounded-xl border-2 border-[#d6197f] dark:border-[#ec4899] bg-[#fdf0f6] dark:bg-[#2b1227] shadow-[3px_3px_0_rgba(214,25,127,0.15)] transition-colors">
      <div className="splat-text text-2xl md:text-3xl font-extrabold text-[#d6197f] dark:text-[#f472b6] mb-2 select-none">
        {level}
      </div>
      <p className="text-[#1d1c19] dark:text-[#fdf2f8] text-sm md:text-[15px] font-semibold leading-relaxed">
        {summary}
      </p>
    </div>
  );
};
