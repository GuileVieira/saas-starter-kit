import { InformationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
}

const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="surface-panel flex h-64 w-full flex-col items-center justify-center gap-3 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-card/90 text-brand">
        <InformationCircleIcon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {description ? (
        <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
};

export default EmptyState;
