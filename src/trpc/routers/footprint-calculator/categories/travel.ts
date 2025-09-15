import { TRPCError } from "@trpc/server";
import type z from "zod";
import type { travelSchema } from "@/schemas/travel";
import type { CategoryFootprintResult } from "../category-registry";
import type { EMISSION_FACTORS } from "../emission-factors";

/**
 * Calculates the footprint for the travel category and return the total yearly footprint
 */
export function calculateTravelFootprint(
  input: z.output<typeof travelSchema>,
  emissionFactors: typeof EMISSION_FACTORS,
): CategoryFootprintResult {
  // Iterate over every subcategory of the travel category and calculate the footprint
  // Note: Probably not the best approach, since in the real world each subcategory could have their own
  // unique ways of calculating the footprint, instead of a simple multiplication by the emission factor
  // For simplicity, I've decided to use the same approach for all subcategories
  const bySubcategory: Record<string, number> = {};
  let total = 0;

  for (const [category, data] of Object.entries(input)) {
    if (!data) continue;

    const emissionFactor =
      emissionFactors[category as keyof typeof emissionFactors][
        data.unit as keyof (typeof emissionFactors)[keyof typeof emissionFactors]
      ];

    if (!emissionFactor) {
      console.log("category", category);
      console.log("data", data);

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Emission factor not found",
      });
    }

    const footprint = data.value * emissionFactor * (data.yearly ? 1 : 12);
    bySubcategory[category] = footprint;
    total += footprint;
  }

  return {
    totalKgCO2e: total,
    bySubcategory,
  };
}
