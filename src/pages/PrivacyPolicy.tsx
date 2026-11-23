import SEO from '@/components/SEO';
import SectionHeading from '@/components/SectionHeading';
import { site } from '@/config/site';

const sections = [
  {
    title: '1. Information We Collect',
    body: [
      'When you submit a finance enquiry we collect the details you provide: your name, mobile number, city, vehicle type, enquiry type and any optional message you include.',
      'If you contact us by phone, WhatsApp or email, we collect the information you share in that conversation. Our website does not use tracking cookies or third-party advertising trackers.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    body: [
      'We use your enquiry details to contact you about your request, assess indicative finance options, and share your information with banks, NBFCs or insurers where needed to process your enquiry.',
      'We do not sell your personal information to unrelated third parties for their own marketing.',
    ],
  },
  {
    title: '3. Sharing With Lenders and Partners',
    body: [
      'To arrange finance or insurance, your details may be shared with prospective lenders (banks and NBFCs) or insurance providers and their authorised representatives. These parties process your information under their own privacy policies and legal obligations.',
      'We share only the information reasonably required to pursue your enquiry.',
    ],
  },
  {
    title: '4. Data Storage and Security',
    body: [
      'Enquiries submitted through this website are stored in a secured database accessible only to authorised personnel. We apply reasonable technical and organisational safeguards to protect your information.',
      'No method of transmission over the internet is completely secure, and we cannot guarantee absolute security of information you submit online.',
    ],
  },
  {
    title: '5. Data Retention',
    body: [
      'We retain enquiry information for as long as needed to process your request and for a reasonable period thereafter to meet legal, regulatory and record-keeping requirements.',
    ],
  },
  {
    title: '6. Your Rights',
    body: [
      'You may ask us to access, correct or delete the personal information we hold about you, subject to applicable law. Contact us using the details below and we will respond within a reasonable period.',
    ],
  },
  {
    title: '7. Children’s Information',
    body: [
      'Our services are intended for adults. We do not knowingly collect information from individuals under 18 years of age.',
    ],
  },
  {
    title: '8. Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time. The revised version will be posted on this page with an updated effective date.',
    ],
  },
  {
    title: '9. Contact',
    body: [
      `For privacy questions or requests, contact ${site.name}: phone ${site.phoneDisplay}, email ${site.email}, address: ${site.location.addressLine}.`,
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description={`How ${site.name} collects, uses and protects the personal information you share through our website and enquiry channels.`}
        path="/privacy-policy"
      />
      <article className="container-site max-w-3xl pb-24 pt-36 sm:pt-44">
        <SectionHeading eyebrow="Legal" title="Privacy Policy" align="left" />
        <p className="mt-4 text-sm text-neutral-500">Effective date: 1 December 2025</p>
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
