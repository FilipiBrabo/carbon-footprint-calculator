import { calculateHousingEnergyFootprint } from "./categories/housing-energy";
import { calculateTravelFootprint } from "./categories/travel";

// TODO: fix types
export const CATEGORY_REGISTRY: Record<
  string,
  (input: any, emissionFactors: any) => number
> = {
  housingEnergy: calculateHousingEnergyFootprint,
  travel: calculateTravelFootprint,
};
