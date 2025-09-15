import type { LucideIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UNITS_MAP } from "@/lib/utils";
import type { HousingEnergyFormSchema } from "./housing-energy-form";
import { UnitSelect } from "./unit-select";

export function FootprintFormField({
  icon: Icon,
  label,
  fieldName,
  description,
}: {
  label: string;
  icon: LucideIcon;
  fieldName: keyof HousingEnergyFormSchema;
  description?: string;
}) {
  const { control } = useFormContext<HousingEnergyFormSchema>();

  return (
    <div className="space-y-2">
      <div className="flex flex-row gap-2 items-end">
        <FormField
          control={control}
          name={`${fieldName}.value`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Icon className="size-4" />
                {label}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              {description ? (
                <FormDescription>{description}</FormDescription>
              ) : null}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`${fieldName}.unit`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <UnitSelect
                  units={[...UNITS_MAP[fieldName]]}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={control}
        name={`${fieldName}.yearly`}
        render={({ field }) => (
          <FormItem className="text-sm text-muted-foreground">
            <FormControl>
              <RadioGroup
                className="flex flex-row items-center gap-4"
                onValueChange={(value) => field.onChange(value === "yearly")}
                value={field.value ? "yearly" : "monthly"}
              >
                <FormItem className="flex items-center gap-1 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="monthly" />
                  </FormControl>
                  <FormLabel className="font-normal">Monthly</FormLabel>
                </FormItem>
                <FormItem className="flex items-center gap-1 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="yearly" />
                  </FormControl>
                  <FormLabel className="font-normal">Yearly</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
