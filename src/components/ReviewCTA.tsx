import { Star } from 'lucide-react';
import { contact } from '../data/contact';

/** Prompt for past customers to leave a review. */
export default function ReviewCTA() {
  // TODO: set contact.googleReviewUrl once the Google Business Profile is live.
  const href = contact.googleReviewUrl;
  return (
    <div className="rounded-2xl border border-sand-200 bg-white p-6 text-center shadow-sm sm:p-8">
      <div className="flex justify-center gap-1 text-sand-500" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-6 w-6 fill-current" />
        ))}
      </div>
      <h3 className="mt-3 text-xl font-bold">Worked with Martinez Brothers?</h3>
      <p className="mx-auto mt-2 max-w-xl text-slate-600">
        Your review helps Albuquerque neighbors find a stucco contractor they can trust — and it means a lot to our
        family business.
      </p>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5">
          Leave a Google Review
        </a>
      ) : (
        <a href={contact.phoneHref} className="btn-secondary mt-5">
          Share your feedback: {contact.phone}
        </a>
      )}
    </div>
  );
}
