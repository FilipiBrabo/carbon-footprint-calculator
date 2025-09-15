"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Bus, Car, Plane, Train } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Form } from "@/components/ui/form";
import { useFootprintCalculatorStore } from "@/providers/footprint-calculator-store-provider";
import { travelSchema } from "@/schemas/travel";
import { FootprintFormField } from "./footprint-form-field";

const formSchema = travelSchema.required();

export type TravelFormSchema = z.infer<typeof formSchema>;

export function TravelForm() {
  const { travel } = useFootprintCalculatorStore((state) => state);

  const form = useForm<TravelFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...travel,
    },
  });

  const { reset } = form;

  // On the initial render, store values are not defined.
  // This effect ensures that the form is reset to the store values.
  useEffect(() => {
    reset({
      ...travel,
    });
  }, [travel, reset]);

  return (
    <Form {...form}>
      <form className="space-y-4">
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
