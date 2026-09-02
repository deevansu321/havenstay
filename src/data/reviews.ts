import { PropertyReview } from '@/lib/types';

export const REVIEWS_DATA: Record<string, PropertyReview[]> = {
  'prop-1': [
    {
      id: 'rev-1',
      author: {
        name: 'Siddharth Mehta',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        location: 'Mumbai, India',
        joinedDate: '3 years on Airbnb',
      },
      rating: 5,
      date: 'August 2026',
      comment: 'An absolute masterpiece of a villa! The infinity pool looking over the Arabian sea at sunset is surreal. Rohan and his staff were extraordinarily attentive—the chef’s breakfast every morning was five-star quality. We did not want to leave!',
      categories: { cleanliness: 5, accuracy: 5, communication: 5, location: 5, checkIn: 5, value: 5 },
    },
    {
      id: 'rev-2',
      author: {
        name: 'Chloe Laurent',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
        location: 'Lyon, France',
        joinedDate: '5 years on Airbnb',
      },
      rating: 5,
      date: 'July 2026',
      comment: 'The architectural design is even more breathtaking in person than the photos show. Pristinely clean, whisper-quiet air conditioning, and top-of-the-line amenities. Watching the monsoons roll over the sea from the glass pavilion was unforgettable.',
      categories: { cleanliness: 5, accuracy: 5, communication: 5, location: 5, checkIn: 5, value: 5 },
    },
    {
      id: 'rev-3',
      author: {
        name: 'Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
        location: 'London, United Kingdom',
        joinedDate: '4 years on Airbnb',
      },
      rating: 5,
      date: 'June 2026',
      comment: 'Spectacular stay. High-speed Wi-Fi worked flawlessly for our remote work calls. The private beach access pathway made evening sunset strolls effortless. Will definitely return next season.',
      categories: { cleanliness: 5, accuracy: 5, communication: 5, location: 5, checkIn: 5, value: 4.8 },
    },
    {
      id: 'rev-4',
      author: {
        name: 'Priyanka Sen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        location: 'Bengaluru, India',
        joinedDate: '2 years on Airbnb',
      },
      rating: 5,
      date: 'May 2026',
      comment: 'Celebrated our anniversary here and it couldn’t have been more magical. The Sonos sound system throughout the villa and poolside lighting set the perfect ambiance.',
      categories: { cleanliness: 5, accuracy: 5, communication: 5, location: 5, checkIn: 5, value: 5 },
    }
  ],
  'default': [
    {
      id: 'rev-def-1',
      author: {
        name: 'Alexander Wright',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        location: 'Toronto, Canada',
        joinedDate: '4 years on Airbnb',
      },
      rating: 5,
      date: 'August 2026',
      comment: 'One of the best stays we have ever booked on Airbnb. Everything was as described, check-in was seamless, and the views were unbelievable.',
      categories: { cleanliness: 5, accuracy: 5, communication: 5, location: 5, checkIn: 5, value: 5 },
    },
    {
      id: 'rev-def-2',
      author: {
        name: 'Elena Rossi',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        location: 'Milan, Italy',
        joinedDate: '6 years on Airbnb',
      },
      rating: 5,
      date: 'July 2026',
      comment: 'The host went above and beyond with recommendations and local tips. The home is immaculately maintained with high-end finishes.',
      categories: { cleanliness: 5, accuracy: 5, communication: 5, location: 5, checkIn: 5, value: 4.9 },
    }
  ]
};

export function getReviewsForProperty(propertyId: string): PropertyReview[] {
  return REVIEWS_DATA[propertyId] || REVIEWS_DATA['default'];
}
