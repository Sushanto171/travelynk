"use client";

import { useState } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

interface DatePickerFieldProps {
  label: string;
  name: string;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
}

export function DatePickerField({
  label,
  name,
  defaultValue = null,
  onChange,
  placeholder = "Select date",
}: DatePickerFieldProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(defaultValue);

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
    onChange?.(date);
  };

  return (
    <Field>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={name}
            variant="outline"
            role="combobox"
            className="w-full justify-between"
          >
            {selectedDate ? format(selectedDate, "yyyy-MM-dd") : placeholder}
            <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* Hidden input for server actions */}
      <input type="hidden" name={name} value={selectedDate ? selectedDate.toISOString() : ""} />
    </Field>
  );
}
