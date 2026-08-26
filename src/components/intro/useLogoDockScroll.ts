import { useEffect, useState } from 'react';
import { introConfig } from '@/components/intro/introConfig';

/**
 * True once the page has scrolled past `logoDockScrollY` — the point where the
 * YAKA mark leaves the hero and appears in the navbar instead. Reversible: flips
 * back the moment you scroll back above the threshold, in either direction.
 */
export function useLogoDockScroll(): boolean {
  const [pastThreshold, setPastThreshold] = useState(
    () => typeof window !== 'undefined' && window.scrollY > introConfig.logoDockScrollY
  );

  useEffect(() => {
    const onScroll = () => setPastThreshold(window.scrollY > introConfig.logoDockScrollY);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return pastThreshold;
}
