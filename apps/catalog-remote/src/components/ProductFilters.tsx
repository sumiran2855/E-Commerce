import { useState } from 'react';
import { Badge, Button, Checkbox, Label } from '@nextcommerce/ui';

export function ProductFilters() {
  const [inStockOnly, setInStockOnly] = useState(true);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-[var(--nc-border)] bg-[var(--nc-bg-secondary)] p-4">
      <div className="flex items-center gap-3">
        <Badge variant="default">Catalog Remote Filters</Badge>
        <div className="flex items-center gap-2">
          <Checkbox
            id="in-stock-filter"
            checked={inStockOnly}
            onCheckedChange={(checked) => setInStockOnly(checked === true)}
          />
          <Label htmlFor="in-stock-filter">In stock only</Label>
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={() => setInStockOnly(true)}>
        Reset Filters
      </Button>
    </div>
  );
}

export default ProductFilters;
