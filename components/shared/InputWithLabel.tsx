import type React from 'react';

import cn from '@/lib/cn';

interface InputWithLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string | React.ReactNode;
  error?: string;
  descriptionText?: string;
}

const baseInputClasses =
  'w-full rounded-lg border border-border bg-card px-4 py-2 text-sm text-foreground shadow-sm transition-colors duration-200 ease-soft-in-out focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand disabled:cursor-not-allowed disabled:opacity-60';

const InputWithLabel = ({
  label,
  error,
  descriptionText,
  className,
  ...rest
}: InputWithLabelProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      {typeof label === 'string' ? (
        <label className="text-sm font-medium text-muted-foreground">
          {label}
        </label>
      ) : (
        label
      )}
      <input
        className={cn(baseInputClasses, error && 'border-destructive/70 focus:ring-destructive', className)}
        {...rest}
      />
      {(error || descriptionText) && (
        <span
          className={cn(
            'text-xs',
            error ? 'text-destructive' : 'text-muted-foreground'
          )}
        >
          {error || descriptionText}
        </span>
      )}
    </div>
  );
};

export default InputWithLabel;
