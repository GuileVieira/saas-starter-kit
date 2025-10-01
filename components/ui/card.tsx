import * as React from 'react';

import cn from '@/lib/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'surface';
}

const variantClasses = {
  glass:
    'glass-panel border border-white/40 dark:border-white/10 shadow-glass backdrop-blur-2xl bg-white/60 dark:bg-white/5',
  surface:
    'surface-panel border border-border/70 bg-card/90 shadow-elevated',
};

const CardBase = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, variant = 'glass', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden rounded-[var(--radius-lg)] transition-all duration-300 ease-soft-in-out',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay bg-gradient-to-br from-white/50 via-transparent to-white/10 dark:from-white/20" />
      <div className="relative flex flex-col gap-6 p-6 md:p-7">{children}</div>
    </div>
  )
);

CardBase.displayName = 'Card';

const CardHeader = ({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col gap-2', className)}>{children}</div>
);

const CardTitle = ({
  className,
  children,
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('text-2xl font-semibold text-foreground', className)}>{children}</h3>
);

const CardDescription = ({
  className,
  children,
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-sm text-muted-foreground leading-relaxed', className)}>
    {children}
  </p>
);

const CardContent = ({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col gap-4', className)}>{children}</div>
);

const CardFooter = ({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-wrap items-center justify-end gap-3 pt-4', className)}>
    {children}
  </div>
);

type CardComponent = typeof CardBase & {
  Header: typeof CardHeader;
  Title: typeof CardTitle;
  Description: typeof CardDescription;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
  Body: typeof CardContent;
};

const Card = CardBase as CardComponent;

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;
Card.Body = CardContent;

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };

export default Card;
