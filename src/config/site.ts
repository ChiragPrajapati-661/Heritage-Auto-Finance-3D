/**
 * Central configuration for HERITAGE AUTO FINANCE.
 * Edit this single file to update contact details, WhatsApp number,
 * address, email and social links across the whole website.
 */
export const site = {
  name: 'Heritage Auto Finance',
  legalName: 'Heritage Auto Finance',
  tagline: 'Drive Your Dream. Finance Your Future.',
  domain: 'https://heritageautofinance.in',
  location: {
    city: 'Mehsana',
    state: 'Gujarat',
    country: 'India',
    // NOTE: Replace with the full, verified street address before going live.
    addressLine: 'Mehsana, Gujarat, India',
    serviceArea: 'Across Gujarat',
  },
  // Confirmed business WhatsApp number (country code, no +, no spaces).
  whatsappNumber: '917600211085',
  phoneDisplay: '+91 76002 11085',
  phoneDial: '+917600211085',
  // Business email shown on the website; verify inbox access before launch.
  email: 'info@heritageautofinance.in',
  hours: 'Mon – Sat, 9:30 AM – 7:00 PM',
  social: {
    facebook: 'https://www.facebook.com/share/1F1PD2Czew/',
    instagram: 'https://www.instagram.com/heritageautofinance?gwpx=N3pjczhjbXE1dW01',
  },
  // Official Heritage logo: public/brand/heritage-logo.webp
  logoSrc: '/brand/heritage-logo.webp' as string | null,
} as const;

export const whatsappLink = (message: string): string =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const serviceWhatsAppLink = (serviceTitle: string): string =>
  whatsappLink(
    `Hello ${site.name}, I am interested in ${serviceTitle}. Please share the details and next steps.`
  );

export interface Service {
  slug: string;
  path: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  icon: string;
  highlights: string[];
}

export const services: Service[] = [
  {
    slug: 'new-car-finance',
    path: '/services/new-car-finance',
    title: 'New Car Finance',
    shortTitle: 'New Car',
    tagline: 'Explore finance options for your next car',
    description:
      'We help compare vehicle finance options from banks and NBFCs, with terms subject to lender policy and applicant assessment.',
    icon: 'Car',
    highlights: [
      'Funding options subject to lender policy',
      'Tenure subject to lender assessment',
      'Document guidance and application support',
      'Disbursal timeline determined by the lender',
    ],
  },
  {
    slug: 'used-car-finance',
    path: '/services/used-car-finance',
    title: 'Used Car Finance',
    shortTitle: 'Used Car',
    tagline: 'Explore finance options for pre-owned cars',
    description:
      'Explore pre-owned vehicle finance options with documentation guidance. Vehicle eligibility, valuation and terms are subject to lender assessment.',
    icon: 'CarFront',
    highlights: [
      'Vehicle age criteria set by the lender',
      'Vehicle valuation subject to lender process',
      'Compare available lender options',
      'Document support and application coordination',
    ],
  },
  {
    slug: 'car-refinance',
    path: '/services/car-refinance',
    title: 'Car Refinance',
    shortTitle: 'Refinance',
    tagline: 'Explore finance options against your existing car',
    description:
      'Explore refinance options against an existing vehicle. Eligibility, vehicle use, valuation and terms depend on lender assessment and the loan agreement.',
    icon: 'RefreshCcw',
    highlights: [
      'Funding against your existing car',
      'Vehicle use subject to lender agreement',
      'Existing-loan options subject to lender approval',
      'Balance transfer options',
    ],
  },
  {
    slug: 'commercial-vehicle-finance',
    path: '/services/commercial-vehicle-finance',
    title: 'Commercial Vehicle Finance',
    shortTitle: 'Commercial',
    tagline: 'Explore finance options for business vehicles',
    description:
      'Explore finance options for commercial vehicles and farm equipment, subject to vehicle eligibility, applicant profile and lender policy.',
    icon: 'Truck',
    highlights: [
      'LCVs, HCVs, tippers & tractors',
      'Repayment structure assessed by lender',
      'Funding structure subject to lender assessment',
      'Options subject to lender policy',
    ],
  },
  {
    slug: 'insurance-assistance',
    path: '/services/insurance-assistance',
    title: 'Insurance Assistance',
    shortTitle: 'Insurance',
    tagline: 'Understand your motor insurance options',
    description:
      'Get guidance on motor insurance options, policy renewals, transfers and add-ons. Coverage and issuance are subject to insurer terms.',
    icon: 'ShieldCheck',
    highlights: [
      'Comprehensive & third-party cover',
      'Renewals and transfers',
      'Claim-process guidance',
      'Add-on selection help',
    ],
  },
];

export const navigation = [
  { label: 'Home', path: '/' },
  { label: 'New Car Finance', path: '/services/new-car-finance' },
  { label: 'Used Car Finance', path: '/services/used-car-finance' },
  { label: 'Car Refinance', path: '/services/car-refinance' },
  { label: 'Commercial Vehicle Finance', path: '/services/commercial-vehicle-finance' },
  { label: 'Insurance Assistance', path: '/services/insurance-assistance' },
  { label: 'EMI Calculator', path: '/emi-calculator' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact Us', path: '/contact' },
];

export const enquiryTypes = [
  'New Car Finance',
  'Used Car Finance',
  'Car Refinance',
  'Commercial Vehicle Finance',
  'Insurance Assistance',
  'Other / General Question',
] as const;

export const vehicleTypes = [
  'New Car',
  'Used Car',
  'Commercial Vehicle',
  'Tractor / Farm Equipment',
  'Not sure yet',
] as const;
