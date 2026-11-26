import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ProductFilters } from './components/ProductFilters';
import { ProductGrid } from './components/ProductGrid';
import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className="mx-auto max-w-6xl space-y-6 p-6">
        <h1 className="text-xl font-bold">Catalog Remote (Standalone Preview)</h1>
        <ProductFilters />
        <ProductGrid />
      </div>
    </QueryClientProvider>
  </StrictMode>,
);
