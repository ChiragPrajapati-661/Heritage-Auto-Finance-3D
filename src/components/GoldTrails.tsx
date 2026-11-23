import { useParallax } from '@/lib/hooks';

/**
 * Decorative gold light trails — thin animated gradient streaks that drift
 * across a section. Pure CSS animation, disabled under reduced motion.
 */
export default function GoldTrails({ className = '' }: { className?: string }) {
  const ref = useParallax<HTMLDivElement>(0.06);
  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <span className="absolute left-[8%] top-[18%] h-px w-40 bg-gradient-to-r from-transparent via-gold-400/70 to-transparent animate-pulse-slow" />
      <span
        className="absolute right-[12%] top-[38%] h-px w-56 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent animate-pulse-slow"
        style={{ animationDelay: '1.2s' }}
      />
      <span
        className="absolute left-[22%] bottom-[16%] h-px w-32 bg-gradient-to-r from-transparent via-grape-400/60 to-transparent animate-pulse-slow"
        style={{ animationDelay: '2.1s' }}
      />
      <span
        className="absolute right-[28%] bottom-[28%] h-px w-24 bg-gradient-to-r from-transparent via-gold-300/60 to-transparent animate-pulse-slow"
        style={{ animationDelay: '0.6s' }}
      />
    </div>
  );
}
