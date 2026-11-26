import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProductFilters } from './components/ProductFilters';
import { ProductGrid } from './components/ProductGrid';

describe('Catalog Remote', () => {
  it('renders ProductFilters and ProductGrid demonstration components', () => {
    render(
      <>
        <ProductFilters />
        <ProductGrid />
      </>,
    );

    expect(screen.getByText('Catalog Remote Filters')).toBeInTheDocument();
    expect(screen.getByText('Studio Wireless ANC Headphones')).toBeInTheDocument();
  });
});
