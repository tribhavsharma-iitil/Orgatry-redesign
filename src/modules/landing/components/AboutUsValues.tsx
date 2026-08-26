import { motion } from 'framer-motion';
import { Heart, Shield, Sparkles, Target, RefreshCw } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { fadeIn, fadeInUp, featureCardStagger } from '@/modules/landing/animations/landingMotion';
import { landingTokens } from '@/modules/landing/constants/tokens';
import { fluid } from '@/modules/landing/utils/scale';

/** Figma `2133:6531` — "The Values That Guide Everything We Build". */
const HEADING_SIZE = fluid(24, 36);
const CARD_TITLE_SIZE = fluid(17, 20);
const CARD_BODY_SIZE = fluid(14, 15.5);
const ICON_TILE_SIZE = fluid(48, 60);

type ValueCard = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const VALUE_CARDS: readonly ValueCard[] = [
  { id: 'people-first', title: 'People First', description: 'We design technology around the people who use it.', icon: Heart },
  { id: 'keep-simple', title: 'Keep It Simple', description: 'Complex HR processes should feel simple and intuitive.', icon: Sparkles },
  { id: 'build-purpose', title: 'Build With Purpose', description: 'Every feature should solve a real business problem.', icon: Target },
  { id: 'trust-security', title: 'Trust & Security', description: 'Workforce data deserves the highest level of care.', icon: Shield },
  { id: 'improvement', title: 'Improvement', description: 'We continuously learn, improve, and evolve.', icon: RefreshCw }
] as const;

function ValueCardPanel({ card }: { card: ValueCard }) {
  const Icon = card.icon;
  return (
    <motion.div
      variants={fadeInUp}
      className="flex w-full flex-col items-start gap-5 rounded-[16px] border !border-[#D4D4D499] bg-white dark:!border-[rgba(46,46,46,0.6)] dark:bg-[rgba(255,255,255,0.05)]"
      style={{ padding: fluid(8, 16) }}
    >
      <div
        className="flex shrink-0 items-center justify-center rounded-[10px] border !border-[#d8f1ff] !bg-[#f2faff] dark:!border-[rgba(24,143,68,0.15)] dark:!bg-[rgba(24,143,68,0.1)]"
        style={{ width: ICON_TILE_SIZE, height: ICON_TILE_SIZE }}
      >
        <Icon className="size-[45%] text-[#188f44]" aria-hidden strokeWidth={1.75} />
      </div>
      <div className="flex w-full flex-col items-start gap-2.5">
        <h3
          className="m-0 text-[#000d00] [font-family:'Bricolage_Grotesque',sans-serif] whitespace-nowrap dark:text-white"
          style={{ fontSize: CARD_TITLE_SIZE, letterSpacing: '-0.03em' }}
        >
          {card.title}
        </h3>
        <p
          className="m-0 font-normal text-[#878c91] [font-family:Jost,sans-serif] mb-4"
          style={{ fontSize: CARD_BODY_SIZE, lineHeight: 1.5 }}
        >
          {card.description}
        </p>
      </div>
    </motion.div>
  );
}

export function AboutUsValues() {
  return (
    <motion.section
      aria-labelledby="about-values-heading"
      className="relative overflow-x-hidden bg-[#f9f9f9] dark:bg-transparent md:py-20 py-10  md:pb-20 pb-10"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div
        className="mx-auto flex w-full max-w-[1440px] flex-col items-start"
        style={{ paddingInline: `clamp(1.5rem, 6vw, ${landingTokens.gutter}px)`, gap: fluid(32, 60) }}
      >
        <motion.header className="flex w-full flex-col items-start" variants={fadeInUp}>
          <h2
            id="about-values-heading"
            className="m-0 w-full text-[#000d00] capitalize [font-family:'Bricolage_Grotesque',sans-serif] dark:text-white"
            style={{ fontSize: HEADING_SIZE, fontWeight: 500 }}
          >
            The Values That Guide Everything We Build
          </h2>
        </motion.header>

        <motion.div
          className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
          style={{ gap: fluid(12, 20) }}
          variants={featureCardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {VALUE_CARDS.map((card) => (
            <ValueCardPanel key={card.id} card={card} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
