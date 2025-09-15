import z from "zod";
import { UNITS_MAP } from "@/lib/utils";

export const travelSchema = z.object({
  car: z
    .object({
      value: z.number().min(0),
      unit: z.enum(UNITS_MAP.car),
      yearly: z.boolean(),
    })
    .optional(),
  bus: z
    .object({
      value: z.number().min(0),
      unit: z.enum(UNITS_MAP.bus),
      yearly: z.boolean(),
    })
    .optional(),
  metro: z
    .object({
      value: z.number().min(0),
      unit: z.enum(UNITS_MAP.metro),
      yearly: z.boolean(),
    })
    .optional(),
  rail: z
    .object({
      value: z.number().min(0),
      unit: z.enum(UNITS_MAP.rail),
      yearly: z.boolean(),
    })
    .optional(),
  flight: z
    .object({
      value: z.number().min(0),
      unit: z.enum(UNITS_MAP.flight),
      yearly: z.boolean(),
    })
    .optional(),
});
