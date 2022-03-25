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
