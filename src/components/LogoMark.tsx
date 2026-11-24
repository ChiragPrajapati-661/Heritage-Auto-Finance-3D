import { site } from '@/config/site';

interface LogoProps {
  compact?: boolean;
  imgClassName?: string;
}

/**
 * Brand mark. Prefix the configured public asset with Vite's BASE_URL so
 * the official logo also loads correctly on GitHub Pages project sites.
 */
export default function LogoMark({ compact = false, imgClassName }: LogoProps) {
  if (site.logoSrc) {
    const logoSrc = `${import.meta.env.BASE_URL}${site.logoSrc.replace(/^\//, '')}`;
    return (
      <img
        src={logoSrc}
        alt={`${site.name} logo`}
        loading="eager"
        decoding="async"
        className={`h-10 w-auto max-w-[180px] rounded-none object-contain ${imgClassName ?? ''}`}
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
