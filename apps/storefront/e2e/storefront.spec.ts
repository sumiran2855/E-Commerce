import { expect, test } from '@playwright/test';

test('storefront home shell renders with main landmark', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /NextCommerce Storefront Shell/i })).toBeVisible();
  await expect(page.getByRole('navigation', { name: /Main navigation/i })).toBeVisible();
});
