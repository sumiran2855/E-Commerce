import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@nextcommerce/ui';

export default function SellerDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[var(--nc-text)]">Seller Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Catalog Status</CardTitle>
            <CardDescription>Protected route architecture placeholder</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--nc-text-secondary)]">
              Seller product management will be implemented in a subsequent phase.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Order Fulfillment</CardTitle>
            <CardDescription>Independent Next.js deployment</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--nc-text-secondary)]">
              Order queues and shipping labels will connect to the Orders API.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Settlements</CardTitle>
            <CardDescription>INR payout ledger placeholder</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--nc-text-secondary)]">
              GST & payout analytics will be enabled in a future phase.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
