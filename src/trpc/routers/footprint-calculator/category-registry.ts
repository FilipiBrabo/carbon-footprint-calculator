import type { RouterInput } from "../_app";
import { calculateHousingEnergyFootprint } from "./categories/housing-energy";
import { calculateTravelFootprint } from "./categories/travel";
import type { EMISSION_FACTORS } from "./emission-factors";

type CalculatorInput = RouterInput["footprintCalculator"]["calculate"];

export type CategoryFootprintResult = {
  totalKgCO2e: number;
  bySubcategory: Record<string, number>;
};

type CategoryCalculatorMap = {
  [K in keyof CalculatorInput]: (
    input: NonNullable<CalculatorInput[K]>,
    emissionFactors: typeof EMISSION_FACTORS,
  ) => CategoryFootprintResult;
};

export const CATEGORY_REGISTRY: CategoryCalculatorMap = {
  housingEnergy: calculateHousingEnergyFootprint,
  travel: calculateTravelFootprint,
};
