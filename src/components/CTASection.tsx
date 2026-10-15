import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { contact } from '../data/contact';

interface CTASectionProps {
  heading?: string;
  text?: string;
  variant?: 'dark' | 'light';
}

export default function CTASection({
  heading = 'Get a Free Stucco Estimate',
  text = 'Tell us what is going on with your walls. We will take a look, explain your options in plain language and give you a written estimate — no pressure.',
  variant = 'dark',
}: CTASectionProps) {
  const dark = variant === 'dark';
  return (
    <section
      aria-label="Request an estimate"
      className={dark ? 'bg-gradient-to-br from-terracotta-800 to-sand-900 text-white' : 'bg-sand-100'}
    >
      <div className="container-site flex flex-col items-start gap-8 py-14 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className={`text-3xl font-bold sm:text-4xl ${dark ? 'text-white' : ''}`}>{heading}</h2>
          <p className={`mt-3 text-lg ${dark ? 'text-sand-100' : 'text-slate-700'}`}>{text}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href={contact.phoneHref}
            className={dark ? 'btn bg-white text-terracotta-800 hover:bg-sand-50' : 'btn-secondary'}
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            {contact.phone}
          </a>
          <Link to="/quote" className={dark ? 'btn-ghost-light' : 'btn-primary'}>
            Request an Estimate <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
