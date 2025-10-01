import * as React from 'react';

import cn from '@/lib/cn';

const baseInputClasses =
  'flex h-11 w-full rounded-lg border border-border bg-card px-4 py-2 text-sm text-foreground shadow-sm transition-colors duration-200 ease-soft-in-out placeholder:text-muted-foreground/70 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand disabled:cursor-not-allowed disabled:opacity-60';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(baseInputClasses, className)}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
