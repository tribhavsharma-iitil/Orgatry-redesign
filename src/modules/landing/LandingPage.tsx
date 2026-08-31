import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { IntroProvider, useIntro } from '@/components/intro';
import '@/modules/landing/styles/landing-fonts.css';
import '@/modules/landing/styles/landing-shell.css';
import landingBg from '@/modules/landing/assets/images/landing_bg.png';
import { AboutSection } from '@/modules/landing/components/AboutSection';
import { FaqSection } from '@/modules/landing/components/FaqSection';
import { HeroSection } from '@/modules/landing/components/HeroSection';
import { LandingFooter } from '@/modules/landing/components/LandingFooter';
import { LandingNavbar } from '@/modules/landing/components/LandingNavbar';
import { SolutionsSection } from '@/modules/landing/components/SolutionsSection';
import { TestimonialsSection } from '@/modules/landing/components/TestimonialsSection';
import { WhyChooseUsSection } from '@/modules/landing/components/WhyChooseUsSection';
import { useLandingDocumentMeta } from '@/modules/landing/hooks/useLandingDocumentMeta';
import { scrollToSectionId } from '@/modules/landing/hooks/useSmoothScroll';
import { LandingThemeProvider } from '@/modules/landing/theme/LandingThemeProvider';
import { useLandingTheme } from '@/modules/landing/theme/useLandingTheme';
import { CtaBanner } from './shared/CtaBanner';

/** Scroll to `/#section` after intro so anchors from legal pages land correctly. */
function LandingHashScroller() {
  const location = useLocation();
  const { isContentReady } = useIntro();

  useEffect(() => {
    if (!isContentReady) {
      return;
    }

    const hash = location.hash.replace(/^#/, '');
    if (!hash || hash === 'home') {
      return;
    }

    const timer = window.setTimeout(() => {
      scrollToSectionId(hash);
    }, 50);

    return () => window.clearTimeout(timer);
  }, [isContentReady, location.hash]);

  return null;
}

function LandingMain() {
  const { theme } = useLandingTheme();

  return (
    <main
      className="relative min-h-screen overflow-x-hidden bg-white text-[#171717] dark:bg-black dark:text-white [font-family:Inter,sans-serif]"
      style={{
        backgroundImage: theme === 'dark' ? 'none' : `url(${landingBg})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
        backgroundSize: '100% auto'
      }}
    >
      <LandingNavbar />
      <HeroSection />
      <AboutSection />
      <SolutionsSection />
      <WhyChooseUsSection />
      <FaqSection />
      <TestimonialsSection />
      <CtaBanner />
      <LandingFooter />
    </main>
  );
}

export function LandingPage() {
  useLandingDocumentMeta();

  return (
    <LandingThemeProvider>
      <IntroProvider>
        <LandingHashScroller />
        <LandingMain />
      </IntroProvider>
    </LandingThemeProvider>
  );
}
