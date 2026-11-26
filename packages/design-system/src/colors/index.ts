export const colors = {
  text: {
    primary: '#111827',
    secondary: '#4B5563',
    muted: '#6B7280',
    inverse: '#FFFFFF',
  },
  brand: {
    primary: '#2563EB',
    primaryHover: '#1D4ED8',
    primaryLight: '#EFF6FF',
  },
  status: {
    success: '#16A34A',
    successLight: '#F0FDF4',
    warning: '#F59E0B',
    warningLight: '#FFFBEB',
    danger: '#DC2626',
    dangerLight: '#FEF2F2',
  },
  surface: {
    background: '#FFFFFF',
    secondary: '#F9FAFB',
    muted: '#F3F4F6',
  },
  border: {
    default: '#E5E7EB',
    strong: '#D1D5DB',
  },
} as const;

export type ColorTokens = typeof colors;
