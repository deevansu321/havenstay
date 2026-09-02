/**
 * Calculate the great-circle distance between two coordinates using the Haversine formula (in kilometers)
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export function formatDistanceString(distanceKm: number): string {
  if (distanceKm < 5) return 'Within 5 km of you';
  if (distanceKm < 100) return `${distanceKm} km away · ~${Math.round(distanceKm / 40 * 60)} min drive`;
  if (distanceKm < 500) return `${distanceKm} km away · ~${(distanceKm / 60).toFixed(1)} hrs road trip`;
  return `${distanceKm.toLocaleString('en-IN')} km away · Short flight`;
}
