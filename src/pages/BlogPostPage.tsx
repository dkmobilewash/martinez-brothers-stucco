import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Phone } from 'lucide-react';
import { blogPosts, getPostBySlug } from '../data/blog';
import { getRelatedServiceSlugs } from '../data/blogServiceMap';
import { getServiceBySlug, getServiceDisplayName } from '../data/services';
import { contact } from '../data/contact';
import { getBlogPostMeta } from '../lib/blogMeta';
import { usePageMeta } from '../lib/seo';
import { formatDate } from '../lib/format';
import type { Service } from '../data/types';
import Breadcrumbs from '../components/Breadcrumbs';
import ResponsiveImage from '../components/ResponsiveImage';
import CTASection from '../components/CTASection';
import ServiceIcon from '../components/ServiceIcon';
import NotFoundPage from './NotFoundPage';

export default function BlogPostPage() {
  const { slug = '' } = useParams();
  const post = getPostBySlug(slug);
  usePageMeta(post ? getBlogPostMeta(post) : null);

  if (!post) return <NotFoundPage />;

  const relatedServices = getRelatedServiceSlugs(post.slug)
    .map(getServiceBySlug)
    .filter((s): s is Service => Boolean(s));
  const morePosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="bg-sand-50 pb-10 pt-10">
          <div className="container-site max-w-4xl">
            <Breadcrumbs items={[{ name: 'Blog', path: '/blog' }, { name: post.title }]} />
            <p className="eyebrow mt-6">{post.category}</p>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-5xl">{post.title}</h1>
            <p className="mt-4 text-lg text-slate-600">{post.excerpt}</p>
            <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
              <span>By {post.author}</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" aria-hidden="true" /> {post.readTime}
              </span>
            </p>
          </div>
        </header>
        <div className="container-site max-w-5xl">
          <ResponsiveImage
            base={post.image}
            alt={post.imageAlt}
            width={1400}
            height={933}
            sizes="(min-width: 1024px) 1024px, 100vw"
            priority
            className="-mt-2 aspect-[3/2] w-full rounded-2xl object-cover shadow-lg sm:aspect-[2/1]"
          />
        </div>
        <div className="container-site grid gap-12 py-12 lg:grid-cols-[1fr_320px]">
          <div className="prose-site max-w-3xl text-lg">
            {post.content.map((block, i) =>
              block.startsWith('## ') ? <h2 key={i}>{block.slice(3)}</h2> : <p key={i}>{block}</p>,
            )}
          </div>
          <aside className="space-y-6 lg:sticky lg:top-32 lg:self-start">
            {relatedServices.length > 0 && (
              <nav aria-labelledby="related-services" className="rounded-2xl border border-sand-200 bg-sand-50 p-6">
                <h2 id="related-services" className="text-lg font-bold">
                  Related Services
                </h2>
                <ul className="mt-4 space-y-3">
                  {relatedServices.map((s) => (
                    <li key={s.slug}>
                      <Link to={`/${s.slug}`} className="flex items-center gap-3 font-medium text-slate-800 hover:text-terracotta-700">
                        <ServiceIcon name={s.icon} className="h-5 w-5 text-terracotta-600" />
                        {getServiceDisplayName(s)} in Albuquerque
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            <div className="rounded-2xl bg-terracotta-700 p-6 text-white">
              <h2 className="text-lg font-bold text-white">Need a Stucco Pro?</h2>
              <p className="mt-2 text-sm text-terracotta-50">Free, no-obligation estimates across the Albuquerque metro.</p>
              <a href={contact.phoneHref} className="btn mt-4 w-full bg-white text-terracotta-800 hover:bg-sand-50">
                <Phone className="h-4 w-4" aria-hidden="true" /> {contact.phone}
              </a>
              <Link to="/quote" className="btn mt-2 w-full border border-white/50 text-white hover:bg-white/10">
                Request an Estimate
              </Link>
            </div>
          </aside>
        </div>
      </article>

      <section aria-labelledby="more-posts" className="section border-t border-sand-100 bg-white">
        <div className="container-site">
          <h2 id="more-posts" className="text-2xl font-bold sm:text-3xl">
            More Stucco Guides
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {morePosts.map((p) => (
              <li key={p.slug}>
                <Link
                  to={`/blog/${p.slug}`}
                  className="flex h-full flex-col rounded-2xl border border-sand-200 p-5 hover:border-terracotta-300"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-terracotta-600">{p.category}</span>
                  <span className="mt-1 font-bold text-slate-900">{p.title}</span>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-terracotta-700">
                    Read article <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CTASection />
    </>
  );
}
