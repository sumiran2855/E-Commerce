import { EmptyState } from '@nextcommerce/ui';

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold text-[var(--nc-text)]">Checkout</h1>
      <EmptyState
        title="Checkout shell ready"
        description="Address, GST invoice, and payment orchestration will be implemented in a subsequent phase."
      />
    </div>
  );
}
