import type { LucideIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UNITS_MAP } from "@/lib/utils";
import type { HousingEnergyFormSchema } from "./housing-energy-form";
import type { TravelFormSchema } from "./travel-form";
import { UnitSelect } from "./unit-select";

export function FootprintFormField({
  icon: Icon,
  label,
  fieldName,
}: {
  label: string;
  icon: LucideIcon;
  fieldName: keyof HousingEnergyFormSchema | keyof TravelFormSchema;
}) {
  const { control } = useFormContext<
    HousingEnergyFormSchema | TravelFormSchema
  >();

  return (
    <div className="space-y-2 ">
      <div className="flex flex-row gap-2 items-end ">
        <FormField
          control={control}
          name={`${fieldName}.value`}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>
                <Icon className="size-4" />
                {label}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  value={field.value}
                  min={0}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      return field.onChange("");
                    }
                    return field.onChange(Number(e.target.value));
                  }}
                />
              </FormControl>
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
          <FormItem className="text-muted-foreground">
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
                  <FormLabel className="font-normal text-xs">Monthly</FormLabel>
                </FormItem>
                <FormItem className="flex items-center gap-1 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="yearly" />
                  </FormControl>
                  <FormLabel className="font-normal text-xs">Yearly</FormLabel>
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
