import z from "zod";
import { UNITS_MAP } from "@/lib/utils";
import { zodNumberOrEmptyString } from "./utils";

export const housingEnergySchema = z.object({
  electricity: z
    .object({
      value: zodNumberOrEmptyString,
      unit: z.enum(UNITS_MAP.electricity),
      yearly: z.boolean(),
    })
    .optional(),
  naturalGas: z
    .object({
      value: zodNumberOrEmptyString,
      unit: z.enum(UNITS_MAP.naturalGas),
      yearly: z.boolean(),
    })
    .optional(),
  fuelOil: z
    .object({
      value: zodNumberOrEmptyString,
      unit: z.enum(UNITS_MAP.fuelOil),
      yearly: z.boolean(),
    })
    .optional(),
  lpg: z
    .object({
      value: zodNumberOrEmptyString,
      unit: z.enum(UNITS_MAP.lpg),
      yearly: z.boolean(),
    })
    .optional(),
  waste: z
    .object({
      value: zodNumberOrEmptyString,
      unit: z.enum(UNITS_MAP.waste),
      yearly: z.boolean(),
    })
    .optional(),
  water: z
    .object({
      value: zodNumberOrEmptyString,
      unit: z.enum(UNITS_MAP.water),
      yearly: z.boolean(),
    })
    .optional(),
});
