"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SelectFilterProps {
  paramName: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  defaultValue?: string;
}

export default function SelectFilter({
  paramName,
  placeholder,
  options,
  defaultValue = "ALL",
}: SelectFilterProps) {
  const searchParams = useSearchParams();
  const currentValue = searchParams.get(paramName) || "ALL";
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === defaultValue) {
      params.delete(paramName);
    } else if (value) {
      params.set(paramName, value);
    } else {
      params.delete(paramName);
    }
    startTransition(() => {
      router.push(`?${params}`);
    });
  };

  return (
    <Select
      onValueChange={handleChange}
      value={currentValue}
      disabled={isPending}
      >
      <SelectTrigger>
        <SelectValue className="font-black">{placeholder}</SelectValue>
      </SelectTrigger>
    <SelectContent
  className={isPending ? "opacity-50 pointer-events-none" : ""}
>
  <SelectItem value={defaultValue} className="cursor-pointer">
    All
  </SelectItem>

  {options.map((option) => (
    <SelectItem
      key={option.value}
      value={option.value}
      className="cursor-pointer"
    >
      {option.label}
    </SelectItem>
  ))}
</SelectContent>

    </Select>
  );
}
