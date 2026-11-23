import { Link } from 'react-router-dom';
import { Check, Phone, ArrowRight, MessageCircle } from 'lucide-react';
import type { Service } from '@/config/site';
import { site, serviceWhatsAppLink, services } from '@/config/site';
import SectionHeading from '@/components/SectionHeading';
import FinanceEnquiryForm from '@/components/FinanceEnquiryForm';

interface ServicePageProps {
  service: Service;
  heroImage: string;
  intro: string[];
  steps: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
}

function FaqJsonLd({ faqs, service }: { faqs: { q: string; a: string }[]; service: Service }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
    about: service.title,
    url: `${site.domain}${service.path}`,
  };
  return <script type="application/ld+json">{JSON.stringify(data)}</script>;
}

export default function ServicePage({ service, heroImage, intro, steps, faqs }: ServicePageProps) {
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <FaqJsonLd faqs={faqs} service={service} />
      <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
        <div className="absolute inset-0" aria-hidden="true">
          <img src={heroImage} alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-night-950/80 via-night-950/60 to-night-950" />
        </div>
        <div className="container-site relative">
          <p className="eyebrow animate-fade-up">{service.tagline}</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold text-white sm:text-5xl lg:text-6xl animate-fade-up" style={{ animationDelay: '80ms' }}>
            {service.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
            {service.description}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a href="#enquire" className="btn-gold">
              Apply Now
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={serviceWhatsAppLink(service.title)} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp Enquiry
            </a>
            <a href={`tel:${site.phoneDial}`} className="btn-ghost">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <section className="container-site grid gap-14 py-16 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <SectionHeading eyebrow="Overview" title={`How ${service.title} works`} align="left" />
          <div className="mt-6 space-y-4">
            {intro.map((p) => (
              <p key={p.slice(0, 24)} className="text-sm leading-relaxed text-neutral-400 sm:text-base">
                {p}
              </p>
            ))}
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {service.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm text-neutral-200">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div id="enquire" className="scroll-mt-24">
          <FinanceEnquiryForm defaultEnquiryType={service.title} title={`Enquire — ${service.title}`} />
        </div>
      </section>

      <section className="border-y border-white/5 bg-night-900/40 py-16">
        <div className="container-site">
          <SectionHeading
            eyebrow="Process"
            title="Four simple steps"
            description="From first conversation to driving away — here is what to expect."
          />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="glass-card relative p-6">
                <span className="font-display text-4xl font-semibold text-gold-500/50" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-site py-16">
        <SectionHeading eyebrow="FAQ" title="Common questions" />
        <div className="mx-auto mt-10 max-w-3xl space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="glass-card group px-6 py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-medium text-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400">
                {f.q}
                <span className="text-gold-500 transition-transform duration-300 group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="container-site pb-20">
        <SectionHeading eyebrow="More services" title="Explore other options" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((s) => (
            <Link key={s.slug} to={s.path} className="glass-card group p-6 transition-colors hover:border-gold-500/40">
              <h3 className="font-display text-lg font-semibold text-white transition-colors group-hover:text-gold-400">
                {s.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-400">{s.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-gold-500">
                Learn more
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
