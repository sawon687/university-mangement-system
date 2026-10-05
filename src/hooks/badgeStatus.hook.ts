import { createElement } from "react";
import { Badge } from "@/components/ui/badge";


export const usegetStatusBadge = (status: string) => {
  if (status === "ACTIVE") {
    return createElement(Badge, {
      variant: "outline",
      className:
        "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/30 dark:text-green-400",
      children: "Active",
    });
  }

  return createElement(Badge, {
    variant: "outline",
    className:
      "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900 dark:bg-yellow-950/30 dark:text-yellow-400",
    children: "Pending",
  });
};
