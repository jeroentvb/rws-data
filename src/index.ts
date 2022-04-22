export { getLocations } from './modules/get-locations.js';
export { getMetadata } from './modules/get-metadata.js';
export { getObservations } from './modules/get-observations.js';
export { getLatestObservations } from './modules/get-latest-observations.js';

export * from './interfaces/index.js';

import { getLocations } from './modules/get-locations.js';
import { getMetadata } from './modules/get-metadata.js';
import { getObservations } from './modules/get-observations.js';
import { getLatestObservations } from './modules/get-latest-observations.js';

export default {
   getLocations,
   getMetadata,
   getObservations,
   getLatestObservations,
};
