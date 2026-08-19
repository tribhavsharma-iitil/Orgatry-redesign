import '@/modules/landing/styles/landing-fonts.css';
import '@/modules/landing/styles/landing-shell.css';
import { FeaturesDesignedFor } from '@/modules/landing/components/FeaturesDesignedFor';
import { FeaturesPageHero } from '@/modules/landing/components/FeaturesPageHero';
import { FeaturesShowcaseRows } from '@/modules/landing/components/FeaturesShowcaseRows';
import { LandingFooter } from '@/modules/landing/components/LandingFooter';
import { LandingNavbar } from '@/modules/landing/components/LandingNavbar';
import { useLandingDocumentMeta } from '@/modules/landing/hooks/useLandingDocumentMeta';
import { CtaBanner } from '@/modules/landing/shared/CtaBanner';

export function FeaturesPage() {
  useLandingDocumentMeta({
    title: 'Features — Orgatry HRMS',
    description: 'Powerful HR features for simpler everyday work — employee management, leave, recruitment, and performance in one platform.'
  });

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white text-[#171717] [font-family:Inter,sans-serif]">
      <LandingNavbar />
      <FeaturesPageHero />
      <FeaturesShowcaseRows />
      <FeaturesDesignedFor />
      <CtaBanner />
      <LandingFooter withContactOverlap={false} />
    </main>
  );
}
