import { motion } from 'framer-motion';
import { Plus, Search } from 'lucide-react';
import { fadeIn, fadeInUp } from '@/modules/landing/animations/landingMotion';
import { landingTokens } from '@/modules/landing/constants/tokens';
import { fluid } from '@/modules/landing/utils/scale';
import { cn } from '@/lib/utils';

/** Figma `2106:5591`..`2115:5764` — five alternating feature rows, Figma `4a22cf4e` mockup reused on each. */
const ROW_TITLE_SIZE = fluid(24, 34);
const ROW_BODY_SIZE = fluid(15, 18);
const TAG_TEXT_SIZE = fluid(12.5, 14);

const FEATURE_ROWS = [
  {
    id: 'employee-management',
    title: 'Keep Your Workforce Organized',
    description:
      'Manage employee profiles, documents, roles, departments, and essential workforce information from a single dashboard.',
    tags: ['Employee Profiles', 'Employee Directory', 'Document Management', 'Department Management', 'Employee Records']
  },
  {
    id: 'leave-attendance-1',
    title: 'Make Attendance And Leave Management Effortless',
    description:
      'Give employees a simple way to manage leave while HR teams maintain complete visibility over attendance and availability.',
    tags: ['Leave Requests', 'Leave Approvals', 'Attendance Tracking', 'Holiday Calendar', 'Leave Policies', 'Attendance Reports']
  },
  {
    id: 'recruitment-onboarding',
    title: 'Hire Faster. Onboard Smarter.',
    description: 'Create a structured recruitment experience and make onboarding simple for both HR teams and new employees.',
    tags: ['Candidate Management', 'Job Openings', 'Interview Tracking', 'Hiring Pipeline', 'Offer Management', 'Digital Onboarding', 'Onboarding Checklists']
  },
  {
    id: 'leave-attendance-2',
    title: 'Make Attendance And Leave Management Effortless',
    description:
      'Give employees a simple way to manage leave while HR teams maintain complete visibility over attendance and availability.',
    tags: ['Leave Requests', 'Leave Approvals', 'Attendance Tracking', 'Holiday Calendar', 'Leave Policies', 'Attendance Reports']
  },
  {
    id: 'performance-management',
    title: 'Turn Employee Goals Into Business Growth',
    description: 'Create clear goals, track progress, and make performance reviews more meaningful.',
    tags: ['Goal Setting', 'Performance Reviews', 'Employee Feedback', 'Performance Tracking', 'Review Cycles', 'Development Plans']
  }
] as const;

const DIRECTORY_ROWS = [
  { id: 'sarah', initials: 'SC', name: 'Sarah Chen', role: 'Product Designer · Design', status: 'Active', color: '#2563eb' },
  { id: 'marcus', initials: 'MW', name: 'Marcus Webb', role: 'Engineering Lead · Engineering', status: 'Active', color: '#7c3aed' },
  { id: 'priya', initials: 'PN', name: 'Priya Nair', role: 'HR Manager · HR', status: 'Active', color: '#188f44' },
  { id: 'james', initials: 'JO', name: 'James Okafor', role: 'Sales Executive · Sales', status: 'On Leave', color: '#e08a2f' }
] as const;

function EmployeeDirectoryMockup() {
  return (
    <div className="w-full overflow-hidden rounded-[16px] border !border-[#D4D4D499] bg-white" aria-hidden>
      <div className="flex items-center justify-between border-b !border-[#D4D4D499] bg-[#f8f9fb]" style={{ padding: fluid(16, 22) }}>
        <p
          className="m-0 font-semibold text-[#000d00] [font-family:'Bricolage_Grotesque',sans-serif]"
          style={{ fontSize: fluid(15, 18) }}
        >
          Employee Directory
        </p>
        <div className="flex items-center gap-2">
          <div
            className="hidden items-center gap-1.5 rounded-[8px] border !border-[#D4D4D499] bg-white text-[#878c91] sm:flex"
            style={{ paddingInline: fluid(8, 12), paddingBlock: fluid(4, 6), fontSize: fluid(11, 13) }}
          >
            <Search className="size-3.5 shrink-0" aria-hidden />
            Search...
          </div>
          <span
            className="inline-flex shrink-0 items-center justify-center rounded-[8px] bg-[#2563eb] text-white"
            style={{ width: fluid(24, 30), height: fluid(24, 30) }}
          >
            <Plus className="size-[55%]" aria-hidden />
          </span>
        </div>
      </div>

      <ul className="m-0 flex list-none flex-col p-0">
        {DIRECTORY_ROWS.map((row) => (
          <li
            key={row.id}
            className="flex items-center justify-between border-b !border-[#EDEDED] last:border-b-0"
            style={{ padding: fluid(12, 18) }}
          >
            <div className="flex items-center" style={{ gap: fluid(10, 14) }}>
              <span
                className="inline-flex shrink-0 items-center justify-center rounded-full font-medium text-white [font-family:Jost,sans-serif]"
                style={{ width: fluid(32, 40), height: fluid(32, 40), backgroundColor: row.color, fontSize: fluid(11, 13) }}
              >
                {row.initials}
              </span>
              <div className="flex flex-col">
                <p className="m-0 font-medium text-[#000d00] [font-family:Jost,sans-serif]" style={{ fontSize: fluid(13, 15) }}>
                  {row.name}
                </p>
                <p className="m-0 font-normal text-[#878c91] [font-family:Jost,sans-serif]" style={{ fontSize: fluid(11.5, 13) }}>
                  {row.role}
                </p>
              </div>
            </div>
            <span
              className={cn(
                'inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-[100px] font-medium [font-family:Jost,sans-serif]',
                row.status === 'Active' ? 'bg-[#e9f9ee] text-[#188f44]' : 'bg-[#fff3e0] text-[#e08a2f]'
              )}
              style={{ paddingInline: fluid(8, 12), paddingBlock: fluid(3, 5), fontSize: fluid(10.5, 12) }}
            >
              {row.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeatureTagList({ tags }: { tags: readonly string[] }) {
  return (
    <div className="flex flex-wrap items-start gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-[8px] border !border-[#D4D4D499] bg-[#f8f9fb] text-[#454545] [font-family:Jost,sans-serif]"
          style={{ fontSize: TAG_TEXT_SIZE, paddingInline: fluid(10, 14), paddingBlock: fluid(6, 8) }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function FeatureRow({ row, reversed }: { row: (typeof FEATURE_ROWS)[number]; reversed: boolean }) {
  return (
    <motion.div
      variants={fadeInUp}
      className={cn('flex w-full flex-col items-center gap-10 lg:items-stretch lg:gap-16', reversed ? 'lg:flex-row-reverse' : 'lg:flex-row')}
    >
      <div className="flex w-full flex-col items-start justify-center gap-5 lg:max-w-[560px]">
        <h3
          className="m-0 w-full text-[#000d00] [font-family:'Bricolage_Grotesque',sans-serif]"
          style={{ fontSize: ROW_TITLE_SIZE, fontWeight: 500, letterSpacing: '-0.02em' }}
        >
          {row.title}
        </h3>
        <p
          className="m-0 w-full font-normal text-[#454545] [font-family:Jost,sans-serif]"
          style={{ fontSize: ROW_BODY_SIZE, lineHeight: 1.5 }}
        >
          {row.description}
        </p>
        <FeatureTagList tags={row.tags} />
      </div>

      <div className="w-full lg:flex-1">
        <EmployeeDirectoryMockup />
      </div>
    </motion.div>
  );
}

export function FeaturesShowcaseRows() {
  return (
    <motion.section
      aria-label="HR feature showcase"
      className="relative overflow-x-hidden bg-white md:py-20 py-10"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div
        className="mx-auto flex w-full max-w-[1440px] flex-col items-start"
        style={{ paddingInline: `clamp(1.5rem, 6vw, ${landingTokens.gutter}px)`, gap: fluid(56, 96) }}
      >
        {FEATURE_ROWS.map((row, index) => (
          <FeatureRow key={row.id} row={row} reversed={index % 2 === 1} />
        ))}
      </div>
    </motion.section>
  );
}
