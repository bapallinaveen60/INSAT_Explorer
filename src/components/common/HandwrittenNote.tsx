import React from 'react';

interface HandwrittenNoteProps {
  prefix?: string;
  children: React.ReactNode;
}

export const HandwrittenNote: React.FC<HandwrittenNoteProps> = ({
  prefix = 'Psst!',
  children
}) => {
  return (
    <div className="my-3 text-[#d6197f] dark:text-[#f472b6] font-hand text-lg md:text-xl font-bold leading-snug">
      <span className="italic mr-1.5">{prefix}</span>
      <span className="text-[#53504a] dark:text-[#fde047]">{children}</span>
    </div>
  );
};
