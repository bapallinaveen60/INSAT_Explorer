import React, { useState } from 'react';
import { SelfCheckQuestion } from '../../types/course';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface ChapterSelfCheckProps {
  question: SelfCheckQuestion;
  onNext?: () => void;
}

export const ChapterSelfCheck: React.FC<ChapterSelfCheckProps> = ({ question, onNext }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasRevealed, setHasRevealed] = useState(false);

  const selectedOption = question.options.find(o => o.id === selectedOptionId);
  const correctOption = question.options.find(o => o.isCorrect);

  return (
    <div className="border-2 border-[#2a2825] bg-[#fffdf8] rounded-2xl p-6 shadow-[3px_3px_0_rgba(42,40,37,0.14)] mt-8">
      {/* Self-check header */}
      <div className="flex items-center justify-between border-b-2 border-[#b9b3a8] pb-3 mb-5">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#10508f]" />
          <h4 className="text-base md:text-lg font-black text-[#10508f] tracking-tight">
            Chapter Self-Check
          </h4>
        </div>
        <span className="text-xs font-mono text-[#86817a]">
          Read the question, commit, then check
        </span>
      </div>

      {/* The Question */}
      <div className="text-[#1d1c19] text-base md:text-[17px] font-bold mb-6 leading-relaxed">
        {question.question}
      </div>

      {/* Options list */}
      <div className="space-y-3 mb-6">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          let borderStyle = 'border-2 border-[#2a2825] hover:bg-[#eff1f4] bg-[#faf8f2]';
          let badgeStyle = 'border-2 border-[#2a2825] text-[#1d1c19] bg-[#ffffff]';

          if (hasRevealed) {
            if (option.isCorrect) {
              borderStyle = 'border-2 border-[#1c7a4a] bg-[#e9f5ec]';
              badgeStyle = 'border-2 border-[#1c7a4a] text-[#1c7a4a] bg-[#ffffff] font-black';
            } else if (isSelected && !option.isCorrect) {
              borderStyle = 'border-2 border-[#b2342c] bg-[#fff5f5]';
              badgeStyle = 'border-2 border-[#b2342c] text-[#b2342c] bg-[#ffffff] font-black';
            }
          } else if (isSelected) {
            borderStyle = 'border-2 border-[#10508f] bg-[#dceeff]';
            badgeStyle = 'border-2 border-[#10508f] text-[#10508f] bg-[#ffffff] font-black';
          }

          return (
            <button
              key={option.id}
              onClick={() => {
                setSelectedOptionId(option.id);
                setHasRevealed(true);
              }}
              className={`w-full text-left p-4 rounded-xl transition-all flex items-start gap-3.5 ${borderStyle} cursor-pointer group shadow-[2px_2px_0_rgba(42,40,37,0.08)]`}
            >
              <div
                className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-black transition-colors ${badgeStyle}`}
              >
                {option.id}
              </div>
              <div className="flex-1 text-sm md:text-[15px] font-semibold text-[#1d1c19] leading-snug pt-0.5">
                {option.text}
              </div>
              {hasRevealed && option.isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-[#1c7a4a] shrink-0" />
              )}
              {hasRevealed && isSelected && !option.isCorrect && (
                <XCircle className="w-5 h-5 text-[#b2342c] shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Answer Block (Matching Rain from Orbit style: "Answer: A. ...") */}
      {hasRevealed && correctOption && (
        <div className="p-4 rounded-xl border-2 border-[#1c7a4a] bg-[#e9f5ec] mb-4 text-xs md:text-sm leading-relaxed text-[#1d1c19]">
          <span className="font-black text-[#1c7a4a] mr-1.5">
            Answer: {correctOption.id}.
          </span>
          <span className="font-medium text-[#2a2825]">
            {correctOption.explanation}
          </span>
        </div>
      )}

      {/* Bottom Bar with Next Button */}
      {hasRevealed && onNext && (
        <div className="flex items-center justify-between pt-3 border-t border-[#b9b3a8]">
          <span className="font-hand text-lg text-[#53504a]">
            Ready for the next lesson?
          </span>
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#10508f] hover:bg-[#0c3f72] text-white font-bold text-xs font-mono transition-colors cursor-pointer shadow-[2px_2px_0_#2a2825]"
          >
            <span>Next Page</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
