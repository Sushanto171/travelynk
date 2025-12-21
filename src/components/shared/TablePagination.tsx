"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function TablePagination({
  currentPage,
  totalPages,
}: TablePaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const navigateToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", newPage.toString());

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  if (totalPages <= 1) {
    return;
  }

  const changePageLimit = (newLimit: string) => {
    const query = new URLSearchParams(searchParams.toString());
    query.set("limit", newLimit);
    query.set("page", "1");
    startTransition(() => {
      router.push(`?${query.toString()}`);
    });
  };

  const currentLimit = searchParams.get("limit") || "10";

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        onClick={() => navigateToPage(currentPage - 1)}
        variant={"outline"}
        size="sm"
        disabled={currentPage <= 1 || isPending}
      >
        <ChevronLeft />
        Prev
      </Button>
      {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
        let pageNumber;

        if (totalPages <= 5) {
          //totalPages = 4
          pageNumber = index + 1; // 1,2... totalPages
        } else if (currentPage <= 3) {
          //currentPage = 2 (near of start)
          pageNumber = index + 1; // 1,2... totalPages
        } else if (currentPage >= totalPages - 2) {
          //(near of last)
          pageNumber = totalPages - 4 + index;
        } else {
          //middle
          pageNumber = currentPage - 2 + index;
        }

        return (
          <Button
            size="sm"
            variant={pageNumber === currentPage ? "default" : "outline"}
            onClick={() => navigateToPage(pageNumber)}
            key={index}
          >
            {pageNumber}
          </Button>
        );
      })}
      <Button
        onClick={() => navigateToPage(currentPage + 1)}
        variant={"outline"}
        size="sm"
        disabled={currentPage >= totalPages || isPending}
      >
        Next
        <ChevronRight />
      </Button>

      <Select
        value={currentLimit}
        onValueChange={changePageLimit}
        disabled={isPending}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select limit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Limit</SelectLabel>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
