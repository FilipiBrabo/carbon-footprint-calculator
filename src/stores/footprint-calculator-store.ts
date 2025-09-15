import { persist } from "zustand/middleware";
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
  transportation: string;
};

export type CounterActions = {
  setHousingEnergy: (
    housingEnergy: FootprintCalculatorState["housingEnergy"],
  ) => void;
  setTransportation: (transportation: string) => void;
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
  transportation: "",
};

export const createFootprintCalculatorStore = (
  initState: FootprintCalculatorState = defaultInitState,
) => {
  return createStore<FootprintCalculatorStore>()(
    // persist(
    (set) => ({
      ...initState,
      setHousingEnergy: (housingEnergy) => set({ housingEnergy }),
      setTransportation: (transportation: string) => set({ transportation }),
    }),
    // {
    //   name: "footprint-calculator",
    // },
    // ),
  );
};
