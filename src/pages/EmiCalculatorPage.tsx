import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import SectionHeading from '@/components/SectionHeading';
import EmiCalculator from '@/components/EmiCalculator';
import FinanceComparison from '@/components/FinanceComparison';
import FinanceEnquiryForm from '@/components/FinanceEnquiryForm';
import { site } from '@/config/site';

const faqs = [
  {
    q: 'How is the EMI calculated?',
    a: 'EMI = P × r × (1+r)^n / ((1+r)^n − 1), where P is the loan amount, r the monthly interest rate and n the tenure in months. Our calculator applies this standard formula instantly.',
  },
  {
    q: 'Is the calculated EMI the final amount I will pay?',
    a: 'No. It is an indicative estimate. Your actual EMI depends on the lender\'s approved rate, processing fees, insurance choices and the final loan structure.',
  },
  {
    q: 'Does a longer tenure reduce my total cost?',
    a: 'A longer tenure lowers the monthly EMI but increases total interest paid over the loan. A shorter tenure does the opposite. Use the calculator to find your balance.',
  },
  {
    q: 'What other costs should I plan for?',
    a: 'Depending on the loan: processing charges, documentation fees, insurance and registration (for new vehicles), and possible prepayment charges. We explain every applicable cost before you commit.',
  },
];

export default function EmiCalculatorPage() {
  return (
    <>
      <SEO
        title="EMI Calculator"
        description="Free online vehicle EMI calculator. Adjust loan amount, interest rate and tenure to estimate your monthly car or commercial vehicle EMI instantly."
        path="/emi-calculator"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Vehicle EMI Calculator',
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'Any',
          url: `${site.domain}/emi-calculator`,
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        }}
      />
      <section className="container-site pb-10 pt-36 sm:pt-44">
        <SectionHeading
          eyebrow="EMI Calculator"
          title="Know your monthly instalment"
          description="Adjust the amount, an illustrative interest-rate assumption and tenure to model a possible monthly instalment. No result is a loan offer or approval."
        />
        <div className="mt-12">
          <EmiCalculator />
        </div>
      </section>

      <section className="container-site py-16">
        <SectionHeading
          eyebrow="Compare"
          title="Compare finance options"
          description="Compare example EMI scenarios using clearly labelled planning assumptions. Actual terms are set by the selected bank/NBFC."
        />
        <div className="mt-12">
          <FinanceComparison />
        </div>
      </section>

      <section className="border-t border-white/5 bg-night-900/40 py-16">
        <SectionHeading eyebrow="FAQ" title="EMI questions, answered" />
        <div className="mx-auto mt-10 max-w-3xl space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="glass-card group px-6 py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-medium text-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400">
                {f.q}
                <span className="text-gold-500 transition-transform duration-300 group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-neutral-400">
          Ready to check your real eligibility?{' '}
          <Link to="/contact" className="font-medium text-gold-400 underline-offset-4 hover:underline">
            Submit a finance enquiry
          </Link>{' '}
          and we will get back with options.
        </p>
      </section>

      <section className="border-t border-white/5 bg-night-900/40 py-16">
        <div className="container-site grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
          <SectionHeading
            eyebrow="Next Step"
            title="Found a comfortable EMI?"
            description="Send an enquiry with the amount and tenure you have in mind — we will match it with real lender options."
            align="left"
          />
          <FinanceEnquiryForm defaultEnquiryType="Other / General Question" title="Send your enquiry" />
        </div>
      </section>
    </>
  );
}
