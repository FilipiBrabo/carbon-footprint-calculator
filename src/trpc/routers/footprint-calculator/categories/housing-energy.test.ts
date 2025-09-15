import { TRPCError } from "@trpc/server";
import { describe, expect, test } from "vitest";
import { EMISSION_FACTORS } from "../emission-factors";
import { calculateHousingEnergyFootprint } from "./housing-energy";

describe("calculateHousingEnergy", () => {
  test("should calculate electricity consumption correctly", () => {
    const input = {
      electricity: {
        value: 100,
        unit: "kWh" as const,
        yearly: false,
      },
    };

    const result = calculateHousingEnergyFootprint(input, EMISSION_FACTORS);

    const expected = 100 * EMISSION_FACTORS.electricity.kWh * 12;
    expect(result.totalKgCO2e).toBe(expected);
    expect(result.bySubcategory.electricity).toBe(expected);
  });

  test("should calculate natural gas consumption correctly", () => {
    const input = {
      naturalGas: {
        value: 50,
        unit: "therm" as const,
        yearly: true,
      },
    };

    const result = calculateHousingEnergyFootprint(input, EMISSION_FACTORS);

    const expected = 50 * EMISSION_FACTORS.naturalGas.therm * 1;
    expect(result.totalKgCO2e).toBe(expected);
    expect(result.bySubcategory.naturalGas).toBe(expected);
  });

  test("should calculate fuel oil consumption correctly", () => {
    const input = {
      fuelOil: {
        value: 25,
        unit: "gallon",
        yearly: false,
      },
    } as const;

    const result = calculateHousingEnergyFootprint(input, EMISSION_FACTORS);

    // 25 gallon * 10.21 kg CO2e/gallon * 12 (monthly to yearly)
    const expected = 25 * EMISSION_FACTORS.fuelOil.gallon * 12;
    expect(result.totalKgCO2e).toBe(expected);
    expect(result.bySubcategory.fuelOil).toBe(expected);
  });

  describe("monthly vs yearly calculations", () => {
    test("should multiply by 12 for monthly values", () => {
      const monthlyInput = {
        electricity: {
          value: 100,
          unit: "kWh" as const,
          yearly: false,
        },
      };

      const result = calculateHousingEnergyFootprint(
        monthlyInput,
        EMISSION_FACTORS,
      );
      const expected = 100 * EMISSION_FACTORS.electricity.kWh * 12;
      expect(result.totalKgCO2e).toBe(expected);
    });

    test("should not multiply by 12 for yearly values", () => {
      const yearlyInput = {
        electricity: {
          value: 100,
          unit: "kWh" as const,
          yearly: true,
        },
      };

      const result = calculateHousingEnergyFootprint(
        yearlyInput,
        EMISSION_FACTORS,
      );
      const expected = 100 * EMISSION_FACTORS.electricity.kWh * 1;
      expect(result.totalKgCO2e).toBe(expected);
    });
  });

  test("should sum footprints from multiple categories", () => {
    const input = {
      electricity: {
        value: 100,
        unit: "kWh" as const,
        yearly: false,
      },
      naturalGas: {
        value: 20,
        unit: "therm" as const,
        yearly: true,
      },
      lpg: {
        value: 10,
        unit: "gallon" as const,
        yearly: false,
      },
      waste: {
        value: 50,
        unit: "pounds" as const,
        yearly: false,
      },
    };

    const result = calculateHousingEnergyFootprint(input, EMISSION_FACTORS);

    const expectedElectricity = 100 * EMISSION_FACTORS.electricity.kWh * 12;
    const expectedNaturalGas = 20 * EMISSION_FACTORS.naturalGas.therm * 1;
    const expectedLpg = 10 * EMISSION_FACTORS.lpg.gallon * 12;
    const expectedWaste = 50 * EMISSION_FACTORS.waste.pounds * 12;

    const expected =
      expectedElectricity + expectedNaturalGas + expectedLpg + expectedWaste;
    expect(result.totalKgCO2e).toBe(expected);
    expect(result.bySubcategory).toMatchObject({
      electricity: expectedElectricity,
      naturalGas: expectedNaturalGas,
      lpg: expectedLpg,
      waste: expectedWaste,
    });
  });

  test("should return 0 when all values are 0", () => {
    const input = {
      electricity: {
        value: 0,
        unit: "kWh" as const,
        yearly: false,
      },
      naturalGas: {
        value: 0,
        unit: "therm" as const,
        yearly: false,
      },
      fuelOil: {
        value: 0,
        unit: "gallon" as const,
        yearly: false,
      },
      lpg: {
        value: 0,
        unit: "gallon" as const,
        yearly: false,
      },
      waste: {
        value: 0,
        unit: "pounds" as const,
        yearly: false,
      },
      water: {
        value: 0,
        unit: "gallon" as const,
        yearly: false,
      },
    };

    const result = calculateHousingEnergyFootprint(input, EMISSION_FACTORS);
    expect(result.totalKgCO2e).toBe(0);
  });

  test("should throw TRPCError when emission factor is not found", () => {
    const input = {
      electricity: {
        value: 100,
        unit: "invalidUnit" as "kWh", // Invalid unit to trigger error
        yearly: false,
      },
    };

    expect(() =>
      calculateHousingEnergyFootprint(input, EMISSION_FACTORS),
    ).toThrow(TRPCError);
    expect(() =>
      calculateHousingEnergyFootprint(input, EMISSION_FACTORS),
    ).toThrow("Emission factor not found");
  });
});
