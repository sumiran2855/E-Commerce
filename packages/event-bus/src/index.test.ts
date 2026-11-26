import { describe, expect, it, vi } from 'vitest';
import { publish, subscribe } from './index';

describe('event-bus', () => {
  it('publishes and subscribes to typed events and cleans up on unsubscribe', () => {
    const handler = vi.fn();
    const unsubscribe = subscribe('cart:updated', handler);

    publish('cart:updated', { itemCount: 3, subtotalInPaise: 149900 });
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith({ itemCount: 3, subtotalInPaise: 149900 });

    unsubscribe();
    publish('cart:updated', { itemCount: 4 });
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
