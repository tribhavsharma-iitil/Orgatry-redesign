import { motion } from 'framer-motion';
import { fadeIn, fadeInUp } from '@/modules/landing/animations/landingMotion';
import { landingTokens } from '@/modules/landing/constants/tokens';
import { fluid } from '@/modules/landing/utils/scale';

/** Figma `2133:6642` — "Built To Make HR Better" panel with Vision / Mission cards. */
const HEADING_SIZE = fluid(24, 36);
const BODY_SIZE = fluid(14, 18);
const CARD_TITLE_SIZE = fluid(22, 30);
const CARD_BODY_SIZE = fluid(14, 15.5);

const MISSION_CARDS = [
  {
    id: 'vision',
    title: 'Our Vision',
    description: 'To simplify workforce management through accessible, intelligent, and people-focused technology.'
  },
  {
    id: 'mission',
    title: 'Our Mission',
    description: 'To create a world where every business can manage its people with clarity, confidence, and ease.'
  }
] as const;

export function AboutUsMissionPanel() {
  return (
    <motion.section
      aria-label="Built to make HR better"
      className="relative overflow-x-hidden bg-[#f9f9f9] dark:bg-transparent md:py-20 py-10  pb-10 md:pb-20"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="mx-auto w-full max-w-[1440px]" style={{ paddingInline: `clamp(1.5rem, 6vw, ${landingTokens.gutter}px)` }}>
        <motion.div
          className="flex w-full flex-col items-start rounded-[20px] border !border-[#D4D4D499] bg-white dark:!border-[rgba(46,46,46,0.6)] dark:bg-black"
          style={{ padding: fluid(24, 50), gap: fluid(28, 50) }}
          variants={fadeInUp}
        >
          <div className="flex w-full flex-col items-start" style={{ gap: fluid(16, 30) }}>
            <h2
              className="m-0 w-full text-[#000d00] capitalize [font-family:'Bricolage_Grotesque',sans-serif] dark:text-white"
              style={{ fontSize: HEADING_SIZE, fontWeight: 500 }}
            >
              Built To Make HR Better
            </h2>
            <p
              className="m-0 w-full font-normal text-[rgba(0,0,0,0.8)] [font-family:Jost,sans-serif] dark:text-white"
              style={{ fontSize: BODY_SIZE, lineHeight: 1.6 }}
            >
              We rebuild traditional business models as scalable, technology-driven systems. Orgatry&rsquo;s approach
              is consistent across industries — bring structure and intelligence to fragmented processes.
            </p>
            <p
              className="m-0 w-full font-semibold text-[rgba(0,0,0,0.8)] [font-family:Jost,sans-serif] dark:text-white"
              style={{ fontSize: BODY_SIZE, lineHeight: 1.6 }}
            >
              Our goal is to create a systemic infrastructure that powers future industries.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 md:grid-cols-2" style={{ gap: fluid(16, 24) }}>
            {MISSION_CARDS.map((card) => (
              <div
                key={card.id}
                className="flex w-full flex-col items-start rounded-[20px] border !border-[#D4D4D499] bg-[#f9f9f9] dark:!border-[rgba(46,46,46,0.6)] dark:bg-[rgba(255,255,255,0.05)]"
                style={{ padding: fluid(20, 32), gap: fluid(14, 20) }}
              >
                <h3
                  className="m-0 text-[#000d00] [font-family:'Bricolage_Grotesque',sans-serif] dark:text-white"
                  style={{ fontSize: CARD_TITLE_SIZE, letterSpacing: '-0.02em' }}
                >
                  {card.title}
                </h3>
                <p
                  className="m-0 font-normal text-[#878c91] [font-family:Jost,sans-serif]"
                  style={{ fontSize: CARD_BODY_SIZE, lineHeight: 1.5 }}
                >
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
