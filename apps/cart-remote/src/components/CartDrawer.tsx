import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@nextcommerce/ui';

export function CartDrawer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cart Remote Placeholder</CardTitle>
        <CardDescription>Exposed via @module-federation/vite (port 5175)</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[var(--nc-text-secondary)]">
          Shopping cart UI and GST breakdown will be implemented in a subsequent phase.
        </p>
      </CardContent>
    </Card>
  );
}

export default CartDrawer;
