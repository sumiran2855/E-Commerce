import { EmptyState } from '@nextcommerce/ui';

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold text-[var(--nc-text)]">My Account</h1>
      <EmptyState
        title="Account shell ready"
        description="Profile, saved addresses, and Account Remote integration will be enabled in the next phase."
      />
    </div>
  );
}
