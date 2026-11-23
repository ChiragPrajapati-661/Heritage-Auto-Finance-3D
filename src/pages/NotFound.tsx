import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { Home, Phone } from 'lucide-react';
import { site } from '@/config/site';

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" description="The page you are looking for does not exist." path="/404" />
      <section className="container-site flex min-h-[70svh] flex-col items-center justify-center py-32 text-center">
        <p className="font-display text-8xl font-semibold text-gold-500/60">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-white">This road doesn't lead anywhere</h1>
        <p className="mt-3 max-w-md text-sm text-neutral-400">
          The page you are looking for has moved or never existed. Let's get you back on track.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/" className="btn-gold">
            <Home className="h-4 w-4" aria-hidden="true" />
            Back to Home
          </Link>
          <a href={`tel:${site.phoneDial}`} className="btn-ghost">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call us
          </a>
        </div>
      </section>
    </>
  );
}
