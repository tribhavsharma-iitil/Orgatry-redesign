import { motion } from 'framer-motion';
import employeeManagementIcon from '@/modules/landing/assets/icons/employee-management.svg';
import employeeComplianceIcon from '@/modules/landing/assets/icons/employee-compliance.svg';
import leaveAttendanceIcon from '@/modules/landing/assets/icons/leave-attendance.svg';
import recruitmentOnboardingIcon from '@/modules/landing/assets/icons/recruitment-onboarding.svg';
import performanceManagementIcon from '@/modules/landing/assets/icons/performance-management.svg';
import payrollWorkforceIcon from '@/modules/landing/assets/icons/payroll-workforce.svg';
import { fadeIn, fadeInUp, featureCardStagger } from '@/modules/landing/animations/landingMotion';
import { landingTokens } from '@/modules/landing/constants/tokens';
import { useLandingTheme } from '@/modules/landing/theme/useLandingTheme';
import { fluid } from '@/modules/landing/utils/scale';

/** `#rrggbb` → `rgba(r,g,b,alpha)` — used to tint each card's icon-tile color for dark mode. */
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

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
  icon: string;
  tileBg: string;
  tileBorder: string;
};

const SOLUTION_CARDS: readonly SolutionCard[] = [
  {
    id: 'employee-management',
    title: 'Employee Management',
    description: 'Centralize employee information, documents, roles, and workforce records in one secure platform.',
    icon: employeeManagementIcon,
    tileBg: '#f2faff',
    tileBorder: '#d8f1ff'
  },
  {
    id: 'employee-compliance',
    title: 'Employee Compliance',
    description: 'Stay organized with compliance tracking, employee documentation, policies, and important HR requirements.',
    icon: employeeComplianceIcon,
    tileBg: '#fff2f2',
    tileBorder: '#ffd8d8'
  },
  {
    id: 'leave-attendance',
    title: 'Leave & Attendance',
    description: 'Manage leave requests, attendance, holidays, and workforce availability without spreadsheets or manual follow-ups.',
    icon: leaveAttendanceIcon,
    tileBg: '#f2fff2',
    tileBorder: '#c6f5bc'
  },
  {
    id: 'recruitment-onboarding',
    title: 'Recruitment & Onboarding',
    description: 'Move candidates from application to onboarding with structured workflows that keep your hiring process moving.',
    icon: recruitmentOnboardingIcon,
    tileBg: '#f8f3ff',
    tileBorder: '#e7d8ff'
  },
  {
    id: 'performance-management',
    title: 'Performance Management',
    description: 'Set goals, track employee progress, conduct reviews, and build a culture of continuous improvement.',
    icon: performanceManagementIcon,
    tileBg: '#fff2fb',
    tileBorder: '#ffd8ef'
  },
  {
    id: 'payroll-workforce-data',
    title: 'Payroll & Workforce Data',
    description: 'Keep important workforce information organized and accessible while reducing repetitive administrative work.',
    icon: payrollWorkforceIcon,
    tileBg: '#fff6ee',
    tileBorder: '#ffecd8'
  }
] as const;

function SolutionCardPanel({ card }: { card: SolutionCard }) {
  const { theme } = useLandingTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div
      variants={fadeInUp}
      className="flex w-full flex-col items-start gap-5 rounded-[16px] border !border-[#D4D4D499] bg-white dark:!border-[rgba(46,46,46,0.6)] dark:bg-[#FFFFFF0D]"
      style={{ padding: fluid(20, 32) }}
    >
      <div
        className="flex shrink-0 items-center justify-center rounded-[10px] border"
        style={{
          width: ICON_TILE_SIZE,
          height: ICON_TILE_SIZE,
          backgroundColor: isDark ? hexToRgba(card.tileBorder, 0.12) : card.tileBg,
          borderColor: isDark ? hexToRgba(card.tileBorder, 0.2) : card.tileBorder
        }}
      >
        <img src={card.icon} alt="" className="size-[45%]" aria-hidden />
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

export function SolutionsFeatureGrid() {
  return (
    <motion.section
      aria-labelledby="solutions-grid-heading"
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
            id="solutions-grid-heading"
            className="m-0 w-full text-[#000d00] capitalize [font-family:'Bricolage_Grotesque',sans-serif] dark:text-white"
            style={{ fontSize: HEADING_SIZE, fontWeight: 500 }}
          >
            Everything Your HR Team Needs, In One Place
          </h2>
          <p
            className="m-0 w-full max-w-[720px] font-normal text-[#000d00] [font-family:Jost,sans-serif] dark:text-white"
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
