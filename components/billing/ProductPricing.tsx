import { useTranslation } from 'next-i18next';
import toast from 'react-hot-toast';

import { Card } from '@/components/shared';
import { Button } from '@/components/ui/button';
import useTeam from 'hooks/useTeam';
import { Price, Service, Subscription } from '@prisma/client';

import PaymentButton from './PaymentButton';

interface ProductPricingProps {
  plans: any[];
  subscriptions: (Subscription & { product: Service })[];
}

const ProductPricing = ({ plans, subscriptions }: ProductPricingProps) => {
  const { team } = useTeam();
  const { t } = useTranslation('common');

  const initiateCheckout = async (price: string, quantity?: number) => {
    const res = await fetch(
      `/api/teams/${team?.slug}/payments/create-checkout-session`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price, quantity }),
      }
    );

    const data = await res.json();

    if (data?.data?.url) {
      window.open(data.data.url, '_blank', 'noopener,noreferrer');
    } else {
      toast.error(
        data?.error?.message ||
          data?.error?.raw?.message ||
          t('stripe-checkout-fallback-error')
      );
    }
  };

  const hasActiveSubscription = (price: Price) =>
    subscriptions.some((s) => s.priceId === price.id);

  return (
    <section className="py-3">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {plans.map((plan) => {
          return (
            <Card key={plan.id} variant="surface" className="h-full">
              <Card.Body className="gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-foreground">
                    {plan.name}
                  </h3>
                </div>
                <p className="min-h-[4.5rem] text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </Card.Body>
              <div className="flex flex-col gap-2 px-6 pb-6">
                {plan.prices.map((price: Price) =>
                  hasActiveSubscription(price) ? (
                    <Button
                      key={price.id}
                      variant="outline"
                      size="md"
                      fullWidth
                      disabled
                      className="rounded-full"
                    >
                      {t('current')}
                    </Button>
                  ) : (
                    <PaymentButton
                      key={price.id}
                      plan={plan}
                      price={price}
                      initiateCheckout={initiateCheckout}
                    />
                  )
                )}
              </div>
              <ul className="mb-6 mt-4 space-y-3 px-6 pb-4 text-sm text-muted-foreground">
                {plan.features.map((feature: string) => (
                  <li className="flex space-x-4" key={`${plan.id}-${feature}`}>
                    <svg
                      className="h-5 w-5 flex-none text-brand"
                      viewBox="0 0 24 24"
                      width={24}
                      height={24}
                      fill="none"
                      shapeRendering="geometricPrecision"
                    >
                      <path
                        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
                        fill="currentColor"
                      />
                      <path
                        d="M8 11.8571L10.5 14.3572L15.8572 9"
                        stroke="white"
                      />
                    </svg>
                    <p>{feature}</p>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default ProductPricing;
