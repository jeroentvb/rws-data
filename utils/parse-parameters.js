const data = require('../docs/parameters.json')
const helper = require('jeroentvb-helper')

const parameters = data.AquoMetadataLijst.map(parameter => {
  return {
    naam: parameter.Parameter_Wat_Omschrijving,
    omschrijving: parameter.Grootheid.Omschrijving,
    Grootheid: parameter.Grootheid.Code
  }
})

helper.export.json('parsed-parameters', parameters)
