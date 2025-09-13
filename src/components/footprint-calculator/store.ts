import { create } from "zustand";
import { persist } from "zustand/middleware";

type FootprintCalculatorStore = {
  electricity: string;
  transportation: string;
  setElectricity: (electricity: string) => void;
  setTransportation: (transportation: string) => void;
};

export const useFootprintCalculatorStore = create<FootprintCalculatorStore>()(
  persist(
    (set) => ({
      electricity: "",
      transportation: "",
      setElectricity: (electricity: string) => set({ electricity }),
      setTransportation: (transportation: string) => set({ transportation }),
    }),
    {
      name: "footprint-calculator",
    },
  ),
);
