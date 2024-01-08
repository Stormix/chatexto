import { THRESHOLDS } from '../config';

const MAX_DISTANCE = THRESHOLDS[THRESHOLDS.length - 1];

/**
 * Converts similarity to a distance
 *
 * // Similarity = 1 -> Distance = 0
 * // Similarity = 0 -> Distance = 1500
 * @param similarity
 * @returns
 */
export const similarityToDistance = (similarity: string) => {
  const similarityFloat = parseFloat(similarity);
  return Math.round(1500 - similarityFloat * 1500); // TODO: fine tune this
};

/**
 * Map distance to a score
 * Huge distances should be penalized more
 * Shorter distances should be rewarded more
 *
 * Score is from 0 to 100.
 *
 * @param distance
 */
export const distanceToScore = (distance: number) => {
  // TODO: fine tune this
  if (distance === 0) return 100;
  else if (distance <= THRESHOLDS[0]) return (distance / THRESHOLDS[0]) * 50 + 50;
  else if (distance <= THRESHOLDS[1]) return (distance / THRESHOLDS[1]) * 25 + 25;
  else return 0;
};
