
import { Template, LibraryTrack } from './types';

export const TEMPLATES: Template[] = [
  { 
    id: 'forever-loved', 
    name: 'Forever Loved', 
    description: 'Soft transitions and centered text for a timeless tribute.', 
    longDescription: 'A classic arrangement featuring slow, elegant fades and centered serif typography. Ideal for a traditional and dignified memorial that focuses on the weight of a lifetime of love.',
    previewColor: 'bg-stone-100' 
  },
  { 
    id: 'pawprints', 
    name: 'Pawprints in Our Hearts', 
    description: 'Warm tones and gentle cross-dissolves for comfort.', 
    longDescription: 'Infused with warm sepia tones and golden light, this template uses soft cross-dissolves to create a feeling of cozy, cherished memories and enduring warmth.',
    previewColor: 'bg-amber-50' 
  },
  { 
    id: 'rainbow', 
    name: 'Rainbow Bridge', 
    description: 'A peaceful journey through light for a hopeful farewell.', 
    longDescription: 'An uplifting style that utilizes light-leak transitions and airy, bright visuals. Perfect for celebrating the transition to peace and the hope of meeting again.',
    previewColor: 'bg-blue-50' 
  },
  { 
    id: 'life-well-lived', 
    name: 'A Life Well Lived', 
    description: 'Chronological storytelling ideal for long, full lives.', 
    longDescription: 'This template focuses on the journey. It uses structured slide transitions to help tell a chronological story of growth, companionship, and a life fully lived.',
    previewColor: 'bg-emerald-50' 
  },
  { 
    id: 'gentle-goodbye', 
    name: 'Gentle Goodbye', 
    description: 'Quiet, minimal aesthetic for soft reflection.', 
    longDescription: 'A minimalist masterpiece. With thin typography and generous white space, it offers a quiet, contemplative experience that allows the photos to speak for themselves.',
    previewColor: 'bg-stone-50' 
  },
  { 
    id: 'always-side', 
    name: 'Always by Your Side', 
    description: 'Focus on companionship and intimate moments.', 
    longDescription: 'Utilizing subtle Ken Burns (zoom) effects, this style draws the viewer into the details of your companion’s expressions, perfect for highlighting their unique personality.',
    previewColor: 'bg-neutral-50' 
  },
  { 
    id: 'cherished-memories', 
    name: 'Cherished Memories', 
    description: 'Classic album style with elegant typography.', 
    longDescription: 'Modeled after a premium physical photo album, this style uses frame overlays and book-like transitions to create a tangible feeling of a family heirloom.',
    previewColor: 'bg-rose-50' 
  },
  { 
    id: 'until-meet-again', 
    name: 'Until We Meet Again', 
    description: 'Hopeful, uplifting pacing and light-filled transitions.', 
    longDescription: 'A spiritual and airy style featuring high-key lighting and ethereal transitions that celebrate the spiritual bond that outlasts physical presence.',
    previewColor: 'bg-sky-50' 
  },
  { 
    id: 'peaceful-rest', 
    name: 'Peaceful Rest', 
    description: 'Muted colors and slow transitions for a quiet tribute.', 
    longDescription: 'The most subdued of our styles. It uses a desaturated palette and the longest transition durations to provide a deeply respectful and quiet ceremonial atmosphere.',
    previewColor: 'bg-slate-100' 
  },
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
