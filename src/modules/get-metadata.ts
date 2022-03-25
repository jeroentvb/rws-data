import { METADATA_SERVICE_URL } from '../constants/urls.js';
import { makeJsonRequest } from '../utils/json-request.js';
import type { RwsApiMetadataResponse, RwsApiResponseSuccess } from '../interfaces/rws-api-response.model.js';
import type { RwsApiMetadata, RwsApiMetadataParsed, RwsApiMetadataValue } from '../interfaces/rws-api-metadata.model.js';

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

   return rawData ? data : parseMetadata(data.AquoMetadataLijst);
}

function parseMetadata(metadata: RwsApiMetadata[]): RwsApiMetadataParsed[] {
   return metadata.map(({ AquoMetadata_MessageID, Parameter_Wat_Omschrijving, ...metadataValues }) => {
      const dataValues = Object.entries(metadataValues).reduce((metadata, [key, value]: [string, RwsApiMetadataValue]) => {
         if (value.Code === 'NVT') return metadata;

         return {
            ...metadata,
            [key.toLocaleLowerCase()]: {
               code: value.Code,
               description: value.Omschrijving,
            }
         };
      }, {} as Omit<RwsApiMetadataParsed, 'id' | 'description'>);

      return {
         id: AquoMetadata_MessageID,
         description: Parameter_Wat_Omschrijving,
         ...dataValues
      };
   });
}
