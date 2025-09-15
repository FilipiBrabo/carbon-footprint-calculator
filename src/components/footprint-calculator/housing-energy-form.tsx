"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Droplet, Fuel, Trash, Waves, Zap } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useFootprintCalculatorStore } from "@/providers/footprint-calculator-store-provider";
import { housingEnergySchema } from "@/schemas/housing-energy";
import { useTRPC } from "@/trpc/client";
import { FootprintFormField } from "./footprint-form-field";

const formSchema = housingEnergySchema.required();

export type HousingEnergyFormSchema = z.infer<typeof formSchema>;

export function HousingEnergyForm() {
  const trpc = useTRPC();
  const calculateFootprint = useMutation(
    trpc.footprintCalculator.calculate.mutationOptions(),
  );

  const { setHousingEnergy, housingEnergy } = useFootprintCalculatorStore(
    (state) => state,
  );

  const form = useForm<HousingEnergyFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...housingEnergy,
    },
  });

  const { reset } = form;

  useEffect(() => {
    reset({
      ...housingEnergy,
    });
  }, [housingEnergy, reset]);

  const state = useFootprintCalculatorStore((state) => state);

  function handleSubmit(values: z.infer<typeof formSchema>) {
    setHousingEnergy(values);

    // At this point, the store is not yet updated
    const newState = {
      ...state,
      housingEnergy: values,
    };

    calculateFootprint.mutate(newState, {
      onSuccess: (data) => {
        console.log("result", data);
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
