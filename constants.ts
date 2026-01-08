
import { Template, LibraryTrack } from './types';

export const TEMPLATES: Template[] = [
  { id: 'forever-loved', name: 'Forever Loved', description: 'Soft fades with centered text and balanced pacing.', previewColor: 'bg-stone-100' },
  { id: 'pawprints', name: 'Pawprints in Our Hearts', description: 'Gentle cross-dissolves with warm, comforting tones.', previewColor: 'bg-amber-50' },
  { id: 'rainbow', name: 'Rainbow Bridge', description: 'Light glow transitions with a heartfelt farewell.', previewColor: 'bg-blue-50' },
  { id: 'life-well-lived', name: 'A Life Well Lived', description: 'Chronological flow with story-driven pacing.', previewColor: 'bg-slate-50' },
  { id: 'gentle-goodbye', name: 'Gentle Goodbye', description: 'Slow fade to white for quiet reflection.', previewColor: 'bg-stone-50' },
  { id: 'always-side', name: 'Always by Your Side', description: 'Subtle zoom emphasizing companionship.', previewColor: 'bg-neutral-50' },
];

export const LIBRARY_TRACKS: LibraryTrack[] = [
  { id: 'gentle-piano', title: 'Gentle Piano', duration: '3:00' },
  { id: 'soft-strings', title: 'Soft Strings', duration: '3:15' },
  { id: 'peaceful-acoustic', title: 'Peaceful Acoustic', duration: '3:30' },
  { id: 'calm-ambient', title: 'Calm Ambient', duration: '4:00' },
  { id: 'serene-harp', title: 'Serene Harp', duration: '2:45' },
];

export const PACKAGES = {
  standard: {
    name: 'Standard Memorial',
    price: 29,
    delivery: '24 hours',
    quality: 'SD (720p)',
    features: ['Up to 30 photos', '3 Music tracks', 'Watermark-free']
  },
  premium: {
    name: 'Premium Memorial',
    price: 69,
    delivery: '12 hours',
    quality: 'HD (1080p)',
    features: ['Up to 30 photos', 'All 10 Music tracks', 'Priority support']
  },
  rush: {
    name: 'Rush Service',
    price: 89,
    delivery: '1 hour',
    quality: 'HD (1080p)',
    features: ['Highest Priority', '1-hour delivery', 'Lifetime storage']
  }
};
