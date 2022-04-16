import { OBSERVATIONS_URL } from '../constants/urls.js';
import { makeJsonRequest } from '../utils/json-request.js';
import { parseLocation, parseLocationForRequest } from '../utils/parse-location.js';
import { parseMetadata } from '../utils/parse-metadata.js';
import { parseRawObservations } from '../utils/parse-observations.js';

import type { ObservationRequestData, ObservationsResponse, RwsApiObservations, RwsApiObservationsReponse, RwsApiObservationValue } from '@interfaces/get-observations.model.js';

export async function getObservations(requestData: ObservationRequestData): Promise<RwsApiObservations>
export async function getObservations(requestData: ObservationRequestData, rawData: true): Promise<ObservationsResponse>
export async function getObservations({ location, period, variables }: ObservationRequestData, rawData = false) {
   const data: ObservationsResponse = await makeJsonRequest(OBSERVATIONS_URL, {
      AquoPlusWaarnemingMetadata: {
         AquoMetadata: {
            ...(variables.grootheid && { Grootheid: { Code: variables.grootheid } }),
            ...(variables.eenheid && { Eenheid: { Code: variables.eenheid } }),
            ...(variables.compartiment && { Compartiment: { Code: variables.compartiment } }),
            ...(variables.hoedanigheid && { Hoedanigheid: { Code: variables.hoedanigheid } }),
            ...(variables.meetapparaat && { MeetApparaat: { Code: variables.meetapparaat } }),
            ...(variables.parameter && { Parameter: { Code: variables.parameter } }),
         }
      },
      Locatie: parseLocationForRequest(location),
      Periode: {
         Begindatumtijd: period.start,
         Einddatumtijd: period.end,
      }
   });

   return rawData ? data : parseObservations(data.WaarnemingenLijst);
}

function parseObservations(data: RwsApiObservationsReponse[]): RwsApiObservations {
   const values: RwsApiObservationValue[] = data.map((observation) => {
      return {
         metadata: parseMetadata(observation.AquoMetadata),
         observations: parseRawObservations(observation.MetingenLijst),
      };
   });

   return {
      location: parseLocation(data[0].Locatie),
      values,
   };
}
