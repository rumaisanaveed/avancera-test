import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function truncateText(text = "") {
  if (typeof text !== "string") return "";
  return text.length > 50 ? `${text.slice(0, 50)}...` : text;
}

export const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "bg-red-500";
    case "completed":
      return "bg-green-500";
    case "in-progress":
      return "bg-gray-500";
    default:
      return "text-black";
  }
};
