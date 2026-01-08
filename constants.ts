
import { Template, LibraryTrack } from './types';

export const TEMPLATES: Template[] = [
  { id: 'forever-loved', name: 'Forever Loved', description: 'Soft transitions and centered text for a timeless tribute.', previewColor: 'bg-stone-100' },
  { id: 'pawprints', name: 'Pawprints in Our Hearts', description: 'Warm tones and gentle cross-dissolves for comfort.', previewColor: 'bg-amber-50' },
  { id: 'rainbow', name: 'Rainbow Bridge', description: 'A peaceful journey through light and color for a hopeful farewell.', previewColor: 'bg-blue-50' },
  { id: 'life-well-lived', name: 'A Life Well Lived', description: 'Chronological storytelling ideal for long, full lives.', previewColor: 'bg-emerald-50' },
  { id: 'gentle-goodbye', name: 'Gentle Goodbye', description: 'Quiet, minimal aesthetic for soft reflection and silence.', previewColor: 'bg-stone-50' },
  { id: 'always-side', name: 'Always by Your Side', description: 'Focus on companionship and close-up, intimate moments.', previewColor: 'bg-neutral-50' },
  { id: 'cherished-memories', name: 'Cherished Memories', description: 'Classic album style with elegant, serif typography.', previewColor: 'bg-rose-50' },
  { id: 'until-meet-again', name: 'Until We Meet Again', description: 'Hopeful, uplifting pacing and light-filled transitions.', previewColor: 'bg-sky-50' },
  { id: 'peaceful-rest', name: 'Peaceful Rest', description: 'Muted colors and slow, dignified transitions for a quiet tribute.', previewColor: 'bg-slate-100' },
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
    features: [
      'Watermark-free memorial video',
      'Upload your own music or choose an instrumental',
      'Delivery within 24 hours',
      'Private download link'
    ]
  },
  premium: {
    name: 'Premium Memorial',
    price: 69,
    delivery: '12 hours',
    quality: 'HD (1080p)',
    features: [
      'HD export (1080p)',
      'More instrumental options',
      'Priority render queue',
      'Delivery within 12 hours',
      'Private download link'
    ]
  },
  rush: {
    name: 'Rush Service',
    price: 89,
    delivery: '1 hour',
    quality: 'HD (1080p)',
    features: [
      '1-hour delivery',
      'Highest priority queue',
      'HD export (1080p)',
      'Private download link'
    ]
  }
};
