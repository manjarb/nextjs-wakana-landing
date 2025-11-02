import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function HomePage() {
  const t = useTranslations('home');
  const tNav = useTranslations('navigation');
  const tCommon = useTranslations('common');

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="w-full flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">{tCommon('appName')}</h1>
          <LanguageSwitcher />
        </div>

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h2 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            {t('title')}
          </h2>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {t('description')}
          </p>
        </div>

        <nav className="flex gap-4 mt-8">
          <a href="#" className="text-blue-600 hover:underline">{tNav('home')}</a>
          <a href="#" className="text-blue-600 hover:underline">{tNav('about')}</a>
          <a href="#" className="text-blue-600 hover:underline">{tNav('contact')}</a>
        </nav>
      </main>
    </div>
  );
}
