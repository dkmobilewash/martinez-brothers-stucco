import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Service } from '../data/types';
import { getServiceDisplayName } from '../data/services';
import ResponsiveImage from './ResponsiveImage';
import ServiceIcon from './ServiceIcon';

export default function ServiceCard({ service, headingLevel = 'h3' }: { service: Service; headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-sand-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-[3/2] overflow-hidden bg-sand-100">
        <ResponsiveImage
          base={service.image}
          alt={service.imageAlt}
          width={1400}
          height={933}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-xl bg-white/95 p-2.5 text-terracotta-700 shadow">
          <ServiceIcon name={service.icon} className="h-6 w-6" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Heading className="text-xl font-bold">
          <Link to={`/${service.slug}`} className="after:absolute after:inset-0 hover:text-terracotta-700">
            {getServiceDisplayName(service)}
          </Link>
        </Heading>
        <p className="mt-2 flex-1 text-slate-600">{service.shortDescription}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-terracotta-700">
          Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
