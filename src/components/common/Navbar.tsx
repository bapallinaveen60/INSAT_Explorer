import React from 'react';
import { COURSE_CHAPTERS } from '../../data/courseChapters';
import { BookOpen, ChevronRight, Menu, Compass } from 'lucide-react';
import { DayNightToggle } from './DayNightToggle';

export type AppMode = 'guide' | 'satellite-lab' | 'channel-explorer' | 'physics-lab' | 'algorithm-lab' | 'data-studio';

interface NavbarProps {
  currentMode: AppMode;
  onSelectMode: (mode: AppMode) => void;
  currentChapterId: number;
  currentPageId: string;
  onSelectChapterPage: (chapterId: number, pageId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  onSelectMode,
  currentChapterId,
  currentPageId,
  onSelectChapterPage
}) => {
  const currentChapter = COURSE_CHAPTERS.find(c => c.id === currentChapterId) || COURSE_CHAPTERS[0];

  return (
    <header className="sticky top-0 z-50 bg-[#faf8f2] dark:bg-[#0b1120] border-b-2 border-[#b9b3a8] dark:border-[#334155] px-4 py-2.5 transition-colors">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Book Title & Series Badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectMode('guide')}
            className="text-left cursor-pointer group flex items-center gap-2.5"
          >
            <div className="w-8 h-8 rounded-lg bg-[#10508f] dark:bg-[#0369a1] border-2 border-[#2a2825] dark:border-[#38bdf8] flex items-center justify-center text-white font-black text-sm shadow-[2px_2px_0_#2a2825]">
              IE
            </div>
            <div>
              <div className="font-black text-base text-[#10508f] dark:text-[#38bdf8] tracking-tight flex items-center gap-1.5 leading-none">
                <span>INSAT Explorer</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#e2f3e7] dark:bg-[#064e3b] text-[#1b6b3c] dark:text-[#34d399] border border-[#1b6b3c] dark:border-[#059669]">
                  ISRO ATBD
                </span>
              </div>
              <div className="text-[11px] font-hand text-[#53504a] dark:text-[#94a3b8] font-bold mt-0.5">
                an illustrated guide to weather from orbit
              </div>
            </div>
          </button>
        </div>

        {/* Chapter Quick Switcher */}
        <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
          {COURSE_CHAPTERS.map((chap) => {
            const isActive = currentMode === 'guide' && chap.id === currentChapterId;
            return (
              <button
                key={chap.id}
                onClick={() => {
                  onSelectMode('guide');
                  onSelectChapterPage(chap.id, chap.pages[0].id);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap border-2 ${
                  isActive
                    ? 'bg-[#10508f] text-white border-[#2a2825] dark:border-[#38bdf8] shadow-[2px_2px_0_#2a2825]'
                    : 'bg-[#fffdf8] dark:bg-[#151e2e] text-[#53504a] dark:text-[#cbd5e1] border-[#b9b3a8] dark:border-[#334155] hover:border-[#2a2825] dark:hover:border-[#38bdf8] hover:text-[#1d1c19] dark:hover:text-[#f8fafc]'
                }`}
              >
                Ch {chap.numberString}
              </button>
            );
          })}
        </div>

        {/* Right Section: Labs Quick Jump + Day & Night Toggle */}
        <div className="flex items-center gap-2">
          {/* Labs Quick Jump */}
          <div className="hidden lg:flex items-center gap-1 pl-2 border-l-2 border-[#b9b3a8] dark:border-[#334155] text-xs font-mono">
            <button
              onClick={() => onSelectMode('satellite-lab')}
              className={`px-2 py-1 rounded-md transition-colors cursor-pointer font-bold ${
                currentMode === 'satellite-lab'
                  ? 'bg-[#1b6b3c] text-white'
                  : 'text-[#53504a] dark:text-[#cbd5e1] hover:text-[#1d1c19] dark:hover:text-[#f8fafc]'
              }`}
            >
              Satellite
            </button>
            <button
              onClick={() => onSelectMode('channel-explorer')}
              className={`px-2 py-1 rounded-md transition-colors cursor-pointer font-bold ${
                currentMode === 'channel-explorer'
                  ? 'bg-[#1b6b3c] text-white'
                  : 'text-[#53504a] dark:text-[#cbd5e1] hover:text-[#1d1c19] dark:hover:text-[#f8fafc]'
              }`}
            >
              Channels
            </button>
            <button
              onClick={() => onSelectMode('physics-lab')}
              className={`px-2 py-1 rounded-md transition-colors cursor-pointer font-bold ${
                currentMode === 'physics-lab'
                  ? 'bg-[#1b6b3c] text-white'
                  : 'text-[#53504a] dark:text-[#cbd5e1] hover:text-[#1d1c19] dark:hover:text-[#f8fafc]'
              }`}
            >
              Physics
            </button>
            <button
              onClick={() => onSelectMode('algorithm-lab')}
              className={`px-2 py-1 rounded-md transition-colors cursor-pointer font-bold ${
                currentMode === 'algorithm-lab'
                  ? 'bg-[#1b6b3c] text-white'
                  : 'text-[#53504a] dark:text-[#cbd5e1] hover:text-[#1d1c19] dark:hover:text-[#f8fafc]'
              }`}
            >
              Algorithms
            </button>
            <button
              onClick={() => onSelectMode('data-studio')}
              className={`px-2 py-1 rounded-md transition-colors cursor-pointer font-bold ${
                currentMode === 'data-studio'
                  ? 'bg-[#1b6b3c] text-white'
                  : 'text-[#53504a] dark:text-[#cbd5e1] hover:text-[#1d1c19] dark:hover:text-[#f8fafc]'
              }`}
            >
              Data Studio
            </button>
          </div>

          {/* Day / Night Change Icon for User Experience */}
          <div className="pl-2 border-l-2 border-[#b9b3a8] dark:border-[#334155]">
            <DayNightToggle variant="navbar" />
          </div>
        </div>
      </div>
    </header>
  );
};
