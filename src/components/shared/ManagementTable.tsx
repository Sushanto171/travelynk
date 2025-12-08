import { cn } from "@/lib/utils";
import { Edit, Eye, Loader2, MoreHorizontal, Trash } from "lucide-react";
import { HTMLAttributes, ReactNode } from "react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export interface Column<T> {
  header: string,
  render: keyof T | ((row: T) => ReactNode),
  className?: HTMLAttributes<HTMLElement>["className"],
  sortKey?: string
}

export interface ManagementTableProps<T> {
  data: T[],
  columns: Column<T>[],
  getRowKey: (row: T) => string,
  onEdit?: (row: T) => void,
  onView?: (row: T) => void,
  onDelete?: (row: T) => void,
  isRefreshing?: boolean,
  emptyMessage?: string
}


export const ManagementTable = <T,>({
  data, columns, getRowKey, onEdit, onView, onDelete, isRefreshing, emptyMessage = "No records found."
}: ManagementTableProps<T>) => {
  const hasActions = onEdit || onView || onDelete

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
              {
                columns?.map((col, colInx) => (
                  <TableHead key={colInx} className={col.className}>
                    {col.header}
                  </TableHead>
                ))
              }
              {
                hasActions && (
                  <TableHead className={cn("w-[70px]")}>Actions</TableHead>
                )
              }
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data.length === 0 ? (
                <TableRow>
                  <TableCell
                    className="text-center py-8 text-muted-foreground"
                    colSpan={columns.length + (hasActions ? 1 : 0)}>
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              ) : (
                data?.map((item) => (
                  <TableRow key={getRowKey(item)}>
                    {
                      columns?.map((col, idx) => (
                        <TableCell key={idx} className={col.className}>
                          {typeof col.render === "function"
                            ? col.render(item)
                            : String(item[col.render])}
                        </TableCell>
                      ))
                    }
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
              )
            }
          </TableBody>
        </Table>
      </div>
    </>
  )
}