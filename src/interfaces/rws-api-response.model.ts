import { RwsApiMetadata } from './rws-api-metadata.model.js';
import type { RwsApiStationLocation } from './rws-api-station-location.js';

export interface RwsApiResponseSuccess {
   Succesvol: true;
   [key: string]: unknown;
}

export interface RwsApiResponseFail {
   Succesvol: false;
   Foutmelding: string;
}

export type RwsApiResponse = RwsApiResponseSuccess | RwsApiResponseFail;


export interface RwsApiMetadataResponse extends RwsApiResponseSuccess {
   AquoMetadataLijst: RwsApiMetadata[];
   LocatieLijst: RwsApiStationLocation[];
}
