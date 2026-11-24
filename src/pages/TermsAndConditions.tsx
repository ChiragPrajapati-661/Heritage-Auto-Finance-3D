import SEO from '@/components/SEO';
import SectionHeading from '@/components/SectionHeading';
import { site } from '@/config/site';

const sections = [
  {
    title: '1. About This Website',
    body: [
      `${site.name} ("we", "us", "our") operates this website to provide information about our vehicle finance assistance services and to receive enquiries. By using this website you agree to these Terms and Conditions.`,
    ],
  },
  {
    title: '2. Nature of Our Services',
    body: [
      'We are a finance assistance service. We are not a bank, NBFC or insurer, and we do not lend money or issue insurance directly. Loan approvals, interest rates, terms and insurance underwriting are decided solely by the respective lender or insurer after their own eligibility and verification checks.',
      'Nothing on this website — including calculator results, rates or timelines — constitutes an offer, approval or guarantee of finance.',
    ],
  },
  {
    title: '3. EMI Calculator',
    body: [
      'The EMI calculator provides indicative estimates based on the inputs you enter. Actual EMIs may differ due to lender-approved rates, fees, taxes and the final loan structure. Estimates must not be treated as a quote or sanction.',
    ],
  },
  {
    title: '4. Enquiries and Accuracy of Information',
    body: [
      'When submitting an enquiry you agree to provide accurate, current and complete information. Submitting false or misleading information may result in your enquiry being declined.',
      'Submitting an enquiry does not create any obligation on any lender to offer finance, nor on you to accept any offer.',
    ],
  },
  {
    title: '5. Intellectual Property',
    body: [
      'All content on this website — text, design, graphics, logos and layout — is the property of Heritage Auto Finance or its licensors and may not be copied or reused without written permission.',
    ],
  },
  {
    title: '6. Limitation of Liability',
    body: [
      'To the maximum extent permitted by law, we are not liable for any loss arising from the use of this website or reliance on its content, including financial decisions made on the basis of calculator estimates. You should confirm all terms directly with the lender before committing to any finance.',
    ],
  },
  {
    title: '7. External Links',
    body: [
      'This website may link to third-party websites (for example WhatsApp). We are not responsible for the content or policies of external sites.',
    ],
  },
  {
    title: '8. Governing Law',
    body: [
      'These Terms are governed by the laws of India. Any disputes are subject to the jurisdiction of the courts at Mehsana, Gujarat.',
    ],
  },
  {
    title: '9. Changes and Contact',
    body: [
      'We may revise these Terms at any time by updating this page. Continued use of the website constitutes acceptance of the revised Terms. Questions may be directed to ' + site.email + ' or ' + site.phoneDisplay + '.',
    ],
  },
];

export default function TermsAndConditions() {
  return (
    <>
      <SEO
        title="Terms and Conditions"
        description={`Terms and Conditions for using the ${site.name} website and enquiry services.`}
        path="/terms-and-conditions"
      />
      <article className="container-site max-w-3xl pb-24 pt-36 sm:pt-44">
        <SectionHeading eyebrow="Legal" title="Terms and Conditions" align="left" />
        <p className="mt-4 text-sm text-neutral-500">Effective date: 24 November 2026</p>
        <div className="mt-10 space-y-10">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="font-display text-2xl font-semibold text-white">{s.title}</h2>
              {s.body.map((p) => (
                <p key={p.slice(0, 30)} className="mt-3 text-sm leading-relaxed text-neutral-400">{p}</p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
