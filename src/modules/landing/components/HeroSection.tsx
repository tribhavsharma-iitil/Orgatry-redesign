import { motion } from 'framer-motion';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import heroVisual from '@/modules/landing/assets/images/hero-visual.png';
import { floatingDashboard, heroFadeIn, heroItem, heroStagger } from '@/modules/landing/animations/landingMotion';
import { introConfig } from '@/components/intro';
import { useIntro } from '@/components/intro/useIntro';
import { useLogoDockScroll } from '@/components/intro/useLogoDockScroll';
import { LandingButton } from '@/modules/landing/shared/LandingButton';
import { landingTokens } from '@/modules/landing/constants/tokens';
import { CTA_BUTTON_CLASSNAME, ctaButtonStyle } from '@/modules/landing/constants/ctaButton';
import { useLandingTheme } from '@/modules/landing/theme/useLandingTheme';
import { fluid } from '@/modules/landing/utils/scale';
import { cn } from '@/lib/utils';

/** Fluid type/spacing scale for the hero copy block — interpolates 375px → 1440px viewport. */
const HERO_HEADING_SIZE = fluid(28, 60);
const HERO_BODY_SIZE = fluid(16, 18);

/** BG Line Objects — faint vertical rhythm lines behind hero content. */
// const LINE_PAD = 32;
// const LINE_GAP = 55.04;
// const LINE_COUNT = 26;
// const LINE_OPACITY = 0.02;
// const LINE_WEIGHT = 2;

// function VerticalGuideLines() {
//   return (
//     <div aria-hidden className="pointer-events-none absolute inset-0">
//       {Array.from({ length: LINE_COUNT }, (_, index) => {
//         const left = LINE_PAD + index * LINE_GAP;
//         return (
//           <span
//             key={left}
//             className="absolute top-0 h-full"
//             style={{
//               left,
//               width: LINE_WEIGHT,
//               marginLeft: -LINE_WEIGHT / 2,
//               backgroundColor: `rgba(0,0,0,${LINE_OPACITY})`
//             }}
//           />
//         );
//       })}
//     </div>
//   );
// }

/**
 * YAKA mark + "A YAKA Brand" caption, pinned top-right of the hero.
 * Reversible: fades out once the page scrolls past `logoDockScrollY` (where the
 * navbar's own mark takes over) and fades back in the moment you scroll back up —
 * it never "finishes" and disappears for good like the one-time landing flight does.
 */
function YakaHeroMark() {
  const { isLogoAtHero } = useIntro();
  const pastThreshold = useLogoDockScroll();

  return (
    <div
      id={introConfig.heroAnchorId}
      className="pointer-events-none absolute top-[4.25rem] right-2 z-40 sm:right-3 md:top-20 md:right-4 lg:top-24 lg:right-8 xl:right-12"
      style={{ width: introConfig.heroLogoSize, height: introConfig.heroLogoSize }}
      aria-hidden
    >
      {isLogoAtHero ? (
        <motion.div
          className="flex h-full w-full flex-col items-center justify-center gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: pastThreshold ? 0 : 1 }}
          transition={{ duration: 0.35 }}
        >
          <img
            src={introConfig.iconLogo}
            alt=""
            className="h-6 w-6 object-contain sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-14 lg:w-14 dark:brightness-0 dark:invert"
            decoding="async"
            draggable={false}
          />
          <p className="m-0 whitespace-nowrap text-[9px] leading-none font-medium dark:text-[#ffffff] text-[#188f44] sm:text-[10px] md:text-[11px]">
            A <span className="font-bold">YAKA</span> Brand
          </p>
        </motion.div>
      ) : null}
    </div>
  );
}

function HeroCopy({
  onPrimary,
  onSecondary,
  introReady
}: {
  onPrimary: () => void;
  onSecondary: () => void;
  introReady: boolean;
}) {
  return (
    <motion.div
      className="flex w-full max-w-[600px] flex-col items-center gap-10 text-center lg:max-w-[575px] lg:items-start lg:text-left"
      variants={heroStagger}
      initial="hidden"
      animate={introReady ? 'visible' : 'hidden'}
    >
      <div className="flex w-full flex-col items-center gap-6 lg:items-start">
        <motion.h1
          variants={heroItem}
          style={{ fontSize: HERO_HEADING_SIZE }}
          className="m-0 w-full leading-[1.26] tracking-[-0.02em] text-[#000d00] capitalize [font-family:'Bricolage_Grotesque',sans-serif] dark:text-white"
        >
          <span className="font-bold">Simplifying HR Management </span>
          <span className="font-thin">for a Modern Workplace</span>
        </motion.h1>
        <motion.p
          variants={heroItem}
          style={{ fontSize: HERO_BODY_SIZE }}
          className="m-0 w-full leading-[1.5] font-normal text-[#000d00]/70 [font-family:Jost,sans-serif] dark:text-white/70"
        >
          Orgatry delivers smart HRMS solutions that streamline operations, empower employees, and drive business
          growth.
        </motion.p>
      </div>
      <motion.div
        variants={heroItem}
        className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row lg:items-start"
      >
        <LandingButton
          variant="primary"
          onClick={onPrimary}
          style={ctaButtonStyle}
          className={cn(CTA_BUTTON_CLASSNAME, 'w-full sm:w-auto')}
          aria-label="Get in touch"
        >
          Get in Touch
        </LandingButton>
        <LandingButton
          variant="secondary"
          onClick={onSecondary}
          style={ctaButtonStyle}
          className="h-auto w-full rounded-[12px] border !border-[#e2e2e2] bg-white uppercase [font-family:Jost,sans-serif] text-[#000d00] focus-visible:ring-[#188f44]/40 sm:w-auto dark:!border-white/15 dark:bg-transparent"
          aria-label="Request a demo"
        >
          Request a Demo
        </LandingButton>
      </motion.div>
    </motion.div>
  );
}

/**
 * Hero Section — two-column layout (copy left, dashboard visual right) that
 * collapses to a stacked, centered layout below `lg`. The dashboard visual
 * (`hero-visual.png`) is a single pre-composed asset that already includes
 * the floating metric cards and scroll accent, so it renders as one image.
 */
export function HeroSection() {
  const navigate = useNavigate();
  const { isContentReady } = useIntro();
  const { theme } = useLandingTheme();

  const goContact = useCallback(() => {
    navigate('/contact');
  }, [navigate]);

  return (
    <motion.section
      id="home"
      aria-label="Hero"
      className="relative scroll-mt-0 overflow-hidden"
      variants={heroFadeIn}
      initial="hidden"
      animate={isContentReady ? 'visible' : 'hidden'}
    >
      <YakaHeroMark />
{/* 
      <VerticalGuideLines /> */}

      <div
        className="relative mx-auto flex max-w-[1440px] flex-col items-center pt-[140px] pb-16 md:pt-[160px] md:pb-20 lg:flex-row lg:items-center lg:justify-between lg:pt-[190px] lg:pb-24"
        style={{ paddingInline: `clamp(1.5rem, 6vw, ${landingTokens.gutter}px)` }}
      >
        <HeroCopy onPrimary={goContact} onSecondary={goContact} introReady={isContentReady} />

        <motion.div
          className="relative z-10 w-full max-w-[520px] sm:max-w-[600px] lg:max-w-none lg:flex-1"
          variants={floatingDashboard}
          initial="hidden"
          animate={isContentReady ? 'visible' : 'hidden'}
        >
          <img
            src={heroVisual}
            alt="Orgatry HR dashboard showing employee metrics, team performance analytics, and workforce growth statistics"
            width={2063}
            height={1000}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            draggable={false}
            className="h-full w-full select-none"
          />
        </motion.div>
      </div>

      {/* Bottom fade — softens the section boundary into the next block. No blur: it was bleeding onto the CTA row above it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-12 md:h-16 lg:h-20"
        style={{
          background:
            theme === 'dark'
              ? 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 47.99%, rgb(0,0,0) 100%)'
              : 'linear-gradient(180deg, rgba(243,243,245,0) 0%, rgba(243,243,245,0.3) 47.99%, rgb(243,243,245) 100%)'
        }}
      />
    </motion.section>
  );
}
