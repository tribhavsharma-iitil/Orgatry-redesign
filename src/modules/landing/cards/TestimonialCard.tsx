import { memo } from 'react';
import quoteIcon from '@/modules/landing/assets/icons/testimonial-quote.png';
import { fluid } from '@/modules/landing/utils/scale';
import { cn } from '@/lib/utils';

export type TestimonialCardProps = {
  quote: string;
  name: string;
  role: string;
  company?: string;
  avatarSrc?: string | undefined;
  className?: string;
  width?: number;
};

/** Comfortable marquee widths by breakpoint. */
export const TESTIMONIAL_CARD_WIDTH_DESKTOP = 460;
export const TESTIMONIAL_CARD_WIDTH_TABLET = 400;
export const TESTIMONIAL_CARD_WIDTH_MOBILE = 300;
export const TESTIMONIAL_CARD_GAP = 20;

/** @deprecated use breakpoint widths — kept for imports */
export const TESTIMONIAL_CARD_WIDTH = TESTIMONIAL_CARD_WIDTH_DESKTOP;

const QUOTE_SIZE = fluid(15, 17);
const NAME_SIZE = fluid(14, 15);

function Initials({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div
      aria-hidden
      className="flex size-[40px] shrink-0 items-center justify-center rounded-[10px] bg-[#E2E2E2] dark:bg-[#000000] text-[#000000] dark:text-white text-[16px] font-noraml [font-family:Jost,sans-serif]"
    >
      {initials}
    </div>
  );
}

/** "Amit Verma" -> "A.Verma" */
function shortenName(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0];
  if (!first || parts.length < 2) return name;
  return `${first.charAt(0).toUpperCase()}.${parts.slice(1).join(' ')}`;
}

/**
 * Testimonial card — Figma `285:192`, bordered white panel / radius 16,
 * responsive density for the marquee.
 */
export const TestimonialCard = memo(function TestimonialCard({
  quote,
  name,
  className,
  width = TESTIMONIAL_CARD_WIDTH_DESKTOP
}: TestimonialCardProps) {
  return (
    <article
      className={cn(
        'box-border flex shrink-0 flex-col items-start overflow-hidden rounded-[16px] border !border-[#D4D4D499] bg-white mb-4 dark:!border-[rgba(46,46,46,0.6)] dark:bg-[#FFFFFF0D]',
        className
      )}
      style={{ width, padding: fluid(20, 32), gap: fluid(20, 32) }}
    >
      <img
        src={quoteIcon}
        alt=""
        width={20}
        height={20}
        className="size-5 shrink-0 dark:invert"
        decoding="async"
        aria-hidden
      />

      <div className="flex w-full flex-col items-start" style={{ gap: fluid(20, 32) }}>
        <p
          className="m-0 w-full font-normal text-[#000d00] [font-family:Sora,sans-serif] dark:text-white"
          style={{ fontSize: QUOTE_SIZE, lineHeight: 1.4 }}
        >
          {quote}
        </p>

        <div className="flex items-center gap-4">
          <Initials name={name} />
          <p
            className="m-0 truncate font-bold text-[#000d00] [font-family:Jost,sans-serif] dark:text-white"
            style={{ fontSize: NAME_SIZE }}
          >
            {shortenName(name)}
          </p>
        </div>
      </div>
    </article>
  );
});
