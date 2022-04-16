import type { ObservationPeriod } from './observation-period.model';
import type { RwsApiMetadata, RwsApiMetadataParsed } from './rws-api-metadata.model';
import { RwsApiResponseSuccess } from './rws-api-response.model';
import type { RwsApiParsedStationLocation, RwsApiStationLocation } from './rws-api-station-location';

export interface ObservationVariables {
   grootheid?: string;
   eenheid?: string;
   compartiment?: string;
   hoedanigheid?: string;
   meetapparaat?: string;
   parameter?: string;
}

export type ObservationRequestStationLocation = Pick<RwsApiParsedStationLocation, 'coordinates' | 'code'>;

export interface ObservationRequestData {
   variables: ObservationVariables;
   location: ObservationRequestStationLocation;
   /** Needs to be in ISO string format */
   period: ObservationPeriod;
}

export interface ObservationsResponse extends RwsApiResponseSuccess {
   WaarnemingenLijst: RwsApiObservationsReponse[];
}

/**
 * Raw observations data
 */
export interface RwsApiObservationsReponse {
   Locatie: RwsApiStationLocation;
   MetingenLijst: {
      Tijdstip: string;
      Meetwaarde: {
         Waarde_Numeriek: number;
      }
      WaarnemingMetadata: {
         StatuswaardeLijst: [string];
         BemonsteringshoogteLijst: [string];
         ReferentievlakLijst: [string];
         OpdrachtgevendeInstantieLijst: [string];
         KwaliteitswaardecodeLijst: [string];
      }
   }[];
   /** There are more keys in here */
   AquoMetadata: RwsApiMetadata;
}

/**
 * Parsed observation data
 */
export interface RwsApiObservations {
   location: RwsApiParsedStationLocation;
   values: RwsApiObservationValue[]
}

export interface RwsApiObservationValue {
   metadata: RwsApiMetadataParsed;
   observations: {
      date: string;
      value: number;
   }[]
}
