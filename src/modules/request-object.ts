// import { RequestInit, BodyInit } from 'node-fetch';
// import { Location, Period } from '../interfaces';

// function createRequestBody(variables: string | string[], location: Location, period: Period): BodyInit {
//    return JSON.stringify({
//       'AquoPlusWaarnemingMetadata': {
//          'AquoMetadata':{
//             'Grootheid': parseVariables(variables)
//          }
//       },
//       'Locatie':{
//          'X': location.x,
//          'Y': location.y,
//          'Code': location.code
//       },
//       'Periode':{
//          'Begindatumtijd': period.start,
//          'Einddatumtijd': period.end
//       }
//    });
// }

// function parseVariables(variables: string | string[]) {
//    if (Array.isArray(variables)) {
//       return variables.map(variable => {
//          return { 'Code': variable };
//       });
//    } else {
//       return { 'Code': variables };
//    }
// }

// export function createRequestObject(variables: string | string[], location: Location, period: Period): RequestInit {
//    return {
//       method: 'POST',
//       headers: {
//          'Content-Type': 'application/json'
//       },
//       body: createRequestBody(variables, location, period)
//    };
// }