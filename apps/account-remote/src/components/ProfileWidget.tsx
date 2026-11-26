import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@nextcommerce/ui';

export function ProfileWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Remote Placeholder</CardTitle>
        <CardDescription>Exposed via @module-federation/vite (port 5176)</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[var(--nc-text-secondary)]">
          Customer profile, saved addresses, and preferences will be implemented in a subsequent
          phase.
        </p>
      </CardContent>
    </Card>
  );
}

export default ProfileWidget;
