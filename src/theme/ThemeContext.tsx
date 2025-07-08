'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme as lightTheme, darkTheme } from '@/styles/theme';
import { GlobalStyles } from '@/styles/global';
import { useLocalStorage } from '@/hooks/useLocalStorage';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [savedTheme, setSavedTheme] = useLocalStorage<ThemeMode>('theme', 'light');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const systemTheme = mediaQuery.matches ? 'dark' : 'light';
    setThemeMode(savedTheme || systemTheme);
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (!savedTheme) {
        setThemeMode(e.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [savedTheme]);

  const toggleTheme = () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newTheme);
    setSavedTheme(newTheme);
  };

  const handleSetThemeMode = (mode: ThemeMode) => {
    setThemeMode(mode);
    setSavedTheme(mode);
  };

  const currentTheme = themeMode === 'dark' ? darkTheme : lightTheme;

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider 
      value={{ 
        themeMode, 
        toggleTheme, 
        setThemeMode: handleSetThemeMode 
      }}
    >
      <StyledThemeProvider theme={currentTheme}>
        <GlobalStyles />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}