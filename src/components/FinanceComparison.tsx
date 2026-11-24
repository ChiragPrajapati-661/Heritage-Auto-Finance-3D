import { useMemo, useState } from 'react';
import { Car, CarFront, Truck, RefreshCcw } from 'lucide-react';
import { calculateEmi } from '@/lib/finance';

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

interface Option {
  id: string;
  label: string;
  icon: typeof Car;
  amount: number;
  rate: number;
  tenure: number;
}

const options: Option[] = [
  { id: 'new-car', label: 'New Car', icon: Car, amount: 800000, rate: 9.5, tenure: 60 },
  { id: 'used-car', label: 'Used Car', icon: CarFront, amount: 500000, rate: 12.5, tenure: 48 },
  { id: 'refinance', label: 'Refinance', icon: RefreshCcw, amount: 400000, rate: 11.5, tenure: 48 },
  { id: 'commercial', label: 'Commercial', icon: Truck, amount: 1500000, rate: 13, tenure: 60 },
];

/**
 * Side-by-side indicative comparison of finance types.
 * Rates are illustrative planning figures, not quotes.
 */
export default function FinanceComparison() {
  const [selected, setSelected] = useState<string>('new-car');
  const [amount, setAmount] = useState(800000);

  const results = useMemo(
    () =>
      options.map((o) => {
        const rate = o.rate;
        const emi = calculateEmi(amount, rate, o.tenure);
        return { ...o, emi, total: emi * o.tenure, interest: emi * o.tenure - amount };
      }),
    [amount]
  );

  return (
    <div>
      <div className="glass-card p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <label htmlFor="cmp-amount" className="field-label">Loan amount to compare</label>
            <input
              id="cmp-amount"
              type="range"
              min={200000}
              max={3000000}
              step={50000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full accent-gold-500 sm:w-72"
              aria-valuetext={inr.format(amount)}
            />
            <p className="mt-2 font-display text-xl font-semibold text-gold-400">{inr.format(amount)}</p>
          </div>
          <p className="max-w-sm text-xs leading-relaxed text-neutral-500">
            Illustrative comparison only, using example annual-rate assumptions for calculation. These are not Heritage Auto Finance offers or lender quotes. Actual rates, eligibility, loan amount and tenure are determined by the selected bank/NBFC after assessment.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((r) => {
            const Icon = r.icon;
            const active = selected === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelected(r.id)}
                aria-pressed={active}
                className={`glass-card p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
                  active ? 'border-gold-500/70 bg-gold-500/[0.07]' : ''
                }`}
              >
                <span className="flex items-center justify-between">
                  <Icon className={`h-5 w-5 ${active ? 'text-gold-400' : 'text-neutral-400'}`} aria-hidden="true" />
                  <span className="text-[0.65rem] uppercase tracking-wider text-neutral-500">Example {r.rate}% p.a.</span>
                </span>
                <span className="mt-3 block text-sm font-semibold text-white">{r.label}</span>
                <span className="mt-1 block font-display text-2xl font-semibold text-gold-400">{inr.format(r.emi)}</span>
                <span className="mt-0.5 block text-[0.65rem] text-neutral-500">/ month · {r.tenure}m</span>
                <span className="mt-3 block border-t border-white/10 pt-2 text-xs text-neutral-400">
                  Total interest {inr.format(r.interest)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
