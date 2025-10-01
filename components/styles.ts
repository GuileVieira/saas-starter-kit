import { buttonClassName } from '@/components/ui/button';
import { baseInputClasses } from '@/components/ui/input';
import cn from '@/lib/cn';

const primaryBtn = buttonClassName({ variant: 'primary', size: 'md' });
const outlineBtn = buttonClassName({ variant: 'outline', size: 'md' });
const destructiveBtn = buttonClassName({ variant: 'destructive', size: 'md' });
const secondaryBtn = buttonClassName({ variant: 'secondary', size: 'md' });

export const BOXYHQ_UI_CSS = {
  button: {
    ctoa: primaryBtn,
    destructive: destructiveBtn,
    cancel: outlineBtn,
    secondary: secondaryBtn,
  },
  input: baseInputClasses,
  select: cn(baseInputClasses, 'pr-10'),
  textarea: cn(baseInputClasses, 'min-h-[9rem] py-3'),
  confirmationPrompt: {
    button: {
      ctoa: primaryBtn,
      cancel: outlineBtn,
    },
  },
  secretInput: baseInputClasses,
  section: 'mb-8',
};
