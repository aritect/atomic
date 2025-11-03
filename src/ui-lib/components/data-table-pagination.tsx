import React from "react";

import { type Table } from "@tanstack/react-table";

import { Button } from "@/components-ui-lib/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components-ui-lib/select";
import { ArrowMoveDownLeftIcon } from "@/icons-ui-lib/arrow-move-down-left-icon";
import { ChevronLeftIcon } from "@/icons-ui-lib/chevron-left-icon";
import { ChevronRightIcon } from "@/icons-ui-lib/chevron-right-icon";
import { ChevronsLeftIcon } from "@/icons-ui-lib/chevrons-left-icon";
import { ChevronsRightIcon } from "@/icons-ui-lib/chevrons-right-icon";

enum PaginationVariant {
  BASIC = "basic",
  INFINITY = "infinity",
}

enum PaginationLeftFooterContentVariant {
  DEFAULT = "default",
  SELECTED = "selected",
}

interface PaginationOptions {
  variant?: PaginationVariant;
  entryName: string;
  infinityNextPage?: () => void;
  infinityHasNextPage?: boolean;
  basicPageSizeOptions?: number[];
  leftFooterContentVariant?: PaginationLeftFooterContentVariant;
}

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  options: PaginationOptions;
}

const DataTablePagination = <TData, >({
  table,
  options: {
    entryName,
    variant = PaginationVariant.BASIC,
    leftFooterContentVariant = PaginationLeftFooterContentVariant.DEFAULT,
    basicPageSizeOptions = [
      10, 20, 30, 40, 50,
    ],
    infinityHasNextPage,
    infinityNextPage,
  },
}: DataTablePaginationProps<TData>) => (
    <div className="flex w-full flex-col items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8">
      {leftFooterContentVariant
        === PaginationLeftFooterContentVariant.DEFAULT && (
        <div className="text-muted-foreground flex-1 whitespace-nowrap text-sm">
          {`Showing 1 - ${table.getFilteredRowModel().rows.length} ${entryName}s.`}
        </div>
      )}

      {leftFooterContentVariant
        === PaginationLeftFooterContentVariant.SELECTED && (
        <div className="text-muted-foreground flex-1 whitespace-nowrap text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      )}

      {variant === PaginationVariant.INFINITY && (
        <Button
          size="sm"
          variant="outline"
          aria-label="Load more"
          className="ml-auto h-8"
          onClick={infinityNextPage}
          disabled={!infinityHasNextPage}
        >
          <ArrowMoveDownLeftIcon className="mr-2 h-4 w-4" />
          Load more
        </Button>
      )}

      {variant === PaginationVariant.BASIC && (
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
          <div className="flex items-center space-x-2">
            <p className="whitespace-nowrap text-sm font-medium">
              Rows per page
            </p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {basicPageSizeOptions.map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              aria-label="Go to first page"
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeftIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to previous page"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to next page"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to last page"
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRightIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );

export {
  PaginationVariant,
  PaginationLeftFooterContentVariant,
  type PaginationOptions,
  DataTablePagination,
};
