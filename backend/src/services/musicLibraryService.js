/**
 * Backend Music Library Service
 * Maps to the tracks available for selection in the frontend
 */

export const LIBRARY_TRACKS = [
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

/**
 * Validates if a track ID exists in our library
 * @param {string} trackId 
 * @returns {boolean}
 */
export function isValidLibraryTrack(trackId) {
  return LIBRARY_TRACKS.some(track => track.id === trackId);
}

/**
 * Gets track details by ID
 * @param {string} trackId 
 * @returns {object|null}
 */
export function getTrackById(trackId) {
  return LIBRARY_TRACKS.find(track => track.id === trackId) || null;
}