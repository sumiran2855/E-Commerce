import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CartDrawer } from './components/CartDrawer';

describe('Cart Remote', () => {
  it('renders CartDrawer placeholder', () => {
    render(<CartDrawer />);
    expect(screen.getByText('Cart Remote Placeholder')).toBeInTheDocument();
  });
});
