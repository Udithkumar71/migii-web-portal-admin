
export interface Worker {
  id: string;
  name: string;
  age: number;
  phone: string;
  originState: string;
  skill: string;
  photo: string;
  aadhaar?: string;
  uniqueId: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: Date;
}

export interface SupportRequest {
  id: string;
  workerId: string;
  message: string;
  status: 'pending' | 'resolved';
  createdAt: Date;
  resolvedAt?: Date;
}

export type AdminRole = 'admin' | 'support' | 'viewer';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
}
