import rwsApi from './dist/index.js';
import helper from 'jeroentvb-helper';
// import { LatestObservationRequestData } from '@interfaces/get-latest-observations.model.js';


(async () => {
   const requestObj: LatestObservationRequestData = {
      variables: {
         compartiment: 'LT',
      },
      locations: [
         {
            code: 'BERK',
            coordinates: {
               x: 633877.337865742,
               y: 5834359.52893178
            }
         },
         {
            'coordinates': {
               'x': 646538.674114683,
               'y': 5833598.51786221
            },
            'code': 'WIJD'
         }
      ],
   };

   const data = await rwsApi.getLatestObservations(requestObj);
   helper.export.json('latest-observations', data);
   console.log(data);
})();