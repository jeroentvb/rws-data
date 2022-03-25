import { RwsApiMetadataResponse } from '../interfaces/rws-api-response.model.js';
import { METADATA_SERVICE_URL } from '../constants/urls.js';
import type { RwsApiStationLocation, RwsApiParsedStationLocation } from '../interfaces/rws-api-station-location';
import { makeJsonRequest } from '../utils/json-request.js';

const LOCATIONS_REQUEST_BODY = {
   CatalogusFilter: {
      Grootheden: true,
      Parameters: true,
      Compartimenten: true,
      Hoedanigheden: true,
      Eenheden: true,
      MeetApparaten: true,
   }
};

export async function getLocations(): Promise<RwsApiParsedStationLocation[]>
export async function getLocations(rawData: true): Promise<RwsApiMetadataResponse>
export async function getLocations(rawData = false) {
   const data: RwsApiMetadataResponse = await makeJsonRequest(METADATA_SERVICE_URL, LOCATIONS_REQUEST_BODY);

   return rawData ? data : parseLocations(data.LocatieLijst);
}

function parseLocations(locations: RwsApiStationLocation[]): RwsApiParsedStationLocation[] {
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
