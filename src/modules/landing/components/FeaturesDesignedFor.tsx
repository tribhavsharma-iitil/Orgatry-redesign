import { motion } from 'framer-motion';
import cleanInterfaceIcon from '@/modules/landing/assets/icons/employee-management.svg';
import enterpriseSecurityIcon from '@/modules/landing/assets/icons/employee-compliance.svg';
import seamlessIntegrationsIcon from '@/modules/landing/assets/icons/performance-management.svg';
import mobileFriendlyIcon from '@/modules/landing/assets/icons/recruitment-onboarding.svg';
import realTimeUpdatesIcon from '@/modules/landing/assets/icons/leave-attendance.svg';
import dedicatedSupportIcon from '@/modules/landing/assets/icons/payroll-workforce.svg';
import { fadeIn, fadeInUp, featureCardStagger } from '@/modules/landing/animations/landingMotion';
import { landingTokens } from '@/modules/landing/constants/tokens';
import { fluid } from '@/modules/landing/utils/scale';

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
  icon: string;
  tileBg: string;
  tileBorder: string;
};

const DESIGNED_FOR_CARDS: readonly DesignedForCard[] = [
  {
    id: 'clean-interface',
    title: 'Clean, Intuitive Interface',
    description: "A dashboard that's easy to navigate from day one, no lengthy onboarding or training needed.",
    icon: cleanInterfaceIcon,
    tileBg: '#f2faff',
    tileBorder: '#d8f1ff'
  },
  {
    id: 'enterprise-security',
    title: 'Enterprise-Grade Security',
    description: 'Role-based permissions and data protection built in so your workforce data stays safe.',
    icon: enterpriseSecurityIcon,
    tileBg: '#fff2f2',
    tileBorder: '#ffd8d8'
  },
  {
    id: 'seamless-integrations',
    title: 'Seamless Integrations',
    description: 'Connect with payroll, accounting, and communication tools your organization already uses.',
    icon: seamlessIntegrationsIcon,
    tileBg: '#fff2fb',
    tileBorder: '#ffd8ef'
  },
  {
    id: 'mobile-friendly',
    title: 'Mobile Friendly',
    description: 'Employees can request leave, check schedules, and update information from any device.',
    icon: mobileFriendlyIcon,
    tileBg: '#f8f3ff',
    tileBorder: '#e7d8ff'
  },
  {
    id: 'real-time-updates',
    title: 'Real-Time Updates',
    description: 'Changes, approvals, and alerts propagate instantly so your team always has current information.',
    icon: realTimeUpdatesIcon,
    tileBg: '#f2fff2',
    tileBorder: '#c6f5bc'
  },
  {
    id: 'dedicated-support',
    title: 'Dedicated Support',
    description: 'Our team is available to help you set up, troubleshoot, and get the most from the platform.',
    icon: dedicatedSupportIcon,
    tileBg: '#fff6ee',
    tileBorder: '#ffecd8'
  }
] as const;

function DesignedForCardPanel({ card }: { card: DesignedForCard }) {
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
        <img src={card.icon} alt="" className="size-[45%]" aria-hidden />
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

export function FeaturesDesignedFor() {
  return (
    <motion.section
      aria-labelledby="features-designed-for-heading"
      className="relative overflow-x-hidden bg-[#f3f3f5] md:py-20 py-10"
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
            className="m-0 w-full text-[#000d00] capitalize [font-family:'Bricolage_Grotesque',sans-serif]"
            style={{ fontSize: HEADING_SIZE, fontWeight: 500 }}
          >
            Designed For HR.
            <br />
            Loved By Employees.
          </h2>
          <p
            className="m-0 w-full max-w-[720px] font-normal text-[#000d00] [font-family:Jost,sans-serif]"
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
