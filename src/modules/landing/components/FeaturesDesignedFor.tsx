import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import cleanInterfaceIcon from '@/modules/landing/assets/icons/designed-for-clean-interface.svg';
import enterpriseSecurityIcon from '@/modules/landing/assets/icons/designed-for-enterprise-security.svg';
import seamlessIntegrationsIcon from '@/modules/landing/assets/icons/designed-for-seamless-integrations.svg';
import mobileFriendlyIcon from '@/modules/landing/assets/icons/designed-for-mobile-friendly.svg';
import realTimeUpdatesIcon from '@/modules/landing/assets/icons/designed-for-real-time-updates.svg';
import dedicatedSupportIcon from '@/modules/landing/assets/icons/designed-for-dedicated-support.svg';
import { fadeIn, fadeInUp, featureCardStagger } from '@/modules/landing/animations/landingMotion';
import { landingTokens } from '@/modules/landing/constants/tokens';
import { fluid } from '@/modules/landing/utils/scale';

/** Figma `2133:6531`-style icon grid — "Designed For HR. Loved By Employees.". */
const HEADING_SIZE = fluid(24, 36);
const BODY_SIZE = fluid(15, 18);
const CARD_TITLE_SIZE = fluid(17, 20);
const CARD_BODY_SIZE = fluid(14, 15.5);
const ICON_TILE_SIZE = fluid(48, 60);

type VarStyle = CSSProperties & Record<`--${string}`, string | number>;

type DesignedForCard = {
  id: string;
  title: string;
  description: string;
  icon: string;
  tileBg: string;
  tileBorder: string;
  /** Figma dark frame (`2633:7492`) literal values — read directly per card, not derived. */
  tileBgDark: string;
  tileBorderDark: string;
};

const DESIGNED_FOR_CARDS: readonly DesignedForCard[] = [
  {
    id: 'clean-interface',
    title: 'Clean, Intuitive Interface',
    description: "A dashboard that's easy to navigate from day one, no lengthy onboarding or training needed.",
    icon: cleanInterfaceIcon,
    tileBg: '#f2faff',
    tileBorder: '#d8f1ff',
    tileBgDark: 'rgba(242,250,255,0.1)',
    tileBorderDark: 'rgba(216,241,255,0.1)'
  },
  {
    id: 'enterprise-security',
    title: 'Enterprise-Grade Security',
    description: 'Role-based permissions and data protection built in so your workforce data stays safe.',
    icon: enterpriseSecurityIcon,
    tileBg: '#fff2f2',
    tileBorder: '#ffd8d8',
    tileBgDark: 'rgba(255,242,242,0.1)',
    tileBorderDark: 'rgba(255,216,216,0.1)'
  },
  {
    id: 'seamless-integrations',
    title: 'Seamless Integrations',
    description: 'Connect with payroll, accounting, and communication tools your organization already uses.',
    icon: seamlessIntegrationsIcon,
    tileBg: '#fff2fb',
    tileBorder: '#ffd8ef',
    tileBgDark: 'rgba(255,242,251,0.1)',
    tileBorderDark: 'rgba(255,216,239,0.1)'
  },
  {
    id: 'mobile-friendly',
    title: 'Mobile Friendly',
    description: 'Employees can request leave, check schedules, and update information from any device.',
    icon: mobileFriendlyIcon,
    tileBg: '#f8f3ff',
    tileBorder: '#e7d8ff',
    tileBgDark: 'rgba(248,243,255,0.1)',
    tileBorderDark: 'rgba(231,216,255,0.1)'
  },
  {
    id: 'real-time-updates',
    title: 'Real-Time Updates',
    description: 'Changes, approvals, and alerts propagate instantly so your team always has current information.',
    icon: realTimeUpdatesIcon,
    tileBg: '#f2fff2',
    tileBorder: '#c6f5bc',
    tileBgDark: 'rgba(242,255,242,0.1)',
    tileBorderDark: 'rgba(198,245,188,0.1)'
  },
  {
    id: 'dedicated-support',
    title: 'Dedicated Support',
    description: 'Our team is available to help you set up, troubleshoot, and get the most from the platform.',
    icon: dedicatedSupportIcon,
    tileBg: '#fff6ee',
    tileBorder: '#ffecd8',
    tileBgDark: 'rgba(255,246,238,0.1)',
    tileBorderDark: 'rgba(255,236,216,0.1)'
  }
] as const;

function DesignedForCardPanel({ card }: { card: DesignedForCard }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex w-full flex-col items-start gap-5 rounded-[16px] border !border-[#D4D4D499] bg-white dark:!border-[rgba(46,46,46,0.6)] dark:bg-[rgba(255,255,255,0.05)]"
      style={{ padding: fluid(20, 32) }}
    >
      <div
        className="flex shrink-0 items-center justify-center rounded-[10px] border bg-[var(--tile-bg)] dark:bg-[var(--tile-bg-dark)] !border-[var(--tile-border)] dark:!border-[var(--tile-border-dark)]"
        style={
          {
            width: ICON_TILE_SIZE,
            height: ICON_TILE_SIZE,
            '--tile-bg': card.tileBg,
            '--tile-bg-dark': card.tileBgDark,
            '--tile-border': card.tileBorder,
            '--tile-border-dark': card.tileBorderDark
          } as VarStyle
        }
      >
        <img src={card.icon} alt="" className="size-[45%]" aria-hidden />
      </div>
      <div className="flex w-full flex-col items-start gap-2.5">
        <h3
          className="m-0 text-[#000d00] dark:text-white [font-family:'Bricolage_Grotesque',sans-serif]"
          style={{ fontSize: CARD_TITLE_SIZE, letterSpacing: '-0.03em' }}
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
    </motion.div>
  );
}

export function FeaturesDesignedFor() {
  return (
    <motion.section
      aria-labelledby="features-designed-for-heading"
      className="relative overflow-x-hidden bg-[#F7F7F7CC] dark:bg-transparent md:py-20 py-10"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div
        className="mx-auto flex w-full max-w-[1440px] flex-col items-start"
        style={{ paddingInline: `clamp(1.5rem, 6vw, ${landingTokens.gutter}px)`, gap: fluid(32, 60) }}
      >
        <motion.header className="flex w-full flex-col items-start gap-4" variants={fadeInUp}>
          <h2
            id="features-designed-for-heading"
            className="m-0 w-full text-[#000d00] capitalize [font-family:'Bricolage_Grotesque',sans-serif] dark:text-white"
            style={{ fontSize: HEADING_SIZE, fontWeight: 500 }}
          >
            Designed For HR.
            <br />
            Loved By Employees.
          </h2>
          <p
            className="m-0 w-full max-w-[720px] font-normal text-[#000d00] [font-family:Jost,sans-serif] dark:text-white"
            style={{ fontSize: BODY_SIZE, lineHeight: 1.5 }}
          >
            A clean and intuitive experience makes everyday HR tasks easier for everyone, from HR managers and
            administrators to employees and leadership.
          </p>
        </motion.header>

        <motion.div
          className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: fluid(20, 30) }}
          variants={featureCardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {DESIGNED_FOR_CARDS.map((card) => (
            <DesignedForCardPanel key={card.id} card={card} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
