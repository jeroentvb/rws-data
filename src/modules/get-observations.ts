import type { RwsApiParsedStationLocation } from '../interfaces/rws-api-station-location.js';
import { OBSERVATIONS_URL } from '../constants/urls.js';
import { makeJsonRequest } from '../utils/json-request.js';
import { ObservationPeriod } from '../interfaces/observation-period.model.js';

export type ObservationRequestStationLocation = Pick<RwsApiParsedStationLocation, 'coordinates' | 'code'>;
export interface ObservationRequestData {
   location: ObservationRequestStationLocation;
   /** Needs to be in ISO string format */
   period: ObservationPeriod;
}

export async function getObservations({ location, period }: ObservationRequestData, rawData = false) {
   const data = await makeJsonRequest(OBSERVATIONS_URL, {
      AquoPlusWaarnemingMetadata: {
         AquoMetadata: {
            // TODO create request to get all 'codes' for this request
            'Grootheid': { 'Code':'WINDSHD' }
         }
      },
      Locatie: {
         X: location.coordinates.x,
         Y: location.coordinates.y,
         Code: location.code,
      },
      Periode: {
         Begindatumtijd: period.start,
         Einddatumtijd: period.end,
      }
   });

   return rawData ? data : parseObservations(data);
}

function parseObservations(data: any) {
   return data;
}
