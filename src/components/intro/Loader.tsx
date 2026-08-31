import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import orgatryLightLogo from '@/assets/orgatry_light_logo.png';
import { introConfig } from '@/components/intro/introConfig';
import type { DomRectLite } from '@/components/intro/types';
import { measureElement } from '@/components/intro/utils';
import { useLandingTheme } from '@/modules/landing/theme/useLandingTheme';

type LoaderProps = {
  /**
   * Fired AFTER the full hold (3000ms — brand mark for 1500ms, then the YAKA
   * mark for 1500ms) + fade (600ms) complete, with the logo rect measured at
   * the end of the hold (while still visible).
   */
  onComplete: (rect: DomRectLite) => void;
  /** Fired after the backdrop has fully faded out (same moment as onComplete). */
  onExited?: () => void;
};

/**
 * Fullscreen brand loader.
 * Brand mark → crossfade to YAKA mark → hold → fade 600ms → hand off.
 * FloatingLogo must not start before this finishes.
 */
export function Loader({ onComplete, onExited }: LoaderProps) {
  const { theme } = useLandingTheme();
  const brandLogo = theme === 'dark' ? orgatryLightLogo : introConfig.brandLogo;
  const logoBoxRef = useRef<HTMLDivElement>(null);
  const measuredRect = useRef<DomRectLite | null>(null);
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState<'brand' | 'icon'>('brand');
  const startedFade = useRef(false);
  const finishedRef = useRef(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    document.body.style.overflow = '';
    const size = introConfig.loaderLogoSize;
    const rect =
      measuredRect.current ?? {
        left: (window.innerWidth - size) / 2,
        top: (window.innerHeight - size) / 2,
        width: size,
        height: size
      };
    onComplete(rect);
    onExited?.();
  }, [onComplete, onExited]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Brand mark first, then crossfade to the YAKA mark before handing off to the flight.
    const stepTimer = window.setTimeout(() => {
      setStep('icon');
    }, introConfig.loaderStepDuration);

    const holdTimer = window.setTimeout(() => {
      if (startedFade.current) return;
      startedFade.current = true;

      const size = introConfig.loaderLogoSize;
      measuredRect.current = measureElement(logoBoxRef.current) ?? {
        left: (window.innerWidth - size) / 2,
        top: (window.innerHeight - size) / 2,
        width: size,
        height: size
      };

      // Begin fade — logo stays visible while the whole overlay fades out
      setVisible(false);
    }, introConfig.loaderDuration);

    // Safety net: if AnimatePresence's onExitComplete never fires for some reason,
    // don't leave the intro stuck in "loading" forever.
    const fallbackTimer = window.setTimeout(
      finish,
      introConfig.loaderDuration + introConfig.loaderFadeDuration + 200
    );

    return () => {
      window.clearTimeout(stepTimer);
      window.clearTimeout(holdTimer);
      window.clearTimeout(fallbackTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [finish]);

  const size = introConfig.loaderLogoSize;

  return (
    <AnimatePresence onExitComplete={finish}>
      {visible ? (
        <motion.div
          key="intro-loader"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white dark:bg-black"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: introConfig.loaderFadeDuration / 1000,
              ease: 'easeInOut'
            }
          }}
          aria-busy="true"
          aria-label="Loading"
          role="status"
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute rounded-full"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              width: size * 2.6,
              height: size * 2.6,
              background: `radial-gradient(circle, ${introConfig.glowColor} 0%, transparent 70%)`,
              filter: 'blur(28px)'
            }}
          />

          <motion.div
            className="relative z-10 flex flex-col items-center gap-5"
            initial={{ scale: 3.5, opacity: 0, filter: 'blur(18px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div ref={logoBoxRef} className="relative" style={{ width: size, height: size }}>
              <AnimatePresence mode="wait">
                {step === 'brand' ? (
                  <motion.img
                    key="brand"
                    src={brandLogo}
                    alt="Orgatry"
                    className="absolute inset-0 size-full object-contain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    decoding="async"
                    draggable={false}
                  />
                ) : (
                  <motion.div
                    key="icon"
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  >
                    <img
                      src={introConfig.iconLogo}
                      alt=""
                      style={{ width: introConfig.loaderIconSize, height: introConfig.loaderIconSize }}
                      className="object-contain dark:brightness-0 dark:invert"
                      decoding="async"
                      draggable={false}
                    />
                    <p className="m-0 whitespace-nowrap text-[11px] font-medium dark:text-[#ffffff] text-[#188f44]">
                      A <span className="font-bold">YAKA</span> Brand
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Shimmer outside the logo scale so it always sweeps at full size */}
            <div
              className="overflow-hidden rounded-full bg-[#e8e8ea] dark:bg-white/10"
              style={{ width: 80, height: 2 }}
              aria-hidden
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: '40%',
                  background:
                    'linear-gradient(90deg, transparent, rgba(34,197,94,0.9), rgba(21,128,61,1), transparent)'
                }}
                initial={{ x: '-120%' }}
                animate={{ x: '220%' }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
