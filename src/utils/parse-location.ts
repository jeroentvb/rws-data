import type { RwsApiParsedStationLocation, RwsApiStationLocation } from '@interfaces/rws-api-station-location';

export function parseLocation(location: RwsApiStationLocation): RwsApiParsedStationLocation {
   return {
      id: location.Locatie_MessageID,
      coordinates: {
         x: location.X,
         y: location.Y,
      },
      name: location.Naam,
      code: location.Code
   };
}
