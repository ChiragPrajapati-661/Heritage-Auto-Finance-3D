import { servicePageData } from '@/data/servicePages';
import { services } from '@/config/site';
import ServicePage from '@/components/ServicePage';
import SEO from '@/components/SEO';
import NotFound from '@/pages/NotFound';

const service = services.find((s) => s.slug === 'car-refinance')!;
const data = servicePageData['car-refinance'];

export default function CarRefinance() {
  if (!service || !data) return <NotFound />;
  return (
    <>
      <SEO
        title="Car Refinance"
        description={service.description}
        path="/services/car-refinance"
      />
      <ServicePage service={service} heroImage={data.heroImage} intro={data.intro} steps={data.steps} faqs={data.faqs} />
    </>
  );
}
