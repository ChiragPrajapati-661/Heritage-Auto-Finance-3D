import { site } from '@/config/site';

interface LogoProps {
  compact?: boolean;
  imgClassName?: string;
}

/**
 * Brand mark. Uses the original logo file when site.logoSrc is set
 * (or public/brand/logo.png exists — update site.logoSrc to '/brand/logo.png'),
 * otherwise falls back to the Heritage monogram.
 */
export default function LogoMark({ compact = false, imgClassName }: LogoProps) {
  if (site.logoSrc) {
    return (
      <img
        src={site.logoSrc}
        alt={`${site.name} logo`}
        className={`h-10 w-10 rounded-full object-contain ${imgClassName ?? ''}`}
      />
    );
  }
  return (
    <span
      className={`flex items-center justify-center rounded-full border border-gold-500/60 bg-night-800 font-display font-semibold text-gold-400 ${
        compact ? 'h-9 w-9 text-base' : 'h-10 w-10 text-lg'
      }`}
      aria-hidden="true"
    >
      H
    </span>
  );
}
