export interface CartItemSummary {
  productId: string;
  title: string;
  quantity: number;
  unitPriceInPaise: number;
}

export interface CartSummary {
  itemCount: number;
  subtotalInPaise: number;
  currency: 'INR';
}
