import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@nextcommerce/ui';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[var(--nc-text)]">Admin Overview</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Permission-Aware Navigation</CardTitle>
            <CardDescription>RBAC navigation architecture placeholder</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--nc-text-secondary)]">
              Navigation items filter by user role. Backend authorization will enforce all
              privileged operations.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Isolated Deployment</CardTitle>
            <CardDescription>admin.dmarket.in</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--nc-text-secondary)]">
              Deployed independently from Storefront to isolate privileged administration surfaces.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
