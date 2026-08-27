import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import darkLogo from '@/assets/orgatry_dark_logo.png';
import {
  memo,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { introConfig } from '@/components/intro';
import { useIntro } from '@/components/intro/useIntro';
import { useLogoDockScroll } from '@/components/intro/useLogoDockScroll';
import { navbarFadeIn } from '@/modules/landing/animations/landingMotion';
import { landingNavItems, landingNavSectionIds } from '@/modules/landing/constants/navigation';
import { landingTokens } from '@/modules/landing/constants/tokens';
import { useActiveSection } from '@/modules/landing/hooks/useActiveSection';
import { useSmoothScroll } from '@/modules/landing/hooks/useSmoothScroll';
import { LandingButton } from '@/modules/landing/shared/LandingButton';
import { ThemeToggle } from '@/modules/landing/theme/ThemeToggle';
import { useLandingTheme } from '@/modules/landing/theme/useLandingTheme';
import { fluid } from '@/modules/landing/utils/scale';
import { cn } from '@/lib/utils';

/**
 * Figma `186:119` — Header: px-120 py-30, gap-81.5, border-b, backdrop-blur.
 * Toned down + made fluid between the `lg` breakpoint (1024) and 1440 — the
 * desktop nav only renders at `lg:block`, so it never needs to scale below that.
 */
/** Same horizontal gutter every content section below uses, so the header aligns with them. */
const HEADER_PAD_X = `clamp(1.5rem, 6vw, ${landingTokens.gutter}px)`;
const HEADER_PAD_Y = fluid(16, 16, 1024, 1440);
const NAV_LINK_GAP = fluid(24, 40, 1024, 1440);
const NAV_LINK_TEXT = fluid(14, 16, 1024, 1440);
const CTA_PAD_X = fluid(20, 28, 1024, 1440);
const CTA_PAD_Y = fluid(10, 14, 1024, 1440);
const CTA_TEXT = fluid(14, 15, 1024, 1440);

const NAV_PILL_STYLE = {
  backgroundColor: '#ffffff',
  boxShadow: '0 8px 30px rgba(15, 23, 42, 0.08)'
} as const;

/** Dedicated marketing routes — everything but `home` now navigates instead of scrolling. */
const NAV_ROUTE_BY_ID: Record<string, string> = {
  solutions: '/solutions',
  features: '/features',
  'about-us': '/about-us',
  contact: '/contact'
};

function OrgatryLogo({ onNavigate }: { onNavigate: () => void }) {
  return (
    <button
      type="button"
      onClick={onNavigate}
      className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#188F44]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black"
      aria-label="Orgatry home"
    >
      <img src={darkLogo} alt="Orgatry" className="lg:h-[40px] h-6 w-auto" loading="eager" />
    </button>
  );
}

/**
 * YAKA mark that reveals in the navbar once the page scrolls past the hero's
 * `logoDockScrollY` threshold — reversible (`AnimatePresence` handles both the
 * mount and unmount transition) so it recedes again the moment you scroll back up.
 */
function NavbarLogoReveal({ show }: { show: boolean }) {
  const size = introConfig.navbarLogoSize;

  return (
    <AnimatePresence mode="popLayout">
      {show ? (
        <motion.div
          key="navbar-yaka"
          initial={{ opacity: 0, width: 0, scale: 0.85 }}
          animate={{ opacity: 1, width: 'auto', scale: 1 }}
          exit={{ opacity: 0, width: 0, scale: 0.85 }}
          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
          className="flex shrink-0 items-center overflow-hidden"
        >
          <img
            src={introConfig.iconLogo}
            alt="YAKA"
            width={size}
            height={size}
            className="shrink-0 object-contain dark:brightness-0 dark:invert"
            style={{ width: size, height: size }}
            decoding="async"
            draggable={false}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function LandingNavbarComponent() {
  const menuId = useId();
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLgNav, setIsLgNav] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isOnLanding = location.pathname === '/';
  const routeActiveId = Object.keys(NAV_ROUTE_BY_ID).find(
    (id) => NAV_ROUTE_BY_ID[id] === location.pathname
  );
  const scrollActiveId = useActiveSection({
    sectionIds: isOnLanding ? landingNavSectionIds : []
  });
  const activeId = routeActiveId ?? scrollActiveId;
  const { scrollToSection } = useSmoothScroll();
  const { isContentReady, isLogoAtHero } = useIntro();
  const pastLogoDockThreshold = useLogoDockScroll();
  const showNavbarLogo = isLogoAtHero && pastLogoDockThreshold;
  const { theme, isThemeable } = useLandingTheme();
  const navPillStyle =
    theme === 'dark'
      ? { backgroundColor: '#000000', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)' }
      : NAV_PILL_STYLE;

  const handleNavigate = useCallback(
    (sectionId: string) => {
      if (sectionId === 'home') {
        if (isOnLanding) {
          scrollToSection('home');
        } else {
          navigate('/');
        }
        setMobileOpen(false);
        return;
      }

      const path = NAV_ROUTE_BY_ID[sectionId];
      if (path) {
        navigate(path);
      }
      setMobileOpen(false);
    },
    [isOnLanding, navigate, scrollToSection]
  );

  const handleHome = useCallback(() => {
    handleNavigate('home');
  }, [handleNavigate]);

  const handleContact = useCallback(() => {
    handleNavigate('contact');
  }, [handleNavigate]);

  const onNavItemClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const sectionId = event.currentTarget.dataset.sectionId;
      if (sectionId) {
        handleNavigate(sectionId);
      }
    },
    [handleNavigate]
  );

  const toggleMobile = useCallback(() => {
    setMobileOpen((open) => !open);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const firstFocusable = menuPanelRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        menuToggleRef.current?.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const apply = () => {
      const matches = mq.matches;
      setIsLgNav(matches);
      if (matches) setMobileOpen(false);
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const onMenuKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || !menuPanelRef.current) return;
    const focusables = Array.from(
      menuPanelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    );
    if (focusables.length === 0) return;
    const first = focusables[0]!;
    const last = focusables[focusables.length - 1]!;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }, []);

  return (
    <motion.header
      className="pointer-events-none fixed inset-x-0 top-0 z-50 lg:border-b !border-[#1010101A] bg-[rgba(255,255,255,0.5)] backdrop-blur-[30px] dark:!border-[rgba(255,255,255,0.1)] dark:bg-[rgba(0,0,0,0.5)]"
      variants={navbarFadeIn}
      initial="hidden"
      animate={isContentReady ? 'visible' : 'hidden'}
    >
      <div
        className={cn(
          'relative mx-auto hidden w-full lg:block max-w-[1440px]',
          isContentReady ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        <nav
          aria-label="Primary"
          className="flex w-full items-center justify-between"
          style={{ paddingInline: HEADER_PAD_X, paddingBlock: HEADER_PAD_Y }}
        >
          <OrgatryLogo onNavigate={handleHome} />

          <ul className="m-0 flex list-none items-center p-0" style={{ gap: NAV_LINK_GAP }}>
            {landingNavItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    data-section-id={item.id}
                    onClick={onNavItemClick}
                    aria-current={isActive ? 'true' : undefined}
                    style={{ fontSize: NAV_LINK_TEXT }}
                    className={cn(
                      'leading-[1.5] transition-colors duration-200 [font-family:Inter,sans-serif] hover:text-[#188F44] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#188F44]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black',
                      isActive ? 'font-bold text-[#188F44]' : 'font-normal text-[#3e3e3e] dark:text-[#d1d5db]'
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-3">
            {isThemeable ? <ThemeToggle /> : null}
            <LandingButton
              variant="primary"
              onClick={handleContact}
              style={{ paddingInline: CTA_PAD_X, paddingBlock: CTA_PAD_Y, fontSize: CTA_TEXT }}
              className="h-auto shrink-0 bg-none bg-[#188F44] [font-family:Inter,sans-serif] shadow-[0_6px_20px_rgba(24,143,68,0.25)] hover:shadow-[0_8px_24px_rgba(24,143,68,0.32)] focus-visible:ring-[#188F44]/50 focus-visible:ring-offset-white"
              aria-label="Get In Touch"
            >
              Get In Touch
            </LandingButton>
            {isLgNav ? <NavbarLogoReveal show={showNavbarLogo} /> : null}
          </div>
        </nav>
      </div>

      <div
        className={cn(
          'mx-auto w-full max-w-[1440px] lg:hidden',
          isContentReady ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        <nav
          aria-label="Primary"
          className="flex items-center justify-between px-4 py-3"
          style={{
            minHeight: 56,
            backgroundColor: navPillStyle.backgroundColor,
            boxShadow: navPillStyle.boxShadow
          }}
        >
          <OrgatryLogo onNavigate={handleHome} />

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <LandingButton
                variant="primary"
                onClick={handleContact}
                className="h-10 bg-none bg-[#188F44] px-5 text-sm shadow-[0_6px_20px_rgba(24,143,68,0.25)] focus-visible:ring-[#188F44]/50 focus-visible:ring-offset-white"
                aria-label="Get In Touch"
              >
                Get In Touch
              </LandingButton>
            </div>

            {!isLgNav ? <NavbarLogoReveal show={showNavbarLogo} /> : null}

            {isThemeable ? <ThemeToggle /> : null}

            <button
              ref={menuToggleRef}
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full text-[#171717] hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#188F44]/50 dark:text-white dark:hover:bg-white/10"
              aria-expanded={mobileOpen}
              aria-controls={menuId}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={toggleMobile}
            >
              {mobileOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            </button>
          </div>
        </nav>

        <AnimatePresence initial={false}>
          {mobileOpen ? (
            <motion.div
              id={menuId}
              key="mobile-menu"
              ref={menuPanelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -6, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -6, height: 0 }}
              transition={{ duration: landingTokens.motion.durationBase, ease: landingTokens.motion.easeOut }}
              className="mt-2 overflow-hidden rounded-[24px] bg-white shadow-[0_12px_32px_rgba(15,23,42,0.12)] dark:bg-black dark:shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
              onKeyDown={onMenuKeyDown}
            >
              <ul className="flex flex-col gap-1 p-3">
                {landingNavItems.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        data-section-id={item.id}
                        onClick={onNavItemClick}
                        aria-current={isActive ? 'true' : undefined}
                        className={cn(
                          'w-full rounded-xl px-4 py-3 text-left text-base text-[#171717] transition-colors [font-family:Inter,sans-serif] hover:text-[#188F44] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#188F44]/50 dark:text-white',
                          isActive ? 'bg-[#188F44]/10 font-medium text-[#188F44]' : 'text-[#171717]/80 dark:text-[#d1d5db]'
                        )}
                      >
                        {item.label}
                      </button>
                    </li>
                  );
                })}
                {isThemeable ? (
                  <li className="flex items-center justify-between px-4 py-2 text-sm text-[#171717]/80 dark:text-[#d1d5db]">
                    <span className="[font-family:Inter,sans-serif]">Theme</span>
                    <ThemeToggle />
                  </li>
                ) : null}
                <li className="pt-2">
                  <LandingButton
                    variant="primary"
                    onClick={handleContact}
                    className="w-full bg-none bg-[#188F44] shadow-[0_6px_20px_rgba(24,143,68,0.25)] focus-visible:ring-[#188F44]/50 focus-visible:ring-offset-white"
                  >
                    Get In Touch
                  </LandingButton>
                </li>
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

export const LandingNavbar = memo(LandingNavbarComponent);
