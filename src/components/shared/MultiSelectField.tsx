"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  label: string;
  name: string;         // e.g. "interests[]"
  removeName: string;   // e.g. "remove_interests[]"
  options: Option[];
  defaultValues?: string[];
}

export function MultiSelectField({
  label,
  name,
  removeName,
  options,
  defaultValues = [],
}: MultiSelectProps) {

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(defaultValues);
  const [removed, setRemoved] = useState<string[]>([]);
  const toggleSelect = (value: string) => {
    setSelected((prev) => {
      const alreadySelected = prev.includes(value);

      if (alreadySelected) {
        // Removing
        if (defaultValues.includes(value)) {
          // Track removed items for server
          setRemoved((r) => [...r, value]);
        }
        return prev.filter((x) => x !== value);
      } else {
        // Adding
        setRemoved((r) => r.filter((x) => x !== value)); // unmark removal
        return [...prev, value];
      }
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-md font-medium">{label}</label>

      {/* Hidden inputs for current selections */}
      {selected.map((id) => (
        <input key={id} type="hidden" name={name} value={id} />
      ))}

      {/* Hidden inputs for removed items */}
      {removed.map((id) => (
        <input key={id + "-removed"} type="hidden" name={removeName} value={id} />
      ))}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            className="w-full justify-between"
          >
            {selected.length > 0 ? `${selected.length} selected` : `Select ${label}`}
            <ChevronsUpDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0 w-[280px]">
          <Command>
            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandList>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selected.includes(option.value);

                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => toggleSelect(option.value)}
                      className="cursor-pointer flex items-center gap-2"
                    >
                      <Checkbox checked={isSelected} className="pointer-events-none" />
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
