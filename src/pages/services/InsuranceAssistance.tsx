import { servicePageData } from '@/data/servicePages';
import { services } from '@/config/site';
import ServicePage from '@/components/ServicePage';
import SEO from '@/components/SEO';
import NotFound from '@/pages/NotFound';

const service = services.find((s) => s.slug === 'insurance-assistance')!;
const data = servicePageData['insurance-assistance'];

export default function InsuranceAssistance() {
  if (!service || !data) return <NotFound />;
  return (
    <>
      <SEO
        title="Insurance Assistance"
        description={service.description}
        path="/services/insurance-assistance"
      />
      <ServicePage service={service} heroImage={data.heroImage} intro={data.intro} steps={data.steps} faqs={data.faqs} />
    </>
  );
}
