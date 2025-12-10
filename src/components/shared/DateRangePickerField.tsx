"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { DateRange } from "react-day-picker";
import { RangeCalender } from "./RangCalendar";

interface DateRangePickerFieldProps {
  label?: string;
  nameFrom: string;
  nameTo: string;
  defaultValue?: DateRange;
   placeholder?: string
}

export function DateRangePickerField({
  label,
  nameFrom,
  nameTo,
  defaultValue,
  placeholder
}: DateRangePickerFieldProps) {
  const [range, setRange] = React.useState<DateRange | undefined>(defaultValue);

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}

      {/* Hidden inputs for server action */}
      <input type="date" name={nameFrom} hidden value={range?.from ? format(range.from, "yyyy-MM-dd") : ""} />
      <input type="date" name={nameTo} hidden value={range?.to ? format(range.to, "yyyy-MM-dd") : ""} />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !range && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {range?.from ? (
              range.to ? (
                `${format(range.from, "PPP")} - ${format(range.to, "PPP")}`
              ) : (
                format(range.from, "PPP")
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0 w-full" align="start">
          <RangeCalender selected={range} onSelect={setRange} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
