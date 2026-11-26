'use client';

import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input, Label } from '@nextcommerce/ui';
import { cn } from '@nextcommerce/utilities';
import { evaluatePasswordStrength } from '@/schemas/auth.schema';

export interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  showStrength?: boolean;
  watchedValue?: string;
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ id, label, error, showStrength = false, watchedValue = '', className, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const strength = showStrength ? evaluatePasswordStrength(watchedValue) : null;

    const barColors = [
      'bg-[var(--nc-danger)]',
      'bg-[var(--nc-warning)]',
      'bg-[var(--nc-primary)]',
      'bg-[var(--nc-success)]',
    ];

    return (
      <div className="space-y-1.5">
        <Label htmlFor={id}>{label}</Label>
        <div className="relative">
          <Input
            id={id}
            ref={ref}
            type={visible ? 'text' : 'password'}
            className={cn('h-10 pr-10', error && 'border-[var(--nc-danger)]', className)}
            aria-invalid={Boolean(error)}
            {...props}
          />
          <button
            type="button"
            onClick={() => setVisible((prev) => !prev)}
            aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-[var(--nc-text-muted)] hover:text-[var(--nc-text)]"
          >
            {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        {strength && watchedValue.length > 0 ? (
          <div className="space-y-1 pt-0.5">
            <div className="grid grid-cols-4 gap-1" aria-hidden="true">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={cn(
                    'h-1.5 rounded-full transition-colors',
                    idx < strength.score
                      ? barColors[Math.max(0, strength.score - 1)]
                      : 'bg-[var(--nc-bg-muted)]',
                  )}
                />
              ))}
            </div>
            <p className="text-xs text-[var(--nc-text-muted)]">
              Strength: <span className="font-medium text-[var(--nc-text)]">{strength.label}</span>
            </p>
          </div>
        ) : null}

        {error ? (
          <p role="alert" className="text-xs font-medium text-[var(--nc-danger)]">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
PasswordField.displayName = 'PasswordField';
