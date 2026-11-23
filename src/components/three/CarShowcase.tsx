/**
 * CarShowcase.tsx — Premium Luxury Automotive Showroom & Interactive Finance Suite.
 *
 * Replaces the rejected primitive 3D model with an authentic dealership-grade
 * presentation combining:
 *  - High-definition cinematic automotive visuals with interactive angle switching
 *  - Official Heritage brand animation and illuminated gold motion accents
 *  - Multi-category luxury vehicle showcase (New, Used, Commercial, Refinance)
 *  - Real-time interactive EMI & finance dashboard
 *  - Direct links to service pages, WhatsApp, and application form
 */
import { useState, useMemo, type SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  Sparkles,
  Eye,
  Gauge,
  Clock,
  Calculator,
} from 'lucide-react';
import { site, whatsappLink } from '@/config/site';
import { calculateEmi } from '@/lib/finance';
import { pexels } from '@/lib/media';

interface VehicleAngle {
  id: string;
  label: string;
  image: string;
  badge: string;
}

interface ShowcaseCategory {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  path: string;
  defaultPrincipal: number;
  minPrincipal: number;
  maxPrincipal: number;
  stepPrincipal: number;
  fundingHighlight: string;
  approvalSpeed: string;
  features: string[];
  angles: VehicleAngle[];
}

const SHOWCASE_CATEGORIES: ShowcaseCategory[] = [
  {
    id: 'new-car',
    name: 'New Luxury Cars',
    tagline: 'Own the latest luxury sports cars and executive sedans',
    badge: 'Flagship Edition',
    path: '/services/new-car-finance',
    defaultPrincipal: 2500000,
    minPrincipal: 500000,
    maxPrincipal: 10000000,
    stepPrincipal: 100000,
    fundingHighlight: 'Options depend on lender policy and eligibility',
    approvalSpeed: 'Processing timelines vary by lender',
    features: [
      'Options from banks and NBFCs, subject to availability',
      'Tenure as assessed by the selected lender',
      'Direct dealer invoice settlement',
      'Clear documentation support and lender terms explained upfront',
    ],
    angles: [
      {
        id: 'studio-front',
        label: 'Front 3/4 Dynamic',
        badge: 'Studio Lighting',
        image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        id: 'studio-side',
        label: 'Aerodynamic Profile',
        badge: 'Side Stance',
        image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        id: 'studio-cockpit',
        label: 'Executive Cockpit',
        badge: 'Interior Luxury',
        image: 'https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
    ],
  },
  {
    id: 'used-car',
    name: 'Pre-Owned Vehicles',
    tagline: 'Pre-owned SUVs & sedans with valuation and finance assistance',
    badge: 'Pre-Owned Selection',
    path: '/services/used-car-finance',
    defaultPrincipal: 1500000,
    minPrincipal: 300000,
    maxPrincipal: 6000000,
    stepPrincipal: 50000,
    fundingHighlight: 'Vehicle age and condition are assessed by lender',
    approvalSpeed: 'Document review timelines vary by lender',
    features: [
      'Complete RC & ownership history verification',
      'Individual seller & dealer sales covered',
      'Fair independent market valuation check',
      'Guidance on transfer and hypothecation documents',
    ],
    angles: [
      {
        id: 'used-front',
        label: 'Front Dynamic',
        badge: 'Exterior Condition',
        image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        id: 'used-side',
        label: 'Executive Profile',
        badge: 'Body Inspection',
        image: 'https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        id: 'used-cockpit',
        label: 'Cabin & Trim',
        badge: 'Interior Quality',
        image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
    ],
  },
  {
    id: 'commercial',
    name: 'Commercial Fleets',
    tagline: 'Powering Gujarat transport, logistics and enterprise businesses',
    badge: 'Enterprise Grade',
    path: '/services/commercial-vehicle-finance',
    defaultPrincipal: 2200000,
    minPrincipal: 500000,
    maxPrincipal: 15000000,
    stepPrincipal: 100000,
    fundingHighlight: 'Funding structure depends on lender assessment',
    approvalSpeed: 'Business and vehicle assessment required',
    features: [
      'LCVs, HCVs, tippers, trailers & tractors',
      'Structured to real operating cash flows',
      'Options explored for first-time and fleet applicants',
      'Serving transport hubs across Gujarat',
    ],
    angles: [
      {
        id: 'comm-front',
        label: 'Heavy Hauler',
        badge: 'Power & Stance',
        image: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        id: 'comm-highway',
        label: 'Highway Fleet',
        badge: 'Long-Haul Endurance',
        image: 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        id: 'comm-cabin',
        label: 'Operator Station',
        badge: 'Commercial Cockpit',
        image: 'https://images.pexels.com/photos/1416530/pexels-photo-1416530.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
    ],
  },
  {
    id: 'refinance',
    name: 'Car Refinance',
    tagline: 'Release liquidity from your existing car while you keep driving it',
    badge: 'Vehicle Equity Release',
    path: '/services/car-refinance',
    defaultPrincipal: 900000,
    minPrincipal: 200000,
    maxPrincipal: 4000000,
    stepPrincipal: 50000,
    fundingHighlight: 'Vehicle valuation and eligibility are assessed',
    approvalSpeed: 'Processing timelines vary by lender',
    features: [
      'Funding against your vehicle equity',
      'Zero interruption to daily driving',
      'Balance transfer options subject to lender assessment',
      'Top-up capital for business or family needs',
    ],
    angles: [
      {
        id: 'refinance-keys',
        label: 'Car Equity',
        badge: 'Fast Liquidity',
        image: 'https://images.pexels.com/photos/2526128/pexels-photo-2526128.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        id: 'refinance-sedan',
        label: 'Luxury Asset',
        badge: 'High Value',
        image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
      {
        id: 'refinance-interior',
        label: 'Owner Experience',
        badge: 'Zero Disruption',
        image: 'https://images.pexels.com/photos/97079/pexels-photo-97079.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
    ],
  },
];

const TENURE_OPTIONS = [12, 24, 36, 48, 60, 72, 84];

const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  'new-car': pexels.newCar,
  'used-car': pexels.usedCar,
  commercial: pexels.commercial,
  refinance: pexels.refinance,
};

function handleShowcaseImageError(event: SyntheticEvent<HTMLImageElement>, categoryId: string) {
  const image = event.currentTarget;
  image.onerror = null;
  image.src = CATEGORY_FALLBACK_IMAGES[categoryId] || pexels.newCar;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export default function CarShowcase() {
  const [selectedCatId, setSelectedCatId] = useState<string>('new-car');
  const [selectedAngleIdx, setSelectedAngleIdx] = useState<number>(0);

  const activeCategory = useMemo(() => {
    return SHOWCASE_CATEGORIES.find((c) => c.id === selectedCatId) || SHOWCASE_CATEGORIES[0];
  }, [selectedCatId]);

  // Loan estimator state tied to active category
  const [principal, setPrincipal] = useState<number>(activeCategory.defaultPrincipal);
  const [tenure, setTenure] = useState<number>(60);
  const [assumedAnnualRate, setAssumedAnnualRate] = useState<number>(10.5);

  // Sync default principal when category changes
  const handleCategoryChange = (catId: string) => {
    setSelectedCatId(catId);
    setSelectedAngleIdx(0);
    const cat = SHOWCASE_CATEGORIES.find((c) => c.id === catId);
    if (cat) {
      setPrincipal(cat.defaultPrincipal);
    }
  };

  const activeAngle = activeCategory.angles[selectedAngleIdx] || activeCategory.angles[0];

  // Real-time EMI calculation
  const monthlyEmi = useMemo(() => {
    return calculateEmi(principal, assumedAnnualRate, tenure);
  }, [principal, assumedAnnualRate, tenure]);

  const totalPayment = monthlyEmi * tenure;
  const totalInterest = Math.max(0, totalPayment - principal);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-night-900/90 via-night-950 to-night-950 p-4 sm:p-7 shadow-glass">
      {/* Background ambient showroom glow */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-grape-600/15 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" aria-hidden="true" />

      {/* ── Top Header & Brand Animation Plinth ── */}
      <div className="relative z-10 flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative flex h-12 w-24 sm:h-14 sm:w-28 items-center justify-center rounded-xl border border-gold-500/30 bg-night-900/90 p-1.5 shadow-gold backdrop-blur-md">
            <span className="absolute -inset-0.5 rounded-xl bg-gold-gradient opacity-20 blur-sm animate-pulse-slow" />
            <img
              src="/brand/heritage-logo.webp"
              alt={`${site.name} official logo`}
              loading="eager"
              decoding="async"
              className="relative h-full w-auto object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="eyebrow !text-[0.65rem] tracking-[0.25em]">Dealership Showroom</span>
              <span className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[0.65rem] font-semibold text-emerald-400">
                <Sparkles className="h-2.5 w-2.5" /> Multiple Lender Options
              </span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-white">
              Heritage Automotive Collection
            </h3>
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex w-full flex-wrap gap-1.5 rounded-xl border border-white/10 bg-night-950/80 p-1.5 md:w-auto">
          {SHOWCASE_CATEGORIES.map((cat) => {
            const isActive = cat.id === selectedCatId;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex-1 rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 sm:flex-none ${
                  isActive
                    ? 'border border-gold-500/40 bg-gold-gradient text-night-950 shadow-gold'
                    : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main Showcase Grid: Visual Gallery & Live Finance Suite ── */}
      <div className="relative z-10 mt-6 grid gap-8 lg:grid-cols-12 lg:items-start">
        {/* Left Column: Cinematic Visual Stage (7 cols) */}
        <div className="flex flex-col gap-4 lg:col-span-7">
          {/* Main Visual Display */}
          <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/15 bg-night-950 shadow-glass">
            <img
              src={activeAngle.image}
              alt={`${activeCategory.name} - ${activeAngle.label}`}
              loading="lazy"
              decoding="async"
              onError={(event) => handleShowcaseImageError(event, activeCategory.id)}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Cinematic Lighting Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/20 to-transparent" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-night-950/40" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="rounded-full border border-gold-500/40 bg-night-950/85 px-3 py-1 text-xs font-semibold text-gold-400 backdrop-blur-md">
                {activeCategory.badge}
              </span>
              <span className="rounded-full border border-white/15 bg-night-950/80 px-3 py-1 text-xs font-medium text-neutral-300 backdrop-blur-md">
                {activeAngle.badge}
              </span>
            </div>

            {/* Bottom Vehicle Info Overlay */}
            <div className="absolute inset-x-4 bottom-4 flex items-end justify-between">
              <div>
                <p className="font-display text-2xl font-bold text-white drop-shadow-md">
                  {activeCategory.name}
                </p>
                <p className="text-xs text-neutral-300 drop-shadow">
                  {activeCategory.tagline}
                </p>
              </div>

            </div>
          </div>

          {/* Perspective Angle Switcher */}
          <div className="grid grid-cols-3 gap-2.5">
            {activeCategory.angles.map((angle, idx) => {
              const isAngleActive = idx === selectedAngleIdx;
              return (
                <button
                  key={angle.id}
                  type="button"
                  onClick={() => setSelectedAngleIdx(idx)}
                  className={`group relative flex items-center gap-2.5 overflow-hidden rounded-xl border p-2 text-left transition-all duration-300 ${
                    isAngleActive
                      ? 'border-gold-500/60 bg-gold-500/10 shadow-gold'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="relative h-11 w-14 shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={angle.image}
                      alt={angle.label}
                      loading="lazy"
                      decoding="async"
                      onError={(event) => handleShowcaseImageError(event, activeCategory.id)}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-night-950/20" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="flex items-center gap-1 text-[0.6rem] uppercase tracking-wider text-gold-400">
                      <Eye className="h-2.5 w-2.5" /> View {idx + 1}
                    </span>
                    <span className="block truncate text-xs font-semibold text-white">
                      {angle.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Highlights Checklist */}
          <div className="rounded-xl border border-white/10 bg-night-900/50 p-4">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-gold-500">
              Heritage Advantage
            </span>
            <ul className="mt-2.5 grid gap-2 sm:grid-cols-2">
              {activeCategory.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Live Finance Suite & Instant EMI Calculator (5 cols) */}
        <div className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-night-900/80 p-5 sm:p-6 shadow-glass backdrop-blur-md lg:col-span-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <p className="eyebrow !text-[0.65rem]">Investment Estimator</p>
              <h4 className="font-display text-xl font-semibold text-white">Interactive Finance Estimator</h4>
            </div>
            <Calculator className="h-5 w-5 text-gold-400" />
          </div>

          {/* Principal Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="field-label !mb-0">Estimated Funding Amount</span>
              <span className="font-display text-lg font-bold text-gold-400">
                {formatCurrency(principal)}
              </span>
            </div>
            <input
              type="range"
              min={activeCategory.minPrincipal}
              max={activeCategory.maxPrincipal}
              step={activeCategory.stepPrincipal}
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-night-800 accent-gold-500 focus:outline-none"
              aria-label="Loan amount slider"
            />
            <div className="flex justify-between text-[0.65rem] text-neutral-500">
              <span>{formatCurrency(activeCategory.minPrincipal)}</span>
              <span>{formatCurrency(activeCategory.maxPrincipal)}</span>
            </div>
          </div>

          {/* Illustrative annual-rate assumption */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="showcase-rate" className="field-label !mb-0">Illustrative annual rate assumption</label>
              <span className="font-semibold text-gold-300">{assumedAnnualRate.toFixed(1)}%</span>
            </div>
            <input id="showcase-rate" type="range" min={7} max={20} step={0.1} value={assumedAnnualRate} onChange={(e) => setAssumedAnnualRate(Number(e.target.value))} className="h-2 w-full cursor-pointer accent-gold-500" aria-label="Illustrative annual interest rate assumption" />
            <p className="text-[0.68rem] leading-relaxed text-neutral-500">This is a user-adjustable example for EMI illustration only, not an offered or verified Heritage rate.</p>
          </div>

          {/* Tenure Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="field-label !mb-0">Loan Duration (Tenure)</span>
              <span className="font-medium text-white">{tenure} Months ({Math.round(tenure / 12)} Years)</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-7">
              {TENURE_OPTIONS.map((months) => (
                <button
                  key={months}
                  type="button"
                  onClick={() => setTenure(months)}
                  className={`rounded-lg py-1.5 text-center text-xs font-semibold transition-all ${
                    tenure === months
                      ? 'border border-gold-500/50 bg-gold-gradient text-night-950 font-bold shadow-gold'
                      : 'border border-white/10 bg-night-800/60 text-neutral-400 hover:border-gold-500/30 hover:text-white'
                  }`}
                >
                  {months}m
                </button>
              ))}
            </div>
          </div>

          {/* Calculated Output Card */}
          <div className="rounded-xl border border-gold-500/30 bg-night-950/90 p-4 shadow-glass">
            <span className="text-[0.65rem] uppercase tracking-wider text-neutral-400">Estimated Monthly Instalment</span>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="font-display text-3xl font-bold text-gold-400 sm:text-4xl">
                {formatCurrency(monthlyEmi)}
              </span>
              <span className="text-xs text-neutral-400">/ month*</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-3 text-[0.72rem] text-neutral-400">
              <div>
                <span>Total Interest: </span>
                <span className="font-semibold text-neutral-200">{formatCurrency(totalInterest)}</span>
              </div>
              <div className="text-right">
                <span>Example assumption: </span>
                <span className="font-semibold text-neutral-200">{assumedAnnualRate.toFixed(1)}% p.a.</span>
              </div>
            </div>
          </div>

          {/* Key Advantages */}
          <div className="flex items-center justify-between rounded-lg bg-white/[0.02] p-2.5 text-xs text-neutral-300">
            <span className="flex items-center gap-1.5">
              <Gauge className="h-4 w-4 text-gold-400" />
              {activeCategory.fundingHighlight}
            </span>
            <span className="flex items-center gap-1.5 text-neutral-400">
              <Clock className="h-3.5 w-3.5 text-emerald-400" />
              {activeCategory.approvalSpeed}
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col gap-2.5 pt-1">
            <Link
              to={`/contact?service=${activeCategory.id}`}
              className="btn-gold w-full text-center text-xs font-bold"
            >
              Apply for {activeCategory.name}
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href={whatsappLink(
                `Hello ${site.name}, I am interested in ${activeCategory.name} (Estimated amount: ${formatCurrency(
                  principal
                )}, Tenure: ${tenure} months). Please share suitable options.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost flex w-full items-center justify-center gap-2 text-xs"
            >
              <Phone className="h-4 w-4 text-emerald-400" />
              WhatsApp Consultation
            </a>

            <div className="flex items-center justify-between px-1 pt-1 text-[0.7rem] text-neutral-400">
              <Link
                to={activeCategory.path}
                className="flex items-center gap-1 text-gold-400 underline-offset-4 hover:underline"
              >
                Read full service details <ArrowRight className="h-3 w-3" />
              </Link>
              <span>Mehsana & Across Gujarat</span>
            </div>

            <p className="border-t border-white/5 pt-2.5 text-center text-[0.62rem] leading-relaxed text-neutral-500">
              *Illustrative estimate only; this is not a loan offer, rate quote, eligibility confirmation or approval. Heritage Auto Finance helps connect applicants with suitable lender options. The selected bank/NBFC alone determines the actual interest rate, eligible amount, tenure, EMI, fees, sanction and disbursal after its assessment and document verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
