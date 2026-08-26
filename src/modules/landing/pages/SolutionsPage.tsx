import '@/modules/landing/styles/landing-fonts.css';
import '@/modules/landing/styles/landing-shell.css';
import { LandingFooter } from '@/modules/landing/components/LandingFooter';
import { LandingNavbar } from '@/modules/landing/components/LandingNavbar';
import { SolutionsFeatureGrid } from '@/modules/landing/components/SolutionsFeatureGrid';
import { SolutionsJourney } from '@/modules/landing/components/SolutionsJourney';
import { SolutionsPageHero } from '@/modules/landing/components/SolutionsPageHero';
import { SolutionsScale } from '@/modules/landing/components/SolutionsScale';
import { useLandingDocumentMeta } from '@/modules/landing/hooks/useLandingDocumentMeta';
import { CtaBanner } from '@/modules/landing/shared/CtaBanner';
import { LandingThemeProvider } from '@/modules/landing/theme/LandingThemeProvider';

export function SolutionsPage() {
  useLandingDocumentMeta({
    title: 'Solutions — Orgatry HRMS',
    description: 'One system for every HR workflow — employee management, compliance, leave, recruitment, and payroll in one place.'
  });

  return (
    <LandingThemeProvider>
      <main className="relative min-h-screen overflow-x-hidden bg-white text-[#171717] dark:bg-black dark:text-white [font-family:Inter,sans-serif]">
        <LandingNavbar />
        <SolutionsPageHero />
        <SolutionsFeatureGrid />
        <SolutionsJourney />
        <SolutionsScale />
        <CtaBanner />
        <LandingFooter withContactOverlap={false} />
      </main>
    </LandingThemeProvider>
  );
}
