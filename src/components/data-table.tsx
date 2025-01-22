"use client";
import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";

import { Button } from "~/components/ui/button";
import { Play, Pause, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  autoRotateInterval?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  autoRotateInterval = 30000,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [isPaused, setIsPaused] = React.useState(false);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  React.useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (table.getCanNextPage()) {
        table.nextPage();
      } else {
        table.setPageIndex(0);
      }
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [table, autoRotateInterval, isPaused]);

  return (
    <div className="flex flex-col gap-4">
      {/* Pagination & Controls */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" onClick={() => setIsPaused(!isPaused)}>
          {isPaused ? (
            <Play className="h-5 w-5" />
          ) : (
            <Pause className="h-5 w-5" />
          )}
        </Button>
        <Button
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>

        {/* Column Visibility Dropdown */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table.getAllLeafColumns().map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {typeof column.columnDef.header === "string"
                  ? column.columnDef.header
                  : "Column"}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table Component */}
      <div className="rounded-md border">
        <Table className="text-lg">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? "flex cursor-pointer select-none items-center"
                            : ""
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.getCanSort() && (
                          <span className="ml-2">
                            {header.column.getIsSorted() === "asc" ? (
                              <ArrowUp className="h-4 w-4" />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <ArrowDown className="h-4 w-4" />
                            ) : (
                              <ArrowUpDown className="h-4 w-4" />
                            )}
                          </span>
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
