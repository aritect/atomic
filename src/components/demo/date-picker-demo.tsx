import React, { useState } from "react";

import { format } from "date-fns";

import { Button } from "@/components-ui-lib/button";
import { Calendar } from "@/components-ui-lib/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components-ui-lib/popover";
import { CalendarIcon } from "@/icons-ui-lib/calendar-icon";
import { cn } from "@/utils-ui-lib/classnames";

const DatePickerDemo = () => {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[200px] justify-start px-3 text-left",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon size={16} className="mr-2" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          className="rounded-[7px]"
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePickerDemo };
