"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFootprintCalculatorStore } from "@/components/footprint-calculator/store";
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

const formSchema = z.object({
  electricity: z.string(),
});

export default function Page() {
  const router = useRouter();

  const electricity = useFootprintCalculatorStore((state) => state.electricity);
  const setElectricity = useFootprintCalculatorStore(
    (state) => state.setElectricity,
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      electricity: electricity,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setElectricity(values.electricity);
    router.push("/footprint-calculator/transportation");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="electricity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Electricity</FormLabel>
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
