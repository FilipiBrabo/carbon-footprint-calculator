"use client";

import { Label, Pie, PieChart } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type ByCategory = Record<
  string,
  { totalKgCO2e: number; bySubcategory: Record<string, number> }
>;

type Props = {
  byCategory: ByCategory;
  totalKgCO2e: number;
  viewMode: "monthly" | "yearly";
  onSelect?: (categoryKey: string) => void;
};

const chartConfig: ChartConfig = {
  value: { label: "kgCO2e" },
  housingEnergy: { label: "Housing Energy", color: "#34d399" },
  travel: { label: "Travel", color: "#f87171" },
};

export function CategoryPieChart({
  byCategory,
  totalKgCO2e,
  viewMode,
  onSelect,
}: Props) {
  const divisor = viewMode === "monthly" ? 12 : 1;

  const data = Object.entries(byCategory).map(([key, value]) => ({
    label: key,
    value: value.totalKgCO2e / divisor,
    fill: `var(--color-${key})`,
  }));

  const total = totalKgCO2e / divisor;

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square w-full max-w-[320px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="label"
          innerRadius={90}
          strokeWidth={20}
          onClick={(data?: { payload: { label: string } }) => {
            const label = data?.payload.label;

            if (label) {
              onSelect?.(label);
            }
          }}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {total.toFixed(2)}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      kgCO2e/{viewMode === "monthly" ? "month" : "year"}
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
