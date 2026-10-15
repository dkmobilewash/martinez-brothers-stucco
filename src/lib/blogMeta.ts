import type { BlogPost } from '../data/types';
import { blogPostingSchema, breadcrumbSchema, faqPageSchema, faqsFromBlogContent, imageUrl, type JsonLd } from './schema';
import type { PageMeta } from './pageMeta';

export function getBlogPostMeta(post: BlogPost): PageMeta {
  const path = `/blog/${post.slug}`;
  const faq = faqPageSchema(faqsFromBlogContent(post.content));
  return {
    path,
    title: post.seoTitle,
    description: post.seoDescription,
    type: 'article',
    image: imageUrl(post.image),
    publishedTime: post.date,
    modifiedTime: post.updated ?? post.date,
    jsonLd: [
      breadcrumbSchema([
        { name: 'Blog', path: '/blog' },
        { name: post.title, path },
      ]),
      blogPostingSchema(post),
      ...(faq ? [faq] : ([] as JsonLd[])),
    ],
  };
}
