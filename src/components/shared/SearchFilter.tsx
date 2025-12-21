/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Input } from "../ui/input";

interface SearchFilterProps {
  placeholder?: string;
  paramName?: string;
  resetKey?: string;
}

export default function SearchFilter({
  placeholder = "Search...",
  paramName = "searchTerm",
  resetKey,
}: SearchFilterProps) {
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get(paramName) || "");
  const [isPending, startTransition] = useTransition();
  const debounceValue = useDebounce(value);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const initialState = searchParams.get(paramName) || "";

    if (debounceValue === initialState) {
      return;
    }

    if (debounceValue) {
      params.set(paramName, debounceValue);
      params.set("page", "1");
    } else {
      params.delete(paramName);
      params.delete("page");
    }

    startTransition(() => {
      router.push(`?${params}`);
    });
  }, [paramName, value, debounceValue]);

  useEffect(() => {
    if (resetKey) {
      setValue("");
    }
  }, [resetKey]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        className="pl-10"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={isPending}
      />
    </div>
  );
}
