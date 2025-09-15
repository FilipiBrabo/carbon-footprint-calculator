// Emission factors: all values are kgCO2e per input unit
// The comments are the sources of the values.
// Note: This values were scraped using AI. Not sure if they are accurate.
export const EMISSION_FACTORS = {
  electricity: {
    kWh: 0.388, // https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator-calculations-and-references/
  },
  naturalGas: {
    therm: 5.311, //https://www.epa.gov/system/files/documents/2023-03/ghg_emission_factors_hub.pdf
    mmBtu: 53.11, // https://www.epa.gov/system/files/documents/2023-03/ghg_emission_factors_hub.pdf
  },
  fuelOil: {
    gallon: 10.21, // https://www.epa.gov/system/files/documents/2023-03/ghg_emission_factors_hub.pdf
    litre: 2.7, // https://www.epa.gov/system/files/documents/2023-03/ghg_emission_factors_hub.pdf,
  },
  lpg: {
    gallon: 5.72, // https://www.epa.gov/system/files/documents/2023-03/ghg_emission_factors_hub.pdf
    litre: 1.51, // https://www.epa.gov/system/files/documents/2023-03/ghg_emission_factors_hub.pdf
  },
  waste: {
    pounds: 0.045, // https://shrinkthatfootprint.com/calculate-your-carbon-footprint/
    tons: 90, // https://shrinkthatfootprint.com/calculate-your-carbon-footprint/
  },
  water: {
    gallon: 0.003785, // https://shrinkthatfootprint.com/calculate-your-carbon-footprint/
    hcf: 2.833, // https://shrinkthatfootprint.com/calculate-your-carbon-footprint/
  },
};
