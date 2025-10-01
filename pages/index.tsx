import Link from 'next/link';
import { type ReactElement } from 'react';
import { useTranslation } from 'next-i18next';
import type { NextPageWithLayout } from 'types';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import FAQSection from '@/components/defaultLanding/FAQSection';
import HeroSection from '@/components/defaultLanding/HeroSection';
import FeatureSection from '@/components/defaultLanding/FeatureSection';
import PricingSection from '@/components/defaultLanding/PricingSection';
import useTheme from 'hooks/useTheme';
import env from '@/lib/env';
import Head from 'next/head';
import { buttonClassName, Button } from '@/components/ui/button';

const Home: NextPageWithLayout = () => {
  const { toggleTheme, selectedTheme } = useTheme();
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('homepage-title')}</title>
      </Head>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="glass-panel flex flex-col gap-4 border border-white/30 px-5 py-4 shadow-glass backdrop-blur-xl dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center gap-3 text-lg font-semibold text-foreground">
            <span className="rounded-full bg-brand/15 px-4 py-2 text-sm uppercase tracking-[0.3rem] text-brand">BoxyHQ</span>
            <span className="text-2xl font-bold">{t('homepage-title')}</span>
          </Link>
          <div className="flex items-center gap-3">
            {env.darkModeEnabled ? (
              <Button
                variant="secondary"
                size="sm"
                className="rounded-full"
                onClick={toggleTheme}
                icon={<selectedTheme.icon className="h-4 w-4" />}
              >
                {selectedTheme.name}
              </Button>
            ) : null}
            <Link
              href="/auth/join"
              className={buttonClassName({ variant: 'primary', size: 'md' })}
            >
              {t('sign-up')}
            </Link>
            <Link
              href="/auth/login"
              className={buttonClassName({
                variant: 'secondary',
                size: 'md',
              })}
            >
              {t('sign-in')}
            </Link>
          </div>
        </div>
        <HeroSection />
        <div className="my-16 h-px bg-border/60" />
        <FeatureSection />
        <div className="my-16 h-px bg-border/60" />
        <PricingSection />
        <div className="my-16 h-px bg-border/60" />
        <FAQSection />
      </div>
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // Redirect to login page if landing page is disabled
  if (env.hideLandingPage) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: true,
      },
    };
  }

  const { locale } = context;

  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
    },
  };
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Home;
