import * as React from 'react';

import cn from '@/lib/cn';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outline'
  | 'destructive';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  children?: React.ReactNode | React.ReactNode[] | string | number | Record<string, unknown>;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand text-brand-foreground hover:bg-brand/80 active:bg-brand/75 border border-brand/60 shadow-md',
  secondary:
    'bg-card text-foreground border border-border/60 hover:border-brand/50 hover:text-brand shadow-sm',
  ghost:
    'bg-transparent text-foreground border-transparent hover:bg-foreground/10 hover:text-brand',
  outline:
    'bg-transparent text-foreground border border-border/60 hover:border-brand hover:text-brand shadow-none',
  destructive:
    'bg-destructive/90 text-destructive-foreground hover:bg-destructive/85 active:bg-destructive/80 border border-destructive/70 shadow-sm',
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'text-xs px-3 py-1.5',
  sm: 'text-sm px-4 py-2',
  md: 'text-sm px-5 py-2.5',
  lg: 'text-base px-6 py-3',
};

export const buttonClassName = ({
  variant = 'primary',
  size = 'md',
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) =>
  cn(
    'inline-flex items-center justify-center gap-2 rounded-full border font-medium transition-all duration-300 ease-soft-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand disabled:opacity-60 disabled:pointer-events-none backdrop-blur-sm',
    variantClasses[variant],
    sizeClasses[size],
    className
  );

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      icon,
      trailingIcon,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const content =
      typeof children === 'object' &&
      children !== null &&
      !Array.isArray(children) &&
      !React.isValidElement(children)
        ? String(children)
        : children;

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClassName({ variant, size, className })}
        {...props}
      >
        {icon ? (
          <span className="flex items-center text-inherit">{icon}</span>
        ) : null}
        {content}
        {trailingIcon ? (
          <span className="flex items-center text-inherit">{trailingIcon}</span>
        ) : null}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
