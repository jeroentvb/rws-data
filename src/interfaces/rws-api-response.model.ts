export interface RwsApiResponseSuccess {
   Succesvol: true;
   [key: string]: unknown;
}

export interface RwsApiResponseFail {
   Succesvol: false;
   Foutmelding: string;
}

export type RwsApiResponse = RwsApiResponseSuccess | RwsApiResponseFail;

