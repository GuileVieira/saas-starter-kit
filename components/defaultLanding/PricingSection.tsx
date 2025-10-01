import { CheckIcon } from '@heroicons/react/20/solid';
import { useTranslation } from 'next-i18next';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import plans from './data/pricing.json';

type PricingPlan = {
  amount: string;
  currency: string;
  duration: string;
  description: string;
  benefits: string[];
  name?: string;
};

const PricingSection = () => {
  const { t } = useTranslation('common');

  return (
    <section className="space-y-10 py-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-4xl font-semibold md:text-5xl">{t('pricing')}</h2>
        <p className="max-w-3xl text-lg text-muted-foreground">
          Flexibilidade para startups e scale-ups: escolha o plano ideal e mude quando quiser.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {(plans as PricingPlan[]).map((plan, index) => {
          const planName = plan.name || ['Starter', 'Growth', 'Scale'][index] || `Plano ${index + 1}`;

          return (
            <Card key={`${planName}-${index}`} variant="surface" className="h-full">
              <Card.Header>
                <Card.Title>{planName}</Card.Title>
                <Card.Description>{plan.description}</Card.Description>
              </Card.Header>
              <Card.Content>
                <div className="text-left">
                  <p className="text-3xl font-semibold text-foreground">
                    {plan.currency} {plan.amount}
                  <span className="text-sm font-normal text-muted-foreground">
                    {' '}/ {plan.duration}
                  </span>
                </p>
              </div>
              <ul className="mt-6 flex flex-col gap-3 text-left text-sm text-muted-foreground">
                {plan.benefits.map((benefit: string) => (
                  <li key={`${planName}-${benefit}`} className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-brand" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card.Content>
              <Card.Footer>
                <Button variant="primary" size="md" className="w-full justify-center">
                  {t('buy-now')}
                </Button>
              </Card.Footer>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default PricingSection;
