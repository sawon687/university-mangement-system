'use client'
import React from "react";
import { Search } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetPayments } from "../../../hooks/payment.hook";
import { Payment } from "../../../type/payments.type";
import { usegetStatusBadge } from "../../../hooks/badgeStatus.hook";
const PaymentsTable = () => {
  const { data, isLoading } = useGetPayments();
  const payments = data?.data || [];
  console.log("payements", payments);
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
      </div>
    );
  }
  return (
    <>
      <Card className="border-border/60 shadow-xs overflow-hidden">
        {/* Table Header & Filters */}
        <div className="p-5 sm:p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-muted/20">
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Transactions Ledger
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Showing list of student payments with status
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tx ID, student..."
                className="pl-9 text-xs h-9 w-full sm:w-[240px]"
              />
            </div>

            {/* Status Filter Buttons */}
            <div className="flex items-center gap-1 bg-muted p-1 rounded-lg text-xs font-medium">
              {["ALL", "PAID", "PENDING", "FAILED"].map((status) => (
                <button
                //   key={status}
                //   onClick={() => setStatusFilter(status)}
                //   className={`px-3 py-1 rounded-md transition-all ${
                //     statusFilter === status
                //       ? "bg-background text-foreground shadow-xs font-semibold"
                //       : "text-muted-foreground hover:text-foreground"
                //   }`}
                >
                  {status.charAt(0) + status.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Separator />

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Transaction ID
                  </TableHead>
                  <TableHead className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Student Info
                  </TableHead>
                  <TableHead className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Type
                  </TableHead>
                  <TableHead className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Method
                  </TableHead>
                  <TableHead className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Amount
                  </TableHead>
                  <TableHead className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
                  </TableHead>
                  <TableHead className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-36 text-center text-sm text-muted-foreground"
                    >
                      No matching payment records found.
                    </TableCell>
                  </TableRow>
                ) : (
                  payments.map((payment: Payment) => (
                    <TableRow
                      key={payment.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <TableCell className="py-4 px-6 font-mono  text-xs font-medium text-foreground">
                        {payment.transactionId?.slice(0, 22) || "N/A"}...
                      </TableCell>

                      <TableCell className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-foreground">
                            {payment.user?.name || "Unknown User"}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {payment.user?.email || "No email provided"}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="py-4 px-6 text-xs font-medium">
                        <Badge
                          variant="outline"
                          className="font-normal text-[11px] bg-background"
                        >
                          {payment.paymentType}
                        </Badge>
                      </TableCell>

                      <TableCell className="py-4 px-6 text-xs text-muted-foreground font-medium">
                        {payment.paymentMethod}
                      </TableCell>

                      <TableCell className="py-4 px-6 text-xs font-bold text-foreground">
                        BDT {payment.amount.toLocaleString()}
                      </TableCell>

                      <TableCell className="py-4 px-6">
                        {usegetStatusBadge(payment.paymentStatus)}
                      </TableCell>

                      <TableCell className="py-4 px-6 text-xs text-muted-foreground">
                        {new Date(payment.createdAt).toLocaleDateString(
                          "en-BD",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default PaymentsTable;
