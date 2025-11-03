import React from "react";

import { type Table } from "@tanstack/react-table";

import { Button } from "@/components-ui-lib/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components-ui-lib/dropdown-menu";
import { SettingsIcon } from "@/icons-ui-lib/settings-icon";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

const DataTableViewOptions = <TData, >({
  table,
}: DataTableViewOptionsProps<TData>) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Toggle columns"
          variant="outline"
          size="sm"
          className="hidden h-8 lg:flex"
        >
          <SettingsIcon className="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide(),)
          .map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

export { DataTableViewOptions };
