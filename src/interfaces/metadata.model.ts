import { RwsApiResponseSuccess } from './rws-api-response.model';
import { RawStationLocation } from './station-location';

/**
 * Api response interface
 */
export interface MetadataResponse extends RwsApiResponseSuccess {
   AquoMetadataLijst: Metadata[];
   LocatieLijst: RawStationLocation[];
}

/**
 * Raw data interfaces
 */
export interface Metadata {
   AquoMetadata_MessageID: number;
   Parameter_Wat_Omschrijving: string;
   Compartiment: MetadataValue;
   Eenheid: MetadataValue;
   Grootheid: MetadataValue;
   Hoedanigheid: MetadataValue;
   MeetApparaat: MetadataValue;
   Parameter: MetadataValue;
}

export interface MetadataValue {
   Code: string;
   Omschrijving: string;
}

/**
 * Parsed data interfaces
 */
export interface MetadataParsed {
   id: number;
   description: string;
   compartiment: MetadataValueParsed;
   eenheid: MetadataValueParsed;
   grootheid: MetadataValueParsed;
   hoedanigheid?: MetadataValueParsed;
   meetApparaat?: MetadataValueParsed;
   parameter?: MetadataValueParsed;
}

export interface MetadataValueParsed {
   code: string;
   description: string;
}
