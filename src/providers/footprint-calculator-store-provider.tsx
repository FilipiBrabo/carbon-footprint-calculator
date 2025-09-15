// src/providers/counter-store-provider.tsx
"use client";

import { createContext, type ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";

import {
  createFootprintCalculatorStore,
  type FootprintCalculatorStore,
} from "@/stores/footprint-calculator-store";

export type FootprintCalculatorStoreApi = ReturnType<
  typeof createFootprintCalculatorStore
>;

export const FootprintCalculatorStoreContext = createContext<
  FootprintCalculatorStoreApi | undefined
>(undefined);

export interface CounterStoreProviderProps {
  children: ReactNode;
}

export const FootprintCalculatorStoreProvider = ({
  children,
}: CounterStoreProviderProps) => {
  const storeRef = useRef<FootprintCalculatorStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createFootprintCalculatorStore();
  }

  return (
    <FootprintCalculatorStoreContext.Provider value={storeRef.current}>
      {children}
    </FootprintCalculatorStoreContext.Provider>
  );
};

export const useFootprintCalculatorStore = <T,>(
  selector: (store: FootprintCalculatorStore) => T,
): T => {
  const footprintCalculatorStoreContext = useContext(
    FootprintCalculatorStoreContext,
  );

  if (!footprintCalculatorStoreContext) {
    throw new Error(
      `useFootprintCalculatorStore must be used within FootprintCalculatorStoreProvider`,
    );
  }

  return useStore(footprintCalculatorStoreContext, selector);
};
