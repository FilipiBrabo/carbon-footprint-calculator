import z from "zod";
import { housingEnergySchema } from "@/schemas/housing-energy";
import { travelSchema } from "@/schemas/travel";
import { publicProcedure, router } from "../../init";
import { CATEGORY_REGISTRY } from "./category-registry";
import { EMISSION_FACTORS } from "./emission-factors";

export const footprintCalculatorRouter = router({
  calculate: publicProcedure
    .input(
      z.object({
        housingEnergy: housingEnergySchema,
        travel: travelSchema,
      }),
    )
    .mutation(({ input }) => {
      const results: Record<
        string,
        { totalKgCO2e: number; bySubcategory: Record<string, number> }
      > = {};
      let totalResult = 0;

      // The for loop below makes us looses the typing of the input keys
      // This is a workaround so we can cast the categoryName to the correct type
      type Categories = keyof typeof input;

      for (const [categoryName, categoryData] of Object.entries(input)) {
        const footprintCalculator =
          CATEGORY_REGISTRY[categoryName as Categories];

        if (footprintCalculator && categoryData) {
          const categoryResult = footprintCalculator(
            categoryData,
            EMISSION_FACTORS,
          );
          results[categoryName] = categoryResult;
          totalResult += categoryResult.totalKgCO2e;
        }
      }

      return {
        totalKgCO2e: totalResult,
        byCategory: results,
      };
    }),
});
