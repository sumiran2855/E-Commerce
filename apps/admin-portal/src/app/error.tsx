'use client';

import { ErrorState } from '@nextcommerce/ui';

export default function AdminError({ error, reset }: { error: Error; reset: () => void }) {
  return <ErrorState title="Admin Portal error" description={error.message} onRetry={reset} />;
}
