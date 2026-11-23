import { servicePageData } from '@/data/servicePages';
import { services } from '@/config/site';
import ServicePage from '@/components/ServicePage';
import SEO from '@/components/SEO';
import NotFound from '@/pages/NotFound';

const service = services.find((s) => s.slug === 'new-car-finance')!;
const data = servicePageData['new-car-finance'];

export default function NewCarFinance() {
  if (!service || !data) return <NotFound />;
  return (
    <>
      <SEO
        title="New Car Finance"
        description={service.description}
        path="/services/new-car-finance"
      />
      <ServicePage service={service} heroImage={data.heroImage} intro={data.intro} steps={data.steps} faqs={data.faqs} />
    </>
  );
}
