import React from 'react';
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface CustomRadioGroupProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  name: string;
}

export const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({ options, value, onChange, name }) => (
  <RadioGroup
    value={value}
    onValueChange={onChange}
    className="flex space-x-2"
  >
    {options.map((option) => (
      <Button
        key={`${name}-${option.toLowerCase()}`}
        onClick={() => onChange(option.toLowerCase())}
        type="button"
        variant="outline"
        className={cn(
          "px-3 py-2 text-sm font-medium rounded-md border-2 transition-all",
          value === option.toLowerCase()
            ? "border-primary bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground hover:shadow-md"
            : "border-muted bg-popover hover:bg-slate-100 hover:text-accent-foreground",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        )}
      >
        {option}
      </Button>
    ))}
  </RadioGroup>
);