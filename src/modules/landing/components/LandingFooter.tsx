import { motion } from 'framer-motion';
import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fadeInUp, staggerContainer } from '@/modules/landing/animations/landingMotion';
import {
  landingFooter,
  landingFooterColumns,
  landingFooterLegalLinks,
} from '@/modules/landing/constants/content';
import { fluid } from '@/modules/landing/utils/scale';

const FOOTER_OVERLAP = 0;
const CONTENT_PAD_TOP = 40;
const CONTENT_PAD_BOTTOM = 0;
const CONTENT_WIDTH = 1240;
const STANDALONE_PAD_TOP = 72;
const BOTTOM_BAR_HEIGHT = 16;

const BRAND_SIZE = fluid(24, 32);
const TAGLINE_SIZE = fluid(15, 17);
const DESCRIPTION_SIZE = fluid(13, 14.5);
const LINK_SIZE = fluid(14, 15.5);
const COPYRIGHT_SIZE = fluid(12.5, 13.5);
const LEGAL_LINK_SIZE = fluid(12.5, 13.5);

function FooterBrandBlock() {
  return (
    <div className="flex w-full max-w-[360px] flex-col gap-2">
      <p
        className="m-0 font-bold text-[#15803d] [font-family:'Bricolage_Grotesque',sans-serif]"
        style={{ fontSize: BRAND_SIZE }}
      >
        {landingFooter.brand}
      </p>
      <p
        className="m-0 font-noraml text-[#000d00] dark:text-white [font-family:Jost,sans-serif]"
        style={{ fontSize: TAGLINE_SIZE }}
      >
        A <span className='font-bold'>YAKA</span> Brand
      </p>
      <p
        className="m-0 text-[rgba(4,5,5,0.8)] dark:text-[#d1d5db] [font-family:Jost,sans-serif]"
        style={{ fontSize: DESCRIPTION_SIZE }}
      >
        {landingFooter.description}
      </p>
    </div>
  );
}

function FooterLinkColumns() {
  const location = useLocation();
  const isOnLanding = location.pathname === '/';

  return (
    <nav
      aria-label="Footer"
      className="grid w-full items-start justify-start w-full max-w-[300px]"
      style={{ gridTemplateColumns: 'auto 1px auto', columnGap: fluid(32, 64), rowGap: 32 }}
    >
      {landingFooterColumns.map((column, index) => (
        <Fragment key={column.id}>
          {index > 0 && (
            <div aria-hidden className="self-stretch border-l border-dashed border-[#2323231A] dark:border-white/10" />
          )}
          <div className="flex min-w-[88px] flex-col gap-4">
            <span className="sr-only">{column.title}</span>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {column.links.map((link) => {
                const isInternalRoute = link.href.startsWith('/');
                // Clicking a link to the page you're already on is a no-op navigation
                // (React Router doesn't remount, so the destination's own scroll-to-top
                // mount effect never fires) — scroll up manually in that case instead.
                const isSameRoute = link.href === location.pathname || (link.href === '/' && isOnLanding);
                const linkClassName =
                  'font-normal text-[rgba(4,5,5,0.8)] transition-colors [font-family:Jost,sans-serif] hover:text-[#000d00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803d]/40 dark:text-[#d1d5db] dark:hover:text-white';

                if (isInternalRoute) {
                  return (
                    <li key={`${column.id}-${link.label}`}>
                      <Link
                        to={link.href}
                        onClick={(event) => {
                          if (isSameRoute) {
                            event.preventDefault();
                            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                          }
                        }}
                        className={linkClassName}
                        style={{ fontSize: LINK_SIZE }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={`${column.id}-${link.label}`}>
                    <a
                      href={link.href}
                      {...(link.openInNewTab
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className={linkClassName}
                      style={{ fontSize: LINK_SIZE }}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </Fragment>
      ))}
    </nav>
  );
}

function FooterLegalLinks() {
  return (
    <ul className="m-0 flex list-none items-center gap-6 p-0">
      {landingFooterLegalLinks.map((link) => (
        <li key={link.label}>
          <Link
            to={link.href}
            className="font-normal text-black transition-colors [font-family:Jost,sans-serif] hover:text-[#15803d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803d]/40 dark:text-white"
            style={{ fontSize: LEGAL_LINK_SIZE }}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

type LandingFooterProps = {
  /** When true (default), footer overlaps the contact panel as on the homepage. */
  withContactOverlap?: boolean;
};

export function LandingFooter({ withContactOverlap = true }: LandingFooterProps) {
  return (
    <footer
      className="relative bg-white dark:bg-black"
      style={{
        marginTop: withContactOverlap ? -FOOTER_OVERLAP : 0,
        paddingTop: withContactOverlap ? CONTENT_PAD_TOP : STANDALONE_PAD_TOP,
        paddingBottom: CONTENT_PAD_BOTTOM + BOTTOM_BAR_HEIGHT
      }}
    >
      <motion.div
        className="relative z-0 mx-auto w-full px-6 lg:px-0"
        style={{ maxWidth: CONTENT_WIDTH }}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="flex flex-col" style={{ gap: fluid(16, 18) }}>
          <motion.div
            className="flex flex-col lg:flex-row items-start gap-10 justify-between w-full"
            variants={fadeInUp}
          >
            <FooterBrandBlock />
            <FooterLinkColumns />
          </motion.div>

          <motion.div
            aria-hidden
            className="w-full border-t border-dashed !border-[#2323231A] dark:!border-white/10"
            variants={fadeInUp}
          />

          <motion.div
            className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center"
            variants={fadeInUp}
            style={{ paddingBottom: fluid(20, 28) }}
          >
            <p
              className="m-0 font-bold text-black dark:text-white [font-family:Jost,sans-serif]"
              style={{ fontSize: COPYRIGHT_SIZE }}
            >
              {landingFooter.copyright}
            </p>
            <FooterLegalLinks />
          </motion.div>
        </div>
      </motion.div>

      {/* <div aria-hidden className="absolute inset-x-0 bottom-0 bg-[#15803d]" style={{ height: BOTTOM_BAR_HEIGHT }} /> */}
    </footer>
  );
}

/** Exported for layout docs / LandingPage gap coordination. */
export const landingFooterOverlapPx = FOOTER_OVERLAP;
