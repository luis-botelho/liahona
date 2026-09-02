export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'WORKER' | 'RECRUITER';
  createdAt: Date;
  updatedAt: Date;
}
