"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Bus, Car, Plane, Train } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import type { z } from "zod";
import { Form } from "@/components/ui/form";
import { useFootprintCalculatorStore } from "@/providers/footprint-calculator-store-provider";
import { travelSchema } from "@/schemas/travel";
import { FootprintFormField } from "./footprint-form-field";

const formSchema = travelSchema.required();

export type TravelFormSchema = z.input<typeof formSchema>;

export function TravelForm() {
  const { travel, setTravel } = useFootprintCalculatorStore((state) => state);

  const form = useForm<TravelFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      car: {
        value: "",
        unit: "miles",
        yearly: false,
      },
      bus: {
        value: "",
        unit: "miles",
        yearly: false,
      },
      metro: {
        value: "",
        unit: "miles",
        yearly: false,
      },
      rail: {
        value: "",
        unit: "miles",
        yearly: false,
      },
      flight: {
        value: "",
        unit: "miles",
        yearly: false,
      },
      ...travel,
    },
  });

  const debouncedUpdate = useDebouncedCallback(
    (values: TravelFormSchema) => setTravel(values),
    200,
  );

  useEffect(() => {
    const unsubscribe = form.subscribe({
      formState: { values: true },
      callback: ({ values }) => {
        debouncedUpdate(values as TravelFormSchema);
      },
    });

    return () => {
      unsubscribe();
    };
  }, [debouncedUpdate, form.subscribe]);

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FootprintFormField fieldName="car" label="Car" icon={Car} />

        <FootprintFormField fieldName="bus" label="Bus" icon={Bus} />

        <FootprintFormField
          fieldName="metro"
          label="Metro/Subway"
          icon={Train}
        />

        <FootprintFormField fieldName="rail" label="Rail/Train" icon={Train} />

        <FootprintFormField fieldName="flight" label="Flight" icon={Plane} />
      </form>
    </Form>
  );
}
