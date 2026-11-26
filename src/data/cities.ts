import { City } from '../types';

// Sample trips shown on first visit. Cities you add or delete are saved in localStorage.
export const sampleCities: City[] = [
  {
    id: 1,
    cityName: 'Lisbon',
    country: 'Portugal',
    emoji: '🇵🇹',
    date: '2024-10-31T15:59:59.138Z',
    notes: 'My favorite city so far!',
    position: { lat: 38.727881642324164, lng: -9.140900099907554 },
  },
  {
    id: 2,
    cityName: 'Madrid',
    country: 'Spain',
    emoji: '🇪🇸',
    date: '2025-07-15T08:22:53.976Z',
    notes: '',
    position: { lat: 40.46635901755316, lng: -3.7133789062500004 },
  },
  {
    id: 3,
    cityName: 'Berlin',
    country: 'Germany',
    emoji: '🇩🇪',
    date: '2025-02-12T09:24:11.863Z',
    notes: 'Amazing 😃',
    position: { lat: 52.53586782505711, lng: 13.376933665713324 },
  },
  {
    id: 4,
    cityName: 'Cairo',
    country: 'Egypt',
    emoji: '🇪🇬',
    date: '2025-12-01T10:00:00.000Z',
    notes: 'Home sweet home',
    position: { lat: 30.0444, lng: 31.2357 },
  },
];
