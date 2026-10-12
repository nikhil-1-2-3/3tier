import crypto from 'crypto';

/**
 * Generates a memorable, unique booking reference string like LW-BK-73921
 */
export function generateBookingReference() {
  const randomSuffix = crypto.randomInt(10000, 99999);
  return `LW-BK-${randomSuffix}`;
}
