import type React from 'react';

import cn from '@/lib/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'neutral';
}

const variantClasses = {
  default:
    'bg-brand/15 text-brand border border-brand/30 shadow-sm dark:bg-brand/20 dark:text-brand-foreground',
  success:
    'bg-emerald-500/15 text-emerald-600 border border-emerald-500/40 dark:text-emerald-200',
  warning:
    'bg-amber-500/15 text-amber-600 border border-amber-500/40 dark:text-amber-200',
  neutral:
    'bg-muted text-muted-foreground border border-border/60',
};

const Badge = ({
  className,
  children,
  variant = 'default',
  ...rest
}: BadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide',
        variantClasses[variant],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
};

export default Badge;
