export type IntroPhase =
  | 'loading'
  | 'flying'
  | 'hero'
  | 'skipped';

/** Minimal DOM rect used for measured logo handoffs. */
export type DomRectLite = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type IntroConfig = {
  brandLogo: string;
  iconLogo: string;
  loaderLogoSize: number;
  loaderIconSize: number;
  heroLogoSize: number;
  navbarLogoSize: number;
  loaderStepDuration: number;
  loaderDuration: number;
  loaderFadeDuration: number;
  heroAnchorId: string;
  mobileBreakpoint: number;
  flyDuration: number;
  glowColor: string;
  /** Scroll Y (px) past which the YAKA mark leaves the hero and appears in the navbar instead — reversible in both directions. */
  logoDockScrollY: number;
};

export type IntroContextValue = {
  phase: IntroPhase;
  /** True once content under the loader may animate in (or intro was skipped). */
  isContentReady: boolean;
  /** True once the one-time flight has landed at the hero (or was skipped) — Hero/Navbar may start their own scroll-reversible logo toggle. */
  isLogoAtHero: boolean;
  /** Measured loader logo rect — handed to FloatingLogo. */
  loaderRect: DomRectLite | null;
  /** Called by Loader with the measured brand-logo rect. */
  completeLoader: (rect: DomRectLite) => void;
  /** Called by FloatingLogo when the flight to the hero anchor finishes. */
  arriveAtHero: () => void;
};
