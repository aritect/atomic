import React from "react";

import { type Table } from "@tanstack/react-table";

import { Button } from "@/components-ui-lib/button";
import { CloseIcon } from "@/icons-ui-lib/close-icon";
import { cn } from "@/utils-ui-lib/classnames";

interface DataTableFloatingBarProps<TData>
  extends React.HTMLAttributes<HTMLElement> {
  table: Table<TData>;
}

const DataTableFloatingBar = <TData, >({
  table,
  children,
  className,
  ...props
}: DataTableFloatingBarProps<TData>) => {
  if (table.getFilteredSelectedRowModel().rows.length <= 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "mx-auto flex w-fit items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-white",
        className,
      )}
      {...props}
    >
      <Button
        aria-label="Clear selection"
        title="Clear"
        className="h-auto bg-transparent p-1 text-white hover:bg-zinc-700"
        onClick={() => table.toggleAllRowsSelected(false)}
      >
        <CloseIcon className="h-4 w-4" aria-hidden="true" />
      </Button>
      {table.getFilteredSelectedRowModel().rows.length} row(s) selected
      {children}
    </div>
  );
};

export { DataTableFloatingBar };
