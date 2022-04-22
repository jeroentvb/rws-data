import type { RwsApiMetadataResponse } from '../interfaces/rws-api-metadata.model.js';
import { parseLocation } from '../utils/parse-location.js';
import { METADATA_SERVICE_URL } from '../constants/urls.js';
import type { RwsApiParsedStationLocation } from '../interfaces/rws-api-station-location';
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

   return rawData ? data : data.LocatieLijst.map(parseLocation);
}
