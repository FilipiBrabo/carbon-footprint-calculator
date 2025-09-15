import type z from "zod";
import type { housingEnergySchema } from "@/schemas/housing-energy";
import type { travelSchema } from "@/schemas/travel";
import { calculateHousingEnergyFootprint } from "./categories/housing-energy";
import { calculateTravelFootprint } from "./categories/travel";
import type { EMISSION_FACTORS } from "./emission-factors";

// TODO: for some reason the `inferRouterInputs` is considering the z.input instead of the z.output
// So we can't use the RouterInput type here.
type CalculatorInput = {
  housingEnergy: z.output<typeof housingEnergySchema>;
  travel: z.output<typeof travelSchema>;
};

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
