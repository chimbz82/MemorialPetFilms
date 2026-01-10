import { Template, LibraryTrack } from './types';

export const TEMPLATES: Template[] = [
  { 
    id: 'forever-loved', 
    name: 'Forever Loved', 
    description: 'Soft fades with centred opening text and balanced pacing for a timeless tribute.', 
    longDescription: 'A classic arrangement featuring slow, elegant fades and centred serif typography. Ideal for a traditional and dignified memorial that focuses on the weight of a lifetime of love.',
    previewColor: 'bg-stone-100' 
  },
  { 
    id: 'pawprints-hearts', 
    name: 'Pawprints in Our Hearts', 
    description: 'Gentle cross-dissolves with warm tones and bottom-third text for comfort.', 
    longDescription: 'Infused with warm sepia tones and golden light, this template uses soft cross-dissolves to create a feeling of cosy, cherished memories and enduring warmth.',
    previewColor: 'bg-amber-50' 
  },
  { 
    id: 'rainbow-bridge', 
    name: 'Rainbow Bridge', 
    description: 'Light glow transitions with subtle gradients and a heartfelt farewell message.', 
    longDescription: 'An uplifting style that utilises light-leak transitions and airy, bright visuals. Perfect for celebrating the transition to peace and the hope of meeting again.',
    previewColor: 'bg-blue-50' 
  },
  { 
    id: 'life-well-lived', 
    name: 'A Life Well Lived', 
    description: 'Chronological flow with clean slide transitions and story-driven pacing.', 
    longDescription: 'This template focuses on the journey. It uses structured slide transitions to help tell a chronological story of growth, companionship, and a life fully lived.',
    previewColor: 'bg-emerald-50' 
  },
  { 
    id: 'gentle-goodbye', 
    name: 'Gentle Goodbye', 
    description: 'Slow fade to white transitions with minimal text for quiet reflection.', 
    longDescription: 'A minimalist masterpiece. With thin typography and generous white space, it offers a quiet, contemplative experience that allows the photos to speak for themselves.',
    previewColor: 'bg-stone-50' 
  },
  { 
    id: 'always-by-side', 
    name: 'Always by Your Side', 
    description: 'Subtle Ken Burns effect with side-aligned text emphasising companionship.', 
    longDescription: 'Utilising subtle Ken Burns (zoom) effects, this style draws the viewer into the details of your companion’s expressions, perfect for highlighting their unique personality.',
    previewColor: 'bg-neutral-50' 
  },
  { 
    id: 'cherished-memories', 
    name: 'Cherished Memories', 
    description: 'Album-style presentation with consistent timing and simple title cards.', 
    longDescription: 'Modelled after a premium physical photo album, this style uses frame overlays and book-like transitions to create a tangible feeling of a family heirloom.',
    previewColor: 'bg-rose-50' 
  },
  { 
    id: 'until-meet-again', 
    name: 'Until We Meet Again', 
    description: 'Opening dedication and closing message for ceremonial sharing.', 
    longDescription: 'A spiritual and airy style featuring high-key lighting and ethereal transitions that celebrate the spiritual bond that outlasts physical presence.',
    previewColor: 'bg-sky-50' 
  },
  { 
    id: 'peaceful-rest', 
    name: 'Peaceful Rest', 
    description: 'Muted colours with longest durations and minimal motion for the most subdued tribute.', 
    longDescription: 'The most subdued of our styles. It uses a desaturated palette and the longest transition durations to provide a deeply respectful and quiet ceremonial atmosphere.',
    previewColor: 'bg-slate-100' 
  },
];

export const LIBRARY_TRACKS: LibraryTrack[] = [
  { id: 'gentle-piano-01', title: 'Gentle Piano', duration: '3:00' },
  { id: 'soft-strings-01', title: 'Soft Strings', duration: '3:15' },
  { id: 'peaceful-acoustic-01', title: 'Peaceful Acoustic', duration: '3:30' },
  { id: 'calm-ambient-01', title: 'Calm Ambient', duration: '4:00' },
  { id: 'serene-harp-01', title: 'Serene Harp', duration: '2:45' },
  { id: 'quiet-reflection-01', title: 'Quiet Reflection', duration: '3:40' },
  { id: 'peaceful-morning-01', title: 'Peaceful Morning', duration: '3:05' },
  { id: 'tender-moments-01', title: 'Tender Moments', duration: '3:25' },
  { id: 'warm-memories-01', title: 'Warm Memories', duration: '3:10' },
  { id: 'gentle-breeze-01', title: 'Gentle Breeze', duration: '2:55' },
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