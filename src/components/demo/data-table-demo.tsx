import React, { useMemo } from "react";

import { type ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components-ui-lib/badge";
import { Button } from "@/components-ui-lib/button";
import { Checkbox } from "@/components-ui-lib/checkbox";
import { DataTable } from "@/components-ui-lib/data-table";
import { DataTableColumnHeader } from "@/components-ui-lib/data-table-column-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components-ui-lib/dropdown-menu";
import { useDataTable } from "@/hooks-ui-lib/use-data-table";
import { ArrowDownIcon } from "@/icons-ui-lib/arrow-down-icon";
import { ArrowRightIcon } from "@/icons-ui-lib/arrow-right-icon";
import { ArrowUpIcon } from "@/icons-ui-lib/arrow-up-icon";
import { CircleCheckIcon } from "@/icons-ui-lib/circle-check-icon";
import { CircleHelpIcon } from "@/icons-ui-lib/circle-help-icon";
import { CircleIcon } from "@/icons-ui-lib/circle-icon";
import { CircleMultiplicationIcon } from "@/icons-ui-lib/circle-multiplication-icon";
import { EllipsisIcon } from "@/icons-ui-lib/ellipsis-icon";
import { TimerIcon } from "@/icons-ui-lib/timer-icon";
import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types-ui-lib";

interface Task {
  id: number;
  code: string;
  title: string;
  status: "todo" | "in-progress" | "done" | "canceled";
  label: "bug" | "feature" | "enhancement" | "documentation";
  priority: "low" | "medium" | "high";
}

const availableLabels = ["bug", "feature", "enhancement", "documentation"];
const availableStatuses = ["todo", "in-progress", "done", "canceled"];
const availablePriorities = ["low", "medium", "high"];

const fetchTasksTableColumnDefs = (): ColumnDef<Task>[] => [
  {
    id: "select",
    header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
          }}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
    ),
    cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "code",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("code")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const label = availableLabels.find((foundLabel) => foundLabel === row.original.label);

      return (
          <div className="flex space-x-2">
            {label && <Badge variant={"neutral"}>{label}</Badge>}
            <span className="max-w-[200px] truncate font-medium">
              {row.getValue("title")}
            </span>
          </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = availableStatuses.find((foundStatus) => foundStatus === row.original.status,);

      if (!status) {
        return null;
      }

      return (
          <div className="flex w-[100px] items-center">
            {status === "canceled" ? (
              <CircleMultiplicationIcon
                className="shrink-0 text-muted-foreground mr-2 size-4"
                aria-hidden="true"
              />
            ) : status === "done" ? (
              <CircleCheckIcon
                className="shrink-0 text-muted-foreground mr-2 size-4"
                aria-hidden="true"
              />
            ) : status === "in-progress" ? (
              <TimerIcon
                className="shrink-0 text-muted-foreground mr-2 size-4"
                aria-hidden="true"
              />
            ) : status === "todo" ? (
              <CircleHelpIcon
                className="shrink-0 text-muted-foreground mr-2 size-4"
                aria-hidden="true"
              />
            ) : (
              <CircleIcon
                className="shrink-0 text-muted-foreground mr-2 size-4"
                aria-hidden="true"
              />
            )}
            <span className="capitalize whitespace-nowrap">{status}</span>
          </div>
      );
    },
    filterFn: (row, id, value) => value instanceof Array && value.includes(row.getValue(id)),
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = availablePriorities.find((foundPriority) => foundPriority === row.original.priority,);

      if (!priority) {
        return null;
      }

      return (
          <div className="flex min-w-[100px] items-center">
            {priority === "low" ? (
              <ArrowDownIcon
                className="text-muted-foreground mr-2 size-4"
                aria-hidden="true"
              />
            ) : priority === "medium" ? (
              <ArrowRightIcon
                className="text-muted-foreground mr-2 size-4"
                aria-hidden="true"
              />
            ) : priority === "high" ? (
              <ArrowUpIcon
                className="text-muted-foreground mr-2 size-4"
                aria-hidden="true"
              />
            ) : (
              <CircleIcon
                className="text-muted-foreground mr-2 size-4"
                aria-hidden="true"
              />
            )}
            <span className="capitalize">{priority}</span>
          </div>
      );
    },
    filterFn: (row, id, value) => value instanceof Array && value.includes(row.getValue(id)),
  },
  {
    id: "actions",
    cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label="Open menu"
              variant="ghost"
              className="data-[state=open]:bg-muted flex size-8 p-0"
            >
              <EllipsisIcon className="size-4" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={row.original.label}>
                  {availableLabels.map((label) => (
                    <DropdownMenuRadioItem
                      key={label}
                      value={label}
                      className="capitalize"
                    >
                      {label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    ),
  },
];

const filterableColumns: DataTableFilterableColumn<Task>[] = [
  {
    id: "status",
    title: "Status",
    options: [
      {
        value: "todo",
        label: "To do",
      },
      {
        value: "in-progress",
        label: "In progress",
      },
      {
        value: "done",
        label: "Done",
      },
      {
        value: "canceled",
        label: "Canceled",
      },
    ],
  },
  {
    id: "priority",
    title: "Priority",
    options: [
      {
        value: "low",
        label: "Low",
      },
      {
        value: "medium",
        label: "Medium",
      },
      {
        value: "high",
        label: "High",
      },
    ],
  },
];

const demoTasks: Task[] = [
  {
    id: 1,
    code: "T-0001",
    title: "Add a new feature to the dashboard",
    status: "done",
    label: "feature",
    priority: "high",
  },
  {
    id: 2,
    code: "T-0002",
    title: "Fix the bug on the login page",
    status: "done",
    label: "bug",
    priority: "high",
  },
  {
    id: 3,
    code: "T-0003",
    title: "Create a new page for the documentation",
    status: "in-progress",
    label: "documentation",
    priority: "medium",
  },
  {
    id: 4,
    code: "T-0004",
    title: "Add a new feature to the dashboard",
    status: "todo",
    label: "feature",
    priority: "low",
  },
  {
    id: 5,
    code: "T-0005",
    title: "Fix the bug on the login page",
    status: "todo",
    label: "bug",
    priority: "low",
  },
  {
    id: 6,
    code: "T-0006",
    title: "Create a new page for the documentation",
    status: "in-progress",
    label: "documentation",
    priority: "medium",
  },
  {
    id: 7,
    code: "T-0007",
    title: "Add a new feature to the dashboard",
    status: "todo",
    label: "feature",
    priority: "low",
  },
  {
    id: 8,
    code: "T-0008",
    title: "Fix the bug on the login page",
    status: "todo",
    label: "bug",
    priority: "low",
  },
  {
    id: 9,
    code: "T-0009",
    title: "Create a new page for the documentation",
    status: "in-progress",
    label: "documentation",
    priority: "medium",
  },
  {
    id: 10,
    code: "T-0010",
    title: "Add a new feature to the dashboard",
    status: "todo",
    label: "feature",
    priority: "low",
  },
  {
    id: 11,
    code: "T-0011",
    title: "Fix the bug on the login",
    status: "todo",
    label: "feature",
    priority: "low",
  },
];

const searchableColumns: DataTableSearchableColumn<Task>[] = [
  {
    id: "title",
    title: "titles",
  },
];

const DataTableDemo = () => {
  const pathname = "/tasks";

  const columns = useMemo<ColumnDef<Task>[]>(
    () => fetchTasksTableColumnDefs(),
    [],
  );

  const { dataTable } = useDataTable({
    data: demoTasks,
    columns,
    pageCount: 1,
    searchableColumns,
    filterableColumns,
    pathname,
    pushFn: () => {},
  });

  return (
    <div className="h-full min-h-[500px] overflow-auto">
      <DataTable
        columns={columns}
        dataTable={dataTable}
        searchableColumns={searchableColumns}
        filterableColumns={filterableColumns}
      />
    </div>
  );
};

export { DataTableDemo };
