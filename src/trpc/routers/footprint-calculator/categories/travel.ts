import { TRPCError } from "@trpc/server";
import type { RouterInput } from "../../_app";
import type { EMISSION_FACTORS } from "../emission-factors";

/**
 * Calculates the footprint for the travel category and return the total yearly footprint
 */
export function calculateTravelFootprint(
  input: RouterInput["footprintCalculator"]["calculate"]["travel"],
  emissionFactors: typeof EMISSION_FACTORS,
) {
  // Iterate over every subcategory of the travel category and calculate the footprint
  // Note: Probably not the best approach, since in the real world each subcategory could have their own
  // unique ways of calculating the footprint, instead of a simple multiplication by the emission factor
  // For simplicity, I've decided to use the same approach for all subcategories
  return Object.entries(input).reduce((total, [category, data]) => {
    if (!data) return total;

    // TODO: any chance we can improve this type? Object.entries makes us lose the type of the keys
    const emissionFactor =
      emissionFactors[category as keyof typeof emissionFactors][
        data.unit as keyof (typeof emissionFactors)[keyof typeof emissionFactors]
      ];

    if (!emissionFactor) {
      // TODO: better logging
      console.log("category", category);
      console.log("data", data);

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Emission factor not found",
      });
    }

    const footprint = data.value * emissionFactor * (data.yearly ? 1 : 12);

    return total + footprint;
  }, 0);
}
