import Link from 'next/link';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';

import { Card } from '@/components/shared';
import { buttonClassName } from '@/components/ui/button';

const Help = () => {
  const { t } = useTranslation('common');

  return (
    <Card>
      <Card.Body>
        <Card.Header>
          <Card.Title>{t('need-anything-else')}</Card.Title>
          <Card.Description>{t('billing-assistance-message')}</Card.Description>
        </Card.Header>
        <div>
          <Link
            href={process.env.NEXT_PUBLIC_SUPPORT_URL || ''}
            className={buttonClassName({
              variant: 'primary',
              size: 'sm',
              className: 'inline-flex w-fit',
            })}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="flex items-center gap-2">
              {t('contact-support')}
              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Help;
