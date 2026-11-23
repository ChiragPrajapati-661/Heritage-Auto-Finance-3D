import { servicePageData } from '@/data/servicePages';
import { services } from '@/config/site';
import ServicePage from '@/components/ServicePage';
import SEO from '@/components/SEO';
import NotFound from '@/pages/NotFound';

const service = services.find((s) => s.slug === 'commercial-vehicle-finance')!;
const data = servicePageData['commercial-vehicle-finance'];

export default function CommercialVehicleFinance() {
  if (!service || !data) return <NotFound />;
  return (
    <>
      <SEO
        title="Commercial Vehicle Finance"
        description={service.description}
        path="/services/commercial-vehicle-finance"
      />
      <ServicePage service={service} heroImage={data.heroImage} intro={data.intro} steps={data.steps} faqs={data.faqs} />
    </>
  );
}
