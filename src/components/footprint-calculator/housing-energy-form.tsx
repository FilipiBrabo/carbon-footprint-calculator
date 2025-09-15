"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Droplet, Fuel, Trash, Waves, Zap } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import type { z } from "zod";
import { Form } from "@/components/ui/form";
import { useFootprintCalculatorStore } from "@/providers/footprint-calculator-store-provider";
import { housingEnergySchema } from "@/schemas/housing-energy";
import { FootprintFormField } from "./footprint-form-field";

const formSchema = housingEnergySchema.required();

export type HousingEnergyFormSchema = z.input<typeof formSchema>;

export function HousingEnergyForm() {
  const { housingEnergy, setHousingEnergy } = useFootprintCalculatorStore(
    (state) => state,
  );

  const form = useForm<HousingEnergyFormSchema>({
    resolver: zodResolver(formSchema),
    // Note: In order to initialize the fields empty we need to use an empty string as the value
    defaultValues: {
      electricity: {
        value: "",
        unit: "kWh",
        yearly: false,
      },
      naturalGas: {
        value: "",
        unit: "therm",
        yearly: false,
      },
      fuelOil: {
        value: "",
        unit: "gallon",
        yearly: false,
      },
      lpg: {
        value: "",
        unit: "gallon",
        yearly: false,
      },
      waste: {
        value: "",
        unit: "pounds",
        yearly: false,
      },
      water: {
        value: "",
        unit: "gallon",
        yearly: false,
      },
      ...housingEnergy,
    },
  });

  const debouncedUpdate = useDebouncedCallback(
    (values: HousingEnergyFormSchema) => setHousingEnergy(values),
    200,
  );

  useEffect(() => {
    const unsubscribe = form.subscribe({
      formState: { values: true },
      callback: ({ values }) => {
        debouncedUpdate(values as HousingEnergyFormSchema);
      },
    });

    return () => {
      unsubscribe();
    };
  }, [debouncedUpdate, form.subscribe]);

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FootprintFormField
          fieldName="electricity"
          label="Electricity"
          icon={Zap}
        />

        <FootprintFormField
          fieldName="naturalGas"
          label="Natural Gas"
          icon={Fuel}
        />

        <FootprintFormField
          fieldName="fuelOil"
          label="Fuel Oil"
          icon={Droplet}
        />

        <FootprintFormField
          fieldName="lpg"
          label="Liquid Petroleum Gas (LPG)"
          icon={Fuel}
        />

        <FootprintFormField fieldName="waste" label="Waste" icon={Trash} />

        <FootprintFormField fieldName="water" label="Water" icon={Waves} />
      </form>
    </Form>
  );
}
