import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'day' | 'night';

interface ThemeContextType {
  theme: ThemeMode;
  isNight: boolean;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
  toast: { text: string; mode: ThemeMode } | null;
  clearToast: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    // Check localStorage preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('insat_theme') as ThemeMode;
      if (saved === 'night' || saved === 'day') return saved;
      // Default to day (warm paper field guide)
      return 'day';
    }
    return 'day';
  });

  const [toast, setToast] = useState<{ text: string; mode: ThemeMode } | null>(null);

  const applyTheme = (mode: ThemeMode) => {
    const root = document.documentElement;
    if (mode === 'night') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'night');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'day');
    }
    try {
      localStorage.setItem('insat_theme', mode);
    } catch {
      // Ignore localStorage errors
    }
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => {
      const next: ThemeMode = prev === 'day' ? 'night' : 'day';
      applyTheme(next);
      
      // Trigger educational toast
      if (next === 'night') {
        setToast({
          text: '🌙 Night Mode Activated: Terrestrial thermal IR active (10.8 µm & 6.8 µm). Visible channels (0.65 µm) darken without solar illumination.',
          mode: 'night'
        });
      } else {
        setToast({
          text: '☀️ Day Mode Activated: Solar reflectance active. Visible (0.65 µm) & SWIR (1.62 µm) channels reveal cloud albedo and ice vs water phase.',
          mode: 'day'
        });
      }
      return next;
    });
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    applyTheme(mode);
  };

  const clearToast = () => setToast(null);

  // Auto-dismiss toast after 4 seconds
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isNight: theme === 'night',
        toggleTheme,
        setTheme,
        toast,
        clearToast
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
