import React, { ReactElement } from 'react';
import router from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { AccountLayout } from '@/components/layouts';
import { Button } from '@/components/ui/button';

const Custom500 = () => {
  const { t } = useTranslation('common');
  return (
    <div className="w-full items-center justify-center lg:px-2 xl:px-0 text-center dark:bg-black">
      <p className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider dark:text-gray-300">
        {t('error-500')}
      </p>
      <p className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider dark:text-gray-300 mt-2">
        {t('internal-server-error')}
      </p>
      <p className="text-lg md:text-xl lg:text-2xl dark:text-gray-500 my-12">
        {t('unable-to-find')}
      </p>
      <div className="mt-8 space-x-5">
        <Button
          variant="primary"
          size="lg"
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
        >
          {t('go-back')}
        </Button>
        <p className="text-lg md:text-xl lg:text-2xl dark:text-gray-500 my-12">
          {t('try-again-later')}
        </p>
      </div>
    </div>
  );
};

export default Custom500;

Custom500.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export async function getStaticProps({ locale }: GetServerSidePropsContext) {
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
    },
  };
}
