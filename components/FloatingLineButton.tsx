import TrackedLink from '@/components/TrackedLink';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

export default async function FloatingLineButton() {
  const t = await getTranslations('floatingButton');

  return (
    <div className="fixed bottom-6 right-6 z-[100] md:bottom-8 md:right-8">
      <TrackedLink
        href="https://lin.ee/SSGzTmt?utm_source=website&utm_medium=floating_button&utm_campaign=book_now"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-full bg-[#00B900] px-5 py-3.5 shadow-[0_8px_20px_-6px_rgba(0,185,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_-6px_rgba(0,185,0,0.6)]"
        aria-label="Book via LINE"
        eventName="click_line_floating"
      >
        <Image
          src="/images/logo/line-logo.png"
          alt="LINE"
          width={24}
          height={24}
          className="h-6 w-6 object-contain"
          unoptimized
        />
        <span className="font-semibold text-white tracking-wide text-lg sm:text-base">{t('bookNow')}</span>
      </TrackedLink>
    </div>
  );
}
