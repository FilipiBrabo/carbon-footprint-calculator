"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFootprintCalculatorStore } from "@/providers/footprint-calculator-store-provider";

const formSchema = z.object({
  transportation: z.string(),
});

export function TravelForm() {
  const { transportation, setTransportation } = useFootprintCalculatorStore(
    (state) => state,
  );

  const state = useFootprintCalculatorStore((state) => state);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transportation,
    },
  });

  const { reset } = form;

  useEffect(() => {
    reset({
      transportation,
    });
  }, [transportation, reset]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setTransportation(values.transportation);
    console.log("state", { ...state, transportation: values.transportation });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="transportation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transportation</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
