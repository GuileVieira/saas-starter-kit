import type React from 'react';

import cn from '@/lib/cn';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const CheckboxComponent = ({
  onChange,
  name,
  value,
  label,
  defaultChecked,
  className,
  ...rest
}: CheckboxProps) => {
  return (
    <label className={cn('flex items-center gap-2 text-sm text-muted-foreground', className)}>
      <input
        type="checkbox"
        name={name}
        value={value}
        onChange={onChange}
        defaultChecked={Boolean(defaultChecked)}
        className="h-4 w-4 rounded border-border text-brand focus:ring-brand"
        {...rest}
      />
      <span className="text-foreground">{label}</span>
    </label>
  );
};

export default CheckboxComponent;
