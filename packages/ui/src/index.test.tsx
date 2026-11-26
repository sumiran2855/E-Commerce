import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button, EmptyState, ErrorState, Input, Label } from './index';

describe('@nextcommerce/ui', () => {
  it('renders Button and handles click', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Continue</Button>);

    await user.click(screen.getByRole('button', { name: 'Continue' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders Label and Input with typing support', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="you@nextcommerce.in" />
      </div>,
    );

    const input = screen.getByLabelText('Email');
    await user.type(input, 'test@nextcommerce.in');
    expect(input).toHaveValue('test@nextcommerce.in');
  });

  it('renders ErrorState and EmptyState', () => {
    render(
      <>
        <ErrorState title="Remote unavailable" />
        <EmptyState title="No items yet" />
      </>,
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Remote unavailable');
    expect(screen.getByText('No items yet')).toBeInTheDocument();
  });
});
