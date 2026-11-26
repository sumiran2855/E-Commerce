import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AdminDashboardPage from '@/app/page';

describe('Admin Portal', () => {
  it('renders Admin Overview placeholder', () => {
    render(<AdminDashboardPage />);
    expect(screen.getByRole('heading', { name: 'Admin Overview' })).toBeInTheDocument();
  });
});
