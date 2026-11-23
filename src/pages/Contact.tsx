import SEO from '@/components/SEO';
import SectionHeading from '@/components/SectionHeading';
import FinanceEnquiryForm from '@/components/FinanceEnquiryForm';
import { site, whatsappLink } from '@/config/site';
import { Phone, Mail, MapPin, Clock, MessageCircle, Facebook, Instagram } from 'lucide-react';

const channels = [
  {
    icon: Phone,
    label: 'Call us',
    value: site.phoneDisplay,
    href: `tel:${site.phoneDial}`,
    note: site.hours,
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Message us instantly',
    href: whatsappLink(`Hello ${site.name}, I have a vehicle finance enquiry.`),
    note: 'For questions and enquiry follow-up',
  },
  {
    icon: Mail,
    label: 'Email',
    value: site.email,
    href: `mailto:${site.email}`,
    note: 'For documents and detailed enquiries',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: site.location.addressLine,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name} ${site.location.addressLine}`)}`,
    note: 'Based in Mehsana · Serving customers across Gujarat',
  },
  {
    icon: Facebook,
    label: 'Facebook',
    value: 'Heritage Auto Finance',
    href: site.social.facebook,
    note: 'Follow our official page',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@heritageautofinance',
    href: site.social.instagram,
    note: 'See our latest updates',
  },
];

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact Us"
        description={`Contact ${site.name}, based in Mehsana and serving customers across Gujarat — call, WhatsApp, email or submit a vehicle finance enquiry.`}
        path="/contact"
      />
      <section className="container-site pb-16 pt-36 sm:pt-44">
        <SectionHeading
          eyebrow="Contact Us"
          title="Let's talk about your vehicle"
          description="Choose whichever channel suits you — every route reaches the same team."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map(({ icon: Icon, label, value, href, note }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="glass-card group p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40"
            >
              <Icon className="h-6 w-6 text-gold-400" aria-hidden="true" />
              <h2 className="mt-4 text-sm font-semibold uppercase tracking-wider text-neutral-400">{label}</h2>
              <p className="mt-1.5 break-words font-medium text-white group-hover:text-gold-400">{value}</p>
              <p className="mt-2 text-xs text-neutral-500">{note}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="container-site grid items-start gap-12 pb-24 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <SectionHeading
            eyebrow="Enquiry Form"
            title="Send your details"
            description="Share your details and enquiry. Our team can review the information and contact you using your preferred channel. Fields marked with an asterisk are required."
            align="left"
          />
          <div className="glass-card mt-8 flex items-start gap-3 p-5">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-neutral-300">
              Business hours: {site.hours}. We serve {site.location.city} and districts across {site.location.state}.
              Loan approval and final terms are subject to lender eligibility checks.
            </p>
          </div>
        </div>
        <FinanceEnquiryForm />
      </section>
    </>
  );
}
