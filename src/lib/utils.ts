import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const UNITS_MAP = {
  electricity: ["kWh"],
  naturalGas: ["therm", "mmBtu"],
  fuelOil: ["gallon", "litre"],
  lpg: ["gallon", "litre"],
  waste: ["pounds", "tons"],
  water: ["gallon", "hcf"],
  car: ["miles", "km"],
  bus: ["miles", "km"],
  metro: ["miles", "km"],
  rail: ["miles", "km"],
  flight: ["miles", "km"],
} as const;

export type FieldUnits<T extends keyof typeof UNITS_MAP> =
  (typeof UNITS_MAP)[T][number];

export function getUnitsForField<T extends keyof typeof UNITS_MAP>(
  field: T,
): readonly FieldUnits<T>[] {
  return UNITS_MAP[field];
}
