import type { ObservationRequestStationLocation, ObservationVariables, ObservationsReponse } from './get-observations.model';
import { RwsApiResponseSuccess } from './rws-api-response.model';

export type LatestObservationRequestDataVariables = Pick<ObservationVariables, 'compartiment' | 'eenheid' | 'grootheid'>;

export interface LatestObservationRequestData {
   variables: LatestObservationRequestDataVariables | LatestObservationRequestDataVariables[];
   locations: ObservationRequestStationLocation | ObservationRequestStationLocation[];
}

export interface LatestObservationResponse extends RwsApiResponseSuccess {
   WaarnemingenLijst: ObservationsReponse[];
}
