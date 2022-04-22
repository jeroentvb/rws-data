import type { MetadataResponse } from '../interfaces/metadata.model.js';
import { parseLocation } from '../utils/parse-location.js';
import { METADATA_SERVICE_URL } from '../constants/urls.js';
import type { StationLocation } from '../interfaces/station-location';
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

export async function getLocations(): Promise<StationLocation[]>
export async function getLocations(rawData: true): Promise<MetadataResponse>
export async function getLocations(rawData = false) {
   const data: MetadataResponse = await makeJsonRequest(METADATA_SERVICE_URL, LOCATIONS_REQUEST_BODY);

   return rawData ? data : data.LocatieLijst.map(parseLocation);
}
