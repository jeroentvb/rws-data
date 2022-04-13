import { OBSERVATIONS_URL } from '../constants/urls.js';
import { makeJsonRequest } from '../utils/json-request.js';
import type { ObservationRequestData, RwsApiObservations, RwsApiObservationsReponse, RwsApiObservationValue } from '@interfaces/get-observations.model.js';
import type { RwsApiResponseSuccess } from '@interfaces/rws-api-response.model.js';
import { parseLocation } from '../utils/parse-location.js';
import { parseMetadata } from '../utils/parse-metadata.js';

interface ObservationsResponse extends RwsApiResponseSuccess {
   WaarnemingenLijst: RwsApiObservationsReponse[];
}

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

   return rawData ? data : parseObservations(data.WaarnemingenLijst);
}

function parseObservations(data: RwsApiObservationsReponse[]): RwsApiObservations {
   const values: RwsApiObservationValue[] = data.map((observation) => {
      return {
         metadata: parseMetadata(observation.AquoMetadata),
         observations: observation.MetingenLijst.map((observationData) => ({
            date: observationData.Tijdstip,
            value: observationData.Meetwaarde.Waarde_Numeriek,
         }))
      };
   });

   return {
      location: parseLocation(data[0].Locatie),
      values,
   };
}
