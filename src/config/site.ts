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
    tagline: 'Own the newest model on the lot',
    description:
      'We help compare vehicle finance options from banks and NBFCs, with terms subject to lender policy and applicant assessment.',
    icon: 'Car',
    highlights: [
      'Funding options subject to lender policy',
      'Tenures from 12 to 84 months',
      'Minimal documentation',
      'Disbursal timeline determined by the lender',
    ],
  },
  {
    slug: 'used-car-finance',
    path: '/services/used-car-finance',
    title: 'Used Car Finance',
    shortTitle: 'Used Car',
    tagline: 'Pre-owned cars, first-class finance',
    description:
      'Buy a pre-owned car with confidence. We arrange funding for cars of most makes and models, with fair valuations and honest terms.',
    icon: 'CarFront',
    highlights: [
      'Cars up to 10 years old',
      'Fair market valuation support',
      'Compare available lender options',
      'Document support and application coordination',
    ],
  },
  {
    slug: 'car-refinance',
    path: '/services/car-refinance',
    title: 'Car Refinance',
    shortTitle: 'Refinance',
    tagline: 'Unlock the value in your car',
    description:
      'Already own a car? Refinance it to release cash for business, education, travel or emergencies — while you keep driving it.',
    icon: 'RefreshCcw',
    highlights: [
      'Funding against your existing car',
      'Keep using your vehicle',
      'Top-up on existing loans',
      'Balance transfer options',
    ],
  },
  {
    slug: 'commercial-vehicle-finance',
    path: '/services/commercial-vehicle-finance',
    title: 'Commercial Vehicle Finance',
    shortTitle: 'Commercial',
    tagline: 'Finance that moves your business',
    description:
      'From light commercial vehicles to tippers and tractors, we finance the vehicles that keep Gujarat moving and your business growing.',
    icon: 'Truck',
    highlights: [
      'LCVs, HCVs, tippers & tractors',
      'Structured for business cash flows',
      'Funding structure subject to lender assessment',
      'Fleet-operator friendly terms',
    ],
  },
  {
    slug: 'insurance-assistance',
    path: '/services/insurance-assistance',
    title: 'Insurance Assistance',
    shortTitle: 'Insurance',
    tagline: 'Complete cover, zero confusion',
    description:
      'Renew or transfer your motor insurance with guidance on the right cover — comprehensive, third-party, and add-ons explained plainly.',
    icon: 'ShieldCheck',
    highlights: [
      'Comprehensive & third-party cover',
      'Renewals and transfers',
      'Claim guidance',
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
