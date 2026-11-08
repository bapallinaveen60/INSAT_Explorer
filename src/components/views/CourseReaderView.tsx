import React, { useState, useEffect } from 'react';
import { COURSE_CHAPTERS } from '../../data/courseChapters';
import { NumberedStep } from '../common/NumberedStep';
import { CharacterDialogue } from '../common/CharacterDialogue';
import { SplatCallout } from '../common/SplatCallout';
import { TerminologyAlert } from '../common/TerminologyAlert';
import { DataTrapAlert } from '../common/DataTrapAlert';
import { ChapterSelfCheck } from '../common/ChapterSelfCheck';
import { HandwrittenNote } from '../common/HandwrittenNote';
import { KaTeXMath } from '../common/KaTeXMath';
import { OrbitSimulator } from '../simulators/OrbitSimulator';
import { SixChannelSandbox } from '../simulators/SixChannelSandbox';
import { PlanckSimulator } from '../simulators/PlanckSimulator';
import { CloudMaskSimulator } from '../simulators/CloudMaskSimulator';
import { GpiSimulator } from '../simulators/GpiSimulator';
import { ImsraSimulator } from '../simulators/ImsraSimulator';
import { SounderProfileSimulator } from '../simulators/SounderProfileSimulator';
import { AmvSimulator } from '../simulators/AmvSimulator';
import { DataStudioInspector } from '../simulators/DataStudioInspector';
import { ChevronLeft, ChevronRight, Menu, BookOpen, CheckCircle2, Compass, Sparkles } from 'lucide-react';

interface CourseReaderViewProps {
  chapterId: number;
  pageId: string;
  onNavigate: (chapterId: number, pageId: string) => void;
}

export const CourseReaderView: React.FC<CourseReaderViewProps> = ({
  chapterId,
  pageId,
  onNavigate
}) => {
  const [showToc, setShowToc] = useState<boolean>(false);

  // Find active chapter and page
  const currentChapter = COURSE_CHAPTERS.find(c => c.id === chapterId) || COURSE_CHAPTERS[0];
  const currentPageIndex = currentChapter.pages.findIndex(p => p.id === pageId);
  const activePageIndex = currentPageIndex >= 0 ? currentPageIndex : 0;
  const currentPage = currentChapter.pages[activePageIndex];

  // Navigation handlers
  const handlePrevPage = () => {
    if (activePageIndex > 0) {
      onNavigate(currentChapter.id, currentChapter.pages[activePageIndex - 1].id);
    } else if (chapterId > 1) {
      const prevChap = COURSE_CHAPTERS.find(c => c.id === chapterId - 1);
      if (prevChap) {
        onNavigate(prevChap.id, prevChap.pages[prevChap.pages.length - 1].id);
      }
    }
  };

  const handleNextPage = () => {
    if (activePageIndex < currentChapter.pages.length - 1) {
      onNavigate(currentChapter.id, currentChapter.pages[activePageIndex + 1].id);
    } else if (chapterId < COURSE_CHAPTERS.length) {
      const nextChap = COURSE_CHAPTERS.find(c => c.id === chapterId + 1);
      if (nextChap) {
        onNavigate(nextChap.id, nextChap.pages[0].id);
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNextPage();
      if (e.key === 'ArrowLeft') handlePrevPage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePageIndex, chapterId]);

  // Scroll to top on page switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [chapterId, pageId]);

  // Determine badge banner background color
  const getBannerColorClass = (color?: string, isSimulator?: boolean) => {
    if (isSimulator || color === 'purple') {
      return 'bg-[#8a3c8f] border-[#2a2825] text-white';
    }
    switch (color) {
      case 'emerald':
      case 'teal':
        return 'bg-[#1b6b3c] border-[#2a2825] text-white';
      case 'rose':
        return 'bg-[#d6197f] border-[#2a2825] text-white';
      case 'amber':
        return 'bg-[#b45309] border-[#2a2825] text-white';
      case 'blue':
      default:
        return 'bg-[#10508f] border-[#2a2825] text-white';
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f2] text-[#1d1c19] flex flex-col font-sans">
      {/* Chapter Title Bar (Rich Navy Printed Book Header) */}
      <div className="bg-[#10508f] border-b-2 border-[#2a2825] px-4 py-5 shadow-sm text-white">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded-md bg-[#ffffff]/20 text-[#fdf6dd] text-[11px] font-mono font-bold tracking-widest uppercase mb-1 border border-white/30">
              CHAPTER {currentChapter.numberString}
            </div>
            <h1 className="text-xl md:text-3xl font-black text-white tracking-tight">
              {currentChapter.title}
            </h1>
            <p className="text-blue-100 text-xs md:text-sm mt-1 max-w-2xl leading-relaxed font-medium">
              {currentChapter.subtitle}
            </p>
          </div>

          <button
            onClick={() => setShowToc(!showToc)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#fffdf8] border-2 border-[#2a2825] text-[#1d1c19] text-xs font-mono font-bold shadow-[2px_2px_0_#2a2825] hover:bg-[#faf8f2] transition-all cursor-pointer self-start sm:self-center shrink-0"
          >
            <Menu className="w-4 h-4 text-[#10508f]" />
            <span>Table of Contents</span>
          </button>
        </div>
      </div>

      {/* Main Educational Reading Container */}
      <main className="max-w-4xl mx-auto px-4 py-6 flex-1 w-full">
        {/* Page Tab Strip: Jump to Any Page in This Chapter */}
        <div className="mb-4 flex items-center gap-1.5 overflow-x-auto pb-1.5 select-none">
          {currentChapter.pages.map((p, idx) => {
            const isActive = p.id === currentPage.id;
            // Short label for tab: use tab property or derive from headerBarBadge
            const tabLabel = p.tab || (
              p.headerBarBadge.includes(':') 
                ? p.headerBarBadge.split(':')[1].trim() 
                : p.headerBarBadge
            );

            return (
              <button
                key={p.id}
                onClick={() => onNavigate(currentChapter.id, p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#10508f] text-white border-[#2a2825] shadow-[2px_2px_0_#2a2825]'
                    : 'bg-[#fffdf8] text-[#53504a] border-[#b9b3a8] hover:border-[#2a2825] hover:text-[#1d1c19]'
                }`}
              >
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                  isActive ? 'bg-white text-[#10508f]' : 'bg-[#e5e0d3] text-[#53504a]'
                }`}>
                  {idx + 1}
                </span>
                <span>{tabLabel}</span>
                {p.selfCheck && (
                  <span className="text-[9px] px-1 py-0.2 rounded bg-amber-200 text-amber-900 border border-amber-400 font-sans">
                    Quiz
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* The Colored Header Bar (Single Idea Rule from Rain from Orbit) */}
        <div className={`mb-6 rounded-xl border-2 px-4 py-2.5 flex items-center justify-between shadow-[3px_3px_0_rgba(42,40,37,0.15)] ${getBannerColorClass(currentPage.badgeColor, currentPage.isSimulatorPage)}`}>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
            <span className="text-xs md:text-sm font-mono font-bold tracking-wide">
              {currentPage.headerBarBadge}
            </span>
          </div>
          <span className="text-[11px] font-mono text-white/90 font-bold">
            Page {activePageIndex + 1} of {currentChapter.pages.length}
          </span>
        </div>

        {/* Page Title & Subtitle */}
        <div className="mb-6 flex flex-col md:flex-row md:items-baseline justify-between gap-2 border-b-2 border-[#b9b3a8]/50 pb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-[#1d1c19] tracking-tight">
              {currentPage.title}
            </h2>
            {currentPage.subtitle && (
              <p className="text-sm md:text-base text-[#53504a] mt-1 font-medium leading-relaxed">
                {currentPage.subtitle}
              </p>
            )}
          </div>
          {currentPage.isSimulatorPage && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#f3e8ff] border-2 border-[#8a3c8f] text-[#8a3c8f] font-mono text-xs font-bold shrink-0 self-start">
              <Sparkles className="w-3.5 h-3.5" />
              Interactive Lab
            </span>
          )}
        </div>

        {/* Page Sections (Numbered Concepts, Dialogues, Formulas, Simulators) */}
        <div className="space-y-5">
          {currentPage.sections.map((section, idx) => (
            <div key={idx}>
              {section.stepNumber ? (
                <NumberedStep
                  number={section.stepNumber}
                  title={section.headerTitle}
                  leadParagraph={section.leadParagraph}
                >
                  {/* Dialogue */}
                  {section.dialogue && section.dialogue.map((d, dIdx) => (
                    <CharacterDialogue key={dIdx} speaker={d.speaker} text={d.text} />
                  ))}

                  {/* Bullet points */}
                  {section.bulletPoints && (
                    <ul className="space-y-2 my-3 pl-2 text-xs md:text-sm text-[#1d1c19]">
                      {section.bulletPoints.map((bp, bpIdx) => (
                        <li key={bpIdx} className="flex items-start gap-2.5">
                          <span className="text-[#10508f] font-black shrink-0 text-base leading-none">•</span>
                          <span className="leading-relaxed">{bp}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Formulas */}
                  {section.formulas && section.formulas.map((f, fIdx) => (
                    <div key={fIdx} className="my-3.5 p-4 bg-[#f4f1ea] border-2 border-[#2a2825] rounded-xl shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#10508f] font-black mb-1.5 flex items-center justify-between">
                        <span>{f.label}</span>
                        <span className="text-[10px] text-[#53504a] font-normal">Physical Equation</span>
                      </div>
                      <div className="py-2 overflow-x-auto text-center">
                        <KaTeXMath math={f.math} block={true} className="text-[#1d1c19] text-sm md:text-base" />
                      </div>
                      {f.explanation && (
                        <div className="text-xs text-[#53504a] mt-2 border-t border-[#b9b3a8] pt-2 font-medium leading-relaxed">
                          {f.explanation}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Splat Insight */}
                  {section.splatInsight && (
                    <SplatCallout
                      level={section.splatInsight.level}
                      summary={section.splatInsight.summary}
                    />
                  )}

                  {/* Terminology Alert */}
                  {section.terminologyAlert && (
                    <TerminologyAlert
                      term={section.terminologyAlert.term}
                      definition={section.terminologyAlert.definition}
                      pitfall={section.terminologyAlert.pitfall}
                    />
                  )}

                  {/* Data Trap Alert */}
                  {section.dataTrap && (
                    <DataTrapAlert
                      title={section.dataTrap.title}
                      description={section.dataTrap.description}
                      codeWarning={section.dataTrap.codeWarning}
                    />
                  )}

                  {/* Python Snippet */}
                  {section.pythonSnippet && (
                    <div className="my-3 bg-[#202020] text-[#f8f8f2] border-2 border-[#2a2825] rounded-xl p-3.5 font-mono text-xs shadow-[2px_2px_0_rgba(42,40,37,0.15)]">
                      <div className="text-[10px] text-amber-400 font-bold uppercase mb-1 tracking-wider">
                        Python (ISRO HDF5 ATBD Recipe): {section.pythonSnippet.title}
                      </div>
                      <pre className="overflow-x-auto p-2 bg-[#121212] rounded border border-neutral-700 text-[11px] leading-relaxed text-emerald-300">
                        {section.pythonSnippet.code}
                      </pre>
                      {section.pythonSnippet.notes && (
                        <div className="text-[10px] text-neutral-400 mt-1.5">
                          {section.pythonSnippet.notes}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Embedded Live Simulator */}
                  {section.simulatorId === 'orbit-geometry' && <OrbitSimulator />}
                  {section.simulatorId === 'six-channel-sandbox' && <SixChannelSandbox />}
                  {section.simulatorId === 'planck-blackbody' && <PlanckSimulator />}
                  {section.simulatorId === 'cloud-mask-sandbox' && <CloudMaskSimulator />}
                  {section.simulatorId === 'gpi-rainfall' && <GpiSimulator />}
                  {section.simulatorId === 'imsra-lifecycle' && <ImsraSimulator />}
                  {section.simulatorId === 'sounder-profile' && <SounderProfileSimulator />}
                  {section.simulatorId === 'amv-tracking' && <AmvSimulator />}
                  {section.simulatorId === 'data-studio-inspector' && <DataStudioInspector />}
                </NumberedStep>
              ) : (
                <div>
                  {section.leadParagraph && (
                    <p className="text-sm md:text-base text-[#1d1c19] leading-relaxed mb-3 font-medium">
                      {section.leadParagraph}
                    </p>
                  )}
                  {section.simulatorId === 'orbit-geometry' && <OrbitSimulator />}
                  {section.simulatorId === 'six-channel-sandbox' && <SixChannelSandbox />}
                  {section.simulatorId === 'planck-blackbody' && <PlanckSimulator />}
                  {section.simulatorId === 'cloud-mask-sandbox' && <CloudMaskSimulator />}
                  {section.simulatorId === 'gpi-rainfall' && <GpiSimulator />}
                  {section.simulatorId === 'imsra-lifecycle' && <ImsraSimulator />}
                  {section.simulatorId === 'sounder-profile' && <SounderProfileSimulator />}
                  {section.simulatorId === 'amv-tracking' && <AmvSimulator />}
                  {section.simulatorId === 'data-studio-inspector' && <DataStudioInspector />}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Chapter Self Check at the end of the chapter */}
        {currentPage.selfCheck && (
          <div className="mt-8">
            <ChapterSelfCheck
              question={currentPage.selfCheck}
              onNext={activePageIndex < currentChapter.pages.length - 1 || chapterId < COURSE_CHAPTERS.length ? handleNextPage : undefined}
            />
          </div>
        )}

        {/* Bottom Navigation Pagination Bar */}
        <div className="mt-10 pt-6 border-t-2 border-[#b9b3a8] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <button
            onClick={handlePrevPage}
            disabled={chapterId === 1 && activePageIndex === 0}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 transition-all cursor-pointer font-bold ${
              chapterId === 1 && activePageIndex === 0
                ? 'opacity-30 border-[#b9b3a8] text-[#86817a] cursor-not-allowed bg-transparent'
                : 'border-[#2a2825] bg-[#fffdf8] hover:bg-[#faf8f2] text-[#1d1c19] shadow-[2px_2px_0_#2a2825] active:translate-y-0.5'
            }`}
          >
            <ChevronLeft className="w-4 h-4 text-[#10508f]" />
            <span>Previous Page</span>
          </button>

          <div className="text-center text-[#53504a]">
            <span className="font-bold text-[#1d1c19]">
              Chapter {currentChapter.id} &bull; Page {activePageIndex + 1} of {currentChapter.pages.length}
            </span>
            <div className="text-[11px] text-[#86817a] font-hand text-sm mt-0.5">
              Turn pages with &larr; and &rarr; arrow keys
            </div>
          </div>

          <button
            onClick={handleNextPage}
            disabled={chapterId === COURSE_CHAPTERS.length && activePageIndex === currentChapter.pages.length - 1}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 transition-all cursor-pointer font-bold ${
              chapterId === COURSE_CHAPTERS.length && activePageIndex === currentChapter.pages.length - 1
                ? 'opacity-30 border-[#b9b3a8] text-[#86817a] cursor-not-allowed bg-transparent'
                : 'border-[#2a2825] bg-[#10508f] hover:bg-[#0c3d6e] text-white shadow-[2px_2px_0_#2a2825] active:translate-y-0.5'
            }`}
          >
            <span>Next Page</span>
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Printed Book Footer Attribution */}
        <div className="mt-8 text-center text-xs text-[#86817a] font-mono border-t border-[#b9b3a8]/40 pt-4">
          <span>INSAT Explorer &mdash; an illustrated guide to INSAT-3D/3DR satellite meteorology</span>
        </div>
      </main>

      {/* Table of Contents Drawer */}
      {showToc && (
        <div className="fixed inset-0 z-50 bg-[#1d1c19]/50 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-[#faf8f2] border-l-2 border-[#2a2825] h-full p-6 overflow-y-auto flex flex-col shadow-2xl">
            <div className="flex items-center justify-between border-b-2 border-[#2a2825] pb-4 mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#10508f]" />
                <h3 className="font-mono font-black text-sm text-[#1d1c19] uppercase tracking-wider">
                  Course Chapters
                </h3>
              </div>
              <button
                onClick={() => setShowToc(false)}
                className="w-8 h-8 rounded-lg bg-[#fffdf8] border-2 border-[#2a2825] text-[#1d1c19] hover:bg-[#f4f1ea] font-black text-base flex items-center justify-center cursor-pointer shadow-[2px_2px_0_#2a2825]"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4 flex-1">
              {COURSE_CHAPTERS.map((chap) => {
                const isCurrentChap = chap.id === chapterId;
                return (
                  <div key={chap.id} className="border-2 border-[#2a2825] rounded-xl p-3.5 bg-[#fffdf8] shadow-[2px_2px_0_rgba(42,40,37,0.1)]">
                    <div className="text-[10px] font-mono text-[#10508f] font-bold uppercase mb-0.5">
                      CHAPTER {chap.numberString}
                    </div>
                    <div className="text-xs font-bold text-[#1d1c19] mb-2">
                      {chap.title}
                    </div>
                    <div className="space-y-1">
                      {chap.pages.map((pg, pIdx) => {
                        const isCurrentPage = isCurrentChap && pg.id === pageId;
                        return (
                          <button
                            key={pg.id}
                            onClick={() => {
                              onNavigate(chap.id, pg.id);
                              setShowToc(false);
                            }}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center justify-between cursor-pointer border ${
                              isCurrentPage
                                ? 'bg-[#10508f] text-white font-bold border-[#2a2825] shadow-[1px_1px_0_#2a2825]'
                                : 'bg-[#faf8f2] text-[#53504a] border-[#b9b3a8]/60 hover:border-[#2a2825] hover:text-[#1d1c19]'
                            }`}
                          >
                            <span className="truncate">{pIdx + 1}. {pg.headerBarBadge}</span>
                            {pg.selfCheck && <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-200 text-amber-900 border border-amber-400 font-sans ml-1">Quiz</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
