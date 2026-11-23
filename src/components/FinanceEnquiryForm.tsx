import { useState, type FormEvent } from 'react';
import { Send, CheckCircle2, AlertCircle, MessageCircle } from 'lucide-react';
import { enquiryTypes, vehicleTypes, site, whatsappLink } from '@/config/site';
import { supabase } from '@/lib/supabase';

interface FormState {
  name: string;
  mobile: string;
  city: string;
  vehicleType: string;
  enquiryType: string;
  message: string;
  consent: boolean;
}

const initialState: FormState = {
  name: '',
  mobile: '',
  city: '',
  vehicleType: '',
  enquiryType: '',
  message: '',
  consent: false,
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface FinanceEnquiryFormProps {
  defaultEnquiryType?: string;
  title?: string;
  subtitle?: string;
}

export default function FinanceEnquiryForm({
  defaultEnquiryType = '',
  title = 'Request a Finance Enquiry',
  subtitle = 'Share a few details and our team will get back to you with suitable options.',
}: FinanceEnquiryFormProps) {
  const [form, setForm] = useState<FormState>({
    ...initialState,
    enquiryType: defaultEnquiryType,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [saveFailed, setSaveFailed] = useState(false);

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) next.name = 'Please enter your full name.';
    if (!/^[6-9]\d{9}$/.test(form.mobile.replace(/\s|-/g, '')))
      next.mobile = 'Enter a valid 10-digit Indian mobile number.';
    if (form.city.trim().length < 2) next.city = 'Please enter your city or town.';
    if (!form.vehicleType) next.vehicleType = 'Select your vehicle type.';
    if (!form.enquiryType) next.enquiryType = 'Select an enquiry type.';
    if (!form.consent) next.consent = 'Please agree to be contacted about this enquiry.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    setSaveFailed(false);

    let stored = false;
    try {
      if (supabase) {
        const { error } = await supabase.from('enquiries').insert({
          name: form.name.trim(),
          mobile: form.mobile.replace(/\s|-/g, ''),
          city: form.city.trim(),
          vehicle_type: form.vehicleType,
          enquiry_type: form.enquiryType,
          message: form.message.trim() || null,
        });
        stored = !error;
        if (error) console.error('Failed to save enquiry:', error.message);
      }
    } catch (error) {
      console.error('Unexpected enquiry submission error:', error);
    }

    setStatus('success');
    setSaveFailed(!stored);
  };

  const waMessage = whatsappLink(
    [
      `Hello ${site.name}, my name is ${form.name || '—'} from ${form.city || '—'}.`,
      `Mobile: ${form.mobile || '—'}.`,
      `Enquiry: ${form.enquiryType || 'vehicle finance'}.`,
      `Vehicle type: ${form.vehicleType || '—'}.`,
      form.message.trim() ? `Message: ${form.message.trim()}` : '',
    ].filter(Boolean).join(' ')
  );

  if (status === 'success') {
    return (
      <div className="glass-card p-8 text-center sm:p-10" role="status">
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-400" aria-hidden="true" />
        <h3 className="mt-4 font-display text-2xl font-semibold text-white">{saveFailed ? 'Complete your enquiry on WhatsApp' : 'Enquiry received'}</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-neutral-400">
          {saveFailed
            ? 'Your details could not be submitted to our enquiry system. Please continue on WhatsApp so our team receives your request.'
            : `Thank you, ${form.name.split(' ')[0]}. Your enquiry has been saved. Our team will contact you on ${form.mobile} during business hours.`}
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={waMessage} target="_blank" rel="noopener noreferrer" className="btn-gold">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Continue on WhatsApp
          </a>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => {
              setForm({ ...initialState, enquiryType: defaultEnquiryType });
              setStatus('idle');
            }}
          >
            Submit another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="glass-card p-6 sm:p-8">
      <h3 className="font-display text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-neutral-400">{subtitle}</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="f-name" className="field-label">Full name</label>
          <input id="f-name" type="text" autoComplete="name" className="field-input" value={form.name} onChange={update('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'f-name-err' : undefined} placeholder="Your name" maxLength={100} />
          {errors.name && <p id="f-name-err" role="alert" className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="f-mobile" className="field-label">Mobile number</label>
          <input id="f-mobile" type="tel" inputMode="numeric" autoComplete="tel" className="field-input" value={form.mobile} onChange={update('mobile')} aria-invalid={!!errors.mobile} aria-describedby={errors.mobile ? 'f-mobile-err' : undefined} placeholder="10-digit mobile" maxLength={14} />
          {errors.mobile && <p id="f-mobile-err" role="alert" className="mt-1.5 text-xs text-red-400">{errors.mobile}</p>}
        </div>
        <div>
          <label htmlFor="f-city" className="field-label">City / Town</label>
          <input id="f-city" type="text" autoComplete="address-level2" className="field-input" value={form.city} onChange={update('city')} aria-invalid={!!errors.city} aria-describedby={errors.city ? 'f-city-err' : undefined} placeholder="e.g. Mehsana" maxLength={100} />
          {errors.city && <p id="f-city-err" role="alert" className="mt-1.5 text-xs text-red-400">{errors.city}</p>}
        </div>
        <div>
          <label htmlFor="f-vehicle" className="field-label">Vehicle type</label>
          <select id="f-vehicle" className="field-input" value={form.vehicleType} onChange={update('vehicleType')} aria-invalid={!!errors.vehicleType} aria-describedby={errors.vehicleType ? 'f-vehicle-err' : undefined}>
            <option value="">Select vehicle type</option>
            {vehicleTypes.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
          {errors.vehicleType && <p id="f-vehicle-err" role="alert" className="mt-1.5 text-xs text-red-400">{errors.vehicleType}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="f-enquiry" className="field-label">Enquiry type</label>
          <select id="f-enquiry" className="field-input" value={form.enquiryType} onChange={update('enquiryType')} aria-invalid={!!errors.enquiryType} aria-describedby={errors.enquiryType ? 'f-enquiry-err' : undefined}>
            <option value="">Select enquiry type</option>
            {enquiryTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.enquiryType && <p id="f-enquiry-err" role="alert" className="mt-1.5 text-xs text-red-400">{errors.enquiryType}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="f-message" className="field-label">Message (optional)</label>
          <textarea id="f-message" rows={3} className="field-input resize-none" value={form.message} onChange={update('message')} placeholder="Anything else we should know?" maxLength={1000} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="f-consent" className="flex items-start gap-3 text-xs leading-relaxed text-neutral-400">
          <input
            id="f-consent"
            type="checkbox"
            checked={form.consent}
            onChange={(event) => {
              setForm((current) => ({ ...current, consent: event.target.checked }));
              setErrors((current) => ({ ...current, consent: undefined }));
            }}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? 'f-consent-err' : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 accent-gold-500"
          />
          <span>
            I agree that Heritage Auto Finance may contact me about this enquiry. I have read the{' '}
            <a href="/privacy-policy" className="text-gold-400 underline underline-offset-2" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>.
          </span>
        </label>
        {errors.consent && <p id="f-consent-err" role="alert" className="mt-1.5 text-xs text-red-400">{errors.consent}</p>}
      </div>

      {status === 'error' && (
        <p className="mt-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300" role="alert">
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          Something went wrong. Please try again or reach us on WhatsApp.
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="submit" disabled={status === 'submitting'} className="btn-gold flex-1 disabled:cursor-not-allowed disabled:opacity-60">
          <Send className="h-4 w-4" aria-hidden="true" />
          {status === 'submitting' ? 'Sending…' : 'Submit Enquiry'}
        </button>
        <a href={waMessage} target="_blank" rel="noopener noreferrer" className="btn-ghost flex-1">
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp instead
        </a>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-neutral-500">
        We do not approve loans ourselves. Final terms and approval decisions are made by the selected lender after its assessment.
      </p>
    </form>
  );
}
