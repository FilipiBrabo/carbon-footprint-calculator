import { useState } from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { RouterOutput } from "@/trpc/routers/_app";

type Results = RouterOutput["footprintCalculator"]["calculate"];

export function useResultsDialog() {
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<Results | null>(null);

  const dialog = (
    <ResultsDialog open={open} setOpen={setOpen} results={results} />
  );

  return {
    open: (results: Results) => {
      setOpen(true);
      setResults(results);
    },
    dialog,
  };
}

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  results: Results | null;
};

const chartConfig = {
  value: {
    label: "kgCO2e",
  },
  housingEnergy: {
    label: "Housing Energy",
    color: "#34d399",
  },
  travel: {
    label: "Travel",
    color: "#f87171",
  },
} satisfies ChartConfig;

function ResultsDialog({ open, setOpen, results }: Props) {
  const [viewMode, setViewMode] = useState<"monthly" | "yearly">("yearly");

  const chartData = Object.entries(results?.byCategory || {}).map(
    ([key, value]) => ({
      label: key,
      value: value / (viewMode === "monthly" ? 12 : 1),
      fill: `var(--color-${key})`,
    }),
  );

  const totalKgCO2e =
    viewMode === "monthly"
      ? (results?.totalKgCO2e ?? 0) / 12
      : (results?.totalKgCO2e ?? 0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Results</DialogTitle>
          <DialogDescription>
            This is the result of your carbon emissions.
          </DialogDescription>
        </DialogHeader>

        <div className="relative">
          <Select
            value={viewMode}
            onValueChange={(value) =>
              setViewMode(value as "monthly" | "yearly")
            }
          >
            <SelectTrigger className="absolute top-0 right-0">
              <SelectValue>
                {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
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
                data={chartData}
                dataKey="value"
                nameKey="label"
                innerRadius={90}
                strokeWidth={20}
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
                            {totalKgCO2e.toFixed(2)}
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
