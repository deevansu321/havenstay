import { User } from '@/lib/types';

export const CURRENT_USER: User = {
  id: 'usr-101',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@example.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
  bio: 'Architecture photographer and avid world traveler based in Mumbai.',
  joinedYear: 2021,
  isHost: true,
  isSuperhost: false,
  identityVerified: true,
  tripsCount: 14,
  reviewsCount: 12,
};

export const DEMO_HOST_USER: User = {
  id: 'usr-host-202',
  name: 'Rohan & Ananya',
  email: 'rohan.villa@example.com',
  phone: '+91 98200 11223',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  bio: 'Superhosts with 6+ years hosting luxury coastal villas in Goa.',
  joinedYear: 2018,
  isHost: true,
  isSuperhost: true,
  identityVerified: true,
  tripsCount: 32,
  reviewsCount: 420,
};
