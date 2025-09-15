"use client";

import { useMutation } from "@tanstack/react-query";
import { Bus, Home, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { HousingEnergyForm } from "@/components/footprint-calculator/housing-energy-form";
import { useResultsDialog } from "@/components/footprint-calculator/results-dialog";
import { TravelForm } from "@/components/footprint-calculator/travel-form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFootprintCalculatorStore } from "@/providers/footprint-calculator-store-provider";
import { useTRPC } from "@/trpc/client";

export default function Page() {
  const router = useRouter();

  const { housingEnergy, travel } = useFootprintCalculatorStore(
    (state) => state,
  );

  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "home-energy";

  const trpc = useTRPC();
  const calculateFootprint = useMutation(
    trpc.footprintCalculator.calculate.mutationOptions({
      onSuccess: (results) => {
        showResults(results);
      },
    }),
  );

  const { open: showResults, dialog } = useResultsDialog();

  const isSubmitDisabled =
    (Object.values(housingEnergy).every((data) => data.value === "") &&
      Object.values(travel).every((data) => data.value === "")) ||
    calculateFootprint.isPending;

  return (
    <div className="space-y-8">
      {dialog}
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
        disabled={isSubmitDisabled}
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
