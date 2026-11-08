import React from 'react';
import { Sun, Moon, Sparkles, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface DayNightToggleProps {
  variant?: 'navbar' | 'floating';
}

export const DayNightToggle: React.FC<DayNightToggleProps> = ({ variant = 'navbar' }) => {
  const { isNight, toggleTheme } = useTheme();

  if (variant === 'floating') {
    return (
      <button
        onClick={toggleTheme}
        title={isNight ? 'Switch to Day Mode (Solar VIS/SWIR)' : 'Switch to Night Mode (Terrestrial IR)'}
        aria-label="Toggle Day and Night mode"
        className={`fixed bottom-5 right-5 z-40 flex items-center gap-2 px-3.5 py-2.5 rounded-full border-2 transition-all cursor-pointer shadow-[3px_3px_0_#2a2825] active:translate-y-0.5 hover:scale-105 ${
          isNight
            ? 'bg-[#1e293b] text-cyan-200 border-[#475569] hover:bg-[#334155]'
            : 'bg-[#fffdf8] text-amber-800 border-[#2a2825] hover:bg-[#fef3c7]'
        }`}
      >
        {isNight ? (
          <>
            <Moon className="w-4 h-4 text-cyan-300 fill-cyan-400" />
            <span className="text-xs font-mono font-bold tracking-tight">Night Mode</span>
          </>
        ) : (
          <>
            <Sun className="w-4 h-4 text-amber-500 fill-amber-400 animate-spin-slow" />
            <span className="text-xs font-mono font-bold tracking-tight">Day Mode</span>
          </>
        )}
      </button>
    );
  }

  // Default navbar variant
  return (
    <button
      onClick={toggleTheme}
      title={isNight ? 'Switch to Day Mode (Solar VIS/SWIR)' : 'Switch to Night Mode (Terrestrial IR)'}
      aria-label="Toggle Day and Night mode"
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 text-xs font-mono font-bold transition-all cursor-pointer shadow-[2px_2px_0_#2a2825] active:translate-y-0.5 shrink-0 ${
        isNight
          ? 'bg-[#1e293b] text-cyan-200 border-[#475569] hover:bg-[#334155]'
          : 'bg-[#fffdf8] text-amber-900 border-[#2a2825] hover:bg-[#fef3c7]'
      }`}
    >
      {isNight ? (
        <>
          <Moon className="w-4 h-4 text-cyan-300 fill-cyan-400" />
          <span className="hidden sm:inline">Night</span>
        </>
      ) : (
        <>
          <Sun className="w-4 h-4 text-amber-500 fill-amber-400 animate-spin-slow" />
          <span className="hidden sm:inline">Day</span>
        </>
      )}
    </button>
  );
};

export const DayNightToast: React.FC = () => {
  const { toast, clearToast, isNight } = useTheme();

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-lg w-[90%] sm:w-auto animate-bounce-short pointer-events-auto"
    >
      <div
        className={`flex items-start sm:items-center gap-3 px-4 py-3 rounded-xl border-2 shadow-[4px_4px_0_#2a2825] ${
          isNight
            ? 'bg-[#0f172a] text-slate-100 border-[#38bdf8]'
            : 'bg-[#fffdf8] text-[#1d1c19] border-[#b45309]'
        }`}
      >
        <div className="shrink-0 mt-0.5 sm:mt-0">
          {isNight ? (
            <Moon className="w-5 h-5 text-cyan-300 fill-cyan-400" />
          ) : (
            <Sun className="w-5 h-5 text-amber-500 fill-amber-400" />
          )}
        </div>
        <p className="text-xs font-medium leading-relaxed font-sans">{toast.text}</p>
        <button
          onClick={clearToast}
          aria-label="Dismiss toast"
          className="shrink-0 p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer ml-1"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
