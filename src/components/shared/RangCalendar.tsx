"use client"

import * as React from "react"
import { type DateRange } from "react-day-picker"

import { Calendar } from "@/components/ui/calendar"

interface IRangeCalenderProps {
  selected: DateRange | undefined
  onSelect: React.Dispatch<React.SetStateAction<DateRange | undefined>>
}
/**
 * @param IRangeCalenderProps
 * 
 * 
 * @example
 *   const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
 *       from: new Date(2025, 5, 12),
 *       to: new Date(2025, 6, 15),
 *       })
 * 
 * 
 */


export function RangeCalender({ onSelect, selected }: IRangeCalenderProps) {


  return (
    <Calendar
      mode="range"
      defaultMonth={selected?.from}
      selected={selected}
      onSelect={onSelect}
      numberOfMonths={2}
      className="rounded-lg border shadow-sm"
    />
  )
}
