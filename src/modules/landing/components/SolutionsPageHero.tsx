import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { heroItem, heroStagger } from '@/modules/landing/animations/landingMotion';
import { landingTokens } from '@/modules/landing/constants/tokens';
import { LandingButton } from '@/modules/landing/shared/LandingButton';
import { fluid } from '@/modules/landing/utils/scale';
import { ctaButtonStyle } from '@/modules/landing/constants/ctaButton';

/** Figma `2070:4003` — "HR Solutions Built Around Your Entire Workforce". */
const HEADING_SIZE = fluid(32, 64);
const BODY_SIZE = fluid(16, 22);

export function SolutionsPageHero() {
  const navigate = useNavigate();

  return (
    <section aria-labelledby="solutions-hero-heading" className="relative overflow-x-hidden bg-white md:py-20 py-10 !pt-40">
      <div
        className="mx-auto flex w-full max-w-[1440px] flex-col items-start"
        style={{
          paddingInline: `clamp(1.5rem, 6vw, ${landingTokens.gutter}px)`,
          paddingTop: landingTokens.navbarTop + landingTokens.navbarHeight + fluid(48, 96),
        }}
      >
        <motion.div
          className="flex w-full flex-col items-start"
          style={{ gap: fluid(20, 40) }}
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <div className="flex w-full flex-col items-start" style={{ gap: fluid(16, 24) }}>
            <motion.h1
              id="solutions-hero-heading"
              variants={heroItem}
              className="m-0 w-full max-w-[900px] text-[#000d00] capitalize [font-family:'Bricolage_Grotesque',sans-serif]"
              style={{ fontSize: HEADING_SIZE, lineHeight: 1.26, letterSpacing: '-0.02em' }}
            >
              <span className="font-semibold">HR Solutions </span>
              <span className="font-normal">Built Around Your Entire Workforce</span>
            </motion.h1>
            <motion.p
              variants={heroItem}
              className="m-0 w-full max-w-[720px] font-normal text-[#000d00] [font-family:Jost,sans-serif]"
              style={{ fontSize: BODY_SIZE, lineHeight: 1.5 }}
            >
              From employee management to recruitment and performance, Orgatry brings every HR workflow together in one
              simple, connected platform.
            </motion.p>
          </div>

          <motion.div variants={heroItem} className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
            <LandingButton
              variant="primary"
              onClick={() => navigate('/contact')}
              style={ctaButtonStyle}
              className="h-auto w-full rounded-[12px] bg-none bg-[#188f44] uppercase shadow-none [font-family:Jost,sans-serif] hover:shadow-none sm:w-auto"
              aria-label="Explore solutions"
            >
              Explore Solutions
            </LandingButton>
            <LandingButton
              variant="secondary"
              onClick={() => navigate('/contact')}
              style={ctaButtonStyle}
              className="h-auto w-full rounded-[12px] border !border-[#e2e2e2] bg-white uppercase [font-family:Jost,sans-serif] text-[#000d00] focus-visible:ring-[#188f44]/40 sm:w-auto"
              aria-label="Request a demo"
            >
              Request a Demo
            </LandingButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
