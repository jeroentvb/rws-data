import { RwsApiMetadata, RwsApiMetadataParsed, RwsApiMetadataValue } from '../interfaces/rws-api-metadata.model';

export function parseMetadata({ AquoMetadata_MessageID, Parameter_Wat_Omschrijving, ...metadataValues }: RwsApiMetadata): RwsApiMetadataParsed {
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
}