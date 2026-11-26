import * as React from 'react';
import { AlertTriangle, Inbox, Loader2 } from 'lucide-react';
import { cn } from '@nextcommerce/utilities';
import { Button } from './button';

export function Spinner({ className, label = 'Loading' }: { className?: string; label?: string }) {
  return (
    <span role="status" aria-label={label} className="inline-flex items-center gap-2">
      <Loader2 className={cn('h-5 w-5 animate-spin text-[var(--nc-primary)]', className)} />
      <span className="sr-only">{label}</span>
    </span>
  );
}

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'We could not load this section right now. Please try again.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50/60 p-6 text-center',
        className,
      )}
    >
      <AlertTriangle className="mb-2 h-6 w-6 text-[var(--nc-danger)]" />
      <h3 className="text-sm font-semibold text-[var(--nc-text)]">{title}</h3>
      <p className="mt-1 max-w-md text-xs text-[var(--nc-text-secondary)]">{description}</p>
      {onRetry ? (
        <Button variant="outline" size="sm" className="mt-4" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}

export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border border-dashed border-[var(--nc-border)] bg-[var(--nc-bg-secondary)] p-8 text-center',
        className,
      )}
    >
      <Inbox className="mb-2 h-6 w-6 text-[var(--nc-text-muted)]" />
      <h3 className="text-sm font-semibold text-[var(--nc-text)]">{title}</h3>
      {description ? (
        <p className="mt-1 max-w-md text-xs text-[var(--nc-text-secondary)]">{description}</p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
