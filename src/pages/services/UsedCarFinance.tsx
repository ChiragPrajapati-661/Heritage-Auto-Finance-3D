import { servicePageData } from '@/data/servicePages';
import { services } from '@/config/site';
import ServicePage from '@/components/ServicePage';
import SEO from '@/components/SEO';
import NotFound from '@/pages/NotFound';

const service = services.find((s) => s.slug === 'used-car-finance')!;
const data = servicePageData['used-car-finance'];

export default function UsedCarFinance() {
  if (!service || !data) return <NotFound />;
  return (
    <>
      <SEO
        title="Used Car Finance"
        description={service.description}
        path="/services/used-car-finance"
      />
      <ServicePage service={service} heroImage={data.heroImage} intro={data.intro} steps={data.steps} faqs={data.faqs} />
    </>
  );
}
