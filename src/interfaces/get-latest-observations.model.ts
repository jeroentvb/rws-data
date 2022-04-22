import type { ObservationRequestStationLocation, ObservationVariables, ObservationsReponse } from './get-observations.model.js';
import { RwsApiResponseSuccess } from './rws-api-response.model.js';

export type LatestObservationRequestDataVariables = Pick<ObservationVariables, 'compartiment' | 'eenheid' | 'grootheid'>;

export interface LatestObservationRequestData {
   variables: LatestObservationRequestDataVariables | LatestObservationRequestDataVariables[];
   locations: ObservationRequestStationLocation | ObservationRequestStationLocation[];
}

export interface LatestObservationResponse extends RwsApiResponseSuccess {
   WaarnemingenLijst: ObservationsReponse[];
}
