// import fetch from 'node-fetch';
// import { createRequestObject } from './modules/request-object';

// import { API_URL } from './constants';

// import { Location, Period } from './interfaces';
import { getLocations } from './modules/get-locations.js';


// async function observations(
//    variables: string | string[],
//    location: Location,
//    period: Period
// ) {
//    try {
//       const options = createRequestObject(variables, location, period);
//       const res = await fetch(API_URL, options);
//       const data = await res.json();

//       return data;
//    } catch (err) {
//       return err;
//    }
// }

// export {
//    observations
// };

(async () => {
   const data = await getLocations();
   console.log(data);
})();
