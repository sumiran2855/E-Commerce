import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Header } from '@/components/header';
import { ProductCard } from '@/components/product/product-card';
import { MOCK_PRODUCTS } from '@/data/mock-catalog';
import { CatalogExplorer } from '@/features/catalog/catalog-explorer';
import { OtpInput } from '@/features/auth/otp-input';
import HomePage from '@/app/page';
import LoginPage from '@/app/(auth)/login/page';
import RegisterPage from '@/app/(auth)/register/page';
import ForgotPasswordPage from '@/app/(auth)/forgot-password/page';
import { AppProviders } from '@/providers/app-providers';
import { useMarketplaceStore } from '@/store/marketplace-store';

const pushMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock, replace: vi.fn(), back: vi.fn() }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('next/image', () => ({
  default: ({ alt, src, ...rest }: { alt: string; src: string }) => (
    <img alt={alt} src={src} {...rest} />
  ),
}));

function renderWithProviders(ui: React.ReactNode) {
  return render(<AppProviders>{ui}</AppProviders>);
}

describe('DMarket Storefront Flows', () => {
  afterEach(() => {
    cleanup();
  });
  it('1. renders the landing page with hero, categories, deals, and benefits', () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByText('Upgrade Your Everyday Tech & Living')).toBeInTheDocument();
    expect(screen.getByText('Shop by Category')).toBeInTheDocument();
    expect(screen.getByText("Today's Deals")).toBeInTheDocument();
    expect(screen.getByText('Why Shop with DMarket')).toBeInTheDocument();
  });

  it('2. validates login form inputs on submit', async () => {
    renderWithProviders(<LoginPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    expect(
      await screen.findByText('Email address or mobile number is required'),
    ).toBeInTheDocument();
    expect(await screen.findByText('Password is required')).toBeInTheDocument();
  });

  it('3. validates registration form fields including Indian mobile and terms', async () => {
    renderWithProviders(<RegisterPage />);
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'Aarav' } });
    fireEvent.change(screen.getByLabelText('Email Address'), {
      target: { value: 'invalid-email' },
    });
    fireEvent.change(screen.getByLabelText('Mobile Number (India)'), {
      target: { value: '12345' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));

    expect(await screen.findByText('Please enter a valid email address')).toBeInTheDocument();
    expect(
      await screen.findByText('Please enter a valid 10-digit Indian mobile number'),
    ).toBeInTheDocument();
    expect(
      await screen.findByText('You must accept the Terms & Conditions and Privacy Policy'),
    ).toBeInTheDocument();
  });

  it('4. handles forgot password submission and shows confirmation', async () => {
    renderWithProviders(<ForgotPasswordPage />);
    fireEvent.change(screen.getByLabelText('Email Address or Mobile Number'), {
      target: { value: 'aarav@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send Verification Code' }));
    expect(
      await screen.findByText('Verification code sent', {}, { timeout: 3000 }),
    ).toBeInTheDocument();
  });

  it('5. supports 6-digit OTP paste interaction', () => {
    const onChange = vi.fn();
    render(<OtpInput value="" onChange={onChange} />);
    const firstDigit = screen.getByLabelText('Digit 1 of 6');
    fireEvent.paste(firstDigit, {
      clipboardData: { getData: () => '482910' },
    });
    expect(onChange).toHaveBeenCalledWith('482910');
  });

  it('6. renders search results in CatalogExplorer for query', async () => {
    renderWithProviders(<CatalogExplorer title="Search" initialQuery="Air Fryer" />);
    expect(
      await screen.findByText('RasoiCraft CrispPro 5.5L Digital Air Fryer'),
    ).toBeInTheDocument();
  });

  it('7. filters products by brand in CatalogExplorer', async () => {
    renderWithProviders(<CatalogExplorer title="All Products" />);
    const checkbox = await screen.findByLabelText('VedaPure');
    fireEvent.click(checkbox);
    await waitFor(() => {
      expect(screen.getByText('Showing 1 of 1 products')).toBeInTheDocument();
    });
  });

  it('8 & 9. adds product to cart and toggles wishlist state', () => {
    const product = MOCK_PRODUCTS[0]!;
    useMarketplaceStore.setState({ cartItems: [], wishlistIds: [] });

    renderWithProviders(<ProductCard product={product} />);
    fireEvent.click(screen.getByRole('button', { name: /Add to Cart/i }));
    expect(useMarketplaceStore.getState().cartItems).toHaveLength(1);

    fireEvent.click(screen.getByRole('button', { name: `Add ${product.name} to wishlist` }));
    expect(useMarketplaceStore.getState().wishlistIds).toContain(product.id);
  });

  it('10. opens and closes mobile navigation drawer', () => {
    renderWithProviders(<Header />);
    fireEvent.click(screen.getByRole('button', { name: 'Open navigation menu' }));
    expect(screen.getByRole('dialog', { name: 'Mobile menu' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close navigation menu' }));
    expect(screen.queryByRole('dialog', { name: 'Mobile menu' })).not.toBeInTheDocument();
  });
});
