'use client';

import { ErrorState } from '@nextcommerce/ui';

export default function SellerError({ error, reset }: { error: Error; reset: () => void }) {
  return <ErrorState title="Seller Portal error" description={error.message} onRetry={reset} />;
}
