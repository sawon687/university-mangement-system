import React from "react";
import { Button } from "../../../../components/ui/button";
import PaymentsTable from "../../../../components/modules/payments/payments-table";

const PaymentsPage = () => {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Top Banner / Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Payment Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor student transactions, admission fees, and financial
            statuses.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="text-xs font-medium h-9">
            Export Report
          </Button>
        </div>
      </div>

      {/* Main Table Container */}
      <PaymentsTable />
    </div>
  );
};

export default PaymentsPage;
