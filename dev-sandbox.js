const RWS = require('./dist/index')
const helper = require('jeroentvb-helper');

(async () => {
  try {
    const data = await RWS.observations(['WINDSHD', 'WINDSTOOT'], {
      x: 633877.337865742,
      y: 5834359.52893178,
      code: 'BERK'
    }, {
      start: '2020-03-04T07:00:00.000+01:00',
      end: '2020-03-04T09:00:00.000+01:00'
    })

    if (data.Succesvol === false) {
      throw new Error(data.Foutmelding)
    }

    helper.export.json('test', data)
  } catch (err) {
    throw err
  }
})()
