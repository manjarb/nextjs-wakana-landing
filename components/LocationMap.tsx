import { useTranslations } from 'next-intl';

export default function LocationMap() {
  const t = useTranslations('location');

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": "WANAKA Sanctuary",
    "image": "https://www.wanakasanctuary.com/images/logo/waka-logo.svg",
    "@id": "https://www.wanakasanctuary.com",
    "url": "https://www.wanakasanctuary.com",
    "telephone": "+66886651936",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "99 65 Tambon Bang Kaeo",
      "addressLocality": "Bang Phli District",
      "addressRegion": "Samut Prakan",
      "postalCode": "10540",
      "addressCountry": "TH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 13.63914041767139,
      "longitude": 100.6657989354146
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:00",
        "closes": "20:00"
      }
    ]
  };

  const days = [
    { key: 'sun' },
    { key: 'mon' },
    { key: 'tue' },
    { key: 'wed' },
    { key: 'thu' },
    { key: 'fri' },
    { key: 'sat' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-24 lg:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      
      <div className="mb-12 text-center sm:text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6f7b7a]">
          {t('heading')}
        </p>
        <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#2f3a36] sm:text-4xl">
          {t('title')}
        </h2>
      </div>

      <div className="flex flex-col gap-12 lg:flex-row">
        {/* Map Container */}
        <div className="w-full lg:w-2/3">
          <div className="relative h-96 w-full overflow-hidden rounded-[32px] border border-[#d6c8b2]/70 shadow-lg shadow-[#d6c8b2]/30 sm:h-[500px]">
             <iframe 
               src="https://maps.google.com/maps?q=WANAKA%20Sanctuary%20Bangna&t=&z=15&ie=UTF8&iwloc=&output=embed" 
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               allowFullScreen 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
             ></iframe>
          </div>
        </div>

        {/* Info & Hours */}
        <div className="flex w-full flex-col justify-center gap-8 lg:w-1/3">
           <div className="rounded-3xl border border-[#d6c8b2]/70 bg-white/80 p-8 shadow-md shadow-[#d6c8b2]/20">
             <h3 className="text-xl font-semibold text-[#2f3a36] flex items-center gap-3">
               <svg className="h-6 w-6 text-[#5b6d65]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                 <circle cx="12" cy="12" r="10"/>
                 <polyline points="12 6 12 12 16 14"/>
               </svg>
               {t('openingHours')}
             </h3>
             <ul className="mt-8 space-y-4 text-sm text-[#52635d]">
               {days.map((day, idx) => (
                 <li key={day.key} className={`flex justify-between ${idx !== days.length - 1 ? 'border-b border-[#d6c8b2]/30 pb-3' : 'pb-1'}`}>
                   <span className="font-medium text-[#2f3a36]">{t(day.key as any)}</span>
                   <span>{t('hours')}</span>
                 </li>
               ))}
             </ul>
           </div>

           <a 
             href="https://maps.app.goo.gl/CfGm6iBbAQXq6gS68" 
             target="_blank" 
             rel="noreferrer"
             className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#5b6d65] px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#44544d] hover:shadow-lg"
           >
             <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
               <circle cx="12" cy="10" r="3" />
             </svg>
             {t('getDirections')}
           </a>
        </div>
      </div>
    </div>
  );
}
