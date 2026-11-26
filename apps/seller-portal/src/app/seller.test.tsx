import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SellerDashboardPage from '@/app/page';

describe('Seller Portal', () => {
  it('renders Seller Dashboard placeholder', () => {
    render(<SellerDashboardPage />);
    expect(screen.getByRole('heading', { name: 'Seller Dashboard' })).toBeInTheDocument();
  });
});
