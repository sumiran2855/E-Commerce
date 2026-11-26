import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@nextcommerce/utilities';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--nc-primary)] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-[var(--nc-primary)] text-white hover:bg-[var(--nc-primary-hover)]',
        secondary:
          'bg-[var(--nc-bg-secondary)] text-[var(--nc-text)] border border-[var(--nc-border)] hover:bg-[var(--nc-bg-muted)]',
        outline:
          'border border-[var(--nc-border)] bg-transparent text-[var(--nc-text)] hover:bg-[var(--nc-bg-secondary)]',
        ghost: 'bg-transparent text-[var(--nc-text)] hover:bg-[var(--nc-bg-secondary)]',
        danger: 'bg-[var(--nc-danger)] text-white hover:opacity-90',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-9 px-4 py-2',
        lg: 'h-11 px-6 text-base',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = 'Button';

export { buttonVariants };
