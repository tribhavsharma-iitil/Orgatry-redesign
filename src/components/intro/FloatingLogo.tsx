import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { introConfig } from '@/components/intro/introConfig';
import type { DomRectLite } from '@/components/intro/types';
import { useIntro } from '@/components/intro/useIntro';
import { measureAnchor } from '@/components/intro/utils';

type FloatingLogoProps = {
  loaderRect: DomRectLite;
};

/**
 * One-shot flight: loader's measured rect → hero anchor (800ms), then hands off.
 * Once landed this renders nothing — Hero and Navbar take over from there with
 * their own independent, scroll-reversible toggle (`useLogoDockScroll`).
 */
export function FloatingLogo({ loaderRect }: FloatingLogoProps) {
  const { phase, arriveAtHero } = useIntro();
  const [heroTarget, setHeroTarget] = useState<DomRectLite | null>(null);
  const flightDoneRef = useRef(false);

  useEffect(() => {
    if (phase !== 'flying') return;
    const hero = measureAnchor(introConfig.heroAnchorId);
    if (!hero) {
      arriveAtHero();
      return;
    }
    setHeroTarget(hero);
  }, [phase, arriveAtHero]);

  if (phase !== 'flying') {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed z-[100000] will-change-transform"
      initial={{
        left: loaderRect.left,
        top: loaderRect.top,
        width: loaderRect.width,
        height: loaderRect.height
      }}
      animate={
        heroTarget
          ? {
              left: heroTarget.left,
              top: heroTarget.top,
              width: heroTarget.width,
              height: heroTarget.height
            }
          : {
              left: loaderRect.left,
              top: loaderRect.top,
              width: loaderRect.width,
              height: loaderRect.height
            }
      }
      transition={{
        duration: introConfig.flyDuration / 1000,
        ease: [0.16, 1, 0.3, 1]
      }}
      onAnimationComplete={() => {
        if (!heroTarget || flightDoneRef.current) return;
        flightDoneRef.current = true;
        arriveAtHero();
      }}
      aria-hidden
    >
      <img
        src={introConfig.iconLogo}
        alt="A YAKA Brand"
        className="size-full object-contain dark:brightness-0 dark:invert"
        draggable={false}
        decoding="async"
      />
    </motion.div>
  );
}
