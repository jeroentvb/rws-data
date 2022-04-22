export interface RawStationLocation {
   Locatie_MessageID: number;
   Coordinatenstelsel: string;
   X: number;
   Y: number;
   Naam: string;
   Code: string;
}

export interface StationLocation {
   id: number;
   coordinates: {
      x: number;
      y: number
   };
   name: string;
   code: string;
}
