import z from "zod";
import { housingEnergySchema } from "@/schemas/housing-energy";
import { publicProcedure, router } from "../../init";
import { calculateHousingEnergy } from "./categories/housing-energy";
import { EMISSION_FACTORS } from "./emission-factors";

// TODO: fix this type
const registry: Record<string, (input: any, emissionFactors: any) => number> = {
  housingEnergy: calculateHousingEnergy,
};

export const footprintCalculatorRouter = router({
  calculate: publicProcedure
    .input(
      z.object({
        housingEnergy: housingEnergySchema,
      }),
    )
    .mutation(({ input }) => {
      // TODO: this will need to be updated to support multiple categories
      const calculator = registry.housingEnergy;
      const result = calculator(input.housingEnergy, EMISSION_FACTORS);

      return {
        totalKgCO2e: result,
        byCategory: {
          housingEnergy: result,
        },
      };
    }),
});
