import type { ObservationPeriod } from './observation-period.model';
import type { Metadata, MetadataParsed } from './metadata.model';
import { RwsApiResponseSuccess } from './rws-api-response.model';
import type { StationLocation, RawStationLocation } from './station-location';

export interface ObservationVariables {
   grootheid?: string;
   eenheid?: string;
   compartiment?: string;
   hoedanigheid?: string;
   meetapparaat?: string;
   parameter?: string;
}

export type ObservationRequestStationLocation = Pick<StationLocation, 'coordinates' | 'code'>;

export interface ObservationRequestData {
   variables: ObservationVariables;
   location: ObservationRequestStationLocation;
   /** Needs to be in ISO string format */
   period: ObservationPeriod;
}

export interface ObservationsResponse extends RwsApiResponseSuccess {
   WaarnemingenLijst: ObservationsReponse[];
}

/**
 * Raw observations data
 */
export interface ObservationsReponse {
   Locatie: RawStationLocation;
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
   AquoMetadata: Metadata;
}

/**
 * Parsed observation data
 */
export interface Observations {
   location: StationLocation;
   values: ObservationValue[]
}

export interface ObservationValue {
   metadata: MetadataParsed;
   observations: {
      date: string;
      value: number;
   }[]
}
