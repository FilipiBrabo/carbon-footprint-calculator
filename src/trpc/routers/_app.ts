import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { router } from "../init";
import { footprintCalculatorRouter } from "./footprint-calculator";

export const appRouter = router({
  footprintCalculator: footprintCalculatorRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
