export const TEMPLATES = {
  'forever-loved': {
    id: 'forever-loved',
    name: 'Forever Loved',
    photoDuration: 5,
    transitionDuration: 1.5,
    kenBurns: false
  },
  'pawprints-hearts': {
    id: 'pawprints-hearts',
    name: 'Pawprints in Our Hearts',
    photoDuration: 5,
    transitionDuration: 2.0,
    kenBurns: false
  },
  'rainbow-bridge': {
    id: 'rainbow-bridge',
    name: 'Rainbow Bridge',
    photoDuration: 5,
    transitionDuration: 1.8,
    kenBurns: true
  },
  'life-well-lived': {
    id: 'life-well-lived',
    name: 'A Life Well Lived',
    photoDuration: 5,
    transitionDuration: 1.2,
    kenBurns: false
  },
  'gentle-goodbye': {
    id: 'gentle-goodbye',
    name: 'Gentle Goodbye',
    photoDuration: 5,
    transitionDuration: 2.5,
    kenBurns: false
  },
  'always-by-side': {
    id: 'always-by-side',
    name: 'Always by Your Side',
    photoDuration: 5,
    transitionDuration: 1.5,
    kenBurns: true
  },
  'cherished-memories': {
    id: 'cherished-memories',
    name: 'Cherished Memories',
    photoDuration: 5,
    transitionDuration: 1.8,
    kenBurns: false
  },
  'until-meet-again': {
    id: 'until-meet-again',
    name: 'Until We Meet Again',
    photoDuration: 5,
    transitionDuration: 1.5,
    kenBurns: true
  },
  'peaceful-rest': {
    id: 'peaceful-rest',
    name: 'Peaceful Rest',
    photoDuration: 5,
    transitionDuration: 3.0,
    kenBurns: false
  }
};

export const LIBRARY_TRACKS = [
  { id: 'gentle-piano-01', filename: 'gentle-piano.mp3', duration: 180 },
  { id: 'soft-strings-01', filename: 'soft-strings.mp3', duration: 195 },
  { id: 'peaceful-acoustic-01', filename: 'peaceful-acoustic.mp3', duration: 210 },
  { id: 'calm-ambient-01', filename: 'calm-ambient.mp3', duration: 240 },
  { id: 'serene-harp-01', filename: 'serene-harp.mp3', duration: 165 },
  { id: 'quiet-reflection-01', filename: 'quiet-reflection.mp3', duration: 220 },
  { id: 'peaceful-morning-01', filename: 'peaceful-morning.mp3', duration: 185 },
  { id: 'tender-moments-01', filename: 'tender-moments.mp3', duration: 205 },
  { id: 'warm-memories-01', filename: 'warm-memories.mp3', duration: 190 },
  { id: 'gentle-breeze-01', filename: 'gentle-breeze.mp3', duration: 175 }
];

export function validateTemplate(templateId) {
  return TEMPLATES.hasOwnProperty(templateId);
}

export function getTemplate(templateId) {
  return TEMPLATES[templateId] || TEMPLATES['forever-loved'];
}

export function validateLibraryTrack(trackId) {
  return LIBRARY_TRACKS.some(t => t.id === trackId);
}

export function getLibraryTrack(trackId) {
  return LIBRARY_TRACKS.find(t => t.id === trackId);
}