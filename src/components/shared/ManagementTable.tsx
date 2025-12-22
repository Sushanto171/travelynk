"use client";

import { cn } from "@/lib/utils";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Edit,
  Eye,
  Loader2,
  MoreHorizontal,
  Trash,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { HTMLAttributes, ReactNode, useTransition } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
  className?: HTMLAttributes<HTMLDivElement>["className"];
  wight?: string;
  align?: "left" | "right" | "center";
  sortKey?: string;
}

interface ManagementTableProps<T> {
  data: T[];
  columns: Column<T>[];
  getRowKey: (row: T) => string;
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  isRefreshing?: boolean;
  emptyMessage?: string;
}

export default function ManagementTable<T>({
  data = [],
  columns = [],
  getRowKey,
  onView,
  onEdit,
  onDelete,
  isRefreshing,
  emptyMessage,
}: ManagementTableProps<T>) {
  const [, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasActions = onView || onEdit || onDelete;

  const currentSortOrder = searchParams.get("sortOrder") || "desc";
  const currentSortBy = searchParams.get("sortBy") || "";

  const handleSort = (sortKey: string) => {
    const query = new URLSearchParams(searchParams.toString());
    if (currentSortBy === sortKey) {
      const newSortOrder = currentSortBy === "asc" ? "desc" : "asc";
      query.set("sortOrder", newSortOrder);
    } else {
      query.set("sortBy", sortKey);
      query.set("sortOrder", "asc");
    }

    query.set("page", "1");

    startTransition(() => {
      router.push(`?${query.toString()}`);
    });
  };

  const getSortIcon = (sortKey?: string) => {
    if (!sortKey) return null;

    if (currentSortBy !== sortKey) {
      return <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />;
    }

    return currentSortOrder === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };

  return (
    <>
      <div className="rounded-lg border relative">
        {/* Refreshing Overlay */}
        {isRefreshing && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] flex items-center justify-center z-10 rounded-lg">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Refreshing...</p>
            </div>
          </div>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              {columns?.map((column, colIndex) => (
                <TableHead key={colIndex} className={column.className}>
                  {column.sortKey ? (
                    <span
                      onClick={() => handleSort(column.sortKey!)}
                      className="flex items-center p-2 hover:text-foreground transition-colors font-medium cursor-pointer select-none"
                    >
                      {column.header}
                      {getSortIcon(column.sortKey)}
                    </span>
                  ) : (
                    column.header
                  )}
                </TableHead>
              ))}

              {hasActions && (
                <TableHead className={cn("w-[70px]")}>Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (hasActions ? 1 : 0)}
                  className="text-center py-8 text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data?.map((item) => (
                <TableRow key={getRowKey(item)}>
                  {columns.map((col, idx) => (
                    <TableCell key={idx} className={col.className}>
                      {typeof col.accessor === "function"
                        ? col.accessor(item)
                        : String(item[col.accessor])}
                    </TableCell>
                  ))}
                  {hasActions && (
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {onView && (
                            <DropdownMenuItem onClick={() => onView(item)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                          )}
                          {onEdit && (
                            <DropdownMenuItem onClick={() => onEdit(item)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                          )}
                          {onDelete && (
                            <DropdownMenuItem
                              onClick={() => onDelete(item)}
                              className="text-destructive"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
