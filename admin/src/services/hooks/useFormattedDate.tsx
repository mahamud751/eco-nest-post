// src/hooks/useFormattedDate.ts
import { format } from "date-fns";

const useFormattedDate = (date: Date | string) => {
  if (!date) return "";
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  return format(parsedDate, "MMM dd, yyyy, hh:mm:ss a");
};

export default useFormattedDate;
