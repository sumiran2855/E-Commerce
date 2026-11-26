import { EmptyState } from '@nextcommerce/ui';

export default function OrdersPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold text-[var(--nc-text)]">Your Orders</h1>
      <EmptyState
        title="Orders shell ready"
        description="Order history and tracking will connect to the Orders microservice in a subsequent phase."
      />
    </div>
  );
}
