import React, { useState } from "react";

import { Calendar } from "@/components-ui-lib/calendar";

const CalendarDemo = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-lg border"
    />
  );
};

export { CalendarDemo };
