import { motion } from 'framer-motion';
import {
  CalendarClock,
  ClipboardList,
  ShieldCheck,
  UserPlus,
  Users,
  Wallet
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { fadeIn, fadeInUp, featureCardStagger } from '@/modules/landing/animations/landingMotion';
import { landingTokens } from '@/modules/landing/constants/tokens';
import { fluid } from '@/modules/landing/utils/scale';

/** Figma `2070:4120` — "Everything Your HR Team Needs, In One Place". */
const HEADING_SIZE = fluid(24, 36);
const BODY_SIZE = fluid(15, 18);
const CARD_TITLE_SIZE = fluid(17, 20);
const CARD_BODY_SIZE = fluid(14, 15.5);
const ICON_TILE_SIZE = fluid(48, 60);

type SolutionCard = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tileBg: string;
  tileBorder: string;
  iconColor: string;
};

const SOLUTION_CARDS: readonly SolutionCard[] = [
  {
    id: 'employee-management',
    title: 'Employee Management',
    description: 'Centralize employee information, documents, roles, and workforce records in one secure platform.',
    icon: Users,
    tileBg: '#f2faff',
    tileBorder: '#d8f1ff',
    iconColor: '#188f44'
  },
  {
    id: 'employee-compliance',
    title: 'Employee Compliance',
    description: 'Stay organized with compliance tracking, employee documentation, policies, and important HR requirements.',
    icon: ShieldCheck,
    tileBg: '#fff2f2',
    tileBorder: '#ffd8d8',
    iconColor: '#e0575b'
  },
  {
    id: 'leave-attendance',
    title: 'Leave & Attendance',
    description: 'Manage leave requests, attendance, holidays, and workforce availability without spreadsheets or manual follow-ups.',
    icon: CalendarClock,
    tileBg: '#f2fff2',
    tileBorder: '#c6f5bc',
    iconColor: '#188f44'
  },
  {
    id: 'recruitment-onboarding',
    title: 'Recruitment & Onboarding',
    description: 'Move candidates from application to onboarding with structured workflows that keep your hiring process moving.',
    icon: UserPlus,
    tileBg: '#f8f3ff',
    tileBorder: '#e7d8ff',
    iconColor: '#8b5cf6'
  },
  {
    id: 'performance-management',
    title: 'Performance Management',
    description: 'Set goals, track employee progress, conduct reviews, and build a culture of continuous improvement.',
    icon: ClipboardList,
    tileBg: '#fff2fb',
    tileBorder: '#ffd8ef',
    iconColor: '#d63d94'
  },
  {
    id: 'payroll-workforce-data',
    title: 'Payroll & Workforce Data',
    description: 'Keep important workforce information organized and accessible while reducing repetitive administrative work.',
    icon: Wallet,
    tileBg: '#fff6ee',
    tileBorder: '#ffecd8',
    iconColor: '#e08a2f'
  }
] as const;

function SolutionCardPanel({ card }: { card: SolutionCard }) {
  const Icon = card.icon;
  return (
    <motion.div
      variants={fadeInUp}
      className="flex w-full flex-col items-start gap-5 rounded-[16px] border !border-[#D4D4D499] bg-white"
      style={{ padding: fluid(20, 32) }}
    >
      <div
        className="flex shrink-0 items-center justify-center rounded-[10px] border"
        style={{ width: ICON_TILE_SIZE, height: ICON_TILE_SIZE, backgroundColor: card.tileBg, borderColor: card.tileBorder }}
      >
        <Icon className="size-[45%]" style={{ color: card.iconColor }} aria-hidden strokeWidth={1.75} />
      </div>
      <div className="flex w-full flex-col items-start gap-2.5">
        <h3
          className="m-0 text-[#000d00] [font-family:'Bricolage_Grotesque',sans-serif]"
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

export function SolutionsFeatureGrid() {
  return (
    <motion.section
      aria-labelledby="solutions-grid-heading"
      className="relative overflow-x-hidden bg-white md:py-20 py-10"
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
            id="solutions-grid-heading"
            className="m-0 w-full text-[#000d00] capitalize [font-family:'Bricolage_Grotesque',sans-serif]"
            style={{ fontSize: HEADING_SIZE, fontWeight: 500 }}
          >
            Everything Your HR Team Needs, In One Place
          </h2>
          <p
            className="m-0 w-full max-w-[720px] font-normal text-[#000d00] [font-family:Jost,sans-serif]"
            style={{ fontSize: BODY_SIZE, lineHeight: 1.5 }}
          >
            Manage your people, processes, and workforce data with powerful tools designed to simplify everyday HR
            operations.
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
          {SOLUTION_CARDS.map((card) => (
            <SolutionCardPanel key={card.id} card={card} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
