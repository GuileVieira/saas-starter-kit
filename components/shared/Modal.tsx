import { XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import type React from 'react';

import cn from '@/lib/cn';
import { Button } from '@/components/ui/button';

interface ModalProps {
  open: boolean;
  close: () => void;
  children: React.ReactNode;
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Modal = ({ open, close, children }: ModalProps) => {
  const { t } = useTranslation('common');

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
        onClick={close}
      />
      <div className="glass-panel relative z-10 w-full max-w-xl border border-white/30 p-6 shadow-glass dark:border-white/10">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-3 top-3 border-transparent text-muted-foreground hover:text-foreground"
          onClick={close}
          icon={<XMarkIcon className="h-5 w-5" />}
        >
          <span className="sr-only">{t('close')}</span>
        </Button>
        <div className="mt-4 flex flex-col gap-4">{children}</div>
      </div>
    </div>
  );
};

const Header = ({ children, className }: SectionProps) => (
  <div className={cn('flex flex-col gap-2', className)}>{children}</div>
);

const Description = ({ children, className }: SectionProps) => (
  <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>
);

const Body = ({ children, className }: SectionProps) => (
  <div className={cn('py-2 text-sm text-foreground', className)}>{children}</div>
);

const Footer = ({ children, className }: SectionProps) => (
  <div className={cn('flex flex-wrap justify-end gap-3 pt-2', className)}>
    {children}
  </div>
);

Modal.Header = Header;
Modal.Description = Description;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
