import { createContext, useContext } from 'react';

export type LandingTheme = 'light' | 'dark';

export type LandingThemeContextValue = {
  theme: LandingTheme;
  toggleTheme: () => void;
  /** True only inside LandingThemeProvider — lets shared components (Navbar/Footer) hide the toggle on pages that aren't wired up yet. */
  isThemeable: boolean;
};

export const LandingThemeContext = createContext<LandingThemeContextValue | null>(null);

const UNTHEMED_FALLBACK: LandingThemeContextValue = {
  theme: 'dark',
  toggleTheme: () => undefined,
  isThemeable: false
};

/**
 * Read the landing theme. Safe outside LandingThemeProvider (pages not yet
 * wired up for dark mode) — returns a dark/no-op fallback so shared
 * components like Navbar/Footer keep working unchanged.
 */
export function useLandingTheme(): LandingThemeContextValue {
  return useContext(LandingThemeContext) ?? UNTHEMED_FALLBACK;
}

/**
 * Cross-brand domains can't share localStorage/cookies — attach the current
 * theme as a query param on outbound links to another brand's site so it
 * lands in dark/light mode already matched. The receiving site's anti-flash
 * script (see index.html) reads it back off.
 */
export function withThemeParam(href: string, theme: LandingTheme): string {
  try {
    const url = new URL(href);
    url.searchParams.set('theme', theme);
    return url.toString();
  } catch {
    return href;
  }
}
