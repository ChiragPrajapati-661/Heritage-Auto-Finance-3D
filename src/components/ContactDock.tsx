import { useState, useEffect } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';
import { site, whatsappLink } from '@/config/site';

/**
 * Floating WhatsApp-first contact dock, present on every page.
 * Opens with the WhatsApp action visible; call is one tap away.
 */
export default function ContactDock() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => setOpen(true), 1600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <div
        className={`glass-card flex flex-col overflow-hidden transition-all duration-300 ${
          open ? 'max-h-40 w-64 opacity-100' : 'max-h-0 w-64 border-transparent opacity-0'
        }`}
      >
        <a
          href={whatsappLink(`Hello ${site.name}, I would like to enquire about vehicle finance.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5 text-sm font-medium text-neutral-100 transition-colors hover:bg-white/5"
        >
          <MessageCircle className="h-5 w-5 text-emerald-400" aria-hidden="true" />
          Chat on WhatsApp
        </a>
        <a
          href={`tel:${site.phoneDial}`}
          className="flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-neutral-100 transition-colors hover:bg-white/5"
        >
          <Phone className="h-5 w-5 text-gold-400" aria-hidden="true" />
          Call {site.phoneDisplay}
        </a>
      </div>
      <a
        href={whatsappLink(`Hello ${site.name}, I would like to enquire about vehicle finance.`)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        onMouseEnter={() => setOpen(true)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-gold-lg transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
      >
        <MessageCircle className="h-7 w-7" aria-hidden="true" />
      </a>
    </div>
  );
}
