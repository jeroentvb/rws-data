import { METADATA_SERVICE_URL } from '../constants/urls.js';
import { makeJsonRequest } from '../utils/json-request.js';
import type { RwsApiResponseSuccess } from '../interfaces/rws-api-response.model.js';
import type { RwsApiMetadata, RwsApiMetadataParsed, RwsApiMetadataResponse } from '../interfaces/rws-api-metadata.model.js';
import { parseMetadata } from '../utils/parse-metadata.js';

interface CatalogusResponse extends RwsApiResponseSuccess {
   AquoMetadataLijst: RwsApiMetadata[];
}

export async function getMetadata(): Promise<RwsApiMetadataParsed[]>
export async function getMetadata(rawData: true): Promise<RwsApiMetadataResponse>
export async function getMetadata(rawData = false) {
   const data: CatalogusResponse = await makeJsonRequest(METADATA_SERVICE_URL, {
      CatalogusFilter: {
         Grootheden: true,
         Parameters: true,
         Compartimenten: true,
         Hoedanigheden: true,
         Eenheden: true,
         MeetApparaten: true,

         // Don't know what these are useful for. Not used when fetching observation data.
         // BemonsteringsApparaten: false,
         // BemonsteringsMethoden: false,
         // BemonsteringsSoorten: false,
         // BioTaxon: false,
         // BioTaxon_Compartimenten: false,
         // MonsterBewerkingsMethoden: false,
         // Organen: false,
         // PlaatsBepalingsApparaten: false,
         // Typeringen: false,
         // WaardeBepalingstechnieken: false,
         // WaardeBepalingsmethoden: false,
         // WaardeBewerkingsmethoden: false,
      }
   });

   return rawData ? data : data.AquoMetadataLijst.map(parseMetadata);
}
