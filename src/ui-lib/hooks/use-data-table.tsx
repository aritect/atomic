import { useCallback, useEffect, useMemo, useState } from "react";

import { useDebounce } from "@alxshelepenok/react-hooks";

import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";

import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types-ui-lib";

interface UseDataTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  pageCount?: number;
  pathname?: string;
  searchParams?: URLSearchParams;
  pushFn?: (url: string, options?: { scroll?: boolean }) => void;
  searchableColumns?: DataTableSearchableColumn<TData>[];
  filterableColumns?: DataTableFilterableColumn<TData>[];
  manualPagination?: boolean;
  manualFiltering?: boolean;
  manualSorting?: boolean;
}

const useDataTable = <TData, TValue>({
  data,
  columns,
  pathname,
  pageCount,
  searchParams,
  manualSorting = false,
  manualFiltering = false,
  manualPagination = false,
  searchableColumns = [],
  filterableColumns = [],
  pushFn = () => {},
}: UseDataTableProps<TData, TValue>) => {
  const page = searchParams?.get("page") ?? "1";
  const pageAsNumber = Number(page);
  const fallbackPage = isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;
  const perPage = searchParams?.get("per_page") ?? "10";
  const perPageAsNumber = Number(perPage);
  const fallbackPerPage = isNaN(perPageAsNumber) ? 10 : perPageAsNumber;
  const sort = searchParams?.get("sort");
  const [column, order] = sort?.split(".") ?? [];

  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams],
  );

  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: fallbackPage - 1,
    pageSize: fallbackPerPage,
  });

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  useEffect(() => {
    setPagination({
      pageIndex: fallbackPage - 1,
      pageSize: fallbackPerPage,
    });
  }, [fallbackPage, fallbackPerPage]);

  useEffect(() => {
    pushFn(
      `${pathname}?${createQueryString({
        page: pageIndex + 1,
        per_page: pageSize,
      })}`,
      {
        scroll: false,
      },
    );
  }, [pageIndex, pageSize]);

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: column ?? "",
      desc: order === "desc",
    },
  ]);

  useEffect(() => {
    pushFn(`${pathname}?${createQueryString({
      page,
      sort: sorting[0]?.id
        ? `${sorting[0]?.id}.${sorting[0]?.desc ? "desc" : "asc"}`
        : null,
    })}`,);
  }, [sorting]);

  const debouncedSearchableColumnFilters = JSON.parse(useDebounce(JSON.stringify(columnFilters
    .filter((filter) => searchableColumns
      .find((searchableColumn) => searchableColumn.id === filter.id))), 500)) as ColumnFiltersState;

  const filterableColumnFilters = columnFilters
    .filter((filter) => filterableColumns
      .find((searchableColumn) => searchableColumn.id === filter.id,));

  useEffect(() => {
    const newParamsObject = {
      page: 1,
    };

    for (const columnFilter of debouncedSearchableColumnFilters) {
      if (typeof columnFilter.value === "string") {
        Object.assign(newParamsObject, {
          [columnFilter.id]: columnFilter.value,
        });
      }
    }

    for (const key of searchParams?.keys() ?? []) {
      if (
        searchableColumns.find((columnFilter) => columnFilter.id === key)
        && !debouncedSearchableColumnFilters.find((columnFilter) => columnFilter.id === key,)
      ) {
        Object.assign(newParamsObject, { [key]: null });
      }
    }

    pushFn(`${pathname}?${createQueryString(newParamsObject)}`);
  }, [JSON.stringify(debouncedSearchableColumnFilters)]);

  useEffect(() => {
    const newParamsObject = {
      page: 1,
    };

    for (const columnFilter of filterableColumnFilters) {
      if (
        typeof columnFilter.value === "object"
        && Array.isArray(columnFilter.value)
      ) {
        Object.assign(newParamsObject, {
          [columnFilter.id]: columnFilter.value.join("."),
        });
      }
    }

    for (const key of searchParams?.keys() ?? []) {
      if (
        filterableColumns.find((columnFilter) => columnFilter.id === key)
        && !filterableColumnFilters.find((columnFilter) => columnFilter.id === key)
      ) {
        Object.assign(newParamsObject, { [key]: null });
      }
    }

    pushFn(`${pathname}?${createQueryString(newParamsObject)}`);
  }, [JSON.stringify(filterableColumnFilters)]);

  const dataTable = useReactTable({
    data,
    columns,
    manualSorting,
    manualFiltering,
    manualPagination,
    pageCount: pageCount ?? -1,
    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return { dataTable };
};

export { useDataTable };
