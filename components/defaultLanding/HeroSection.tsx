import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { buttonClassName } from '@/components/ui/button';

const HeroSection = () => {
  const { t } = useTranslation('common');

  return (
    <section className="relative mt-16 flex flex-col items-center justify-center overflow-hidden rounded-[var(--radius-xl)] border border-white/30 px-6 py-24 text-center shadow-glass backdrop-blur-2xl dark:border-white/10 sm:px-16">
      <div className="absolute inset-0 -z-10 bg-aurora opacity-40" />
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <p className="text-sm font-semibold uppercase tracking-[0.6rem] text-muted-foreground">
          enterprise grade toolkit
        </p>
        <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
          {t('enterprise-saas-kit')}
        </h1>
        <p className="text-lg font-medium text-muted-foreground md:text-xl">
          {t('kickstart-your-enterprise')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/auth/join"
            className={buttonClassName({ variant: 'primary', size: 'lg' })}
          >
            {t('get-started')}
          </Link>
          <Link
            href="https://github.com/boxyhq/saas-starter-kit"
            className={buttonClassName({ variant: 'outline', size: 'lg' })}
          >
            GitHub
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
