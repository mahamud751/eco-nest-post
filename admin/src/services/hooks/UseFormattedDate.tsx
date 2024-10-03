// src/hooks/UseFormattedDate.ts
import { format } from "date-fns";

const UseFormattedDate = (date: Date | string) => {
  if (!date) return "";
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  return format(parsedDate, "MMM dd, yyyy, hh:mm:ss a");
};

export default UseFormattedDate;
