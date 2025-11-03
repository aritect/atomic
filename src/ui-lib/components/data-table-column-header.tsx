import React from "react";

import { type Column } from "@tanstack/react-table";

import { Button } from "@/components-ui-lib/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components-ui-lib/dropdown-menu";
import { ArrowDownIcon } from "@/icons-ui-lib/arrow-down-icon";
import { ArrowUpIcon } from "@/icons-ui-lib/arrow-up-icon";
import { EyeOffIcon } from "@/icons-ui-lib/eye-off-icon";
import { SortByDownIcon } from "@/icons-ui-lib/sort-by-down-icon";
import { SortByUpIcon } from "@/icons-ui-lib/sort-by-up-icon";
import { SortIcon } from "@/icons-ui-lib/sort-icon";
import { cn } from "@/utils-ui-lib/classnames";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

const DataTableColumnHeader = <TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) => {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label={
              column.getIsSorted() === "desc"
                ? "Sorted descending. Click to sort ascending."
                : column.getIsSorted() === "asc"
                  ? "Sorted ascending. Click to sort descending."
                  : "Not sorted. Click to sort ascending."
            }
            variant="ghost"
            size="sm"
            className="data-[state=open]:bg-accent -ml-3 h-8"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <SortByDownIcon className="ml-2 h-4 w-4" aria-hidden="true" />
            ) : column.getIsSorted() === "asc" ? (
              <SortByUpIcon className="ml-2 h-4 w-4" aria-hidden="true" />
            ) : (
              <SortIcon className="ml-2 h-4 w-4" aria-hidden="true" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            aria-label="Sort ascending"
            onClick={() => column.toggleSorting(false)}
          >
            <ArrowUpIcon
              className="text-muted-foreground/70 mr-2 h-3.5 w-3.5"
              aria-hidden="true"
            />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            aria-label="Sort descending"
            onClick={() => column.toggleSorting(true)}
          >
            <ArrowDownIcon
              className="text-muted-foreground/70 mr-2 h-3.5 w-3.5"
              aria-hidden="true"
            />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            aria-label="Hide column"
            onClick={() => column.toggleVisibility(false)}
          >
            <EyeOffIcon
              className="text-muted-foreground/70 mr-2 h-3.5 w-3.5"
              aria-hidden="true"
            />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export { DataTableColumnHeader };
