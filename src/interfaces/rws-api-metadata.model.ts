import { RwsApiResponseSuccess } from './rws-api-response.model';
import { RwsApiStationLocation } from './rws-api-station-location';

/**
 * Api response interface
 */
export interface RwsApiMetadataResponse extends RwsApiResponseSuccess {
   AquoMetadataLijst: RwsApiMetadata[];
   LocatieLijst: RwsApiStationLocation[];
}

/**
 * Raw data interfaces
 */
export interface RwsApiMetadata {
   AquoMetadata_MessageID: number;
   Parameter_Wat_Omschrijving: string;
   Compartiment: RwsApiMetadataValue;
   Eenheid: RwsApiMetadataValue;
   Grootheid: RwsApiMetadataValue;
   Hoedanigheid: RwsApiMetadataValue;
   MeetApparaat: RwsApiMetadataValue;
   Parameter: RwsApiMetadataValue;
}

export interface RwsApiMetadataValue {
   Code: string;
   Omschrijving: string;
}

/**
 * Parsed data interfaces
 */
export interface RwsApiMetadataParsed {
   id: number;
   description: string;
   compartiment: RwsApiMetadataValueParsed;
   eenheid: RwsApiMetadataValueParsed;
   grootheid: RwsApiMetadataValueParsed;
   hoedanigheid?: RwsApiMetadataValueParsed;
   meetApparaat?: RwsApiMetadataValueParsed;
   parameter?: RwsApiMetadataValueParsed;
}

export interface RwsApiMetadataValueParsed {
   code: string;
   description: string;
}
