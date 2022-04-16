import { LATEST_OBSERVATIONS_URL } from '../constants/urls.js';
import { makeJsonRequest } from '../utils/json-request.js';
import { parseLocation, parseLocationForRequest } from '../utils/parse-location.js';
import { parseMetadata } from '../utils/parse-metadata.js';
import { parseRawObservations } from '../utils/parse-observations.js';

import type { LatestObservationRequestData, LatestObservationRequestDataVariables, LatestObservationResponse } from '@interfaces/get-latest-observations.model';
import type { RwsApiObservations, RwsApiObservationsReponse } from '@interfaces/get-observations.model.js';

export async function getLatestObservations(requestData: LatestObservationRequestData): Promise<RwsApiObservations[]>
export async function getLatestObservations(requestData: LatestObservationRequestData, rawData: true): Promise<LatestObservationResponse>
export async function getLatestObservations({ variables, locations }: LatestObservationRequestData, rawData = false) {
   const data: LatestObservationResponse = await makeJsonRequest(LATEST_OBSERVATIONS_URL, {
      AquoPlusWaarnemingMetadataLijst: [{
         AquoMetadata: Array.isArray(variables)
            ? variables.map(parseVariablesForRequest)
            : parseVariablesForRequest(variables)
      }],
      LocatieLijst: Array.isArray(locations)
         ? locations.map(parseLocationForRequest)
         : [parseLocationForRequest(locations)],
   });

   return rawData ? data : parseLatestObservations(data.WaarnemingenLijst);
}

function parseVariablesForRequest(variables: LatestObservationRequestDataVariables) {
   return {
      ...(variables.grootheid && { Grootheid: { Code: variables.grootheid } }),
      ...(variables.eenheid && { Eenheid: { Code: variables.eenheid } }),
      ...(variables.compartiment && { Compartiment: { Code: variables.compartiment } }),
   };
}

function parseLatestObservations(data: RwsApiObservationsReponse[]): RwsApiObservations[] {
   function parseValues(observation: RwsApiObservationsReponse) {
      return {
         metadata: parseMetadata(observation.AquoMetadata),
         observations: parseRawObservations(observation.MetingenLijst),
      };
   }

   return data.reduce((final, observation) => {
      const index = final.findIndex(({ location }) => location.code === observation.Locatie.Code);
      if (index === -1) {
         // Add new location
         return [
            ...final,
            {
               location: parseLocation(observation.Locatie),
               values: [parseValues(observation)],
            }
         ];
      } else {
         // Location exists in data
         final[index].values.push(parseValues(observation));

         return final;
      }
   }, [] as RwsApiObservations[]);
}
