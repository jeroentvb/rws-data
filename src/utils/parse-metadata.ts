import { Metadata, MetadataParsed, MetadataValue } from '../interfaces/metadata.model.js';

export function parseMetadata({ AquoMetadata_MessageID, Parameter_Wat_Omschrijving, ...metadataValues }: Metadata): MetadataParsed {
   const dataValues = Object.entries(metadataValues).reduce((metadata, [key, value]: [string, MetadataValue]) => {
      if (value.Code === 'NVT') return metadata;

      return {
         ...metadata,
         [key.toLocaleLowerCase()]: {
            code: value.Code,
            description: value.Omschrijving,
         }
      };
   }, {} as Omit<MetadataParsed, 'id' | 'description'>);

   return {
      id: AquoMetadata_MessageID,
      description: Parameter_Wat_Omschrijving,
      ...dataValues
   };
}