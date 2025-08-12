import HomeFooterComponent from '@/components/home-footer';
import HomeMainComponent from '@/components/home-main';
import { getSession } from '@/lib/session';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations('Welcome.Metadata');
  return {
    title: t('Title')
  };
};

export default async function Welcome() {
  const t = await getTranslations('Welcome');
  const session = await getSession();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <header className="w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-[1440px] flex justify-between p-6">
        <Link
          className='flex lg:justify-between lg:col-start-2'
          href={'/'}
        >
          <svg width='57px' height='57px' viewBox='0.004 0 64 64' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M63.04 39.741c-4.274 17.143-21.638 27.575-38.783 23.301C7.12 58.768-3.313 41.404.962 24.262 5.234 7.117 22.597-3.317 39.737.957c17.144 4.274 27.576 21.64 23.302 38.784z'
              fill='#F7931A' />
            <path
              d='M46.11 27.441c.636-4.258-2.606-6.547-7.039-8.074l1.438-5.768-3.512-.875-1.4 5.616c-.922-.23-1.87-.447-2.812-.662l1.41-5.653-3.509-.875-1.439 5.766c-.764-.174-1.514-.346-2.242-.527l.004-.018-4.842-1.209-.934 3.75s2.605.597 2.55.634c1.422.355 1.68 1.296 1.636 2.042l-1.638 6.571c.098.025.225.061.365.117l-.37-.092-2.297 9.205c-.174.432-.615 1.08-1.609.834.035.051-2.552-.637-2.552-.637l-1.743 4.02 4.57 1.139c.85.213 1.683.436 2.502.646l-1.453 5.835 3.507.875 1.44-5.772c.957.26 1.887.5 2.797.726L27.504 50.8l3.511.875 1.453-5.823c5.987 1.133 10.49.676 12.383-4.738 1.527-4.36-.075-6.875-3.225-8.516 2.294-.531 4.022-2.04 4.483-5.157zM38.087 38.69c-1.086 4.36-8.426 2.004-10.807 1.412l1.928-7.729c2.38.594 10.011 1.77 8.88 6.317zm1.085-11.312c-.99 3.966-7.1 1.951-9.083 1.457l1.748-7.01c1.983.494 8.367 1.416 7.335 5.553z'
              fill='#FFFFFF' />
          </svg>
        </Link>
        
        <nav className="flex items-center justify-end gap-4">
          {session ? (
            <Link
              href="dashboard"
              className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
            >
              {t('Dashboard')}
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
              >
                {t('Login')}
              </Link>
              <Link
                href="register"
                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
              >
                {t('Register')}
              </Link>
            </>
          )}
        </nav>
      </header>
      <HomeMainComponent />
      <HomeFooterComponent />
    </div>
  );
}