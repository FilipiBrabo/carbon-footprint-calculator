"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { HousingEnergyForm } from "@/components/footprint-calculator/housing-energy-form";
import { TravelForm } from "@/components/footprint-calculator/travel-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("tab") || "home-energy";

  console.log("activeTab", activeTab);

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) =>
        router.push(`/footprint-calculator?tab=${value}`)
      }
      className="w-[400px]"
    >
      <TabsList>
        <TabsTrigger value="home-energy">Home Energy</TabsTrigger>
        <TabsTrigger value="transportation">Transportation</TabsTrigger>
      </TabsList>
      <TabsContent value="home-energy">
        <HousingEnergyForm />
      </TabsContent>
      <TabsContent value="transportation">
        <TravelForm />
      </TabsContent>
    </Tabs>
  );
}
