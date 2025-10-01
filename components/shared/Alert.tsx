import type React from 'react';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

import cn from '@/lib/cn';

export type AlertStatus = 'success' | 'warning' | 'error' | 'info';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: AlertStatus;
  title?: string;
}

const iconMap: Record<AlertStatus, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  success: CheckCircleIcon,
  warning: ExclamationTriangleIcon,
  error: XCircleIcon,
  info: InformationCircleIcon,
};

const containerStyles: Record<AlertStatus, string> = {
  success:
    'border-emerald-400/50 bg-emerald-50/80 text-emerald-900 dark:border-emerald-400/40 dark:bg-emerald-500/10 dark:text-emerald-100',
  warning:
    'border-amber-400/50 bg-amber-50/80 text-amber-900 dark:border-amber-400/40 dark:bg-amber-500/10 dark:text-amber-100',
  error:
    'border-red-400/60 bg-red-50/85 text-red-900 dark:border-red-400/40 dark:bg-red-500/10 dark:text-red-100',
  info:
    'border-brand/60 bg-brand-subtle/80 text-foreground dark:border-brand/40 dark:bg-brand/10 dark:text-brand-foreground',
};

const Alert = ({
  status = 'info',
  className,
  children,
  title,
  ...props
}: AlertProps) => {
  const Icon = iconMap[status];

  return (
    <div
      className={cn(
        'glass-panel flex w-full items-start gap-3 rounded-[var(--radius-md)] border px-4 py-4 text-sm shadow-glow backdrop-blur-xl',
        containerStyles[status],
        className
      )}
      role="alert"
      {...props}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div className="space-y-1">
        {title ? <p className="font-semibold">{title}</p> : null}
        <div className="leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

export default Alert;
