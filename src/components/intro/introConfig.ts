/**
 * ─────────────────────────────────────────────────────────────────────────────
 * INTRO ANIMATION CONFIG — edit THIS file when porting to another website.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * What to change per site:
 * 1. `brandLogo`  — own brand mark. Shown first on the loader.
 * 2. `iconLogo`   — YAKA icon mark. Shown second on the loader, then carried
 *    through the one-time flight and the reversible hero/navbar toggle.
 * 3. Sizes / timings below if the brand mark needs different scale or duration.
 * 4. `heroAnchorId` only if your Hero uses a different element id.
 *
 * Do NOT put asset paths or timing magic numbers anywhere else in the intro system.
 */

import brandLogoAsset from '@/assets/orgatry_dark_logo.png';
import iconLogoAsset from '@/assets/yaka_logo.png';
import type { IntroConfig } from '@/components/intro/types';

export const introConfig: IntroConfig = {
  /** Own brand mark, shown first on the loader. */
  brandLogo: brandLogoAsset,

  /** YAKA icon mark — shown second on the loader, then carried through the flight/hero/navbar. */
  iconLogo: iconLogoAsset,

  /** Loader centered logo max width/height (px) — always a square box regardless of the logo's own aspect ratio. */
  loaderLogoSize: 140,

  /** YAKA icon size on the loader's second step (px) — smaller than `loaderLogoSize` to leave room for the "A YAKA Brand" caption below it. */
  loaderIconSize: 80,

  /** Hero destination box size (px) — also the one-time flight's landing box. */
  heroLogoSize: 72,

  /** Navbar icon size (px) once it reveals there. */
  navbarLogoSize: 34,

  /** How long the loader shows the brand mark before crossfading to the YAKA mark (ms). */
  loaderStepDuration: 1500,

  /** How long the fullscreen loader stays fully visible in total (ms) — must exceed `loaderStepDuration`. */
  loaderDuration: 3000,

  /** Loader backdrop fade-out duration (ms). */
  loaderFadeDuration: 600,

  /** Must match the Hero anchor element `id` — the one-time flight's landing target. */
  heroAnchorId: 'hero-logo-anchor',

  /** Below this viewport width, skip the loader + flying-logo intro entirely. */
  mobileBreakpoint: 768,

  /** Loader → hero flight duration (ms). */
  flyDuration: 800,

  /**
   * Radial glow behind the loader logo.
   * Prefer a CSS variable so each site can theme it; green default matches Orgatry/YAKA.
   */
  glowColor: 'var(--intro-glow, rgba(34, 197, 94, 0.18))',

  /** Scroll Y (px) past which the YAKA mark leaves the hero and appears in the navbar instead — reversible in both directions. */
  logoDockScrollY: 40
};
