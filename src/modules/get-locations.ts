import { BASE_API_URL } from '../constants/index.js';
import type { RawStationLocationData, StationLocation } from '../interfaces/station-location.model';
import { makeJsonRequest } from '../utils/json-request.js';

interface RawLocationData {
   LocatieLijst: RawStationLocationData[];
   /** See response for all data. */
   [key: string]: unknown;
}

const LOCATIONS_URL = BASE_API_URL + 'METADATASERVICES_DBO/OphalenCatalogus/';
const LOCATIONS_REQUEST_BODY = {
   'CatalogusFilter': {
      'Compartimenten': true,
   }
};

export async function getLocations(): Promise<StationLocation[]>
export async function getLocations(rawData: true): Promise<RawLocationData>
export async function getLocations(rawData = false) {
   const data: RawLocationData= await makeJsonRequest(LOCATIONS_URL, LOCATIONS_REQUEST_BODY);

   return rawData ? data : parseLocations(data.LocatieLijst);
}

function parseLocations(locations: RawStationLocationData[]): StationLocation[] {
   return locations.map(location => ({
      id: location.Locatie_MessageID,
      coordinates: {
         x: location.X,
         y: location.Y,
      },
      name: location.Naam,
      code: location.Code
   }));
}
