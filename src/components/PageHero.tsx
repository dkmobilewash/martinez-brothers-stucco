import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { contact } from '../data/contact';
import Breadcrumbs, { type BreadcrumbItem } from './Breadcrumbs';
import ResponsiveImage from './ResponsiveImage';

interface PageHeroProps {
  title: string;
  description: string;
  eyebrow?: string;
  image?: { base: string; alt: string; width: number; height: number };
  breadcrumbs?: BreadcrumbItem[];
  showCtas?: boolean;
  children?: ReactNode;
}

export default function PageHero({ title, description, eyebrow, image, breadcrumbs, showCtas = true, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-slate-900">
      {image && (
        <ResponsiveImage
          base={image.base}
          alt={image.alt}
          width={image.width}
          height={image.height}
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-50"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-slate-900/30" aria-hidden="true" />
      <div className="container-site py-16 sm:py-20 lg:py-24">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} light />}
        <div className="mt-6 max-w-3xl">
          {eyebrow && <p className="text-sm font-semibold uppercase tracking-[0.14em] text-sand-300">{eyebrow}</p>}
          <h1 className="mt-2 text-4xl font-extrabold leading-tight text-white sm:text-5xl">{title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-sand-100 sm:text-xl">{description}</p>
          {showCtas && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/quote" className="btn-primary">
                Get a Free Estimate <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <a href={contact.phoneHref} className="btn-ghost-light">
                <Phone className="h-5 w-5" aria-hidden="true" /> Call {contact.phone}
              </a>
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
