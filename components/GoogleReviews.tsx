import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';

type ReviewCard = {
  author: string;
  rating: number;
  meta?: string;
  text: string;
};

type GooglePlaceReview = {
  author_name?: string;
  rating?: number;
  relative_time_description?: string;
  text?: string;
};

type GooglePlaceDetailsResponse = {
  result?: {
    rating?: number;
    user_ratings_total?: number;
    reviews?: GooglePlaceReview[];
  };
};

const DEFAULT_RATING = 5.0;
const DEFAULT_TOTAL = 128;

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.14 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export default async function GoogleReviews() {
  const tReviews = await getTranslations('reviews');
  const locale = await getLocale();
  const mapLink = 'https://maps.app.goo.gl/CfGm6iBbAQXq6gS68';

  let rating = DEFAULT_RATING;
  let totalReviews = DEFAULT_TOTAL;
  let reviewsToDisplay: ReviewCard[] = [
    {
      author: 'Tati & Max',
      rating: 5,
      meta: 'Local Guide',
      text:
        'Honestly such a good find! The space is peaceful and relaxing, and from the moment you walk in you feel genuinely taken care of. The therapists are super professional but also just make you feel totally at ease. I got a facial and my skin left feeling so moisturized and refreshed. If you live in the city you already know your skin needs it. My husband did the head and hair spa and was obsessed. We both walked out feeling like new people. We’re already planning to come back for the IV drip therapy. Just go, you won’t regret it.',
    },
    {
      author: 'Vishal Shah',
      rating: 5,
      meta: 'Local Guide',
      text:
        'Great Zen vibe. Calm, clean, and the kind of place you actually switch off the moment you walk in. Had a head, neck, and shoulder massage and it was exactly what I needed. It properly worked out the stiffness and tension and left me feeling reset. Simple, professional, and very well done. Highly recommended.',
    },
    {
      author: 'Punnatorn C',
      rating: 5,
      meta: 'Local Guide',
      text:
        'My husband and I did an aromatherapy massage and head massage plus hair wash. It was very relaxing and totally rejuvenating. The place is very clean and spacious but still feels private. The staff are well trained and very attentive. Will definitely return for more service in the near future.',
    },
  ];

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (apiKey && placeId) {
    try {
      const res = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total,reviews&language=${locale}&key=${apiKey}`, {
        next: { revalidate: 86400 },
      });

      if (!res.ok) {
        throw new Error(`Google Places request failed with ${res.status}`);
      }

      const data: GooglePlaceDetailsResponse = await res.json();

      if (data.result) {
        rating = typeof data.result.rating === 'number' ? data.result.rating : rating;
        totalReviews =
          typeof data.result.user_ratings_total === 'number'
            ? data.result.user_ratings_total
            : totalReviews;

        if (Array.isArray(data.result.reviews) && data.result.reviews.length > 0) {
          reviewsToDisplay = data.result.reviews.slice(0, 3).map((review) => ({
            author: review.author_name?.trim() || 'Google Guest',
            rating:
              typeof review.rating === 'number'
                ? Math.max(1, Math.min(5, Math.round(review.rating)))
                : 5,
            text: review.text?.trim() || '',
          }));
        }
      }
    } catch (error) {
      console.error('Failed to fetch Google Reviews:', error);
    }
  }

  const summaryStars = Math.max(1, Math.min(5, Math.round(rating)));

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-10">
        {/* Left: Score Overview */}
        <div className="flex items-center gap-4">
          <GoogleLogo className="h-10 w-10 sm:h-12 sm:w-12" />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-[#2f3a36]">{rating.toFixed(1)}</span>
              <div className="flex text-[#FBBC05]">
                {Array.from({ length: summaryStars }).map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5" />
                ))}
              </div>
            </div>
            <span className="text-sm font-medium text-[#6f7b7a]">
              {tReviews('basedOn', { count: totalReviews })}
            </span>
          </div>
        </div>

        {/* Right: CTA to full reviews */}
        <Link
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d6c8b2] bg-white px-5 py-2.5 text-sm font-medium text-[#5b6d65] transition hover:bg-[#f7f2e8] hover:text-[#2f3a36]"
        >
          {tReviews('viewOnGoogle')}
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>

      {/* Reviews Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {reviewsToDisplay.map((review, idx) => (
          <div
            key={`${review.author}-${idx}`}
            className="flex h-full flex-col gap-4 rounded-[24px] border border-[#d6c8b2]/40 bg-white p-6 shadow-sm shadow-[#d6c8b2]/20"
          >
            {/* Header: Author & Rating */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f7f2e8] text-sm font-semibold text-[#5b6d65]">
                  {review.author.charAt(0) || 'G'}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#2f3a36]">{review.author}</p>
                  {review.meta ? (
                    <p className="text-xs text-[#6f7b7a]">{review.meta}</p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Rating Stars */}
            <div className="flex text-[#FBBC05]">
              {Array.from({ length: review.rating }).map((_, i) => (
                <StarIcon key={i} className="h-4 w-4" />
              ))}
            </div>

            {/* Review Text */}
            <p className="text-sm leading-relaxed text-[#52635d]">
              &quot;{review.text}&quot;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
