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
    <div className="border-2 border-[#2a2825] dark:border-[#334155] bg-[#fffdf8] dark:bg-[#151e2e] rounded-2xl p-6 shadow-[3px_3px_0_rgba(42,40,37,0.14)] mt-8 transition-colors">
      {/* Self-check header */}
      <div className="flex items-center justify-between border-b-2 border-[#b9b3a8] dark:border-[#334155] pb-3 mb-5">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#10508f] dark:bg-[#38bdf8]" />
          <h4 className="text-base md:text-lg font-black text-[#10508f] dark:text-[#38bdf8] tracking-tight">
            Chapter Self-Check
          </h4>
        </div>
        <span className="text-xs font-mono text-[#86817a] dark:text-[#94a3b8]">
          Read the question, commit, then check
        </span>
      </div>

      {/* The Question */}
      <div className="text-[#1d1c19] dark:text-[#f8fafc] text-base md:text-[17px] font-bold mb-6 leading-relaxed">
        {question.question}
      </div>

      {/* Options list */}
      <div className="space-y-3 mb-6">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          let borderStyle = 'border-2 border-[#2a2825] dark:border-[#334155] hover:bg-[#eff1f4] dark:hover:bg-[#1e293b] bg-[#faf8f2] dark:bg-[#0f172a]';
          let badgeStyle = 'border-2 border-[#2a2825] dark:border-[#475569] text-[#1d1c19] dark:text-[#f8fafc] bg-[#ffffff] dark:bg-[#1a2538]';

          if (hasRevealed) {
            if (option.isCorrect) {
              borderStyle = 'border-2 border-[#1c7a4a] dark:border-[#10b981] bg-[#e9f5ec] dark:bg-[#064e3b]/50';
              badgeStyle = 'border-2 border-[#1c7a4a] dark:border-[#10b981] text-[#1c7a4a] dark:text-[#34d399] bg-[#ffffff] dark:bg-[#064e3b] font-black';
            } else if (isSelected && !option.isCorrect) {
              borderStyle = 'border-2 border-[#b2342c] dark:border-[#ef4444] bg-[#fff5f5] dark:bg-[#7f1d1d]/40';
              badgeStyle = 'border-2 border-[#b2342c] dark:border-[#ef4444] text-[#b2342c] dark:text-[#f87171] bg-[#ffffff] dark:bg-[#450a0a] font-black';
            }
          } else if (isSelected) {
            borderStyle = 'border-2 border-[#10508f] dark:border-[#38bdf8] bg-[#dceeff] dark:bg-[#0c4a6e]/50';
            badgeStyle = 'border-2 border-[#10508f] dark:border-[#38bdf8] text-[#10508f] dark:text-[#38bdf8] bg-[#ffffff] dark:bg-[#082f49] font-black';
          }

          return (
            <button
              key={option.id}
              onClick={() => {
                if (!hasRevealed) {
                  setSelectedOptionId(option.id);
                }
              }}
              className={`w-full text-left p-4 rounded-xl transition-all cursor-pointer flex items-start gap-3.5 shadow-[2px_2px_0_#2a2825] ${borderStyle}`}
            >
              <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono shrink-0 mt-0.5 ${badgeStyle}`}>
                {option.id.toUpperCase()}
              </div>
              <div className="flex-1 text-sm leading-relaxed">
                <span className="font-medium text-[#2a2825] dark:text-[#f1f5f9]">
                  {option.text}
                </span>
              </div>
              {hasRevealed && option.isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-[#1c7a4a] dark:text-[#34d399] shrink-0" />
              )}
              {hasRevealed && isSelected && !option.isCorrect && (
                <XCircle className="w-5 h-5 text-[#b2342c] dark:text-[#f87171] shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Action button */}
      <div className="flex items-center justify-between border-t-2 border-[#b9b3a8] dark:border-[#334155] pt-4">
        {!hasRevealed ? (
          <button
            onClick={() => {
              if (selectedOptionId) setHasRevealed(true);
            }}
            disabled={!selectedOptionId}
            className={`px-5 py-2.5 rounded-xl border-2 font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[2px_2px_0_#2a2825] ${
              selectedOptionId
                ? 'bg-[#10508f] text-white border-[#2a2825] hover:bg-[#0d4277] cursor-pointer'
                : 'bg-[#e5e0d3] dark:bg-[#334155] text-[#86817a] dark:text-[#64748b] border-[#b9b3a8] dark:border-[#475569] cursor-not-allowed'
            }`}
          >
            Check Answer
          </button>
        ) : (
          <div className="w-full">
            <div className={`p-4 rounded-xl border-2 mb-4 text-xs leading-relaxed ${
              selectedOption?.isCorrect
                ? 'border-[#1c7a4a] dark:border-[#10b981] bg-[#e9f5ec] dark:bg-[#064e3b]/40 text-[#1c7a4a] dark:text-[#a7f3d0]'
                : 'border-[#b2342c] dark:border-[#ef4444] bg-[#fff5f5] dark:bg-[#7f1d1d]/30 text-[#b2342c] dark:text-[#fecaca]'
            }`}>
              <div className="font-bold font-mono text-sm uppercase mb-1">
                {selectedOption?.isCorrect ? 'Correct!' : 'Not Quite!'}
              </div>
              <div>{selectedOption?.explanation || question.conceptualTakeaway}</div>
            </div>

            {onNext && (
              <button
                onClick={onNext}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#10508f] hover:bg-[#0d4277] border-2 border-[#2a2825] text-white font-mono font-bold text-xs shadow-[2px_2px_0_#2a2825] cursor-pointer"
              >
                <span>Continue to Next Concept</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
