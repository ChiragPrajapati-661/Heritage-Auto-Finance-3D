import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { IndianRupee, Percent, CalendarClock } from 'lucide-react';
import { calculateEmi } from '@/lib/finance';

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

interface EmiCalculatorProps {
  defaultAmount?: number;
  defaultRate?: number;
  defaultTenure?: number;
  compact?: boolean;
}

export default function EmiCalculator({
  defaultAmount = 800000,
  defaultRate = 9.5,
  defaultTenure = 60,
  compact = false,
}: EmiCalculatorProps) {
  const [amount, setAmount] = useState(defaultAmount);
  const [rate, setRate] = useState(defaultRate);
  const [tenure, setTenure] = useState(defaultTenure);

  const { emi, totalInterest, totalPayment } = useMemo(() => {
    const emiVal = calculateEmi(amount, rate, tenure);
    const total = emiVal * tenure;
    return { emi: emiVal, totalInterest: total - amount, totalPayment: total };
  }, [amount, rate, tenure]);

  const amountMarks = [300000, 800000, 1500000, 3000000];
  const tenureMarks = [12, 36, 60, 84];

  return (
    <div className={`glass-card p-6 sm:p-8 ${compact ? '' : 'lg:p-10'}`}>
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-8">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <label htmlFor="emi-amount" className="field-label !mb-0 flex items-center gap-2">
                <IndianRupee className="h-4 w-4 text-gold-500" aria-hidden="true" />
                Loan amount
              </label>
              <span className="font-display text-xl font-semibold text-gold-400">{inr.format(amount)}</span>
            </div>
            <input
              id="emi-amount"
              type="range"
              min={100000}
              max={5000000}
              step={50000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full accent-gold-500"
              aria-valuetext={inr.format(amount)}
            />
            <div className="mt-2 flex justify-between text-[0.65rem] text-neutral-500">
              {amountMarks.map((m) => (
                <button key={m} type="button" onClick={() => setAmount(m)} className="hover:text-gold-400">
                  {m >= 100000 ? `₹${m / 100000}L` : `₹${m}`}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <label htmlFor="emi-rate" className="field-label !mb-0 flex items-center gap-2">
                <Percent className="h-4 w-4 text-gold-500" aria-hidden="true" />
                Illustrative annual rate (assumption)
              </label>
              <span className="font-display text-xl font-semibold text-gold-400">{rate.toFixed(1)}%</span>
            </div>
            <input
              id="emi-rate"
              type="range"
              min={7}
              max={20}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full accent-gold-500"
              aria-valuetext={`${rate.toFixed(1)} percent`}
            />
            <div className="mt-2 flex justify-between text-[0.65rem] text-neutral-500">
              <span>7%</span>
              <span>20%</span>
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <label htmlFor="emi-tenure" className="field-label !mb-0 flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-gold-500" aria-hidden="true" />
                Tenure
              </label>
              <span className="font-display text-xl font-semibold text-gold-400">{tenure} months</span>
            </div>
            <input
              id="emi-tenure"
              type="range"
              min={12}
              max={84}
              step={6}
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full accent-gold-500"
              aria-valuetext={`${tenure} months`}
            />
            <div className="mt-2 flex justify-between text-[0.65rem] text-neutral-500">
              {tenureMarks.map((m) => (
                <button key={m} type="button" onClick={() => setTenure(m)} className="hover:text-gold-400">
                  {m}m
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-xl border border-gold-500/20 bg-night-800/70 p-6 text-center">
          <p className="eyebrow">Monthly EMI</p>
          <p className="mt-3 font-display text-4xl font-semibold text-white sm:text-5xl">{inr.format(emi)}</p>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between border-t border-white/10 pt-3">
              <dt className="text-neutral-400">Total interest</dt>
              <dd className="font-medium text-neutral-200">{inr.format(totalInterest)}</dd>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-3">
              <dt className="text-neutral-400">Total payment</dt>
              <dd className="font-medium text-neutral-200">{inr.format(totalPayment)}</dd>
            </div>
          </dl>
          <p className="mt-5 text-xs leading-relaxed text-neutral-500">
            Illustrative planning estimate only, not a rate offered or quoted by Heritage Auto Finance. The bank/NBFC determines the actual interest rate, eligible loan amount, tenure and EMI after reviewing your application, credit profile and documents. Fees and insurance may also change the final cost.
          </p>
          {!compact && (
            <Link to="/contact" className="btn-gold mt-6 w-full">
              Apply for this loan
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
