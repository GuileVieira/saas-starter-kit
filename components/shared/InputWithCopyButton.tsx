import type React from 'react';

import cn from '@/lib/cn';
import { CopyToClipboardButton } from '@/components/shared';

interface InputWithCopyButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

const baseInputClasses =
  'w-full rounded-lg border border-border bg-card px-4 py-2 text-sm text-foreground shadow-sm transition-colors duration-200 ease-soft-in-out focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand disabled:cursor-not-allowed disabled:opacity-60';

const InputWithCopyButton = ({
  label,
  value,
  description,
  className,
  ...rest
}: InputWithCopyButtonProps) => {
  const id = label.replace(/\s+/g, '').toLowerCase();

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <label
          className="text-sm font-medium uppercase tracking-wide text-muted-foreground"
          htmlFor={id}
        >
          {label}
        </label>
        <CopyToClipboardButton value={value?.toString() || ''} />
      </div>
      <input
        id={id}
        className={cn(baseInputClasses, className)}
        value={value}
        readOnly
        {...rest}
      />
      {description ? (
        <span className="text-xs text-muted-foreground">{description}</span>
      ) : null}
    </div>
  );
};

export default InputWithCopyButton;
