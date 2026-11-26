'use client';

import { ErrorState } from '@nextcommerce/ui';

export default function StorefrontError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <ErrorState
        title="Storefront encountered an error"
        description={error.message || 'An unexpected rendering error occurred.'}
        onRetry={reset}
      />
    </div>
  );
}
