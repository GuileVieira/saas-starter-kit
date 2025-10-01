import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { Card } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { defaultHeaders } from '@/lib/common';
import { Team } from '@prisma/client';
import type { ApiResponse } from 'types';

interface LinkToPortalProps {
  team: Team;
}

const LinkToPortal = ({ team }: LinkToPortalProps) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('common');

  const openStripePortal = async () => {
    setLoading(true);

    const response = await fetch(
      `/api/teams/${team.slug}/payments/create-portal-link`,
      {
        method: 'POST',
        headers: defaultHeaders,
        credentials: 'same-origin',
      }
    );

    const result = (await response.json()) as ApiResponse<{ url: string }>;

    if (!response.ok) {
      toast.error(result.error.message);
      return;
    }

    setLoading(false);
    window.open(result.data.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card>
      <Card.Body>
        <Card.Header>
          <Card.Title>{t('manage-subscription')}</Card.Title>
          <Card.Description>{t('manage-billing-information')}</Card.Description>
        </Card.Header>
        <div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            loading={loading}
            onClick={() => openStripePortal()}
          >
            {t('billing-portal')}
            <ArrowTopRightOnSquareIcon className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default LinkToPortal;
