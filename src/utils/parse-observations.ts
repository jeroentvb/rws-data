import type { RwsApiObservationsReponse, RwsApiObservationValue } from '@interfaces/get-observations.model';

export function parseRawObservations(observations: RwsApiObservationsReponse['MetingenLijst']): RwsApiObservationValue['observations'] {
   return observations.map((observationData) => ({
      date: observationData.Tijdstip,
      value: observationData.Meetwaarde.Waarde_Numeriek,
   }));
}
