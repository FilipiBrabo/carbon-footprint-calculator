"use client";

import { useMutation } from "@tanstack/react-query";
import { Bus, Home, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { HousingEnergyForm } from "@/components/footprint-calculator/housing-energy-form";
import { TravelForm } from "@/components/footprint-calculator/travel-form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFootprintCalculatorStore } from "@/providers/footprint-calculator-store-provider";
import { useTRPC } from "@/trpc/client";

export default function Page() {
  const trpc = useTRPC();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { housingEnergy, travel } = useFootprintCalculatorStore(
    (state) => state,
  );

  const activeTab = searchParams.get("tab") || "home-energy";

  const calculateFootprint = useMutation(
    trpc.footprintCalculator.calculate.mutationOptions(),
  );

  return (
    <div className="space-y-8">
      <Tabs
        value={activeTab}
        onValueChange={(value) =>
          router.push(`/footprint-calculator?tab=${value}`)
        }
      >
        <TabsList className="w-full">
          <TabsTrigger value="home-energy">
            <Home />
            Home Energy
          </TabsTrigger>
          <TabsTrigger value="transportation">
            <Bus />
            Transportation
          </TabsTrigger>
        </TabsList>
        <TabsContent value="home-energy">
          <HousingEnergyForm />
        </TabsContent>
        <TabsContent value="transportation">
          <TravelForm />
        </TabsContent>
      </Tabs>
      <Button
        className="w-full"
        onClick={() => calculateFootprint.mutate({ housingEnergy, travel })}
        disabled={calculateFootprint.isPending}
      >
        {calculateFootprint.isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          "Calculate Footprint"
        )}
      </Button>
    </div>
  );
}
