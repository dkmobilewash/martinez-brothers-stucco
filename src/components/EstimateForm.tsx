import { useId, useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { contact } from '../data/contact';
import { services, getServiceDisplayName } from '../data/services';

interface EstimateFormProps {
  /** Pre-select a service slug */
  defaultService?: string;
  /** Identifies which page/form the lead came from (sent to Zapier) */
  source?: string;
  compact?: boolean;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputClass =
  'mt-1 block w-full rounded-lg border border-sand-200 bg-white px-3.5 py-2.5 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-terracotta-500 focus:outline-none focus:ring-2 focus:ring-terracotta-200';

export default function EstimateForm({ defaultService = '', source = 'website', compact = false }: EstimateFormProps) {
  const id = useId();
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Honeypot: real users never fill this hidden field.
    if (data.get('company_website')) {
      setStatus('success');
      return;
    }
    const lead = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      phone: String(data.get('phone') ?? '').trim(),
      service: String(data.get('service') ?? ''),
      message: String(data.get('message') ?? '').trim(),
    };
    if (lead.phone.replace(/\D/g, '').length < 10) {
      setStatus('error');
      setError('Please enter a 10-digit phone number so we can reach you.');
      return;
    }
    setStatus('submitting');
    setError('');
    try {
      const { submitLead } = await import('../lib/supabase');
      await submitLead(lead, source);
      setStatus('success');
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus('error');
      setError(`Sorry, something went wrong sending your request. Please call us at ${contact.phone}.`);
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-sage-200 bg-sage-50 p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto h-12 w-12 text-sage-600" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-bold">Thanks — we got your request!</h3>
        <p className="mt-2 text-slate-700">
          We&apos;ll reach out shortly to schedule your free estimate. Need us sooner? Call{' '}
          <a href={contact.phoneHref} className="font-semibold text-terracotta-700 underline">
            {contact.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate={false}>
      <div className={compact ? 'space-y-4' : 'grid gap-4 sm:grid-cols-2'}>
        <div>
          <label htmlFor={`${id}-name`} className="text-sm font-medium text-slate-800">
            Full name <span className="text-terracotta-600">*</span>
          </label>
          <input id={`${id}-name`} name="name" type="text" required autoComplete="name" maxLength={200} className={inputClass} />
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className="text-sm font-medium text-slate-800">
            Phone <span className="text-terracotta-600">*</span>
          </label>
          <input id={`${id}-phone`} name="phone" type="tel" required autoComplete="tel" maxLength={40} placeholder="(505) 555-0123" className={inputClass} />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="text-sm font-medium text-slate-800">
            Email <span className="text-terracotta-600">*</span>
          </label>
          <input id={`${id}-email`} name="email" type="email" required autoComplete="email" maxLength={320} className={inputClass} />
        </div>
        <div>
          <label htmlFor={`${id}-service`} className="text-sm font-medium text-slate-800">
            Service needed
          </label>
          <select id={`${id}-service`} name="service" defaultValue={defaultService} className={inputClass}>
            <option value="">Not sure / Other</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {getServiceDisplayName(s)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-message`} className="text-sm font-medium text-slate-800">
          Tell us about your project
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={compact ? 3 : 5}
          maxLength={5000}
          placeholder="Location, approximate size, cracks or damage you've noticed, timeline…"
          className={inputClass}
        />
      </div>
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${id}-hp`}>Leave this field empty</label>
        <input id={`${id}-hp`} name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {status === 'error' && (
        <p className="rounded-lg bg-terracotta-50 px-4 py-3 text-sm text-terracotta-800" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="btn-primary w-full" disabled={status === 'submitting'}>
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          'Request My Free Estimate'
        )}
      </button>
      <p className="text-center text-xs text-slate-500">
        No obligation. We never share your information. Prefer to talk?{' '}
        <a href={contact.phoneHref} className="font-semibold text-terracotta-700">
          {contact.phone}
        </a>
      </p>
    </form>
  );
}
