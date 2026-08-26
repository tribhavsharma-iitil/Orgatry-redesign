import { Moon, Sun } from 'lucide-react';
import { useLandingTheme } from '@/modules/landing/theme/useLandingTheme';
import { cn } from '@/lib/utils';

type ThemeToggleProps = {
  className?: string;
};

/** Sun/Moon icon toggle — only rendered where `isThemeable` is true (Home page, this pass). */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useLandingTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'inline-flex size-10 shrink-0 items-center justify-center rounded-full text-[#171717] transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#188F44]/50 dark:text-white dark:hover:bg-white/10',
        className
      )}
    >
      {isDark ? <Sun className="size-5" aria-hidden /> : <Moon className="size-5" aria-hidden />}
    </button>
  );
}
