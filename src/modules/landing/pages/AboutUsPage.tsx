import '@/modules/landing/styles/landing-fonts.css';
import '@/modules/landing/styles/landing-shell.css';
import { AboutUsMissionPanel } from '@/modules/landing/components/AboutUsMissionPanel';
import { AboutUsPageHero } from '@/modules/landing/components/AboutUsPageHero';
import { AboutUsValues } from '@/modules/landing/components/AboutUsValues';
import { LandingFooter } from '@/modules/landing/components/LandingFooter';
import { LandingNavbar } from '@/modules/landing/components/LandingNavbar';
import { useLandingDocumentMeta } from '@/modules/landing/hooks/useLandingDocumentMeta';
import { CtaBanner } from '@/modules/landing/shared/CtaBanner';
import { LandingThemeProvider } from '@/modules/landing/theme/LandingThemeProvider';

export function AboutUsPage() {
  useLandingDocumentMeta({
    title: 'About Us — Orgatry HRMS',
    description: 'Orgatry brings people, processes, and workforce data together in one intuitive HR platform.'
  });

  return (
    <LandingThemeProvider>
      <main className="relative min-h-screen overflow-x-hidden bg-[#f9f9f9] text-[#171717] dark:bg-black dark:text-white [font-family:Inter,sans-serif]">
        <LandingNavbar />
        <AboutUsPageHero />
        <AboutUsMissionPanel />
        <AboutUsValues />
        <CtaBanner />
        <LandingFooter withContactOverlap={false} />
      </main>
    </LandingThemeProvider>
  );
}
