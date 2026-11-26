import * as React from 'react';
import { cn } from '@nextcommerce/utilities';

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn('animate-pulse rounded-md bg-[var(--nc-bg-muted)]', className)}
      {...props}
    />
  );
}
