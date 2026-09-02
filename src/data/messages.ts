import { Conversation } from '@/lib/types';

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    propertyId: 'prop-1',
    propertyTitle: 'The Glass Pavilion & Infinity Pool Overlooking Baga Coast',
    propertyImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80',
    host: {
      id: 'host-1',
      name: 'Rohan & Ananya',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      isSuperhost: true,
      rating: 4.99,
      reviewsCount: 420,
      yearsHosting: 6,
      responseRate: 100,
      responseTime: 'within an hour',
      bio: 'Architect and landscape designer couple hosting coastal villas in Goa.',
    },
    lastMessage: 'We have arranged the private sunset boat cruise for Saturday evening! Looking forward to your arrival.',
    lastMessageTime: '10:42 AM',
    unreadCount: 1,
    messages: [
      {
        id: 'msg-1',
        senderId: 'usr-101',
        senderName: 'Aarav Sharma',
        senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        text: 'Hi Rohan! We are so excited for our upcoming stay next month. Is it possible to arrange an early check-in around 1:00 PM?',
        timestamp: 'Yesterday, 4:15 PM',
        isHost: false,
      },
      {
        id: 'msg-2',
        senderId: 'host-1',
        senderName: 'Rohan & Ananya',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        text: 'Hello Aarav! Absolutely, the villa will be thoroughly sanitized and ready for you by 1:00 PM. Our property manager will greet you with fresh chilled coconut water.',
        timestamp: 'Yesterday, 4:48 PM',
        isHost: true,
      },
      {
        id: 'msg-3',
        senderId: 'host-1',
        senderName: 'Rohan & Ananya',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        text: 'We have arranged the private sunset boat cruise for Saturday evening! Looking forward to your arrival.',
        timestamp: 'Today, 10:42 AM',
        isHost: true,
      }
    ]
  },
  {
    id: 'conv-2',
    propertyId: 'prop-2',
    propertyTitle: 'Nordic Cedar A-Frame Chalet with Valley Views',
    propertyImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80',
    host: {
      id: 'host-2',
      name: 'Vikram Thakur',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      isSuperhost: true,
      rating: 4.97,
      reviewsCount: 280,
      yearsHosting: 4,
      responseRate: 99,
      responseTime: 'within a few minutes',
      bio: 'Lifelong Himalayan trekker and sustainable architecture enthusiast.',
    },
    lastMessage: 'Thank you for leaving the cabin so clean! It was an absolute pleasure hosting you.',
    lastMessageTime: 'May 15',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-4',
        senderId: 'host-2',
        senderName: 'Vikram Thakur',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        text: 'Thank you for leaving the cabin so clean! It was an absolute pleasure hosting you.',
        timestamp: 'May 15, 12:30 PM',
        isHost: true,
      }
    ]
  }
];
