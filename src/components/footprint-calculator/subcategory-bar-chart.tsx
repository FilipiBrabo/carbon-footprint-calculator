"use client";

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const COLORS = [
  "#60a5fa",
  "#f97316",
  "#34d399",
  "#f87171",
  "#a78bfa",
  "#f59e0b",
  "#22d3ee",
  "#d946ef",
  "#10b981",
  "#ef4444",
];

const labelsMap = {
  lpg: "LPG",
  electricity: "Electricity",
  naturalGas: "Natural Gas",
  fuelOil: "Fuel Oil",
  waste: "Waste",
  car: "Car",
  bus: "Bus",
  metro: "Metro/Subway",
  rail: "Rail/Train",
  flight: "Flight",
};

type Props = {
  subcategories: Record<string, number>;
  viewMode: "monthly" | "yearly";
};

export function SubcategoryChart({ subcategories, viewMode }: Props) {
  const divisor = viewMode === "monthly" ? 12 : 1;

  const config: ChartConfig = { value: { label: "kgCO2e" } };

  Object.entries(subcategories).forEach(([subcategory], i) => {
    const label =
      labelsMap[subcategory as keyof typeof labelsMap] ?? subcategory;
    config[subcategory] = {
      label,
      color: COLORS[i % COLORS.length],
    };
  });

  const data = Object.entries(subcategories).map(([subcategory, value]) => ({
    label: subcategory,
    displayLabel:
      labelsMap[subcategory as keyof typeof labelsMap] ?? subcategory,
    value: value / divisor,
    fill: `var(--color-${subcategory})`,
  }));

  return (
    <ChartContainer config={config} className="mx-auto w-full max-w-[520px]">
      <BarChart data={data}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="displayLabel"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis width={40} tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel nameKey="label" />}
        />
        <ChartLegend content={<ChartLegendContent nameKey="label" />} />
        <Bar dataKey="value" radius={4}>
          {data.map((entry) => (
            <Cell key={entry.label} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
