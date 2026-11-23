import { Facebook, Instagram } from 'lucide-react';
import { site } from '@/config/site';

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
}

export default function SocialLinks({ className = '', iconClassName = 'h-4 w-4' }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <a
        href={site.social.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${site.name} on Facebook`}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-neutral-300 transition-all duration-200 hover:border-gold-500/60 hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
      >
        <Facebook className={iconClassName} aria-hidden="true" />
      </a>
      <a
        href={site.social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${site.name} on Instagram`}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-neutral-300 transition-all duration-200 hover:border-gold-500/60 hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
      >
        <Instagram className={iconClassName} aria-hidden="true" />
      </a>
    </div>
  );
}
