import { motion } from 'framer-motion';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fadeIn, fadeInUp } from '@/modules/landing/animations/landingMotion';
import { landingTokens } from '@/modules/landing/constants/tokens';
import { LandingButton } from '@/modules/landing/shared/LandingButton';
import { fluid } from '@/modules/landing/utils/scale';
import { ctaButtonStyle } from '../constants/ctaButton';

/** Figma `2106:5239` — "Section 3 - Dark CTA Banner", reused verbatim on Solutions, Features, and About Us. */
const BADGE_TEXT_SIZE = fluid(12, 14);
const HEADING_SIZE = fluid(26, 40);
const BODY_SIZE = fluid(15, 20);

export function CtaBanner() {
  const navigate = useNavigate();

  const goContact = useCallback(() => {
    navigate('/contact');
  }, [navigate]);

  return (
    <motion.section
      aria-labelledby="cta-banner-heading"
      className="relative overflow-x-hidden bg-[#15803d]"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div
        className="mx-auto flex w-full max-w-[1440px] flex-col items-center text-center"
        style={{ paddingInline: `clamp(1.5rem, 6vw, ${landingTokens.gutter}px)`, paddingBlock: fluid(56, 100), gap: fluid(28, 48) }}
      >
        <motion.div className="flex w-full flex-col items-center" style={{ gap: fluid(16, 24) }} variants={fadeInUp}>
          <span
            className="inline-flex items-center rounded-[100px] bg-[rgba(255,255,255,0.08)] font-semibold text-white uppercase [font-family:'Bricolage_Grotesque',sans-serif]"
            style={{ fontSize: BADGE_TEXT_SIZE, paddingInline: fluid(12, 16), paddingBlock: fluid(6, 8) }}
          >
            Ready to Simplify Your HR?
          </span>
          <h2
            id="cta-banner-heading"
            className="m-0 max-w-[800px] text-white capitalize [font-family:'Bricolage_Grotesque',sans-serif]"
            style={{ fontSize: HEADING_SIZE, fontWeight: 500 }}
          >
            Let&rsquo;s Make HR Management Simpler.
          </h2>
          <p
            className="m-0 max-w-[750px] font-normal text-white [font-family:Jost,sans-serif]"
            style={{ fontSize: BODY_SIZE, lineHeight: 1.26 }}
          >
            Tell us about your workforce needs and discover how Orgatry can help you streamline HR, empower employees,
            and grow with confidence.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <LandingButton
            variant="dark"
            onClick={goContact}
            style={ctaButtonStyle}
            className="h-auto rounded-[12px] !bg-white uppercase !text-[#15803d] shadow-none [font-family:Jost,sans-serif] hover:opacity-90 focus-visible:ring-white/50 focus-visible:ring-offset-[#15803d]"
            aria-label="Get started"
          >
            Get Started
          </LandingButton>
        </motion.div>
      </div>
    </motion.section>
  );
}
