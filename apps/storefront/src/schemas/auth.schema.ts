import { z, emailSchema, indianPhoneSchema } from '@nextcommerce/validation';

export const emailOrMobileSchema = z
  .string()
  .trim()
  .min(1, 'Email address or mobile number is required')
  .refine(
    (val) => emailSchema.safeParse(val).success || indianPhoneSchema.safeParse(val).success,
    'Enter a valid email address or 10-digit Indian mobile number',
  );

export const strongPasswordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Include at least one uppercase letter')
  .regex(/[a-z]/, 'Include at least one lowercase letter')
  .regex(/[0-9]/, 'Include at least one number');

export const loginSchema = z.object({
  identifier: emailOrMobileSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    fullName: z.string().trim().min(2, 'Full name must be at least 2 characters'),
    email: emailSchema,
    mobile: indianPhoneSchema,
    password: strongPasswordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    acceptTerms: z.boolean().refine((v) => v === true, {
      message: 'You must accept the Terms & Conditions and Privacy Policy',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  identifier: emailOrMobileSchema,
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const otpSchema = z.object({
  otp: z
    .string()
    .trim()
    .regex(/^\d{6}$/, 'Enter the 6-digit verification code'),
});

export type OtpFormValues = z.infer<typeof otpSchema>;

export const resetPasswordSchema = z
  .object({
    password: strongPasswordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export const pincodeSchema = z.object({
  pincode: z
    .string()
    .trim()
    .regex(/^[1-9][0-9]{5}$/, 'Enter a valid 6-digit Indian PIN code'),
});

export const newsletterSchema = z.object({
  email: emailSchema,
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name'),
  email: emailSchema,
  subject: z.string().trim().min(4, 'Subject must be at least 4 characters'),
  message: z.string().trim().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export function evaluatePasswordStrength(password: string): {
  score: number;
  label: 'Weak' | 'Fair' | 'Good' | 'Strong';
} {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password) || password.length >= 12) score += 1;

  if (score <= 1) return { score, label: 'Weak' };
  if (score === 2) return { score, label: 'Fair' };
  if (score === 3) return { score, label: 'Good' };
  return { score, label: 'Strong' };
}
