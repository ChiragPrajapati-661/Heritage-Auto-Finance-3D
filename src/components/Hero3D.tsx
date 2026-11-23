import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Gauge, ShieldCheck, Clock3 } from 'lucide-react';
import { site } from '@/config/site';
import { useReducedMotion, useWebGLAvailable } from '@/lib/hooks';

const CarScene = lazy(() => import('@/components/three/CarScene'));

const heroImg =
  'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1920';

export default function Hero3D() {
  const reducedMotion = useReducedMotion();
  const webgl = useWebGLAvailable();
  const show3D = webgl && !reducedMotion;

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden" aria-label="Introduction">
      {/* Background layers */}
      <div className="absolute inset-0 bg-night-radial" aria-hidden="true" />
      {!show3D && (
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src={heroImg}
            alt=""
            loading="eager"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-night-950/70 via-night-950/40 to-night-950" />
        </div>
      )}

      {/* 3D canvas occupies the full hero behind content */}
      {show3D && (
        <div className="absolute inset-0" aria-hidden="true">
          <Suspense fallback={null}>
            <CarScene reducedMotion={reducedMotion} />
          </Suspense>
        </div>
      )}

      <div className="container-site relative z-10 grid gap-10 pt-32 pb-24 lg:grid-cols-[1fr_420px] lg:items-center">
        <div className="animate-fade-up">
          <p className="eyebrow">Mehsana, Gujarat — Serving Customers Across Gujarat</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold uppercase leading-[1.08] text-white sm:text-6xl lg:text-7xl">
            Drive Your Dream.
            <span className="block bg-gold-gradient bg-clip-text text-transparent">Finance Your Future.</span>
          </h1>
          <p className="mt-5 text-sm font-medium uppercase tracking-[0.25em] text-gold-400 sm:text-base">
            Premium Vehicle Finance Solutions by Heritage Auto Finance
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-300 sm:text-lg">
            New cars, pre-owned cars, refinancing and commercial vehicles — Heritage Auto Finance
            connects you with suitable finance options, clearly explained and quickly processed.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link to="/contact" className="btn-gold">
              Apply Now
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href="#services" className="btn-ghost">
              Explore Services
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {trustPoints.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-neutral-300">
                <Icon className="h-4 w-4 text-gold-500" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:block animate-fade-in">
          <div className="glass-card p-7">
            <p className="eyebrow">Today at Heritage</p>
            <p className="mt-4 font-display text-4xl font-semibold text-gold-400">EMI from</p>
            <p className="font-display text-2xl text-white">₹14,000 / month*</p>
            <p className="mt-4 text-xs leading-relaxed text-neutral-400">
              *Illustrative estimate for a ₹8 lakh, 60-month loan. Check the EMI calculator for your
              own numbers.
            </p>
            <Link to="/emi-calculator" className="btn-ghost mt-6 w-full">
              Open EMI Calculator
            </Link>
          </div>
        </div>
      </div>

      <a
        href="#services"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-neutral-400 transition-colors hover:text-gold-400"
        aria-label="Scroll to services"
      >
        <ChevronDown className="h-7 w-7 animate-bounce" aria-hidden="true" />
      </a>

      <p className="sr-only">
        {site.name} — vehicle finance in {site.location.city}, {site.location.state}.
      </p>
    </section>
  );
}

const trustPoints = [
  { icon: Gauge, label: 'Competitive rates' },
  { icon: Clock3, label: 'Quick processing' },
  { icon: ShieldCheck, label: 'Transparent terms' },
];
