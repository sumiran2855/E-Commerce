export interface NextCommerceEventMap {
  'cart:updated': {
    itemCount: number;
    subtotalInPaise?: number;
  };
  'wishlist:updated': {
    itemCount: number;
  };
  'user:authenticated': {
    userId: string;
    role: 'customer' | 'seller' | 'admin';
  };
  'user:logged-out': {
    reason?: 'manual' | 'session-expired';
  };
  'order:created': {
    orderId: string;
    orderNumber: string;
  };
}

export type NextCommerceEventName = keyof NextCommerceEventMap;

const EVENT_PREFIX = 'nextcommerce:';

export function publish<K extends NextCommerceEventName>(
  eventName: K,
  detail: NextCommerceEventMap[K],
): void {
  if (typeof window === 'undefined') {
    return;
  }

  const event = new CustomEvent<NextCommerceEventMap[K]>(`${EVENT_PREFIX}${eventName}`, {
    detail,
    bubbles: false,
    cancelable: false,
  });

  window.dispatchEvent(event);
}

export function subscribe<K extends NextCommerceEventName>(
  eventName: K,
  handler: (detail: NextCommerceEventMap[K]) => void,
): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const listener = (event: Event) => {
    const customEvent = event as CustomEvent<NextCommerceEventMap[K]>;
    handler(customEvent.detail);
  };

  const prefixedName = `${EVENT_PREFIX}${eventName}`;
  window.addEventListener(prefixedName, listener);

  return () => {
    window.removeEventListener(prefixedName, listener);
  };
}
