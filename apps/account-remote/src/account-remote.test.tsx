import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProfileWidget } from './components/ProfileWidget';

describe('Account Remote', () => {
  it('renders ProfileWidget placeholder', () => {
    render(<ProfileWidget />);
    expect(screen.getByText('Account Remote Placeholder')).toBeInTheDocument();
  });
});
