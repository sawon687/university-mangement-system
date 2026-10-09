import { createElement } from "react";
import {
  CheckCircle2,
  Clock3,
  CreditCard,
  SearchCheck,
  XCircle,
  CircleCheck,
  CircleDashed,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

export const usegetStatusBadge = (status: string) => {
  const statusConfig: Record<
    string,
    {
      label: string;
      className: string;
      icon: React.ElementType;
    }
  > = {
    ACTIVE: {
      label: "Active",
      className:
        "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/30 dark:text-green-400",
      icon: CheckCircle2,
    },

    PENDING: {
      label: "Pending",
      className:
        "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900 dark:bg-yellow-950/30 dark:text-yellow-400",
      icon: Clock3,
    },

    UNDER_REVIEW: {
      label: "Under Review",
      className:
        "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-400",
      icon: SearchCheck,
    },

    ACCEPTED: {
      label: "Accepted",
      className:
        "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400",
      icon: CircleCheck,
    },

    REJECTED: {
      label: "Rejected",
      className:
        "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400",
      icon: XCircle,
    },

    PAID: {
      label: "Paid",
      className:
        "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900 dark:bg-purple-950/30 dark:text-purple-400",
      icon: CreditCard,
    },

    SUCCESS: {
      label: "Success",
      className:
        "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400",
      icon: CheckCircle2,
    },

    FAILED: {
      label: "Failed",
      className:
        "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-400",
      icon: XCircle,
    },
  };

  const config = statusConfig[status] ?? {
    label: status.replaceAll("_", " "),
    className:
      "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300",
    icon: CircleDashed,
  };

  return createElement(Badge, {
    variant: "outline",
    className: `inline-flex w-fit items-center gap-1.5 ${config.className}`,
    children: createElement(
      "span",
      { className: "inline-flex items-center gap-1.5" },
      createElement(config.icon, {
        className: "h-3.5 w-3.5",
      }),
      config.label,
    ),
  });
};