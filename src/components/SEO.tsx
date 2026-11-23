import { useEffect } from 'react';
import { site } from '@/config/site';

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  type?: string;
  structuredData?: object;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export default function SEO({ title, description, path = '/', type = 'website', structuredData }: SEOProps) {
  useEffect(() => {
    const fullTitle = title === site.name ? `${site.name} | ${site.tagline}` : `${title} | ${site.name}`;
    const url = `${site.domain}${path}`;

    document.title = fullTitle;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:site_name', site.name);
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    const orgScriptId = 'ld-json-org';
    let org = document.getElementById(orgScriptId) as HTMLScriptElement | null;
    if (!org) {
      org = document.createElement('script');
      org.id = orgScriptId;
      org.type = 'application/ld+json';
      document.head.appendChild(org);
    }
    org.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'AutoFinanceDealer',
      name: site.legalName,
      url: site.domain,
      telephone: site.phoneDial,
      email: site.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: site.location.city,
        addressRegion: site.location.state,
        addressCountry: 'IN',
      },
      openingHours: 'Mo-Sa 09:30-19:00',
      areaServed: site.location.state,
      sameAs: [site.social.facebook, site.social.instagram],
    });

    const pageScriptId = 'ld-json-page';
    let pageLd = document.getElementById(pageScriptId) as HTMLScriptElement | null;
    if (structuredData) {
      if (!pageLd) {
        pageLd = document.createElement('script');
        pageLd.id = pageScriptId;
        pageLd.type = 'application/ld+json';
        document.head.appendChild(pageLd);
      }
      pageLd.textContent = JSON.stringify(structuredData);
    } else if (pageLd) {
      pageLd.remove();
    }
  }, [title, description, path, type, structuredData]);

  return null;
}
