import React, { useState, useEffect } from 'react';
import { Navbar, AppMode } from './components/common/Navbar';
import { CourseReaderView } from './components/views/CourseReaderView';
import { SatelliteLabView } from './components/views/SatelliteLabView';
import { ChannelExplorerView } from './components/views/ChannelExplorerView';
import { AtmosphericPhysicsLabView } from './components/views/AtmosphericPhysicsLabView';
import { AlgorithmLabView } from './components/views/AlgorithmLabView';
import { DataStudioView } from './components/views/DataStudioView';
import { COURSE_CHAPTERS } from './data/courseChapters';

export function App() {
  const [currentMode, setCurrentMode] = useState<AppMode>('guide');
  const [currentChapterId, setCurrentChapterId] = useState<number>(1);
  const [currentPageId, setCurrentPageId] = useState<string>('1.1');

  // Sync state with URL Hash (e.g. #/ch/1/1 or #/lab/satellite)
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      if (hash.startsWith('#/ch/')) {
        const parts = hash.replace('#/ch/', '').split('/');
        const chapNum = parseInt(parts[0], 10);
        const pageNum = parseInt(parts[1], 10);

        if (!isNaN(chapNum) && chapNum >= 1 && chapNum <= COURSE_CHAPTERS.length) {
          setCurrentChapterId(chapNum);
          setCurrentMode('guide');
          const chap = COURSE_CHAPTERS.find(c => c.id === chapNum);
          if (chap) {
            const page = chap.pages[pageNum - 1] || chap.pages[0];
            setCurrentPageId(page.id);
          }
        }
      } else if (hash === '#/lab/satellite') {
        setCurrentMode('satellite-lab');
      } else if (hash === '#/lab/channels') {
        setCurrentMode('channel-explorer');
      } else if (hash === '#/lab/physics') {
        setCurrentMode('physics-lab');
      } else if (hash === '#/lab/algorithms') {
        setCurrentMode('algorithm-lab');
      } else if (hash === '#/lab/datastudio') {
        setCurrentMode('data-studio');
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  // Update hash when user navigates inside the app
  const handleNavigateChapterPage = (chapterId: number, pageId: string) => {
    setCurrentChapterId(chapterId);
    setCurrentPageId(pageId);
    setCurrentMode('guide');

    const chap = COURSE_CHAPTERS.find(c => c.id === chapterId);
    if (chap) {
      const pageIdx = chap.pages.findIndex(p => p.id === pageId);
      window.location.hash = `#/ch/${chapterId}/${pageIdx + 1}`;
    }
  };

  const handleSelectMode = (mode: AppMode) => {
    setCurrentMode(mode);
    if (mode === 'guide') {
      const chap = COURSE_CHAPTERS.find(c => c.id === currentChapterId);
      if (chap) {
        const pageIdx = chap.pages.findIndex(p => p.id === currentPageId);
        window.location.hash = `#/ch/${currentChapterId}/${pageIdx >= 0 ? pageIdx + 1 : 1}`;
      }
    } else if (mode === 'satellite-lab') {
      window.location.hash = '#/lab/satellite';
    } else if (mode === 'channel-explorer') {
      window.location.hash = '#/lab/channels';
    } else if (mode === 'physics-lab') {
      window.location.hash = '#/lab/physics';
    } else if (mode === 'algorithm-lab') {
      window.location.hash = '#/lab/algorithms';
    } else if (mode === 'data-studio') {
      window.location.hash = '#/lab/datastudio';
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f2] text-[#1d1c19] flex flex-col font-sans selection:bg-[#fed7aa] selection:text-[#9a3412]">
      {/* Top Telemetry Mission Navigation Bar */}
      <Navbar
        currentMode={currentMode}
        onSelectMode={handleSelectMode}
        currentChapterId={currentChapterId}
        currentPageId={currentPageId}
        onSelectChapterPage={handleNavigateChapterPage}
      />

      {/* Main View Router */}
      <div className="flex-1">
        {currentMode === 'guide' && (
          <CourseReaderView
            chapterId={currentChapterId}
            pageId={currentPageId}
            onNavigate={handleNavigateChapterPage}
          />
        )}

        {currentMode === 'satellite-lab' && <SatelliteLabView />}

        {currentMode === 'channel-explorer' && <ChannelExplorerView />}

        {currentMode === 'physics-lab' && <AtmosphericPhysicsLabView />}

        {currentMode === 'algorithm-lab' && <AlgorithmLabView />}

        {currentMode === 'data-studio' && <DataStudioView />}
      </div>
    </div>
  );
}

export default App;
