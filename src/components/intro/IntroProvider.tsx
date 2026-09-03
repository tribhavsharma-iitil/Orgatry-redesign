import {
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react';
import { FloatingLogo } from '@/components/intro/FloatingLogo';
import { introConfig } from '@/components/intro/introConfig';
import { Loader } from '@/components/intro/Loader';
import type { DomRectLite, IntroContextValue, IntroPhase } from '@/components/intro/types';
import { IntroContext } from '@/components/intro/useIntro';
import { isMobileViewport, prefersReducedMotion } from '@/components/intro/utils';

type IntroProviderProps = {
  children: ReactNode;
};

function resolveInitialPhase(): IntroPhase {
  if (typeof window === 'undefined') return 'loading';
  if (prefersReducedMotion()) {
    return 'skipped';
  }
  // Always show the loader (even on mobile).
  // The flying-logo animation is skipped on mobile — see completeLoader below.
  return 'loading';
}

/**
 * Single source of truth for the ONE-TIME intro flight:
 * loading → flying → hero (terminal) — or skipped on mobile / reduced-motion.
 *
 * FloatingLogo mounts only AFTER loader hold + fade complete, and unmounts for
 * good once it lands at the hero. From that point on, Hero and Navbar each run
 * their own independent, reversible scroll-position toggle (see
 * `useLogoDockScroll`) — this provider has no further say over the logo.
 */
export function IntroProvider({ children }: IntroProviderProps) {
  const [phase, setPhase] = useState<IntroPhase>(() => resolveInitialPhase());
  const [loaderRect, setLoaderRect] = useState<DomRectLite | null>(null);
  const [loaderMounted, setLoaderMounted] = useState(() => resolveInitialPhase() === 'loading');

  useEffect(() => {
    if (phase !== 'loading' && phase !== 'flying') return;

    const onResize = () => {
      if (isMobileViewport(introConfig.mobileBreakpoint)) {
        // If still loading, let the loader finish naturally — it will skip the flight in completeLoader.
        // If already flying, land immediately.
        if (phase === 'flying') {
          setPhase('hero');
          setLoaderRect(null);
        }
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [phase]);

  const completeLoader = useCallback((rect: DomRectLite) => {
    // On mobile, skip the flying animation — go straight to hero phase
    if (isMobileViewport(introConfig.mobileBreakpoint)) {
      setPhase('hero');
    } else {
      setLoaderRect(rect);
      setPhase('flying');
    }
  }, []);

  const handleLoaderExited = useCallback(() => {
    setLoaderMounted(false);
  }, []);

  const arriveAtHero = useCallback(() => {
    setPhase((current) => (current === 'flying' ? 'hero' : current));
  }, []);

  const value = useMemo<IntroContextValue>(
    () => ({
      phase,
      // Content may animate in once the loader overlay is gone (flying starts post-fade)
      isContentReady: phase !== 'loading',
      // Once the flight has landed (or was skipped), Hero/Navbar own the logo's visibility
      isLogoAtHero: phase === 'hero' || phase === 'skipped',
      loaderRect,
      completeLoader,
      arriveAtHero
    }),
    [phase, loaderRect, completeLoader, arriveAtHero]
  );

  const showFloating = phase === 'flying' && loaderRect !== null;

  return createElement(
    IntroContext.Provider,
    { value },
    children,
    loaderMounted
      ? createElement(Loader, {
        onComplete: completeLoader,
        onExited: handleLoaderExited
      })
      : null,
    showFloating && loaderRect
      ? createElement(FloatingLogo, { loaderRect, key: 'intro-floating-logo' })
      : null
  );
}
