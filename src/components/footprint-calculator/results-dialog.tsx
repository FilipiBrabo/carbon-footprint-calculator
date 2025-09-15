import { useState } from "react";
import { CategoryPieChart } from "@/components/footprint-calculator/category-pie-chart";
import { SubcategoryChart } from "@/components/footprint-calculator/subcategory-bar-chart";
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

const categoryLabels = {
  housingEnergy: "Housing Energy",
  travel: "Travel",
};

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  results: Results | null;
};

function ResultsDialog({ open, setOpen, results }: Props) {
  const [viewMode, setViewMode] = useState<"monthly" | "yearly">("yearly");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const totalKgCO2e = results?.totalKgCO2e ?? 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Results</DialogTitle>
          <DialogDescription>
            This is the result of your carbon emissions.
          </DialogDescription>
        </DialogHeader>

        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Overall Emissions by Category
            </h3>

            <Select
              value={viewMode}
              onValueChange={(value) =>
                setViewMode(value as "monthly" | "yearly")
              }
            >
              <SelectTrigger>
                <SelectValue>
                  {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CategoryPieChart
            byCategory={results?.byCategory || {}}
            totalKgCO2e={totalKgCO2e}
            viewMode={viewMode}
            onSelect={(key) =>
              setSelectedCategory((prev) => (prev === key ? null : key))
            }
          />
        </div>

        <div className="mt-8">
          {!selectedCategory && (
            <p className="text-sm text-muted-foreground">
              Click on a category above to see its breakdown.
            </p>
          )}

          {selectedCategory && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold capitalize">
                  {categoryLabels[
                    selectedCategory as keyof typeof categoryLabels
                  ] ?? selectedCategory}
                </div>
                <button
                  type="button"
                  className="text-sm text-primary underline underline-offset-2"
                  onClick={() => setSelectedCategory(null)}
                >
                  Clear
                </button>
              </div>
              <SubcategoryChart
                subcategories={
                  results?.byCategory?.[selectedCategory]?.bySubcategory || {}
                }
                viewMode={viewMode}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
