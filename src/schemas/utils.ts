import z from "zod";

export const zodNumberOrEmptyString = z
  .number()
  .min(0)
  .or(z.literal(""))
  .transform((val) => (val === "" ? 0 : Number(val)));
