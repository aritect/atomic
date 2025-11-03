import { toast } from "sonner";
import { z } from "zod";

const catchError = (err: unknown) => {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => issue.message);
    return toast(errors.join("\n"));
  } else if (err instanceof Error) {
    return toast(err.message);
  } else {
    return toast("Something went wrong, please try again later.");
  }
};

export { catchError };
