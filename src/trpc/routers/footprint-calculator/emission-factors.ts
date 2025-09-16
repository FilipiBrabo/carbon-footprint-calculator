// Emission factors: all values are kgCO2e per input unit
// Note: This values were scraped using AI from:
//  - https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator-calculations-and-references/
//  - https://shrinkthatfootprint.com/calculate-your-carbon-footprint/
export const EMISSION_FACTORS = {
  electricity: {
    kWh: 0.388,
  },
  naturalGas: {
    therm: 5.311,
    mmBtu: 53.11,
  },
  fuelOil: {
    gallon: 10.21,
    litre: 2.7,
  },
  lpg: {
    gallon: 5.72,
    litre: 1.51,
  },
  waste: {
    pounds: 0.045,
    tons: 90,
  },
  water: {
    gallon: 0.003785,
    hcf: 2.833,
  },
  car: {
    km: 0.499,
    miles: 0.803,
  },
  bus: {
    km: 0.105,
    miles: 0.169,
  },
  metro: {
    km: 0.065,
    miles: 0.105,
  },
  rail: {
    km: 0.041,
    miles: 0.066,
  },
  flight: {
    km: 0.156,
    miles: 0.251,
  },
};
