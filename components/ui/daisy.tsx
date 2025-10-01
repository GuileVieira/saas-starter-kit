import * as React from 'react';

import BadgeComponent from '@/components/shared/Badge';
import CheckboxComponent from '@/components/shared/Checkbox';
import ModalComponent from '@/components/shared/Modal';
import { Card as ModernCard } from '@/components/ui/card';
import { Button as ModernButton, ButtonProps } from '@/components/ui/button';
import ModernInput, { InputProps as ModernInputProps } from '@/components/ui/input';
import cn from '@/lib/cn';

export type ButtonColor = 'primary' | 'error' | 'success' | 'ghost';

export interface DaisyButtonProps extends ButtonProps {
  color?: ButtonColor;
  loading?: boolean;
  fullWidth?: boolean;
  wide?: boolean;
  shape?: 'circle' | 'square';
  active?: boolean;
}

const colorToVariant: Record<ButtonColor, ButtonProps['variant']> = {
  primary: 'primary',
  error: 'destructive',
  success: 'secondary',
  ghost: 'ghost',
};

export const Button = React.forwardRef<HTMLButtonElement, DaisyButtonProps>(
  ({
    color = 'primary',
    loading = false,
    fullWidth,
    wide,
    shape,
    className,
    children,
    disabled,
    active,
    ...props
  }, ref) => {
    return (
      <ModernButton
        ref={ref}
        variant={colorToVariant[color] || 'primary'}
        className={cn(
          fullWidth && 'w-full justify-center',
          wide && 'w-full',
          shape === 'circle' && 'rounded-full',
          loading && 'pointer-events-none opacity-60',
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? '...' : children}
      </ModernButton>
    );
  }
);

Button.displayName = 'Button';

export interface InputProps extends ModernInputProps {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <ModernInput ref={ref} className={className} {...props} />
  )
);

Input.displayName = 'Input';

export const Card = ModernCard;
export const Checkbox = CheckboxComponent;
export const Badge = BadgeComponent;
export const Modal = ModalComponent;
