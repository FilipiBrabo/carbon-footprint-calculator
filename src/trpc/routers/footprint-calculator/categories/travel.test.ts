import { TRPCError } from "@trpc/server";
import { describe, expect, test } from "vitest";
import { EMISSION_FACTORS } from "../emission-factors";
import { calculateTravelFootprint } from "./travel";

describe("calculateTravelFootprint", () => {
  test("should calculate car footprint correctly", () => {
    const input = {
      car: {
        value: 100,
        unit: "miles" as const,
        yearly: false,
      },
    };

    const result = calculateTravelFootprint(input, EMISSION_FACTORS);

    const expected = 100 * EMISSION_FACTORS.car.miles * 12;
    expect(result).toBe(expected);
  });

  test("should calculate bus footprint correctly", () => {
    const input = {
      bus: {
        value: 50,
        unit: "km" as const,
        yearly: true,
      },
    };

    const result = calculateTravelFootprint(input, EMISSION_FACTORS);

    const expected = 50 * EMISSION_FACTORS.bus.km * 1;
    expect(result).toBe(expected);
  });

  test("should calculate metro footprint correctly", () => {
    const input = {
      metro: {
        value: 25,
        unit: "miles" as const,
        yearly: false,
      },
    };

    const result = calculateTravelFootprint(input, EMISSION_FACTORS);

    const expected = 25 * EMISSION_FACTORS.metro.miles * 12;
    expect(result).toBe(expected);
  });

  test("should calculate rail footprint correctly", () => {
    const input = {
      rail: {
        value: 75,
        unit: "km" as const,
        yearly: true,
      },
    };

    const result = calculateTravelFootprint(input, EMISSION_FACTORS);

    const expected = 75 * EMISSION_FACTORS.rail.km * 1;
    expect(result).toBe(expected);
  });

  test("should calculate flight footprint correctly", () => {
    const input = {
      flight: {
        value: 1000,
        unit: "miles" as const,
        yearly: false,
      },
    };

    const result = calculateTravelFootprint(input, EMISSION_FACTORS);

    const expected = 1000 * EMISSION_FACTORS.flight.miles * 12;
    expect(result).toBe(expected);
  });

  describe("monthly vs yearly calculations", () => {
    test("should multiply by 12 for monthly values", () => {
      const monthlyInput = {
        car: {
          value: 100,
          unit: "miles" as const,
          yearly: false,
        },
      };

      const result = calculateTravelFootprint(monthlyInput, EMISSION_FACTORS);
      const expected = 100 * EMISSION_FACTORS.car.miles * 12;
      expect(result).toBe(expected);
    });

    test("should not multiply by 12 for yearly values", () => {
      const yearlyInput = {
        car: {
          value: 100,
          unit: "miles" as const,
          yearly: true,
        },
      };

      const result = calculateTravelFootprint(yearlyInput, EMISSION_FACTORS);
      const expected = 100 * EMISSION_FACTORS.car.miles * 1;
      expect(result).toBe(expected);
    });
  });

  test("should sum footprints from multiple travel categories", () => {
    const input = {
      car: {
        value: 100,
        unit: "miles" as const,
        yearly: false,
      },
      bus: {
        value: 20,
        unit: "km" as const,
        yearly: true,
      },
      metro: {
        value: 30,
        unit: "miles" as const,
        yearly: false,
      },
      rail: {
        value: 50,
        unit: "km" as const,
        yearly: true,
      },
      flight: {
        value: 500,
        unit: "miles" as const,
        yearly: false,
      },
    };

    const result = calculateTravelFootprint(input, EMISSION_FACTORS);

    const expectedCar = 100 * EMISSION_FACTORS.car.miles * 12;
    const expectedBus = 20 * EMISSION_FACTORS.bus.km * 1;
    const expectedMetro = 30 * EMISSION_FACTORS.metro.miles * 12;
    const expectedRail = 50 * EMISSION_FACTORS.rail.km * 1;
    const expectedFlight = 500 * EMISSION_FACTORS.flight.miles * 12;

    const expected =
      expectedCar + expectedBus + expectedMetro + expectedRail + expectedFlight;
    expect(result).toBe(expected);
  });

  test("should handle mixed units correctly", () => {
    const input = {
      car: {
        value: 100,
        unit: "km" as const,
        yearly: false,
      },
      bus: {
        value: 50,
        unit: "miles" as const,
        yearly: true,
      },
    };

    const result = calculateTravelFootprint(input, EMISSION_FACTORS);

    const expectedCar = 100 * EMISSION_FACTORS.car.km * 12;
    const expectedBus = 50 * EMISSION_FACTORS.bus.miles * 1;
    const expected = expectedCar + expectedBus;
    expect(result).toBe(expected);
  });

  test("should return 0 when all values are 0", () => {
    const input = {
      car: {
        value: 0,
        unit: "miles" as const,
        yearly: false,
      },
      bus: {
        value: 0,
        unit: "km" as const,
        yearly: false,
      },
      metro: {
        value: 0,
        unit: "miles" as const,
        yearly: false,
      },
      rail: {
        value: 0,
        unit: "km" as const,
        yearly: false,
      },
      flight: {
        value: 0,
        unit: "miles" as const,
        yearly: false,
      },
    };

    const result = calculateTravelFootprint(input, EMISSION_FACTORS);
    expect(result).toBe(0);
  });

  test("should return 0 when no travel categories are provided", () => {
    const input = {};

    const result = calculateTravelFootprint(input, EMISSION_FACTORS);
    expect(result).toBe(0);
  });

  test("should skip undefined categories", () => {
    const input = {
      car: {
        value: 100,
        unit: "miles" as const,
        yearly: false,
      },
      bus: undefined,
      metro: {
        value: 50,
        unit: "km" as const,
        yearly: true,
      },
    };

    const result = calculateTravelFootprint(input, EMISSION_FACTORS);

    const expectedCar = 100 * EMISSION_FACTORS.car.miles * 12;
    const expectedMetro = 50 * EMISSION_FACTORS.metro.km * 1;
    const expected = expectedCar + expectedMetro;
    expect(result).toBe(expected);
  });

  test("should throw TRPCError when emission factor is not found", () => {
    const input = {
      car: {
        value: 100,
        unit: "invalidUnit" as "miles", // Invalid unit to trigger error
        yearly: false,
      },
    };

    expect(() => calculateTravelFootprint(input, EMISSION_FACTORS)).toThrow(
      TRPCError,
    );
    expect(() => calculateTravelFootprint(input, EMISSION_FACTORS)).toThrow(
      "Emission factor not found",
    );
  });
});
