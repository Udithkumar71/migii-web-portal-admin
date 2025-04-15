
import { Worker, SupportRequest, AdminUser } from '@/types';

// Initial mock data
let workers: Worker[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    age: 32,
    phone: "9876543210",
    originState: "Tamil Nadu",
    skill: "Carpentry",
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
    aadhaar: "XXXX-XXXX-1234",
    uniqueId: "TN-MIG-20230401-54321",
    status: "active",
    createdAt: new Date("2023-04-01"),
  },
  {
    id: "2",
    name: "Priya Singh",
    age: 28,
    phone: "8765432109",
    originState: "Bihar",
    skill: "Masonry",
    photo: "https://randomuser.me/api/portraits/women/2.jpg",
    uniqueId: "BH-MIG-20230405-65432",
    status: "active",
    createdAt: new Date("2023-04-05"),
  },
  {
    id: "3",
    name: "Mohammed Ali",
    age: 35,
    phone: "7654321098",
    originState: "Uttar Pradesh",
    skill: "Plumbing",
    photo: "https://randomuser.me/api/portraits/men/3.jpg",
    aadhaar: "XXXX-XXXX-5678",
    uniqueId: "UP-MIG-20230410-76543",
    status: "pending",
    createdAt: new Date("2023-04-10"),
  },
];

let supportRequests: SupportRequest[] = [
  {
    id: "1",
    workerId: "1",
    message: "Need assistance with payment issues",
    status: "pending",
    createdAt: new Date("2023-05-15"),
  },
  {
    id: "2",
    workerId: "2",
    message: "Request for ID card replacement",
    status: "resolved",
    createdAt: new Date("2023-05-10"),
    resolvedAt: new Date("2023-05-12"),
  },
];

const adminUsers: AdminUser[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@migii.com",
    role: "admin",
  },
  {
    id: "2",
    name: "Support Staff",
    email: "support@migii.com",
    role: "support",
  },
];

// Generate a unique ID for workers
export const generateUniqueId = (worker: Partial<Worker>): string => {
  // Format: [STATE]-MIG-YYYYMMDD-XXXXX
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const randomDigits = Math.floor(10000 + Math.random() * 90000);
  const stateCode = (worker.originState || '').substring(0, 2).toUpperCase();
  
  return `${stateCode}-MIG-${year}${month}${day}-${randomDigits}`;
};

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Worker API functions
export const fetchWorkers = async (): Promise<Worker[]> => {
  await delay(800);
  return [...workers];
};

export const fetchWorkerById = async (id: string): Promise<Worker | undefined> => {
  await delay(600);
  return workers.find(w => w.id === id);
};

export const createWorker = async (workerData: Omit<Worker, 'id' | 'uniqueId' | 'status' | 'createdAt'>): Promise<Worker> => {
  await delay(1000);
  
  const uniqueId = generateUniqueId(workerData);
  const newWorker: Worker = {
    id: String(workers.length + 1),
    ...workerData,
    uniqueId,
    status: 'active',
    createdAt: new Date(),
  };
  
  workers.push(newWorker);
  return newWorker;
};

export const updateWorker = async (id: string, workerData: Partial<Worker>): Promise<Worker | undefined> => {
  await delay(800);
  
  const index = workers.findIndex(w => w.id === id);
  if (index !== -1) {
    workers[index] = { ...workers[index], ...workerData };
    return workers[index];
  }
  return undefined;
};

export const deleteWorker = async (id: string): Promise<boolean> => {
  await delay(700);
  
  const initialLength = workers.length;
  workers = workers.filter(w => w.id !== id);
  return workers.length < initialLength;
};

export const searchWorkers = async (query: string): Promise<Worker[]> => {
  await delay(500);
  
  const lowercasedQuery = query.toLowerCase();
  return workers.filter(worker => 
    worker.name.toLowerCase().includes(lowercasedQuery) ||
    worker.skill.toLowerCase().includes(lowercasedQuery) ||
    worker.uniqueId.toLowerCase().includes(lowercasedQuery) ||
    worker.originState.toLowerCase().includes(lowercasedQuery)
  );
};

// Support request API functions
export const fetchSupportRequests = async (): Promise<SupportRequest[]> => {
  await delay(700);
  return [...supportRequests];
};

export const createSupportRequest = async (workerId: string, message: string): Promise<SupportRequest> => {
  await delay(800);
  
  const newRequest: SupportRequest = {
    id: String(supportRequests.length + 1),
    workerId,
    message,
    status: 'pending',
    createdAt: new Date(),
  };
  
  supportRequests.push(newRequest);
  return newRequest;
};

export const updateSupportRequest = async (id: string, data: Partial<SupportRequest>): Promise<SupportRequest | undefined> => {
  await delay(600);
  
  const index = supportRequests.findIndex(req => req.id === id);
  if (index !== -1) {
    supportRequests[index] = { ...supportRequests[index], ...data };
    return supportRequests[index];
  }
  return undefined;
};

// Auth related functions
export const loginWithOtp = async (phone: string, otp: string): Promise<{ success: boolean; workerId?: string }> => {
  await delay(1000);
  
  // Mock validation - in real app this would verify the OTP
  if (otp === '123456') {
    const worker = workers.find(w => w.phone === phone);
    if (worker) {
      return { success: true, workerId: worker.id };
    }
  }
  return { success: false };
};

export const sendOtp = async (phone: string): Promise<{ success: boolean }> => {
  await delay(800);
  // In a real app, this would send an actual SMS
  console.log(`[MOCK] OTP sent to ${phone}: 123456`);
  return { success: true };
};

export const verifyWorkerExists = async (phone: string): Promise<boolean> => {
  await delay(500);
  return workers.some(worker => worker.phone === phone);
};

// Admin authentication
export const adminLogin = async (email: string, password: string): Promise<AdminUser | null> => {
  await delay(800);
  
  // Mock validation - in real app this would verify credentials
  if (email === 'admin@migii.com' && password === 'admin123') {
    return adminUsers[0];
  }
  if (email === 'support@migii.com' && password === 'support123') {
    return adminUsers[1];
  }
  return null;
};

// Export admin users for mock authentication
export const getAdminUsers = () => adminUsers;
