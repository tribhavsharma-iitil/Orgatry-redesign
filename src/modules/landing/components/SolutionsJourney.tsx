import { motion } from 'framer-motion';
import solutionsJourneyPhoto from '@/modules/landing/assets/images/solutions-journey.jpg';
import { fadeIn, fadeInUp, featureCardStagger } from '@/modules/landing/animations/landingMotion';
import { landingTokens } from '@/modules/landing/constants/tokens';
import { fluid } from '@/modules/landing/utils/scale';

/** Figma `2070:4290` — "Built For Every Stage Of The Employee Journey". */
const HEADING_SIZE = fluid(24, 36);
const BODY_SIZE = fluid(15, 18);
const STEP_TITLE_SIZE = fluid(16, 19);
const STEP_BODY_SIZE = fluid(13, 14.5);
const BADGE_SIZE = fluid(36, 44);

const JOURNEY_STEPS = [
  { id: 'recruit', title: 'Recruit', description: 'Source, assess, and hire top talent with confidence' },
  { id: 'onboard', title: 'Onboard', description: 'Welcome new employees with a seamless first-day experience' },
  { id: 'manage', title: 'Manage', description: 'Manage people, processes, and everyday workforce operations' },
  { id: 'develop', title: 'Develop', description: 'Track performance, build skills, and empower career growth' },
  { id: 'retain', title: 'Retain', description: 'Drive engagement, recognize contributions, and retain great talent' }
] as const;

function JourneyStepRow({
  step,
  index,
  isFirst,
  isLast
}: {
  step: (typeof JOURNEY_STEPS)[number];
  index: number;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex w-full items-center border !border-[#D4D4D499] bg-white dark:!border-[rgba(46,46,46,0.6)] dark:bg-black"
      style={{
        padding: fluid(20, 32),
        gap: fluid(16, 24),
        marginTop: isFirst ? 0 : -1,
        borderTopLeftRadius: isFirst ? 16 : 0,
        borderTopRightRadius: isFirst ? 16 : 0,
        borderBottomLeftRadius: isLast ? 16 : 0,
        borderBottomRightRadius: isLast ? 16 : 0
      }}
    >
      <span
        className="inline-flex shrink-0 items-center justify-center rounded-[10px] bg-[#188f44] font-medium text-white [font-family:Jost,sans-serif]"
        style={{ width: BADGE_SIZE, height: BADGE_SIZE, fontSize: fluid(16, 20) }}
      >
        {index + 1}
      </span>
      <div className="flex flex-col items-start gap-1">
        <h3
          className="m-0 text-[#232323] [font-family:'Bricolage_Grotesque',sans-serif] dark:text-white"
          style={{ fontSize: STEP_TITLE_SIZE }}
        >
          {step.title}
        </h3>
        <p
          className="m-0 font-normal text-[rgba(69,69,69,0.8)] [font-family:Jost,sans-serif] dark:text-[#d1d5db]"
          style={{ fontSize: STEP_BODY_SIZE, lineHeight: 1.5 }}
        >
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export function SolutionsJourney() {
  return (
    <motion.section
      aria-labelledby="solutions-journey-heading"
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
            id="solutions-journey-heading"
            className="m-0 w-full text-[#000d00] lg:max-w-xl capitalize [font-family:'Bricolage_Grotesque',sans-serif] dark:text-white"
            style={{ fontSize: HEADING_SIZE, fontWeight: 500 }}
          >
            Built For Every Stage Of The Employee Journey
          </h2>
          <p
            className="m-0 w-full max-w-[720px] font-normal text-[#000d00] [font-family:Jost,sans-serif] dark:text-white"
            style={{ fontSize: BODY_SIZE, lineHeight: 1.5 }}
          >
            Orgatry helps HR teams manage the complete employee lifecycle from hiring and onboarding to performance and
            everyday workforce management.
          </p>
        </motion.header>

        <div className="flex w-full flex-col items-stretch gap-8 lg:flex-row lg:items-stretch">
          <motion.div
            className="flex w-full flex-col items-start lg:max-w-[600px]"
            variants={featureCardStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {JOURNEY_STEPS.map((step, index) => (
              <JourneyStepRow
                key={step.id}
                step={step}
                index={index}
                isFirst={index === 0}
                isLast={index === JOURNEY_STEPS.length - 1}
              />
            ))}
          </motion.div>

          <motion.div
            className="w-full overflow-hidden rounded-[24px] border !border-[rgba(35,35,35,0.1)] dark:!border-white/10 lg:flex-1"
            variants={fadeInUp}
          >
            <img
              src={solutionsJourneyPhoto}
              alt="Chess pieces climbing a staircase of wooden blocks, representing career progression"
              loading="lazy"
              decoding="async"
              className="h-full w-full min-h-[280px] select-none object-cover"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
