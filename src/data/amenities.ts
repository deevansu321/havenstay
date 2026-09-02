import { AmenityItem } from '@/lib/types';

export const AMENITIES_LIST: AmenityItem[] = [
  // Essentials
  { id: 'wifi', name: 'High-speed Wi-Fi (500+ Mbps)', icon: 'Wifi', category: 'essentials', description: 'Fast, stable fiber internet for streaming and remote work' },
  { id: 'kitchen', name: 'Chef’s Kitchen', icon: 'UtensilsCrossed', category: 'essentials', description: 'Fully equipped with premium appliances, cookware, and spices' },
  { id: 'workspace', name: 'Dedicated workspace', icon: 'Laptop', category: 'essentials', description: 'Ergonomic chair, monitor, and ample desk space' },
  { id: 'air-conditioning', name: 'Central Air conditioning', icon: 'Wind', category: 'essentials', description: 'Multi-zone climate control throughout the property' },
  { id: 'heating', name: 'Indoor fireplace & Heating', icon: 'Flame', category: 'essentials', description: 'Cozy hearth and underfloor heating system' },
  { id: 'washer', name: 'Washer & Dryer', icon: 'Shirt', category: 'essentials', description: 'In-unit laundry with complimentary organic detergent' },
  { id: 'tv', name: '75" 4K Smart TV with Netflix', icon: 'Tv', category: 'essentials', description: 'Includes Apple TV, Disney+, and Sonos surround sound' },
  { id: 'hair-dryer', name: 'Dyson Hair dryer', icon: 'Sparkles', category: 'essentials' },
  { id: 'iron', name: 'Steam iron & board', icon: 'Check', category: 'essentials' },

  // Features & Luxury
  { id: 'pool', name: 'Private infinity pool', icon: 'Waves', category: 'features', description: 'Heated salt-water pool with sunset ocean panorama' },
  { id: 'hot-tub', name: 'Outdoor Hot tub & Jacuzzi', icon: 'Bath', category: 'features', description: 'Cedar wood hydrotherapy tub with mountain view' },
  { id: 'parking', name: 'Free parking on premises', icon: 'Car', category: 'features', description: 'Private covered garage with space for 3 vehicles' },
  { id: 'ev-charger', name: 'Level 2 EV charger', icon: 'Zap', category: 'features', description: 'Tesla Wall Connector + universal J1772 plug' },
  { id: 'bbq', name: 'Weber BBQ grill & dining', icon: 'Flame', category: 'features', description: 'Outdoor propane grill with stainless prep station' },
  { id: 'gym', name: 'Private fitness room', icon: 'Dumbbell', category: 'features', description: 'Peloton bike, free weights, yoga mats, and resistance bands' },
  { id: 'sauna', name: 'Nordic barrel sauna', icon: 'Thermometer', category: 'features' },

  // Location & Views
  { id: 'beach-access', name: 'Direct beach access', icon: 'Sun', category: 'location', description: 'Private walkway leading directly to white sandy beach' },
  { id: 'waterfront', name: 'Waterfront property', icon: 'Anchor', category: 'location', description: 'Right at the edge of the lake/ocean with private boat dock' },
  { id: 'mountain-view', name: 'Panoramic mountain view', icon: 'Mountain', category: 'location' },
  { id: 'ski-access', name: 'Ski-in / Ski-out access', icon: 'Snowflake', category: 'location' },

  // Safety
  { id: 'smoke-alarm', name: 'Smoke alarm', icon: 'ShieldCheck', category: 'safety' },
  { id: 'carbon-monoxide', name: 'Carbon monoxide alarm', icon: 'ShieldAlert', category: 'safety' },
  { id: 'first-aid', name: 'First aid kit', icon: 'HeartPulse', category: 'safety' },
  { id: 'fire-extinguisher', name: 'Fire extinguisher', icon: 'Flame', category: 'safety' },
  { id: 'security-cameras', name: 'Exterior security cameras', icon: 'Camera', category: 'safety' },
];

export const POPULAR_AMENITY_IDS = [
  'wifi', 'kitchen', 'pool', 'parking', 'air-conditioning', 'workspace', 'hot-tub', 'washer', 'ev-charger', 'bbq', 'beach-access'
];
