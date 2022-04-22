import type { ObservationsReponse, ObservationValue } from '../interfaces';

export function parseRawObservations(observations: ObservationsReponse['MetingenLijst']): ObservationValue['observations'] {
   return observations.map((observationData) => ({
      date: observationData.Tijdstip,
      value: observationData.Meetwaarde.Waarde_Numeriek,
   }));
}
