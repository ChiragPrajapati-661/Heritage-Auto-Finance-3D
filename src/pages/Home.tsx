import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import {
  Car, CarFront, RefreshCcw, Truck, ShieldCheck, ArrowRight,
  FileCheck2, BadgePercent, Landmark, KeyRound, Phone, MapPin,
} from 'lucide-react';
import SEO from '@/components/SEO';
import Hero3D from '@/components/Hero3D';
import SectionHeading from '@/components/SectionHeading';
import EmiCalculator from '@/components/EmiCalculator';
import FinanceEnquiryForm from '@/components/FinanceEnquiryForm';
import GoldTrails from '@/components/GoldTrails';
import { useParallax } from '@/lib/hooks';
import { site, whatsappLink, services } from '@/config/site';
import { pexels } from '@/lib/media';

const CarShowcase = lazy(() => import('@/components/three/CarShowcase'));

const iconMap: Record<string, typeof Car> = {
  Car, CarFront, RefreshCcw, Truck, ShieldCheck,
};

const whyUs = [
  {
    icon: BadgePercent,
    title: 'Competitive rates',
    text: 'We compare options across lenders so you get terms that fit your budget, not ours.',
  },
  {
    icon: FileCheck2,
    title: 'Minimal paperwork',
    text: 'Clear checklists and guided documentation mean fewer surprises and faster processing.',
  },
  {
    icon: Landmark,
    title: 'Lender network',
    text: 'Access to finance options across banks and NBFCs active in Gujarat — matched to your profile.',
  },
  {
    icon: KeyRound,
    title: 'End-to-end support',
    text: 'From eligibility check to disbursal and insurance renewal, one point of contact throughout.',
  },
];

const processSteps = [
  { title: 'Tell us your need', text: 'Submit the enquiry form, WhatsApp or call us with the vehicle and finance type.' },
  { title: 'Free eligibility check', text: 'We assess your profile and suggest suitable finance options and tenures.' },
  { title: 'Documentation', text: 'A simple, guided checklist. We verify papers before submission to the lender.' },
  { title: 'Approval & disbursal', text: 'On lender approval, funds are disbursed and you drive away. We stay available after.' },
];

export default function Home() {
  const aboutImgRef = useParallax<HTMLDivElement>(0.05);
  return (
    <>
      <SEO
        title={site.name}
        description="Heritage Auto Finance, based in Mehsana and assisting customers across Gujarat with new car finance, used car finance, car refinance, commercial vehicle finance and insurance assistance."
        path="/"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: site.name,
          url: site.domain,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${site.domain}/contact`,
          },
        }}
      />
      <Hero3D />

      {/* Interactive 3D showcase */}
      <section className="relative container-site scroll-mt-20 py-20 sm:py-28" aria-label="Vehicle showcase">
        <GoldTrails />
        <SectionHeading
          eyebrow="Showroom"
          title="Take a closer look"
          description="Drag the car to rotate it a full 360 degrees — a small taste of the attention every enquiry gets."
        />
        <div className="relative mx-auto mt-10 max-w-3xl">
          <Suspense fallback={<div className="h-[320px] animate-pulse rounded-2xl bg-white/[0.03] sm:h-[420px]" aria-hidden="true" />}>
            <CarShowcase />
          </Suspense>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="container-site scroll-mt-20 py-20 sm:py-28">
        <SectionHeading
          eyebrow="Our Services"
          title="Finance for every vehicle, every stage"
          description="Five focused services, one transparent process. Choose what fits and we will handle the rest."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon] ?? Car;
            return (
              <Link
                key={s.slug}
                to={s.path}
                className="glass-card group relative overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 animate-fade-up"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <span className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-grape-600/10 blur-2xl transition-opacity duration-300 group-hover:bg-gold-500/15" aria-hidden="true" />
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold-500/30 bg-night-800">
                  <Icon className="h-6 w-6 text-gold-400" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-white transition-colors group-hover:text-gold-400">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">{s.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-500">
                  Explore
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
          <Link
            to="/contact"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gold-500/30 bg-gold-gradient p-7 text-night-950 transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-lg"
          >
            <div>
              <h3 className="font-display text-2xl font-semibold">Not sure which fits?</h3>
              <p className="mt-3 text-sm leading-relaxed text-night-900">
                Talk to us — we will listen first, then suggest the right option for your situation.
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
              Get in touch
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </section>

      {/* Why choose us */}
      <section className="border-y border-white/5 bg-night-900/40 py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Advice first, finance second"
            description="Based in Mehsana, we help customers across Gujarat explore suitable vehicle finance options with clear, honest guidance."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="glass-card p-7 animate-fade-up" style={{ animationDelay: `${i * 70}ms` }}>
                <Icon className="h-7 w-7 text-gold-400" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl font-semibold text-white">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-neutral-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container-site py-20 sm:py-28">
        <SectionHeading
          eyebrow="How It Works"
          title="A simple, four-step process"
          description="No jargon, no hidden steps. You always know where your enquiry stands."
        />
        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s, i) => (
            <li key={s.title} className="relative glass-card p-7">
              <span className="font-display text-5xl font-semibold text-gold-500/40" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* EMI preview */}
      <section className="border-y border-white/5 bg-night-900/40 py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading
            eyebrow="Plan Your Budget"
            title="EMI calculator preview"
            description="Slide the values to see an indicative monthly instalment. Full version on the EMI calculator page."
          />
          <div className="mt-12">
            <EmiCalculator compact />
            <p className="mt-5 text-center text-sm text-neutral-400">
              Want the detailed breakdown?{' '}
              <Link to="/emi-calculator" className="font-medium text-gold-400 underline-offset-4 hover:underline">
                Open the full EMI calculator
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div ref={aboutImgRef} className="relative">
            <img
              src={pexels.about}
              alt="Premium car under cinematic lighting"
              loading="lazy"
              className="aspect-[4/3] w-full rounded-2xl border border-white/10 object-cover shadow-glass"
            />
            <span className="absolute -bottom-4 -right-4 hidden rounded-xl border border-gold-500/40 bg-night-900/90 px-5 py-3 backdrop-blur sm:block">
              <span className="block font-display text-2xl font-semibold text-gold-400">Mehsana</span>
              <span className="block text-[0.65rem] uppercase tracking-[0.25em] text-neutral-400">Based in Mehsana · Serving Gujarat</span>
            </span>
          </div>
          <div>
            <SectionHeading
              eyebrow="About Heritage"
              title="Built on referrals, not advertising"
              align="left"
            />
            <p className="mt-6 text-sm leading-relaxed text-neutral-400 sm:text-base">
              Heritage Auto Finance started with a simple observation: people in Mehsana and the surrounding
              districts were being sold vehicle loans — not advised on them. We set out to flip that with clear
              advice, careful paperwork and honest expectations.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400 sm:text-base">
              Today we assist families, farmers, traders and transporters across Gujarat with five focused
              services — and most of our customers arrive referred by someone we helped before.
            </p>
            <Link to="/about" className="btn-ghost mt-8">
              Read our story
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Enquiry CTA */}
      <section className="container-site py-20 sm:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Get Started"
              title="Tell us about your vehicle plans"
              description="Fill the form and our team will call you back during business hours — or reach us instantly on WhatsApp or by phone."
              align="left"
            />
            <div className="mt-8 space-y-4">
              <a
                href={whatsappLink(`Hello ${site.name}, I would like to enquire about vehicle finance.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card flex items-center gap-4 p-5 transition-colors hover:border-gold-500/40"
              >
                <Phone className="h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
                <span>
                  <span className="block text-sm font-semibold text-white">WhatsApp enquiry</span>
                  <span className="block text-xs text-neutral-400">Fastest response during business hours</span>
                </span>
              </a>
              <a href={`tel:${site.phoneDial}`} className="glass-card flex items-center gap-4 p-5 transition-colors hover:border-gold-500/40">
                <Phone className="h-5 w-5 shrink-0 text-gold-400" aria-hidden="true" />
                <span>
                  <span className="block text-sm font-semibold text-white">{site.phoneDisplay}</span>
                  <span className="block text-xs text-neutral-400">{site.hours}</span>
                </span>
              </a>
              <p className="flex items-center gap-2.5 px-1 text-sm text-neutral-400">
                <MapPin className="h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                Based in {site.location.city} · Serving customers across {site.location.state}
              </p>
            </div>
          </div>
          <FinanceEnquiryForm />
        </div>
      </section>
    </>
  );
}
