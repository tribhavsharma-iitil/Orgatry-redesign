import { motion } from 'framer-motion';
import { fadeIn, fadeInUp, featureCardStagger } from '@/modules/landing/animations/landingMotion';
import { landingTokens } from '@/modules/landing/constants/tokens';
import { fluid } from '@/modules/landing/utils/scale';

/** Figma `2133:6531` — "The Values That Guide Everything We Build". */
const HEADING_SIZE = fluid(24, 36);
const CARD_TITLE_SIZE = fluid(17, 20);
const CARD_BODY_SIZE = fluid(14, 15.5);
const ICON_TILE_SIZE = fluid(48, 60);

/** Figma `2633:7692` icon — reused as-is across all value cards. */
function ValueIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 26.629 30.0171" fill="none" className={className} aria-hidden="true">
      <path
        d="M13.4507 9.6582L13.9537 11.0532C14.2295 11.818 14.6706 12.5126 15.2455 13.0874C15.8203 13.6623 16.5149 14.1034 17.2797 14.3792L18.6747 14.8822C18.7024 14.8922 18.7263 14.9105 18.7432 14.9345C18.7601 14.9586 18.7691 14.9873 18.7691 15.0167C18.7691 15.0461 18.7601 15.0748 18.7432 15.0989C18.7263 15.1229 18.7024 15.1412 18.6747 15.1512L17.2797 15.6542C16.5149 15.93 15.8203 16.3711 15.2455 16.9459C14.6706 17.5208 14.2295 18.2154 13.9537 18.9802L13.4507 20.3752C13.4407 20.4029 13.4225 20.4268 13.3984 20.4437C13.3743 20.4606 13.3456 20.4696 13.3162 20.4696C13.2868 20.4696 13.2581 20.4606 13.234 20.4437C13.21 20.4268 13.1917 20.4029 13.1817 20.3752L12.6787 18.9802C12.4029 18.2154 11.9618 17.5208 11.387 16.9459C10.8121 16.3711 10.1175 15.93 9.35271 15.6542L7.95771 15.1512C7.93005 15.1412 7.90615 15.1229 7.88925 15.0989C7.87235 15.0748 7.86328 15.0461 7.86328 15.0167C7.86328 14.9873 7.87235 14.9586 7.88925 14.9345C7.90615 14.9105 7.93005 14.8922 7.95771 14.8822L9.35271 14.3792C10.1175 14.1034 10.8121 13.6623 11.387 13.0874C11.9618 12.5126 12.4029 11.818 12.6787 11.0532L13.1817 9.6582C13.1917 9.63054 13.21 9.60663 13.234 9.58973C13.2581 9.57283 13.2868 9.56377 13.3162 9.56377C13.3456 9.56377 13.3743 9.57283 13.3984 9.58973C13.4225 9.60663 13.4407 9.63054 13.4507 9.6582Z"
        fill="currentColor"
      />
      <path
        d="M24.716 8.14819C24.5785 7.9213 24.3565 7.75833 24.0988 7.69513C23.8411 7.63193 23.5689 7.67368 23.342 7.81119C23.1151 7.94871 22.9521 8.17072 22.8889 8.4284C22.8257 8.68607 22.8675 8.9583 23.005 9.18519C24.0687 10.9444 24.63 12.9614 24.628 15.0172C24.628 21.2542 19.553 26.3302 13.315 26.3302C12.26 26.3281 11.2105 26.1784 10.197 25.8852L11.19 25.4082C11.4191 25.2874 11.5925 25.0824 11.6737 24.8364C11.7548 24.5903 11.7375 24.3224 11.6252 24.089C11.5129 23.8555 11.3145 23.6747 11.0717 23.5844C10.8288 23.4942 10.5605 23.5017 10.323 23.6052L7.198 25.1082C7.07434 25.1679 6.9643 25.2523 6.87472 25.3564C6.78513 25.4604 6.71794 25.5818 6.67732 25.713C6.6367 25.8441 6.62352 25.9822 6.6386 26.1187C6.65369 26.2552 6.69671 26.3871 6.765 26.5062L8.493 29.5142C8.55813 29.6283 8.64517 29.7285 8.74913 29.8088C8.85309 29.8892 8.97192 29.9482 9.09877 29.9825C9.22562 30.0168 9.35801 30.0257 9.4883 30.0087C9.6186 29.9916 9.74424 29.949 9.858 29.8832C10.0879 29.7511 10.2559 29.5331 10.3251 29.2771C10.3943 29.0211 10.359 28.7481 10.227 28.5182L9.847 27.8562C10.97 28.1602 12.129 28.3292 13.316 28.3292C20.657 28.3292 26.629 22.3572 26.629 15.0162C26.6303 12.5951 25.9687 10.22 24.716 8.14819ZM13.314 3.70319C14.383 3.70319 15.426 3.85919 16.432 4.14819L15.439 4.62519C15.2358 4.72414 15.072 4.88896 14.9744 5.09283C14.8767 5.29671 14.851 5.52762 14.9013 5.748C14.9516 5.96837 15.075 6.16523 15.2514 6.30653C15.4279 6.44783 15.647 6.52525 15.873 6.52619C16.0229 6.52607 16.1709 6.49224 16.306 6.42719L19.431 4.92419C19.5548 4.86454 19.665 4.78001 19.7546 4.67589C19.8443 4.57176 19.9116 4.45027 19.9522 4.319C19.9928 4.18772 20.006 4.04949 19.9908 3.91291C19.9756 3.77633 19.9325 3.64435 19.864 3.52519L18.136 0.517193C18.0719 0.4009 17.9853 0.298541 17.8812 0.216091C17.7771 0.133641 17.6576 0.0727511 17.5297 0.0369745C17.4018 0.00119782 17.2681 -0.00874877 17.1363 0.00771527C17.0045 0.0241793 16.8774 0.0667242 16.7622 0.132867C16.647 0.19901 16.5462 0.287426 16.4656 0.392954C16.385 0.498483 16.3262 0.619011 16.2927 0.747505C16.2591 0.875999 16.2515 1.00988 16.2703 1.14135C16.2891 1.27281 16.3339 1.39922 16.402 1.51319L16.782 2.17519C15.6518 1.8642 14.4852 1.70513 13.313 1.70219C5.972 1.70219 0 7.67419 0 15.0152C0 17.4442 0.661 19.8202 1.912 21.8842C1.98016 21.9965 2.06977 22.0944 2.17573 22.1721C2.2817 22.2498 2.40192 22.3059 2.52956 22.3371C2.65719 22.3684 2.78973 22.3742 2.91961 22.3542C3.04948 22.3342 3.17415 22.2888 3.2865 22.2207C3.39885 22.1525 3.49667 22.0629 3.57438 21.957C3.65209 21.851 3.70817 21.7308 3.73942 21.6031C3.77067 21.4755 3.77647 21.343 3.75649 21.2131C3.73652 21.0832 3.69116 20.9585 3.623 20.8462C2.5593 19.087 1.99798 17.07 2 15.0142C2.002 8.77819 7.077 3.70319 13.314 3.70319Z"
        fill="currentColor"
      />
    </svg>
  );
}

type ValueCard = {
  id: string;
  title: string;
  description: string;
};

const VALUE_CARDS: readonly ValueCard[] = [
  { id: 'people-first', title: 'People First', description: 'We design technology around the people who use it.' },
  { id: 'keep-simple', title: 'Keep It Simple', description: 'Complex HR processes should feel simple and intuitive.' },
  { id: 'build-purpose', title: 'Build With Purpose', description: 'Every feature should solve a real business problem.' },
  { id: 'trust-security', title: 'Trust & Security', description: 'Workforce data deserves the highest level of care.' },
  { id: 'improvement', title: 'Improvement', description: 'We continuously learn, improve, and evolve.' }
] as const;

function ValueCardPanel({ card }: { card: ValueCard }) {
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
        <ValueIcon className="size-[45%] text-[#188f44]" />
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
      className="relative overflow-x-hidden bg-[#f9f9f9] dark:bg-transparent md:py-20 py-10  md:pb-20 pb-10 !pt-0"
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
