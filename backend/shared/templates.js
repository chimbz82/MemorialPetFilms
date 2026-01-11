// Template definitions
export const templates = {
  'rainbow-bridge': {
    id: 'rainbow-bridge',
    name: 'Rainbow Bridge',
    description: 'A peaceful memorial with rainbow theme',
    supportedMedia: ['photos', 'videos'],
    maxDuration: 180
  },
  'pawprints': {
    id: 'pawprints',
    name: 'Paw Prints',
    description: 'Gentle paw print transitions',
    supportedMedia: ['photos'],
    maxDuration: 120
  },
  'garden': {
    id: 'garden',
    name: 'Garden Memorial',
    description: 'Natural garden setting',
    supportedMedia: ['photos', 'videos'],
    maxDuration: 180
  },
  'sunset': {
    id: 'sunset',
    name: 'Sunset Memories',
    description: 'Warm sunset backdrop',
    supportedMedia: ['photos'],
    maxDuration: 150
  },
  'stars': {
    id: 'stars',
    name: 'Among the Stars',
    description: 'Celestial theme memorial',
    supportedMedia: ['photos', 'videos'],
    maxDuration: 180
  },
  'heartbeat': {
    id: 'heartbeat',
    name: 'Heartbeat',
    description: 'Rhythmic heartbeat theme',
    supportedMedia: ['photos', 'videos'],
    maxDuration: 120
  },
  'seasons': {
    id: 'seasons',
    name: 'Four Seasons',
    description: 'Seasonal transitions',
    supportedMedia: ['photos'],
    maxDuration: 180
  },
  'classic': {
    id: 'classic',
    name: 'Classic Memorial',
    description: 'Timeless and elegant',
    supportedMedia: ['photos', 'videos'],
    maxDuration: 150
  },
  'modern': {
    id: 'modern',
    name: 'Modern Tribute',
    description: 'Contemporary design',
    supportedMedia: ['photos', 'videos'],
    maxDuration: 180
  }
};

// Validation functions
export function validateTemplate(templateId) {
  return templates[templateId] || null;
}

export function validateLibraryTrack(trackId) {
  const validTracks = [
    'peaceful-morning',
    'gentle-goodbye',
    'forever-friend',
    'rainbow-memories',
    'paws-of-time',
    'eternal-love',
    'moonlight-serenade',
    'garden-dreams',
    'stars-above',
    'heartstrings'
  ];
  return validTracks.includes(trackId);
}
