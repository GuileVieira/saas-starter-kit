import { Card } from '@/components/ui/card';
import { useTranslation } from 'next-i18next';

import features from './data/features.json';

const FeatureSection = () => {
  const { t } = useTranslation('common');

  return (
    <section className="space-y-10 px-2 py-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
          {t('features')}
        </h2>
        <p className="max-w-3xl text-lg text-muted-foreground">
          Explore os recursos fundamentais para lançar experiências premium com total controle sobre segurança, identidade e monetização.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature: { name: string; description: string }) => (
          <Card key={feature.name} variant="glass" className="h-full">
            <Card.Header>
              <Card.Title>{feature.name}</Card.Title>
              <Card.Description>{feature.description}</Card.Description>
            </Card.Header>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
