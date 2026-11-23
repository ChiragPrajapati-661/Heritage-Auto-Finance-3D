import { pexels } from '@/lib/media';

export interface ServicePageData {
  slug: string;
  path: string;
  heroImage: string;
  intro: string[];
  steps: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
}

export const servicePageData: Record<string, ServicePageData> = {
  'new-car-finance': {
    slug: 'new-car-finance',
    path: '/services/new-car-finance',
    heroImage: pexels.newCar,
    intro: [
      'A new car is a milestone purchase, and the right finance makes it stress-free. Heritage Auto Finance helps you compare loan options from banks and NBFCs, understand the true on-road cost, and choose a tenure that keeps your monthly budget comfortable.',
      'We assist with the full journey: eligibility assessment, document preparation, loan application and coordination with the dealer and lender up to disbursal. You keep choosing the car — we handle the finance around it.',
    ],
    steps: [
      { title: 'Share the model', text: 'Tell us which car (and variant) you have in mind, along with your city and budget.' },
      { title: 'Eligibility & options', text: 'We help compare available lender options; final rates and tenure depend on the bank/NBFC assessment.' },
      { title: 'Documents & approval', text: 'Complete a short document checklist; we submit to the lender and follow up on approval.' },
      { title: 'Disbursal & delivery', text: 'Funds go directly to the dealer and your new car is ready for delivery.' },
    ],
    faqs: [
      {
        q: 'How much of the car price can be financed?',
        a: 'The fundable amount varies by lender policy, vehicle, applicant profile and credit assessment. We can help you explore indicative options; the bank/NBFC confirms the final amount.',
      },
      {
        q: 'How long does approval take?',
        a: 'Processing and decision timelines vary by lender, applicant profile and document verification. The lender communicates the final decision.',
      },
      {
        q: 'Can I prepay the loan later?',
        a: 'Most lenders allow prepayment, sometimes with a small charge depending on the loan type and timing. We will explain the specific lender policy before you sign.',
      },
      {
        q: 'Do you charge customers a fee?',
        a: 'Our guidance for the enquiry process is free. If any fee applies for a specific service, it will be stated clearly before you proceed.',
      },
    ],
  },
  'used-car-finance': {
    slug: 'used-car-finance',
    path: '/services/used-car-finance',
    heroImage: pexels.usedCar,
    intro: [
      'A pre-owned car is often the smartest buy on the road — if the finance is handled properly. We help explore used-car finance options, support valuation discussions and coordinate documentation with the selected lender.',
      'We support purchases from dealers and individual sellers across most makes and models, including cars up to ten years old, subject to lender policy.',
    ],
    steps: [
      { title: 'Share car details', text: 'Make, model, year, kilometres and the asking price — photos help too.' },
      { title: 'Valuation check', text: 'We arrange an indicative market valuation so you know the fair funding amount.' },
      { title: 'Verification', text: 'RC, insurance, hypothecation and history are checked before the lender files the case.' },
      { title: 'Payment & transfer', text: 'On approval, the seller is paid and ownership documents move to your name.' },
    ],
    faqs: [
      {
        q: 'How old a car can I finance?',
        a: 'Most lenders fund cars up to around 10 years of age at loan maturity. Exact limits vary, so share the car details and we will confirm options.',
      },
      {
        q: 'Can I finance a car bought from an individual seller?',
        a: 'Yes. Used car loans can often cover private sales. The verification step is especially important here, and we guide you through it.',
      },
      {
        q: 'What documents are needed?',
        a: 'Typically identity and address proof, income proof (salary slips or IT returns), bank statements and the car’s RC. We give you an exact list for your case.',
      },
      {
        q: 'Are used car interest rates higher than new car rates?',
        a: 'Rates can differ from new-car finance and are set by each lender after considering vehicle age, condition, applicant profile and credit assessment.',
      },
    ],
  },
  'car-refinance': {
    slug: 'car-refinance',
    path: '/services/car-refinance',
    heroImage: pexels.refinance,
    intro: [
      'Your car holds value — refinancing lets you use it. Car refinance releases funds against a vehicle you already own, while you keep driving it as before. It is a practical way to arrange money for business needs, education, travel or emergencies.',
      'We also assist with balance transfers: if your current car loan rate is high, moving it to a more competitive lender can reduce your EMI or total interest.',
    ],
    steps: [
      { title: 'Tell us about your car', text: 'Model, year, current ownership and any running loan details.' },
      { title: 'Valuation & eligibility', text: 'We estimate the fundable value and check indicative eligibility.' },
      { title: 'Documentation', text: 'RC, insurance, income proof and existing loan statement (if any) are prepared.' },
      { title: 'Funds disbursed', text: 'On approval, the amount is credited to your account and you continue using the car.' },
    ],
    faqs: [
      {
        q: 'Will I lose use of my car during refinancing?',
        a: 'No. The car stays with you throughout. The lender marks a hypothecation on the RC until the loan is closed.',
      },
      {
        q: 'How much money can I raise against my car?',
        a: 'It depends on the car’s market value and the lender’s policy — commonly a percentage of the current valuation. We confirm an indicative figure first.',
      },
      {
        q: 'I still have a running car loan. Can I refinance?',
        a: 'Often yes — the outstanding can be foreclosed by the new loan, and any surplus value may be released to you. Share your statement for an assessment.',
      },
      {
        q: 'What is a balance transfer?',
        a: 'Moving an existing car loan to another lender offering a lower rate, which can reduce your EMI or total interest. We handle the transfer process.',
      },
    ],
  },
  'commercial-vehicle-finance': {
    slug: 'commercial-vehicle-finance',
    path: '/services/commercial-vehicle-finance',
    heroImage: pexels.commercial,
    intro: [
      'From light commercial vehicles for city delivery to tippers, trailers and tractors, commercial vehicle finance needs to match how your business actually earns. We structure funding around your cash flow, not just a credit score.',
      'We assist first-time buyers as well as fleet operators adding to their vehicles, working with lenders active in Gujarat’s commercial transport and agri sectors.',
    ],
    steps: [
      { title: 'Discuss the vehicle & use', text: 'The vehicle type, its intended use and your operating route or contract profile.' },
      { title: 'Structure the funding', text: 'We propose margin money, tenure and EMI structures aligned to your cash flows.' },
      { title: 'Documents & submission', text: 'Business proof, income documents and vehicle quotation are compiled and filed.' },
      { title: 'Approval & delivery', text: 'On sanction, the dealer is paid and the vehicle goes on the road.' },
    ],
    faqs: [
      {
        q: 'Which vehicles can be financed?',
        a: 'Light and heavy commercial vehicles, tippers, trailers, tankers, tractors and other farm equipment — new or used, subject to lender policy.',
      },
      {
        q: 'I am a first-time commercial vehicle buyer. Can I get finance?',
        a: 'Some lenders may consider first-time commercial vehicle buyers. Eligibility and terms depend on lender policy, income assessment and the vehicle/business profile.',
      },
      {
        q: 'What margin money is required?',
        a: 'Margin contribution varies by lender, vehicle, applicant profile and assessment. The selected lender confirms the required amount.',
      },
      {
        q: 'Can income be shown through bank statements only?',
        a: 'Many lenders accept banking turnover as income evidence for self-employed applicants. Share your statements for an indicative check.',
      },
    ],
  },
  'insurance-assistance': {
    slug: 'insurance-assistance',
    path: '/services/insurance-assistance',
    heroImage: pexels.insurance,
    intro: [
      'Motor insurance is compulsory — but the right cover is a choice. We help you understand comprehensive versus third-party cover, which add-ons genuinely add value, and how claims work, in plain language.',
      'Whether you are renewing an existing policy, buying cover for a new vehicle or transferring insurance after a used car purchase, we handle the process end to end.',
    ],
    steps: [
      { title: 'Share your policy or vehicle', text: 'Current policy details, or the vehicle you need cover for.' },
      { title: 'Cover recommendation', text: 'We explain suitable options, IDV, deductibles and useful add-ons — with no pushy upselling.' },
      { title: 'Policy issuance', text: 'Chosen cover is documented and the policy is issued or renewed promptly.' },
      { title: 'Claim support', text: 'If you ever need to claim, we guide you through the steps and documentation.' },
    ],
    faqs: [
      {
        q: 'What is the difference between comprehensive and third-party cover?',
        a: 'Third-party covers damage or injury caused to others and is the legal minimum. Comprehensive cover additionally protects your own vehicle against accidents, theft, fire and natural events.',
      },
      {
        q: 'My policy has expired. Can it be renewed?',
        a: 'Usually yes, though a fresh vehicle inspection may be required if there is a break in coverage. Renewing before expiry avoids that hassle.',
      },
      {
        q: 'Which add-ons are worth considering?',
        a: 'Zero-depreciation, engine protection and roadside assistance are commonly useful depending on vehicle age and usage. We recommend only what fits your case.',
      },
      {
        q: 'I bought a used car. How do I transfer the insurance?',
        a: 'The policy must be transferred to your name along with the RC transfer. We handle the paperwork with the insurer.',
      },
    ],
  },
};

