import { motion } from 'framer-motion';
import { fadeIn, fadeInUp, featureCardStagger } from '@/modules/landing/animations/landingMotion';
import { landingTokens } from '@/modules/landing/constants/tokens';
import { fluid } from '@/modules/landing/utils/scale';

/** Figma `2070:4626` — "HR Management That Scales With Your Business". */
const HEADING_SIZE = fluid(24, 36);
const TAG_TEXT_SIZE = fluid(12.5, 14);
const CARD_TITLE_SIZE = fluid(17, 20);
const CARD_BODY_SIZE = fluid(14, 15.5);

type ScaleCard = {
  id: string;
  tag: string;
  title: string;
  description: string;
  tagBg: string;
  tagBorder: string;
};

const SCALE_CARDS: readonly ScaleCard[] = [
  {
    id: 'growing-businesses',
    tag: '2–50 employees',
    title: 'Growing Businesses',
    description: 'Build organized HR processes without adding unnecessary complexity.',
    tagBg: '#f2faff',
    tagBorder: '#d8f1ff'
  },
  {
    id: 'mid-sized-enterprises',
    tag: '2–50 employees',
    title: 'Mid-Sized Enterprises',
    description: 'Manage growing teams, flows, and workforce data from a centralized platform.',
    tagBg: '#fff2f2',
    tagBorder: '#ffd8d8'
  },
  {
    id: 'hr-teams',
    tag: '2–50 employees',
    title: 'HR Teams',
    description: 'Reduce administrative work and spend more time focusing on your people.',
    tagBg: '#fff2fb',
    tagBorder: '#ffd8ef'
  },
  {
    id: 'leadership-teams',
    tag: '2–50 employees',
    title: 'Leadership Teams',
    description: 'Get clearer workforce insights to make smarter business decisions.',
    tagBg: '#f2fff2',
    tagBorder: '#c6f5bc'
  }
] as const;

function ScaleCardPanel({ card }: { card: ScaleCard }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex w-full flex-col items-start gap-5 rounded-[20px] border !border-[#D4D4D499] bg-white"
      style={{ padding: fluid(18, 24) }}
    >
      <div className="flex w-full flex-col items-start gap-3">
        <span
          className="inline-flex items-center justify-center rounded-[8px] border whitespace-nowrap text-black [font-family:Jost,sans-serif]"
          style={{
            backgroundColor: card.tagBg,
            borderColor: card.tagBorder,
            fontSize: TAG_TEXT_SIZE,
            padding: `${fluid(8, 10.5)} ${fluid(12, 16)}`
          }}
        >
          {card.tag}
        </span>
        <h3
          className="m-0 text-[#000d00] [font-family:'Bricolage_Grotesque',sans-serif]"
          style={{ fontSize: CARD_TITLE_SIZE, letterSpacing: '-0.03em' }}
        >
          {card.title}
        </h3>
      </div>
      <p
        className="m-0 font-normal text-[#878c91] [font-family:Jost,sans-serif]"
        style={{ fontSize: CARD_BODY_SIZE, lineHeight: 1.5 }}
      >
        {card.description}
      </p>
    </motion.div>
  );
}

export function SolutionsScale() {
  return (
    <motion.section
      aria-labelledby="solutions-scale-heading"
      className="relative overflow-x-hidden bg-[#F7F7F7CC] md:py-20 py-10"
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
            id="solutions-scale-heading"
            className="m-0 w-full text-[#000d00] capitalize [font-family:'Bricolage_Grotesque',sans-serif]"
            style={{ fontSize: HEADING_SIZE, fontWeight: 500 }}
          >
            HR Management That Scales With Your Business
          </h2>
        </motion.header>

        <motion.div
          className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ gap: fluid(16, 24) }}
          variants={featureCardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {SCALE_CARDS.map((card) => (
            <ScaleCardPanel key={card.id} card={card} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
