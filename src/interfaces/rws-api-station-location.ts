export interface RwsApiStationLocation {
   Locatie_MessageID: number;
   Coordinatenstelsel: '25831';
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
