import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { blogPosts } from '../data/blog';
import { getPageMeta } from '../lib/pageMeta';
import { usePageMeta } from '../lib/seo';
import { formatDate } from '../lib/format';
import Breadcrumbs from '../components/Breadcrumbs';
import ResponsiveImage from '../components/ResponsiveImage';
import CTASection from '../components/CTASection';

export default function BlogPage() {
  usePageMeta(getPageMeta('/blog'));
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <section className="bg-sand-50 pb-16 pt-10">
        <div className="container-site">
          <Breadcrumbs items={[{ name: 'Blog' }]} />
          <div className="mt-6 max-w-3xl">
            <p className="eyebrow">Stucco Blog</p>
            <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">Albuquerque Stucco Tips, Costs &amp; Guides</h1>
            <p className="mt-4 text-lg text-slate-600">
              Practical advice for keeping stucco healthy in the high desert — from monsoon prep to adobe care,
              pricing and color choices.
            </p>
          </div>

          {featured && (
            <article className="group relative mt-10 grid overflow-hidden rounded-2xl bg-white shadow-sm lg:grid-cols-2">
              <ResponsiveImage
                base={featured.image}
                alt={featured.imageAlt}
                width={1400}
                height={933}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-[3/2] h-full w-full object-cover"
              />
              <div className="flex flex-col justify-center p-8">
                <p className="text-xs font-semibold uppercase tracking-wide text-terracotta-600">{featured.category}</p>
                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                  <Link to={`/blog/${featured.slug}`} className="after:absolute after:inset-0 group-hover:text-terracotta-700">
                    {featured.title}
                  </Link>
                </h2>
                <p className="mt-3 text-slate-600">{featured.excerpt}</p>
                <p className="mt-4 flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" aria-hidden="true" /> {featured.readTime}
                  </span>
                </p>
              </div>
            </article>
          )}

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <article key={p.slug} className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
                <ResponsiveImage
                  base={p.image}
                  alt={p.imageAlt}
                  width={1400}
                  height={933}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[3/2] w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-terracotta-600">{p.category}</p>
                  <h2 className="mt-2 text-lg font-bold">
                    <Link to={`/blog/${p.slug}`} className="after:absolute after:inset-0 group-hover:text-terracotta-700">
                      {p.title}
                    </Link>
                  </h2>
                  <p className="mt-2 flex-1 text-slate-600">{p.excerpt}</p>
                  <p className="mt-4 flex items-center justify-between text-sm text-slate-500">
                    <time dateTime={p.date}>{formatDate(p.date)}</time>
                    <span className="inline-flex items-center gap-1 font-semibold text-terracotta-700">
                      Read <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
