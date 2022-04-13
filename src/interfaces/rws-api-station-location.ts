export interface RwsApiStationLocation {
   Locatie_MessageID: number;
   Coordinatenstelsel: string;
   X: number;
   Y: number;
   Naam: string;
   Code: string;
}

export interface RwsApiParsedStationLocation {
   id: number;
   coordinates: {
      x: number;
      y: number
   };
   name: string;
   code: string;
}
