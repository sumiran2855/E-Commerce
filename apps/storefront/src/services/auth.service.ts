import type { AuthErrorCode } from '@/types/storefront';

export interface MockAuthResponse {
  success: boolean;
  message: string;
  errorCode?: AuthErrorCode;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

const delay = (ms = 650) => new Promise((resolve) => setTimeout(resolve, ms));

export async function loginWithPassword(
  identifier: string,
  password: string,
): Promise<MockAuthResponse> {
  await delay(650);
  const normalized = identifier.trim().toLowerCase();

  if (normalized === 'invalid@dmarket.in' || password === 'wrongpass') {
    return {
      success: false,
      errorCode: 'invalid_credentials',
      message: 'Incorrect email/mobile or password. Please try again.',
    };
  }

  if (normalized === 'unverified@dmarket.in') {
    return {
      success: false,
      errorCode: 'account_not_verified',
      message: 'Your account is not verified yet. Please check your email or verify via OTP.',
    };
  }

  if (normalized === 'unavailable@dmarket.in') {
    return {
      success: false,
      errorCode: 'account_unavailable',
      message: 'This account is temporarily unavailable. Contact support for assistance.',
    };
  }

  return {
    success: true,
    message: 'Signed in successfully.',
    user: {
      id: 'cust-101',
      name: normalized.includes('@')
        ? (normalized.split('@')[0] ?? 'Aarav Sharma')
        : 'Aarav Sharma',
      email: normalized.includes('@') ? normalized : `${normalized}@customers.dmarket.in`,
    },
  };
}

export async function registerCustomer(payload: {
  fullName: string;
  email: string;
  mobile: string;
}): Promise<MockAuthResponse> {
  await delay(700);
  if (payload.email.trim().toLowerCase() === 'exists@dmarket.in') {
    return {
      success: false,
      errorCode: 'account_exists',
      message: 'An account with this email address already exists. Please sign in instead.',
    };
  }

  return {
    success: true,
    message: 'Account created. Please verify the 6-digit OTP sent to your mobile/email.',
    user: {
      id: 'cust-new',
      name: payload.fullName.trim(),
      email: payload.email.trim(),
    },
  };
}

export async function loginWithGoogle(): Promise<MockAuthResponse> {
  await delay(800);
  return {
    success: true,
    message: 'Authenticated with Google.',
    user: {
      id: 'cust-google',
      name: 'Priya Nair',
      email: 'priya.nair@dmarket.in',
    },
  };
}

export async function requestPasswordReset(identifier: string): Promise<MockAuthResponse> {
  await delay(600);
  if (identifier.trim().toLowerCase() === 'network@dmarket.in') {
    return {
      success: false,
      errorCode: 'network_error',
      message: 'Unable to reach verification service. Please check your connection and retry.',
    };
  }
  return {
    success: true,
    message: `Verification code sent to ${identifier}.`,
  };
}

export async function verifyOtp(otp: string): Promise<MockAuthResponse> {
  await delay(600);
  if (otp === '000000') {
    return {
      success: false,
      errorCode: 'verification_failed',
      message: 'Invalid verification code. Please check and try again.',
    };
  }
  if (otp === '111111') {
    return {
      success: false,
      errorCode: 'reset_link_expired',
      message: 'This OTP has expired. Please request a new code.',
    };
  }
  if (otp === '999999') {
    return {
      success: false,
      errorCode: 'too_many_attempts',
      message: 'Too many failed verification attempts. Please wait 15 minutes before retrying.',
    };
  }

  return {
    success: true,
    message: 'Verification successful.',
  };
}

export async function resendVerificationEmail(email: string): Promise<MockAuthResponse> {
  await delay(500);
  return {
    success: true,
    message: `A fresh verification link has been sent to ${email}.`,
  };
}

export async function resetPassword(): Promise<MockAuthResponse> {
  await delay(650);
  return {
    success: true,
    message: 'Your password has been updated. You can now sign in with your new password.',
  };
}
