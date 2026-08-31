import '@/modules/landing/styles/landing-fonts.css';
import '@/modules/landing/styles/landing-shell.css';
import { ContactSection } from '@/modules/landing/components/ContactSection';
import { LandingFooter } from '@/modules/landing/components/LandingFooter';
import { LandingNavbar } from '@/modules/landing/components/LandingNavbar';
// import { landingTokens } from '@/modules/landing/constants/tokens';
import { useLandingDocumentMeta } from '@/modules/landing/hooks/useLandingDocumentMeta';
import { LandingThemeProvider } from '@/modules/landing/theme/LandingThemeProvider';

export function ContactPage() {
  useLandingDocumentMeta({
    title: 'Contact — Orgatry HRMS',
    description: "Tell us about your business. We'll show you how Orgatry fits."
  });

  return (
    <LandingThemeProvider>
      <main className="relative min-h-screen overflow-x-hidden bg-[#F7F7F7CC] text-[#171717] dark:bg-black dark:text-white [font-family:Inter,sans-serif]">
        <LandingNavbar />
        {/* <div style={{ paddingTop: landingTokens.navbarTop + landingTokens.navbarHeight }} /> */}
        <ContactSection />
        <LandingFooter withContactOverlap={false} />
      </main>
    </LandingThemeProvider>
  );
}
