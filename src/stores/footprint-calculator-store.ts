import type z from "zod";
import { createStore } from "zustand/vanilla";
import type { housingEnergySchema } from "@/schemas/housing-energy";
import type { travelSchema } from "@/schemas/travel";

export type FootprintCalculatorState = {
  housingEnergy: z.input<typeof housingEnergySchema>;
  travel: z.input<typeof travelSchema>;
};

export type FootprintCalculatorActions = {
  setHousingEnergy: (
    housingEnergy: FootprintCalculatorState["housingEnergy"],
  ) => void;
  setTravel: (travel: FootprintCalculatorState["travel"]) => void;
};

export type FootprintCalculatorStore = FootprintCalculatorState &
  FootprintCalculatorActions;

export const defaultInitState: FootprintCalculatorState = {
  housingEnergy: {},
  travel: {},
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
