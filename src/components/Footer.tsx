import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { site, services, whatsappLink } from '@/config/site';
import LogoMark from '@/components/LogoMark';
import SocialLinks from '@/components/SocialLinks';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-night-900/60">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark imgClassName="h-11 sm:h-12 w-auto max-w-[200px]" />
            {!site.logoSrc && (
              <span className="leading-tight">
                <span className="block font-display text-lg font-semibold tracking-wide text-white">HERITAGE</span>
                <span className="block text-[0.6rem] font-medium uppercase tracking-[0.35em] text-gold-500">Auto Finance</span>
              </span>
            )}
          </div>
          <p className="mt-5 text-sm leading-relaxed text-neutral-400">
            Vehicle finance assistance from {site.location.city}, {site.location.state} — new cars, used cars, refinancing,
            commercial vehicles and insurance guidance, handled with straightforward advice.
          </p>
        </div>

        <div>
          <h3 className="eyebrow">Services</h3>
          <ul className="mt-5 space-y-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={s.path} className="text-sm text-neutral-300 transition-colors hover:text-gold-400">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">Company</h3>
          <ul className="mt-5 space-y-3">
            <li><Link to="/emi-calculator" className="text-sm text-neutral-300 transition-colors hover:text-gold-400">EMI Calculator</Link></li>
            <li><Link to="/about" className="text-sm text-neutral-300 transition-colors hover:text-gold-400">About Us</Link></li>
            <li><Link to="/contact" className="text-sm text-neutral-300 transition-colors hover:text-gold-400">Contact Us</Link></li>
            <li><Link to="/privacy-policy" className="text-sm text-neutral-300 transition-colors hover:text-gold-400">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions" className="text-sm text-neutral-300 transition-colors hover:text-gold-400">Terms and Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">Contact</h3>
          <ul className="mt-5 space-y-4 text-sm text-neutral-300">
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
              <a href={`tel:${site.phoneDial}`} className="transition-colors hover:text-gold-400">{site.phoneDisplay}</a>
            </li>
            <li className="flex gap-3">
              <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
              <a href={whatsappLink(`Hello ${site.name}, I have a finance enquiry.`)} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold-400">
                WhatsApp us
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-gold-400">{site.email}</a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
              <span>{site.location.addressLine}</span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
              <span>{site.hours}</span>
            </li>
          </ul>
          <SocialLinks className="mt-6" iconClassName="h-4 w-4" />
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 text-xs text-neutral-500 sm:flex-row">
          <p>© {year} {site.legalName}. All rights reserved.</p>
          <p>Finance is subject to eligibility and lender approval. Terms apply.</p>
        </div>
      </div>
    </footer>
  );
}
