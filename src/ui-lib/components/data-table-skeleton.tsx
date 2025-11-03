import React from "react";

import { Skeleton } from "@/components-ui-lib/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components-ui-lib/table";

import { PaginationVariant } from "./data-table-pagination";

interface DataTableSkeletonProps {
  columnCount: number;
  rowCount?: number;
  searchableColumnCount?: number;
  filterableColumnCount?: number;
  paginationVariant?: PaginationVariant;
}

const DataTableSkeleton = ({
  columnCount,
  paginationVariant,
  rowCount = 10,
  searchableColumnCount = 1,
  filterableColumnCount = 1,
}: DataTableSkeletonProps) => (
    <div className="w-full space-y-1 overflow-auto">
      <div className="flex w-full items-center justify-between space-x-2 overflow-auto p-1 pb-4">
        <div className="flex flex-1 items-center space-x-2">
          {searchableColumnCount > 0
            ? Array.from({ length: searchableColumnCount }).map((_, i) => (
                <Skeleton key={i} className="h-7 w-[150px] lg:w-[250px]" />
            ))
            : null}
          {filterableColumnCount > 0
            ? Array.from({ length: filterableColumnCount }).map((_, i) => (
                <Skeleton key={i} className="h-7 w-[70px] border-dashed" />
            ))
            : null}
        </div>
        <Skeleton className="ml-auto hidden h-7 w-[70px] lg:flex" />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {Array.from({ length: 1 }).map((_, i) => (
              <TableRow key={i} className="hover:bg-transparent">
                {Array.from({ length: columnCount }).map((_o, j) => (
                  <TableHead key={j}>
                    <Skeleton className="h-6 w-full" />
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {Array.from({ length: rowCount }).map((_, i) => (
              <TableRow key={i} className="hover:bg-transparent">
                {Array.from({ length: columnCount }).map((_o, j) => (
                  <TableCell key={j}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {paginationVariant && (
        <div className="flex w-full flex-col items-center justify-between gap-4 overflow-auto px-2 py-1 sm:flex-row sm:gap-8">
          <div className="flex-1">
            <Skeleton className="h-8 w-40" />
          </div>
          {paginationVariant === PaginationVariant.INFINITY && (
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-20" />
            </div>
          )}

          {paginationVariant === PaginationVariant.BASIC && (
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-[70px]" />
              </div>
              <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                <Skeleton className="h-8 w-20" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="hidden h-8 w-8 lg:block" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="hidden h-8 w-8 lg:block" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
);

export { DataTableSkeleton };
