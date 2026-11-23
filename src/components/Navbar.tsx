import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Calculator } from 'lucide-react';
import { site, navigation } from '@/config/site';
import LogoMark from '@/components/LogoMark';
import SocialLinks from '@/components/SocialLinks';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium tracking-wide transition-colors duration-200 hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded px-1 ${
      isActive ? 'text-gold-400' : 'text-neutral-300'
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-white/10 bg-night-950/85 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="container-site flex items-center justify-between gap-4 py-4">
        <Link to="/" className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded" aria-label={`${site.name} home`}>
          <LogoMark />
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold tracking-wide text-white">HERITAGE</span>
            <span className="block text-[0.6rem] font-medium uppercase tracking-[0.35em] text-gold-500">Auto Finance</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {navigation.slice(0, 4).map((item) => (
            <NavLink key={item.path} to={item.path} className={linkClass} end>
              {item.label}
            </NavLink>
          ))}
          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 text-sm font-medium tracking-wide text-neutral-300 transition-colors hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded px-1"
              aria-haspopup="true"
            >
              More
            </button>
            <div className="invisible absolute right-0 top-full w-56 translate-y-2 rounded-xl border border-white/10 bg-night-900/95 p-2 opacity-0 shadow-glass backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              {navigation.slice(4).map((item) => (
                <NavLink key={item.path} to={item.path} className={linkClass} end>
                  <span className="block px-3 py-2">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
          <SocialLinks />
          <Link to="/emi-calculator" className="btn-ghost !px-4 !py-2 text-xs" aria-label="Open EMI calculator">
            <Calculator className="h-4 w-4" aria-hidden="true" />
            EMI
          </Link>
          <a href={`tel:${site.phoneDial}`} className="btn-gold !px-4 !py-2 text-xs" aria-label={`Call ${site.name}`}>
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call Now
          </a>
        </nav>
        <button
          type="button"
          className="rounded-lg border border-white/10 p-2 text-neutral-200 transition-colors hover:border-gold-500/50 hover:text-gold-400 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      <div
        className={`fixed inset-0 top-[72px] z-40 overflow-y-auto bg-night-950/97 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <nav className="container-site flex flex-col gap-1 py-8" aria-label="Mobile">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                  isActive ? 'bg-gold-500/10 text-gold-400' : 'text-neutral-200 hover:bg-white/5'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="mt-4 flex flex-col gap-3">
            <a href={`tel:${site.phoneDial}`} className="btn-gold w-full">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call {site.phoneDisplay}
            </a>
            <div className="flex items-center justify-center gap-4 pt-2">
              <SocialLinks iconClassName="h-5 w-5" />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
