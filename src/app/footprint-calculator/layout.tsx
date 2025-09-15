import { FootprintCalculatorStoreProvider } from "@/providers/footprint-calculator-store-provider";

export default function Layout({
  children,
}: LayoutProps<"/footprint-calculator">) {
  return (
    <div className="md:max-w-lg mx-auto space-y-4 p-4">
      <h1 className="text-2xl font-bold">Carbon Footprint Calculator</h1>
      <FootprintCalculatorStoreProvider>
        {children}
      </FootprintCalculatorStoreProvider>
    </div>
  );
}
