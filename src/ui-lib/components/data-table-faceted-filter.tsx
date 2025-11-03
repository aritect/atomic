import React from "react";

import { type Column } from "@tanstack/react-table";

import { Badge } from "@/components-ui-lib/badge";
import { Button } from "@/components-ui-lib/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components-ui-lib/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components-ui-lib/popover";
import { Separator } from "@/components-ui-lib/separator";
import { CheckIcon } from "@/icons-ui-lib/check-icon";
import { CirclePlusIcon } from "@/icons-ui-lib/circle-plus-icon";
import type { Option } from "@/types-ui-lib";
import { cn } from "@/utils-ui-lib/classnames";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: Option[];
  variant?: "popover" | "command";
}

const DataTableFacetedFilter = <TData, TValue>({
  column,
  title,
  options,
  variant = "popover",
}: DataTableFacetedFilterProps<TData, TValue>) => {
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <>
      {variant === "popover" ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 border-dashed">
              <CirclePlusIcon className="mr-2 h-4 w-4" />
              {title}
              {selectedValues?.size > 0 && (
                <>
                  <Separator orientation="vertical" className="mx-2 h-4" />
                  <Badge
                    variant="default"
                    className="rounded-lg py-[2px] px-2 font-normal lg:hidden"
                  >
                    {selectedValues.size}
                  </Badge>
                  <div className="hidden space-x-1 lg:flex">
                    {selectedValues.size > 2 ? (
                      <Badge
                        variant="default"
                        className="rounded-lg py-[2px] px-2 font-normal"
                      >
                        {selectedValues.size} selected
                      </Badge>
                    )
                      : options
                        .filter((option) => selectedValues.has(option.value))
                        .map((option) => (
                          <Badge
                            variant="default"
                            key={option.value}
                            className="rounded-lg py-[2px] px-2 font-normal"
                          >
                            {option.label}
                          </Badge>
                        ))
                    }
                  </div>
                </>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <Command>
              <CommandInput placeholder={title} />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => {
                    const isSelected = selectedValues.has(option.value);
                    return (
                      <CommandItem
                        key={option.value}
                        onSelect={() => {
                          if (isSelected) {
                            selectedValues.delete(option.value);
                          } else {
                            selectedValues.add(option.value);
                          }
                          const filterValues = Array.from(selectedValues);
                          column?.setFilterValue(filterValues.length ? filterValues : undefined,);
                        }}
                      >
                        <div
                          className={cn(
                            "border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible",
                          )}
                        >
                          <CheckIcon
                            className={cn("h-4 w-4")}
                            aria-hidden="true"
                          />
                        </div>
                        {option.icon && (
                          <option.icon
                            className="text-muted-foreground mr-2 h-4 w-4"
                            aria-hidden="true"
                          />
                        )}
                        <span>{option.label}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
                {selectedValues.size > 0 && (
                  <>
                    <CommandSeparator />
                    <CommandGroup>
                      <CommandItem
                        onSelect={() => column?.setFilterValue(undefined)}
                        className="justify-center text-center"
                      >
                        Clear filters
                      </CommandItem>
                    </CommandGroup>
                  </>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      ) : (
        <Command className="p-1">
          <CommandInput
            placeholder={title}
            autoFocus
            showIcon={false}
            className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring duration-global flex h-8 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <CommandList className="mt-1">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(filterValues.length ? filterValues : undefined,);
                    }}
                  >
                    <div
                      className={cn(
                        "border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} aria-hidden="true" />
                    </div>
                    {option.icon && (
                      <option.icon
                        className="text-muted-foreground mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      )}
    </>
  );
};

export { DataTableFacetedFilter };
