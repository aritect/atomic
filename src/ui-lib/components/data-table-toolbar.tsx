import React, { useState, useTransition, useRef, useCallback } from "react";

import type { Table } from "@tanstack/react-table";

import { ScrollArea } from "@/components-ui-lib/scroll-area";
import { Button, buttonVariants } from "@/components-ui-lib/button";
import { Input } from "@/components-ui-lib/input";
import { Link } from "@/components-ui-lib/link";
import { CirclePlusIcon } from "@/icons-ui-lib/circle-plus-icon";
import { CloseIcon } from "@/icons-ui-lib/close-icon";
import { TrashIcon } from "@/icons-ui-lib/trash-icon";
import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types-ui-lib";
import { useResizeObserver  } from "@/hooks-ui-lib/use-resize-observer";
import { cn } from "@/utils-ui-lib/classnames";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterableColumns?: DataTableFilterableColumn<TData>[];
  searchableColumns?: DataTableSearchableColumn<TData>[];
  newRowLink?: string;
  linkComponent?: React.ComponentType<React.ComponentPropsWithoutRef<"a">>;
  deleteRowsAction?: React.MouseEventHandler<HTMLButtonElement>;
}

const DataTableToolbar = <TData,>({
  table,
  filterableColumns = [],
  searchableColumns = [],
  newRowLink,
  deleteRowsAction,
  linkComponent: LinkComponent = Link,
}: DataTableToolbarProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [isPending, startTransition] = useTransition();
  const [showGradient, setShowGradient] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const checkScrollOverflow = useCallback(() => {
    if (!scrollAreaRef.current) {
      return undefined;
    }

    const viewport = scrollAreaRef.current?.querySelector("[data-radix-scroll-area-viewport]");

    if (viewport) {
      const isScrollAtEnd = (viewport.scrollWidth - viewport.clientWidth - viewport.scrollLeft) < 5;
      setShowGradient(!isScrollAtEnd || (viewport.scrollWidth === viewport.clientWidth));
    }
  }, []);

  useResizeObserver(containerRef, () => {
    checkScrollOverflow();
  });

  return (
    <div className="relative">
      <ScrollArea
        className="pb-4"
        ref={scrollAreaRef}
        orientation="horizontal"
        onScrollCapture={checkScrollOverflow}
      >
        <div ref={containerRef} className={"flex w-max items-center space-x-2 p-1"}>
          {searchableColumns.length > 0 &&
            searchableColumns.map(
              (column) =>
                table.getColumn(column.id ? String(column.id) : "") && (
                  <Input
                    key={String(column.id)}
                    placeholder={`Filter ${column.title}...`}
                    value={(table.getColumn(String(column.id))?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn(String(column.id))?.setFilterValue(event.target.value)}
                    className="h-8 w-[150px] lg:w-[250px]"
                  />
                )
            )}
          {filterableColumns.length > 0 &&
            filterableColumns.map(
              (column) =>
                table.getColumn(column.id ? String(column.id) : "") && (
                  <DataTableFacetedFilter
                    key={String(column.id)}
                    column={table.getColumn(column.id ? String(column.id) : "")}
                    title={column.title}
                    options={column.options}
                  />
                )
            )}
          {isFiltered && (
            <Button
              aria-label="Reset filters"
              variant="ghost"
              className="h-8 px-2 lg:px-3"
              onClick={() => table.resetColumnFilters()}
            >
              Reset
              <CloseIcon className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          )}
          <div className="flex items-center space-x-2">
            {deleteRowsAction && table.getSelectedRowModel().rows.length > 0 ? (
              <Button
                aria-label="Delete selected rows"
                variant="outline"
                size="sm"
                className="h-8"
                onClick={(event) => {
                  startTransition(() => {
                    table.toggleAllPageRowsSelected(false);
                    deleteRowsAction(event);
                  });
                }}
                disabled={isPending}
              >
                <TrashIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                Delete
              </Button>
            ) : newRowLink ? (
              <LinkComponent aria-label="Create new row" href={newRowLink}>
                <div
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "sm",
                      className: "h-8",
                    })
                  )}
                >
                  <CirclePlusIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                  New
                </div>
              </LinkComponent>
            ) : null}
            <DataTableViewOptions table={table} />
          </div>
        </div>
      </ScrollArea>
      <div
        className={cn(
          "pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-background to-transparent transition-opacity duration-global",
          showGradient ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
};

export { DataTableToolbar };
