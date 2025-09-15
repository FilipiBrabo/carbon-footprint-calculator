import { createStore } from "zustand/vanilla";
import type { FieldUnits, UNITS_MAP } from "@/lib/utils";

type FootprintField<T extends keyof typeof UNITS_MAP> = {
  value: number;
  unit: FieldUnits<T>;
  yearly: boolean;
};

export type FootprintCalculatorState = {
  housingEnergy: {
    electricity: FootprintField<"electricity">;
    naturalGas: FootprintField<"naturalGas">;
    fuelOil: FootprintField<"fuelOil">;
    lpg: FootprintField<"lpg">;
    waste: FootprintField<"waste">;
    water: FootprintField<"water">;
  };
  travel: {
    car: FootprintField<"car">;
    bus: FootprintField<"bus">;
    metro: FootprintField<"metro">;
    rail: FootprintField<"rail">;
    flight: FootprintField<"flight">;
  };
};

export type CounterActions = {
  setHousingEnergy: (
    housingEnergy: FootprintCalculatorState["housingEnergy"],
  ) => void;
  setTravel: (travel: FootprintCalculatorState["travel"]) => void;
};

export type FootprintCalculatorStore = FootprintCalculatorState &
  CounterActions;

export const defaultInitState: FootprintCalculatorState = {
  housingEnergy: {
    electricity: {
      value: 0,
      unit: "kWh",
      yearly: false,
    },
    naturalGas: {
      value: 0,
      unit: "therm",
      yearly: false,
    },
    fuelOil: {
      value: 0,
      unit: "gallon",
      yearly: false,
    },
    lpg: {
      value: 0,
      unit: "gallon",
      yearly: false,
    },
    waste: {
      value: 0,
      unit: "pounds",
      yearly: false,
    },
    water: {
      value: 0,
      unit: "gallon",
      yearly: false,
    },
  },
  travel: {
    car: {
      value: 0,
      unit: "miles",
      yearly: false,
    },
    bus: {
      value: 0,
      unit: "miles",
      yearly: false,
    },
    metro: {
      value: 0,
      unit: "miles",
      yearly: false,
    },
    rail: {
      value: 0,
      unit: "miles",
      yearly: false,
    },
    flight: {
      value: 0,
      unit: "miles",
      yearly: false,
    },
  },
};

export const createFootprintCalculatorStore = (
  initState: FootprintCalculatorState = defaultInitState,
) => {
  return createStore<FootprintCalculatorStore>()(
    // persist(
    (set) => ({
      ...initState,
      setHousingEnergy: (housingEnergy) => set({ housingEnergy }),
      setTravel: (travel) => set({ travel }),
    }),
    // {
    //   name: "footprint-calculator",
    // },
    // ),
  );
};
