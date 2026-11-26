import { describe, expect, it } from 'vitest';
import { createMockAuthAdapter, getNavigationForRole } from './index';

describe('auth-client', () => {
  it('provides role-specific navigation', () => {
    expect(getNavigationForRole('customer').map((item) => item.label)).toContain('Orders');
    expect(getNavigationForRole('seller').map((item) => item.label)).toContain('Payouts');
    expect(getNavigationForRole('admin').map((item) => item.label)).toContain('Moderation');
  });

  it('supports mock login and logout lifecycle', async () => {
    const adapter = createMockAuthAdapter('customer');
    const initial = await adapter.getSession();
    expect(initial?.isAuthenticated).toBe(true);

    await adapter.logout();
    expect(await adapter.getSession()).toBeNull();

    await adapter.login();
    expect((await adapter.getSession())?.user.role).toBe('customer');
  });
});
