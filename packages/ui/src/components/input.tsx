import * as React from 'react';
import { cn } from '@nextcommerce/utilities';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex h-9 w-full rounded-md border border-[var(--nc-border)] bg-[var(--nc-bg)] px-3 py-1 text-sm text-[var(--nc-text)] shadow-sm transition-colors placeholder:text-[var(--nc-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--nc-primary)] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
Input.displayName = 'Input';
