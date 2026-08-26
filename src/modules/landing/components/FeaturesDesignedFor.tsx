import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Plug,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Settings,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { fadeIn, fadeInUp, featureCardStagger } from '@/modules/landing/animations/landingMotion';
import { landingTokens } from '@/modules/landing/constants/tokens';
import { useLandingTheme } from '@/modules/landing/theme/useLandingTheme';
import { fluid } from '@/modules/landing/utils/scale';

/** `#rrggbb` → `rgba(r,g,b,alpha)` — used to tint each card's icon color for its dark-mode tile background. */
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Figma `2133:6531`-style icon grid — "Designed For HR. Loved By Employees.". */
const HEADING_SIZE = fluid(24, 36);
const BODY_SIZE = fluid(15, 18);
const CARD_TITLE_SIZE = fluid(17, 20);
const CARD_BODY_SIZE = fluid(14, 15.5);
const ICON_TILE_SIZE = fluid(48, 60);

type DesignedForCard = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tileBg: string;
  tileBorder: string;
  iconColor: string;
};

const DESIGNED_FOR_CARDS: readonly DesignedForCard[] = [
  {
    id: 'clean-interface',
    title: 'Clean, Intuitive Interface',
    description: "A dashboard that's easy to navigate from day one, no lengthy onboarding or training needed.",
    icon: LayoutDashboard,
    tileBg: '#f2faff',
    tileBorder: '#d8f1ff',
    iconColor: '#188f44'
  },
  {
    id: 'enterprise-security',
    title: 'Enterprise-Grade Security',
    description: 'Role-based permissions and data protection built in so your workforce data stays safe.',
    icon: ShieldCheck,
    tileBg: '#fff2f2',
    tileBorder: '#ffd8d8',
    iconColor: '#e0575b'
  },
  {
    id: 'seamless-integrations',
    title: 'Seamless Integrations',
    description: 'Connect with payroll, accounting, and communication tools your organization already uses.',
    icon: Plug,
    tileBg: '#f2fff2',
    tileBorder: '#c6f5bc',
    iconColor: '#188f44'
  },
  {
    id: 'mobile-friendly',
    title: 'Mobile Friendly',
    description: 'Employees can request leave, check schedules, and update information from any device.',
    icon: Smartphone,
    tileBg: '#f8f3ff',
    tileBorder: '#e7d8ff',
    iconColor: '#8b5cf6'
  },
  {
    id: 'real-time-updates',
    title: 'Real-Time Updates',
    description: 'Changes, approvals, and alerts propagate instantly so your team always has current information.',
    icon: RefreshCw,
    tileBg: '#fff2fb',
    tileBorder: '#ffd8ef',
    iconColor: '#d63d94'
  },
  {
    id: 'dedicated-support',
    title: 'Dedicated Support',
    description: 'Our team is available to help you set up, troubleshoot, and get the most from the platform.',
    icon: Settings,
    tileBg: '#fff6ee',
    tileBorder: '#ffecd8',
    iconColor: '#e08a2f'
  }
] as const;

function DesignedForCardPanel({ card }: { card: DesignedForCard }) {
  const Icon = card.icon;
  const { theme } = useLandingTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div
      variants={fadeInUp}
      className="flex w-full flex-col items-start gap-5 rounded-[16px] border !border-[#D4D4D499] bg-white dark:!border-[rgba(46,46,46,0.6)] dark:bg-[rgba(255,255,255,0.05)]"
      style={{ padding: fluid(20, 32) }}
    >
      <div
        className="flex shrink-0 items-center justify-center rounded-[10px] border"
        style={{
          width: ICON_TILE_SIZE,
          height: ICON_TILE_SIZE,
          backgroundColor: isDark ? hexToRgba(card.iconColor, 0.1) : card.tileBg,
          borderColor: isDark ? hexToRgba(card.iconColor, 0.15) : card.tileBorder
        }}
      >
        <Icon className="size-[45%]" style={{ color: card.iconColor }} aria-hidden strokeWidth={1.75} />
      </div>
      <div className="flex w-full flex-col items-start gap-2.5">
        <h3
          className="m-0 text-[#000d00] [font-family:'Bricolage_Grotesque',sans-serif] dark:text-white"
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
