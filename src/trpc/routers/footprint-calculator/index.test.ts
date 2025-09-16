import { describe, expect, test } from "vitest";
import { createTRPCContext } from "@/trpc/init";
import { appRouter } from "@/trpc/routers/_app";

describe("footprintCalculator.calculate", () => {
  test("sums across categories with valid inputs", async () => {
    const ctx = await createTRPCContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.footprintCalculator.calculate({
      housingEnergy: {
        electricity: { value: 100, unit: "kWh", yearly: false },
        naturalGas: { value: 10, unit: "therm", yearly: true },
      },
      travel: {
        car: { value: 200, unit: "miles", yearly: true },
        bus: { value: 50, unit: "km", yearly: false },
      },
    });

    expect(result.totalKgCO2e).toBeGreaterThan(0);
    expect(result.byCategory.housingEnergy?.totalKgCO2e).toBeGreaterThan(0);
    expect(result.byCategory.travel?.totalKgCO2e).toBeGreaterThan(0);
  });

  test("handles empty objects and returns 0 total", async () => {
    const ctx = await createTRPCContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.footprintCalculator.calculate({
      housingEnergy: {},
      travel: {},
    });

    expect(result.totalKgCO2e).toBe(0);
    expect(result.byCategory).toEqual({
      housingEnergy: { totalKgCO2e: 0, bySubcategory: {} },
      travel: { totalKgCO2e: 0, bySubcategory: {} },
    });
  });

  test("rejects invalid input via zod validation", async () => {
    const ctx = await createTRPCContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.footprintCalculator.calculate({
        housingEnergy: {
          // intentionally invalid runtime value while keeping TS types satisfied
          electricity: {
            value: "oops" as unknown as number,
            unit: "kWh",
            yearly: false,
          },
        },
        travel: {},
      }),
    ).rejects.toThrow();
  });
});
