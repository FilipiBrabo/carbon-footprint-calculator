import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  value: string;
  onChange: (value: string) => void;
  units: string[];
};

export function UnitSelect({ units, value, onChange }: Props) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[120px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {units.map((unit) => (
          <SelectItem key={unit} value={unit}>
            {unit}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
