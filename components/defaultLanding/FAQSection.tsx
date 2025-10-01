import { useTranslation } from 'next-i18next';

import { Card } from '@/components/ui/card';

import faqs from './data/faq.json';

const FAQSection = () => {
  const { t } = useTranslation('common');

  return (
    <section className="space-y-10 py-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-4xl font-semibold md:text-5xl">
          {t('frequently-asked')}
        </h2>
        <p className="max-w-3xl text-lg text-muted-foreground">
          Transparência total: respostas rápidas para as dúvidas mais comuns sobre o kit SaaS.
        </p>
      </div>
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        {faqs.map((faq) => (
          <Card key={faq.question} variant="surface">
            <Card.Content className="gap-3 text-left">
              <Card.Title className="text-xl">{faq.question}</Card.Title>
              <Card.Description className="text-base leading-relaxed">
                {faq.answer}
              </Card.Description>
            </Card.Content>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
