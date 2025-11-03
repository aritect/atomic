import React from "react";

import {
  type ColumnDef,
  flexRender,
  type Table as TanstackTable,
} from "@tanstack/react-table";

import { Button } from "@/components-ui-lib/button";
import {
  EmptyState,
  type EmptyStateProps,
} from "@/components-ui-lib/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components-ui-lib/table";
import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types-ui-lib";

import { DataTablePagination, type PaginationOptions } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";

interface DataTableProps<TData, TValue> {
  dataTable: TanstackTable<TData>;
  columns: ColumnDef<TData, TValue>[];
  pathname?: string;
  advancedFilter?: boolean;
  searchParams?: URLSearchParams;
  emptyStateProps?: EmptyStateProps;
  paginationOptions?: PaginationOptions;
  floatingBarContent?: React.ReactNode | null;
  filterableColumns?: DataTableFilterableColumn<TData>[];
  searchableColumns?: DataTableSearchableColumn<TData>[];
  deleteRowsAction?: React.MouseEventHandler<HTMLButtonElement>;
  pushFn?: (url: string, options?: { scroll?: boolean }) => void;
  onClickRow?: (row: TData) => void;
}

const DataTable = <TData, TValue>({
  columns,
  dataTable,
  emptyStateProps,
  searchableColumns = [],
  filterableColumns = [],
  paginationOptions,
  deleteRowsAction,
  onClickRow,
}: DataTableProps<TData, TValue>) => {
  const hasFilters = dataTable.getState().columnFilters.length > 0;
  const hasEmptyRows = dataTable.getRowModel().rows?.length === 0;

  return (
    <div className="w-full space-y-1 overflow-auto">
      <DataTableToolbar
        table={dataTable}
        filterableColumns={filterableColumns}
        searchableColumns={searchableColumns}
        deleteRowsAction={deleteRowsAction}
      />
      <Table>
        <TableHeader>
          {dataTable.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {dataTable.getRowModel().rows?.length
            ? dataTable.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => onClickRow?.(row.original)}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
            : (
            <TableRow className="hover:bg-inherit">
              <TableCell colSpan={columns.length} className="py-16">
                <EmptyState
                  actions={
                    hasFilters ? (
                      <Button
                        variant="outline"
                        onClick={() => dataTable.resetColumnFilters()}
                      >
                        Clear filters
                      </Button>
                    ) : undefined
                  }
                  {...emptyStateProps}
                />
              </TableCell>
            </TableRow>
            )}
        </TableBody>
      </Table>
      {paginationOptions && !hasEmptyRows && (
        <div className="space-y-2.5">
          <DataTablePagination table={dataTable} options={paginationOptions} />
        </div>
      )}
    </div>
  );
};

export { DataTable };
