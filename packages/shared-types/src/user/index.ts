import type { UserRole } from '../auth';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
}
