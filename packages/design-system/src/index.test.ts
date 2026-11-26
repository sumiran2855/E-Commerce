import { describe, expect, it } from 'vitest';
import { colors, spacing, typography } from './index';

describe('design-system tokens', () => {
  it('exposes the expected brand and semantic colors', () => {
    expect(colors.brand.primary).toBe('#2563EB');
    expect(colors.text.primary).toBe('#111827');
    expect(colors.status.success).toBe('#16A34A');
    expect(colors.status.warning).toBe('#F59E0B');
    expect(colors.status.danger).toBe('#DC2626');
  });

  it('exposes spacing and typography scales', () => {
    expect(spacing[4]).toBe('1rem');
    expect(typography.fontWeight.semibold).toBe('600');
  });
});
