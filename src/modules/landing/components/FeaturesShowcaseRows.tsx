import type { CSSProperties } from 'react';
import { motion, type MotionStyle } from 'framer-motion';
import { fadeIn, fadeInUp } from '@/modules/landing/animations/landingMotion';
import { landingTokens } from '@/modules/landing/constants/tokens';
import { fluid } from '@/modules/landing/utils/scale';
import { cn } from '@/lib/utils';
import featureShowcaseMockup from '@/modules/landing/assets/images/feature-showcase-mockup.png';

/**
 * Figma `2106:5591`..`2115:5764` — five alternating feature rows. Figma reuses the same
 * `Solution Image` mockup (node `2106:5621` etc.) on every row, so we render that one
 * exported asset unchanged in both light and dark theme rather than re-drawing it in CSS.
 */
const ROW_TITLE_SIZE = fluid(24, 34);
const ROW_BODY_SIZE = fluid(15, 18);
const TAG_TEXT_SIZE = fluid(12.5, 14);
const BADGE_TEXT_SIZE = fluid(12, 14);
const HEADING_SIZE = fluid(24, 36);
const BODY_SIZE = fluid(15, 18);
const ROW_GAP = fluid(32, 40);
const ROW_PADDING = fluid(20, 48);

type VarStyle = CSSProperties & Record<`--${string}`, string | number>;

/** Figma dark frame (`2633:7305`) recolors every row fill/border to its light hex at 10% alpha (card fill at 5%), so this mirrors that formula instead of hand-picking dark values. */
function hexToRgba(hex: string, alpha: number): string {
  const value = hex.replace('#', '');
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const FEATURE_ROWS = [
  {
    id: 'employee-management',
    badge: 'Employee Management',
    badgeBg: '#f2faff',
    badgeBorder: '#d8f1ff',
    cardBorder: '#d8f1ff',
    cardBorderDark: 'rgba(216,241,255,0.1)',
    title: 'Keep Your Workforce Organized',
    description:
      'Manage employee profiles, documents, roles, departments, and essential workforce information from a single dashboard.',
    tags: ['Employee Profiles', 'Employee Directory', 'Document Management', 'Department Management', 'Employee Records']
  },
  {
    id: 'leave-attendance-1',
    badge: 'Leave & Attendance',
    badgeBg: '#fff2f2',
    badgeBorder: '#ffd8d8',
    cardBorder: 'rgba(255,216,216,0.6)',
    cardBorderDark: 'rgba(255,216,216,0.1)',
    title: 'Make Attendance And Leave Management Effortless',
    description:
      'Give employees a simple way to manage leave while HR teams maintain complete visibility over attendance and availability.',
    tags: ['Leave Requests', 'Leave Approvals', 'Attendance Tracking', 'Holiday Calendar', 'Leave Policies', 'Attendance Reports']
  },
  {
    id: 'recruitment-onboarding',
    badge: 'Recruitment & Onboarding',
    badgeBg: '#fff2fb',
    badgeBorder: '#ffd8ef',
    cardBorder: 'rgba(255,216,239,0.6)',
    cardBorderDark: 'rgba(255,216,239,0.1)',
    title: 'Hire Faster. Onboard Smarter.',
    description: 'Create a structured recruitment experience and make onboarding simple for both HR teams and new employees.',
    tags: ['Candidate Management', 'Job Openings', 'Interview Tracking', 'Hiring Pipeline', 'Offer Management', 'Digital Onboarding', 'Onboarding Checklists']
  },
  {
    id: 'leave-attendance-2',
    badge: 'Leave & Attendance',
    badgeBg: '#fff2f2',
    badgeBorder: '#ffd8d8',
    cardBorder: 'rgba(255,216,216,0.6)',
    cardBorderDark: 'rgba(255,216,216,0.1)',
    title: 'Make Attendance And Leave Management Effortless',
    description:
      'Give employees a simple way to manage leave while HR teams maintain complete visibility over attendance and availability.',
    tags: ['Leave Requests', 'Leave Approvals', 'Attendance Tracking', 'Holiday Calendar', 'Leave Policies', 'Attendance Reports']
  },
  {
    id: 'performance-management',
    badge: 'Performance Management',
    badgeBg: '#f2fff2',
    badgeBorder: '#c6f5bc',
    cardBorder: 'rgba(255,216,239,0.6)',
    cardBorderDark: 'rgba(255,216,239,0.1)',
    title: 'Turn Employee Goals Into Business Growth',
    description: 'Create clear goals, track progress, and make performance reviews more meaningful.',
    tags: ['Goal Setting', 'Performance Reviews', 'Employee Feedback', 'Performance Tracking', 'Review Cycles', 'Development Plans']
  }
] as const;

function FeatureShowcaseImage() {
  return (
    <div className="w-full h-full overflow-hidden rounded-[16px] border" style={{ borderColor: 'rgba(35,35,35,0.1)' }}>
      <img
        src={featureShowcaseMockup}
        alt="Orgatry dashboard showing the employee directory, with names, roles, and status at a glance"
        width={1400}
        height={826}
        loading="lazy"
        decoding="async"
        className="block h-full w-full"
      />
    </div>
  );
}

function FeatureTagList({ tags, bg, border }: { tags: readonly string[]; bg: string; border: string }) {
  return (
    <div className="flex flex-wrap items-start gap-2 border-t dark:border-[#FFFFFF14] border-[#23232314] pt-6">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-[8px] border bg-[var(--tag-bg)] dark:bg-[var(--tag-bg-dark)] !border-[var(--tag-border)] dark:!border-[var(--tag-border-dark)] text-[#454545] dark:text-white [font-family:Jost,sans-serif]"
          style={
            {
              '--tag-bg': bg,
              '--tag-bg-dark': hexToRgba(bg, 0.1),
              '--tag-border': border,
              '--tag-border-dark': hexToRgba(border, 0.1),
              fontSize: TAG_TEXT_SIZE,
              paddingInline: fluid(10, 14),
              paddingBlock: fluid(6, 8)
            } as VarStyle
          }
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function StepBadge({ label, bg, border }: { label: string; bg: string; border: string }) {
  return (
    <span
      className="inline-flex h-[34px] items-center justify-center whitespace-nowrap rounded-[8px] border bg-[var(--badge-bg)] dark:bg-[var(--badge-bg-dark)] !border-[var(--badge-border)] dark:!border-[var(--badge-border-dark)] font-semibold text-[#000d00] dark:text-white uppercase [font-family:'Bricolage_Grotesque',sans-serif]"
      style={
        {
          '--badge-bg': bg,
          '--badge-bg-dark': hexToRgba(bg, 0.1),
          '--badge-border': border,
          '--badge-border-dark': hexToRgba(border, 0.1),
          fontSize: BADGE_TEXT_SIZE,
          paddingInline: fluid(14, 18)
        } as VarStyle
      }
    >
      {label}
    </span>
  );
}

/**
 * Figma dark frame (`2633:7305`) recolors the card panel to `rgba(253,253,253,0.05)` and the
 * badge/tag fills to their light hex at 10% alpha (`hexToRgba` above). The outer card border is
 * its own literal value per row (`cardBorder`/`cardBorderDark`) — it does NOT always match the
 * badge/tag border; e.g. row 5 (Performance Management, green badge) has a pink card border in
 * both themes in the source file, so that's reproduced as-is rather than "corrected".
 */
function FeatureRow({ row, reversed }: { row: (typeof FEATURE_ROWS)[number]; reversed: boolean }) {
  return (
    <motion.div
      variants={fadeInUp}
      className={cn(
        'flex w-full flex-col items-center rounded-[32px] border bg-[var(--card-bg)] dark:bg-[var(--card-bg-dark)] !border-[var(--card-border)] dark:!border-[var(--card-border-dark)] lg:items-stretch',
        'shadow-[0px_10px_15px_rgba(0,0,0,0.02)]',
        reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
      )}
      style={
        {
          '--card-bg': '#fdfdfd',
          '--card-bg-dark': 'rgba(253,253,253,0.05)',
          '--card-border': row.cardBorder,
          '--card-border-dark': row.cardBorderDark,
          padding: ROW_PADDING,
          gap: ROW_GAP
        } as MotionStyle & Record<`--${string}`, string | number>
      }
    >
      <div className="flex w-full flex-col items-start justify-center gap-5 lg:max-w-[580px]">
        <StepBadge label={row.badge} bg={row.badgeBg} border={row.badgeBorder} />
        <h3
          className="m-0 w-full text-[#000d00] dark:text-white lg:max-w-[28rem] [font-family:'Bricolage_Grotesque',sans-serif]"
          style={{ fontSize: ROW_TITLE_SIZE, fontWeight: 500, letterSpacing: '-0.02em' }}
        >
          {row.title}
        </h3>
        <p
          className="m-0 w-full font-normal text-[#454545] dark:text-white/80 [font-family:Jost,sans-serif]"
          style={{ fontSize: ROW_BODY_SIZE, lineHeight: 1.5 }}
        >
          {row.description}
        </p>
        <FeatureTagList tags={row.tags} bg={row.badgeBg} border={row.badgeBorder} />
      </div>

      <div className="w-full h-auto">
        <FeatureShowcaseImage />
      </div>
    </motion.div>
  );
}

export function FeaturesShowcaseRows() {
  return (
    <motion.section
      aria-label="HR feature showcase"
      className="relative overflow-x-hidden bg-[#F7F7F7CC] md:py-20 py-10 !bg-[#F9F9F9] dark:!bg-transparent"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div
        className="mx-auto flex w-full max-w-[1440px] flex-col items-start"
        style={{ paddingInline: `clamp(1.5rem, 6vw, ${landingTokens.gutter}px)`, gap: fluid(56, 96) }}
      >
        <motion.div className="flex w-full flex-col items-start gap-4 text-left" variants={fadeInUp}>
          <h2
            className="m-0 w-full text-[#000d00] capitalize [font-family:'Bricolage_Grotesque',sans-serif] dark:text-white"
            style={{ fontSize: HEADING_SIZE, fontWeight: 500 }}
          >
            Keep Your Workforce Organized
          </h2>
          <p
            className="m-0 w-full max-w-[561px] font-normal text-[#000d00] [font-family:Jost,sans-serif] dark:text-white"
            style={{ fontSize: BODY_SIZE, lineHeight: 1.5 }}
          >
            Manage employee profiles, documents, roles, departments, and essential workforce information from a single dashboard.
          </p>
        </motion.div>
        {FEATURE_ROWS.map((row, index) => (
          <FeatureRow key={row.id} row={row} reversed={index % 2 === 1} />
        ))}
      </div>
    </motion.section>
  );
}
