export type UserRole = 'customer' | 'seller' | 'admin';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface AuthSession {
  user: AuthUser;
  expiresAt: string;
  isAuthenticated: boolean;
}
