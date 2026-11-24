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
      'Buying a new car is a major decision. Heritage Auto Finance helps you explore vehicle finance options, understand the estimated on-road cost and prepare for a conversation with a suitable lender. Final terms depend on the lender’s assessment.',
      'We can guide you through enquiry details and document preparation, and help coordinate the application with the selected lender and dealer where applicable. The lender alone decides eligibility, sanction and disbursal.',
    ],
    steps: [
      { title: 'Share the model', text: 'Tell us which car (and variant) you have in mind, along with your city and budget.' },
      { title: 'Eligibility & options', text: 'We help compare available lender options; final rates and tenure depend on the bank/NBFC assessment.' },
      { title: 'Documents & approval', text: 'Complete a short document checklist; we submit to the lender and follow up on approval.' },
      { title: 'Lender decision & next steps', text: 'The lender communicates its decision and, if sanctioned, explains disbursal and dealer-payment arrangements.' },
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
        a: 'Prepayment rules and any charges depend on the lender, loan agreement and applicable regulations. Check the written terms shared by the lender before signing.',
      },
      {
        q: 'Do you charge customers a fee?',
        a: 'Any service fee, if applicable, should be confirmed with us in writing before you proceed. Lender charges and other third-party costs may also apply.',
      },
    ],
  },
  'used-car-finance': {
    slug: 'used-car-finance',
    path: '/services/used-car-finance',
    heroImage: pexels.usedCar,
    intro: [
      'We help you explore used-car finance options, understand the information lenders may request and coordinate documentation with the selected lender.',
      'Purchases from dealers or individual sellers may be considered, subject to vehicle condition, age, ownership documents and lender policy.',
    ],
    steps: [
      { title: 'Share car details', text: 'Make, model, year, kilometres and the asking price — photos help too.' },
      { title: 'Valuation review', text: 'Vehicle valuation and any eligible funding amount are determined under the selected lender’s process and policy.' },
      { title: 'Document review', text: 'Keep the RC, insurance and available ownership or loan records ready for review by the relevant parties and lender.' },
      { title: 'Lender decision & transfer', text: 'If the lender sanctions the application, payment and ownership-transfer steps are completed according to the sale and lender requirements.' },
    ],
    faqs: [
      {
        q: 'How old a car can I finance?',
        a: 'Vehicle-age limits vary by lender and may consider the age at loan maturity. Share the make, model and year so available criteria can be checked.',
      },
      {
        q: 'Can I finance a car bought from an individual seller?',
        a: 'Some lenders may consider private-party purchases. Acceptance, seller documentation and payment steps depend on the selected lender.',
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
      'Car refinance may allow an eligible vehicle owner to seek finance against an existing vehicle. Availability, vehicle use, valuation and loan terms depend on the lender’s assessment and agreement.',
      'We can help you explore balance-transfer enquiries. A transfer may or may not reduce the EMI or total interest after considering the new rate, fees, tenure and foreclosure costs.',
    ],
    steps: [
      { title: 'Tell us about your car', text: 'Model, year, current ownership and any running loan details.' },
      { title: 'Valuation & lender review', text: 'The lender assesses the vehicle value, outstanding loan (if any), applicant profile and eligibility.' },
      { title: 'Documentation', text: 'RC, insurance, income proof and existing loan statement (if any) are prepared.' },
      { title: 'Lender decision & disbursal', text: 'If sanctioned, the lender confirms disbursal conditions and whether the vehicle can continue to be used under the loan agreement.' },
    ],
    faqs: [
      {
        q: 'Will I lose use of my car during refinancing?',
        a: 'Vehicle possession and use are governed by the lender’s product terms and loan agreement. Confirm these conditions with the lender before accepting an offer.',
      },
      {
        q: 'How much money can I raise against my car?',
        a: 'It depends on the car’s market value and the lender’s policy — commonly a percentage of the current valuation. We confirm an indicative figure first.',
      },
      {
        q: 'I still have a running car loan. Can I refinance?',
        a: 'Some lenders may consider refinancing a vehicle with an existing loan. Any foreclosure, settlement of the old loan and surplus disbursal depend on lender approval and the transaction terms.',
      },
      {
        q: 'What is a balance transfer?',
        a: 'A balance transfer means moving an existing car loan to another lender, subject to approval. A lower rate does not automatically mean a lower overall cost; compare processing fees, foreclosure charges, tenure and total repayment before deciding.',
      },
    ],
  },
  'commercial-vehicle-finance': {
    slug: 'commercial-vehicle-finance',
    path: '/services/commercial-vehicle-finance',
    heroImage: pexels.commercial,
    intro: [
      'Commercial vehicle finance requirements vary with vehicle type, intended use and business profile. We help you prepare the enquiry and explore lender options; the lender determines the funding structure.',
      'First-time buyers and fleet operators can enquire. Available products and lender coverage depend on the vehicle, location, applicant profile and lender policy.',
    ],
    steps: [
      { title: 'Discuss the vehicle & use', text: 'The vehicle type, its intended use and your operating route or contract profile.' },
      { title: 'Review funding requirements', text: 'We help outline the vehicle cost, expected contribution and repayment needs for lender assessment.' },
      { title: 'Documents & submission', text: 'Business proof, income documents and vehicle quotation are compiled and filed.' },
      { title: 'Lender decision & delivery', text: 'If the lender sanctions the application, it confirms the disbursal conditions and payment process. Vehicle delivery follows the lender, dealer and buyer requirements.' },
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
        a: 'Some lenders may consider bank statements as part of income assessment. Required evidence varies by lender and applicant profile.',
      },
    ],
  },
  'insurance-assistance': {
    slug: 'insurance-assistance',
    path: '/services/insurance-assistance',
    heroImage: pexels.insurance,
    intro: [
      'Motor third-party insurance is generally required for vehicles used on public roads in India. We help explain third-party and package policy options, add-ons and common claim steps in clear language.',
      'You can enquire about policy renewal, cover for a new vehicle or transfer after a used-car purchase. Policy issuance and acceptance are subject to the insurer’s process and terms.',
    ],
    steps: [
      { title: 'Share your policy or vehicle', text: 'Current policy details, or the vehicle you need cover for.' },
      { title: 'Cover recommendation', text: 'We explain suitable options, IDV, deductibles and useful add-ons — with no pushy upselling.' },
      { title: 'Insurer decision & policy', text: 'The insurer confirms acceptance, premium, coverage and issuance requirements for the selected policy.' },
      { title: 'Claim guidance', text: 'We can help explain the claim process and documents; claim decisions are made by the insurer under the policy.' },
    ],
    faqs: [
      {
        q: 'What is the difference between comprehensive and third-party cover?',
        a: 'Third-party covers damage or injury caused to others and is the legal minimum. Comprehensive cover additionally protects your own vehicle against accidents, theft, fire and natural events.',
      },
      {
        q: 'My policy has expired. Can it be renewed?',
        a: 'Renewal after expiry may require inspection or additional steps under the insurer’s rules. Contact the insurer or us to check the requirements for your vehicle.',
      },
      {
        q: 'Which add-ons are worth considering?',
        a: 'Zero-depreciation, engine protection and roadside assistance are commonly useful depending on vehicle age and usage. We recommend only what fits your case.',
      },
      {
        q: 'I bought a used car. How do I transfer the insurance?',
        a: 'Notify the insurer and complete the required policy-transfer process within the applicable timelines. The insurer confirms documents and endorsement requirements.',
      },
    ],
  },
};

