export interface Host {
  id: string;
  name: string;
  avatar: string;
  isSuperhost: boolean;
  rating: number;
  reviewsCount: number;
  yearsHosting: number;
  responseRate: number;
  responseTime: string;
  bio: string;
  work?: string;
  languages?: string[];
  coHosts?: { name: string; avatar: string }[];
}

export interface AmenityItem {
  id: string;
  name: string;
  icon: string;
  category: 'essentials' | 'features' | 'safety' | 'location' | 'outdoor';
  description?: string;
}

export interface SleepingArrangement {
  bedroom: string;
  bedType: string;
  count: number;
  icon?: string;
}

export interface PropertyReview {
  id: string;
  author: {
    name: string;
    avatar: string;
    location: string;
    joinedDate: string;
  };
  rating: number;
  date: string;
  comment: string;
  categories: {
    cleanliness: number;
    accuracy: number;
    communication: number;
    location: number;
    checkIn: number;
    value: number;
  };
}

export interface AiFaq {
  question: string;
  answer: string;
  category: 'amenities' | 'location' | 'rules' | 'work';
}

export interface Property {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  type: 'Entire home' | 'Entire villa' | 'Entire cabin' | 'Entire apartment' | 'Private room' | 'Luxury suite' | 'Treehouse' | 'Beachfront villa' | 'Farm stay' | 'Houseboat' | 'Castle' | 'Overwater bungalow' | 'Cave suite';
  category: string;
  badge?: 'Guest favorite' | 'Rare find' | 'Top 1%' | 'New' | 'Price drop';
  viewsThisWeek?: number;
  weather?: {
    temp: string;
    condition: string;
  };
  location: {
    city: string;
    state?: string;
    country: string;
    region?: string;
    distance?: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  images: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  isGuestFavorite?: boolean;
  isSuperhost?: boolean;
  isRareFind?: boolean;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  amenities: string[];
  sleepingArrangements: SleepingArrangement[];
  host: Host;
  datesAvailable?: string;
  rules: {
    checkIn: string;
    checkOut: string;
    selfCheckIn: boolean;
    petsAllowed: boolean;
    smokingAllowed: boolean;
    partiesAllowed: boolean;
  };
  cancellationPolicy: string;
  safetyItems: string[];
  ratingsBreakdown: {
    cleanliness: number;
    accuracy: number;
    communication: number;
    location: number;
    checkIn: number;
    value: number;
  };
  virtualTourImages?: string[];
  aiFaqs?: AiFaq[];
}

export interface IconExperience {
  id: string;
  title: string;
  tagline: string;
  host: {
    name: string;
    avatar: string;
    role: string;
  };
  image: string;
  category: string;
  location: string;
  status: 'Open for requests' | 'Coming soon' | 'Sold out';
  price: string;
  description: string;
}


export interface Category {
  id: string;
  label: string;
  iconName: string;
  description?: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  property: {
    title: string;
    location: string;
    image: string;
    type: string;
    hostName: string;
  };
  userId: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: {
    adults: number;
    children: number;
    infants: number;
    pets: number;
  };
  pricing: {
    nightlyRate: number;
    nightsTotal: number;
    cleaningFee: number;
    serviceFee: number;
    taxes: number;
    totalPrice: number;
  };
  status: 'upcoming' | 'past' | 'cancelled';
  createdAt: string;
  confirmationCode: string;
  paymentMethod: {
    type: 'card' | 'upi' | 'netbanking';
    lastFour?: string;
  };
}

export interface WishlistCollection {
  id: string;
  name: string;
  propertyIds: string[];
  coverImage?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isHost: boolean;
  attachments?: string[];
}

export interface Conversation {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  host: Host;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar: string;
  bio?: string;
  joinedYear: number;
  joinedDate?: string;
  isHost: boolean;
  isSuperhost?: boolean;
  identityVerified: boolean;
  tripsCount: number;
  reviewsCount: number;
}

export interface FilterState {
  category?: string;
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  adults?: number;
  children?: number;
  infants?: number;
  pets?: number;
  minPrice?: number;
  maxPrice?: number;
  types?: string[];
  bedrooms?: number | 'any';
  beds?: number | 'any';
  bathrooms?: number | 'any';
  amenities?: string[];
  isGuestFavorite?: boolean;
  isSuperhost?: boolean;
  instantBook?: boolean;
  selfCheckIn?: boolean;
  sortBy?: 'recommended' | 'rating' | 'price_low' | 'price_high';
}

export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP';
