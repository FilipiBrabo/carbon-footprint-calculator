import type { inferRouterInputs } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "../init";
import { footprintCalculatorRouter } from "./footprint-calculator";

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  footprintCalculator: footprintCalculatorRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
export type RouterInput = inferRouterInputs<AppRouter>;
