import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import { FootprintCalculatorStoreProvider } from "@/providers/footprint-calculator-store-provider";

export default function Layout({
  children,
}: LayoutProps<"/footprint-calculator">) {
  return (
    <div className="md:max-w-lg mx-auto space-y-4 p-4">
      <h1 className="text-2xl font-bold">Carbon Footprint Calculator</h1>
      <FootprintCalculatorStoreProvider>
        <Suspense
          // TODO: better loading state UI
          // We need suspense here since we use `useSearchParams` in the page
          fallback={
            <div className="w-full h-full flex items-center justify-center mx-auto my-auto">
              <Loader2 className="size-6 animate-spin" />
            </div>
          }
        >
          {children}
        </Suspense>
      </FootprintCalculatorStoreProvider>
    </div>
  );
}
