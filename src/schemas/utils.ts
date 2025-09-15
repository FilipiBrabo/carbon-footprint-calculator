import z from "zod";

export const zodNumberOrEmptyString = z
  .number()
  .min(0)
  .or(z.literal(""))
  .transform((val) => {
    console.log("val", val);
    return val === "" ? 0 : Number(val);
  });
