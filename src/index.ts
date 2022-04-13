import { getLocations } from './modules/get-locations.js';
import { getMetadata } from './modules/get-metadata.js';
import { getObservations } from './modules/get-observations.js';


import helper from 'jeroentvb-helper';
import { ObservationRequestData } from '@interfaces';

const rwsApi = {
   getLocations,
   getMetadata,
   getObservations,
};

(async () => {
   const requestObj: ObservationRequestData = {
      variables: {
         compartiment: 'LT',
      },
      location: {
         code: 'BERK',
         coordinates: {
            x: 633877.337865742,
            y: 5834359.52893178
         }
      },
      period: {
         start: '2021-03-01T00:00:00.000+01:00',
         end: '2021-03-01T01:00:00.000+01:00',
      },
   };

   const data = await rwsApi.getObservations(requestObj);
   helper.export.json('observations', data);
   console.log(data);
})();

export default rwsApi;
