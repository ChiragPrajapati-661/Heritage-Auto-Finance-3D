import { useEffect, useState } from 'react';
import LogoMark from '@/components/LogoMark';
import { site } from '@/config/site';

/**
 * Heritage-branded preloader: gold monogram sweep + progress bar.
 * Shown briefly on first load, then fades out.
 */
export default function BrandLoader() {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const showMs = reduced ? 300 : 1400;
    const t1 = window.setTimeout(() => setDone(true), showMs);
    const t2 = window.setTimeout(() => setHidden(true), showMs + 600);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-night-950 transition-opacity duration-500 ${
        done ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative">
        <span className="absolute inset-0 -m-4 rounded-full border border-gold-500/20 animate-pulse-slow" />
        <LogoMark />
      </div>
      <p className="mt-6 font-display text-xl font-semibold tracking-[0.2em] text-white">HERITAGE</p>
      <p className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.4em] text-gold-500">Auto Finance</p>
      <div className="mt-8 h-px w-44 overflow-hidden rounded bg-white/10">
        <div className="h-full w-1/3 rounded bg-gold-gradient animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
      </div>
      <p className="sr-only">{site.name} is loading</p>
    </div>
  );
}
