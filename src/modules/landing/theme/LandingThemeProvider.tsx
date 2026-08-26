import { useCallback, useLayoutEffect, useMemo, useState, type ReactNode } from 'react';
import { LandingThemeContext, type LandingTheme } from '@/modules/landing/theme/useLandingTheme';

const STORAGE_KEY = 'orgatry-landing-theme';

function readInitialTheme(): LandingTheme {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

/**
 * Scopes dark-mode to the landing route it wraps: toggles the `dark` class on
 * <html> while mounted (mirroring useLandingDocumentMeta's landing-root/
 * landing-body pattern) and removes it on unmount so it never leaks into the
 * authenticated app, which is dark-only by default.
 */
export function LandingThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<LandingTheme>(readInitialTheme);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore — persistence is a nicety, not a requirement.
    }

    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme, isThemeable: true }), [theme, toggleTheme]);

  return <LandingThemeContext.Provider value={value}>{children}</LandingThemeContext.Provider>;
}
