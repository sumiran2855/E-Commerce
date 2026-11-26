import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@nextcommerce/utilities';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-[var(--nc-bg-muted)] text-[var(--nc-text)]',
        primary: 'bg-blue-50 text-[var(--nc-primary)]',
        success: 'bg-green-50 text-[var(--nc-success)]',
        warning: 'bg-amber-50 text-amber-700',
        danger: 'bg-red-50 text-[var(--nc-danger)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
