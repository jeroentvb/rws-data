import type { ObservationRequestStationLocation, StationLocation, RawStationLocation } from '../interfaces';

export function parseLocation(location: RawStationLocation): StationLocation {
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

export function parseLocationForRequest(location: ObservationRequestStationLocation): Pick<RawStationLocation, 'Code' | 'X' | 'Y'> {
   return {
      Code: location.code,
      X: location.coordinates.x,
      Y: location.coordinates.y,
   };
}
