"use client";

import { useState } from "react";
import type { ElementType } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  CreditCard,
  GraduationCap,
  Receipt,
  Wallet,
  Loader2,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useGetMyInstallmentFee } from "../../../hooks/my-Installment-fee.hook";
import { PaymentStatus } from "../../../type";
import type { IFee } from "../../../type";
import { usegetStatusBadge } from "../../../hooks/badgeStatus.hook";
import { usePaymentsCreate } from "../../../hooks/payment.hook";
import { toast } from "../../ui/toast";

type InstallmentNumber = 1 | 2 | 3;

interface FeeSemesterProps {
  semesterId: string;
}

interface Installment {
  number: InstallmentNumber;
  title: string;
  amount: number;
  remaining: number;
  status: PaymentStatus;
}

const toNumber = (value: number | string | null | undefined): number => {
  const number = Number(value ?? 0);
  return Number.isFinite(number) ? number : 0;
};

const formatMoney = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(amount);

function FeeMetric({
  title,
  value,
  icon: Icon,
  description,
}: {
  title: string;
  value: string;
  icon: ElementType;
  description?: string;
}) {
  return (
    <div className="rounded-xl border bg-background p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="rounded-lg bg-muted p-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <p className="text-xl font-bold tracking-tight sm:text-2xl">{value}</p>

      {description && (
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

export default function FeeSemester({ semesterId }: FeeSemesterProps) {
  const { data, isLoading, isError } = useGetMyInstallmentFee(semesterId);

  const [amounts, setAmounts] = useState<Record<InstallmentNumber, string>>({
    1: "",
    2: "",
    3: "",
  });

  // কোন ইনস্টলমেন্টে ক্লিক করা হয়েছে তা ট্র্যাক করার জন্য
  const [loadingInstallmentNumber, setLoadingInstallmentNumber] = useState<InstallmentNumber | null>(null);

  const { mutate: paymentCreate, isPending } = usePaymentsCreate();

  const fee: IFee | null = data?.data ?? null;

  const handlePayment = (installment: Installment) => {
    if (!fee) return;

    const input = amounts[installment.number];
    const amount = input.trim() === "" ? installment.remaining : Number(input);

    // কোন ইনস্টলমেন্ট লোড হচ্ছে তা সেট করা
    setLoadingInstallmentNumber(installment.number);

    paymentCreate(
      { feeId: fee.id, semesterFees: amount },
      {
        onSuccess: (res) => {
          setLoadingInstallmentNumber(null);
          window.location = res?.data?.paymentUrl;
          toast.add({
            title: "Payment success",
            description: res.message,
            type: "success",
          });
        },
        onError: (error: any) => {
          setLoadingInstallmentNumber(null);
          toast.add({
            title: "Payment failed",
            description: error?.data?.message || error?.errors?.message || "Something went wrong",
            type: "Error",
          });
        },
      }
    );
  };

  // Loading
  if (isLoading) {
    return (
      <div className="space-y-5">
        <div className="h-32 animate-pulse rounded-2xl bg-muted" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-xl bg-muted"
            />
          ))}
        </div>
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <Card className="border-red-200">
        <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
          <AlertCircle className="h-10 w-10 text-red-500" />
          <h3 className="font-semibold">Failed to load semester fee</h3>
          <p className="text-sm text-muted-foreground">
            Could not retrieve your installment information. Please try again.
          </p>
        </CardContent>
      </Card>
    );
  }

  // No fee
  if (!fee) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
          <Receipt className="h-10 w-10 text-muted-foreground" />
          <h3 className="font-semibold">No fee information found</h3>
          <p className="text-sm text-muted-foreground">
            No installment fee record was found for this semester.
          </p>
        </CardContent>
      </Card>
    );
  }

  const totalAmount = toNumber(fee.totalAmount);
  const remainingAmount = toNumber(fee.remainingAmount);
  const perCreditRate = toNumber(fee.perCreditRate);
  const paidAmount = Math.max(0, totalAmount - remainingAmount);

  const installments: Installment[] = [
    {
      number: 1,
      title: "First Installment",
      amount: toNumber(fee.firstInstallmentAmount),
      remaining: toNumber(fee.firstInstallmentRemainingAmount),
      status: fee.firstInstallmentStatus,
    },
    {
      number: 2,
      title: "Second Installment",
      amount: toNumber(fee.secondInstallmentAmount),
      remaining: toNumber(fee.secondInstallmentRemainingAmount),
      status: fee.secondInstallmentStatus,
    },
    {
      number: 3,
      title: "Third Installment",
      amount: toNumber(fee.thirdInstallmentAmount),
      remaining: toNumber(fee.thirdInstallmentRemainingAmount),
      status: fee.thirdInstallmentStatus,
    },
  ];

  const paidInstallments = installments.filter(
    (item) => item.status === PaymentStatus.PAID || item.remaining <= 0,
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-orange-500/10 via-background to-amber-500/5 p-5 sm:p-7">
        <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="rounded-xl bg-orange-500 p-2.5 text-white">
                <GraduationCap className="h-5 w-5" />
              </div>
              <Badge variant="outline">Semester Fee</Badge>
            </div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              My Semester Installments
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Manage your semester fees, track installment status, and pay your
              outstanding balance.
            </p>
          </div>

          <div className="rounded-xl border bg-background/80 p-4 sm:min-w-48">
            <p className="text-sm text-muted-foreground">Remaining Balance</p>
            <p className="mt-1 text-2xl font-bold text-orange-600">
              {formatMoney(remainingAmount)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {paidInstallments} of 3 installments paid
            </p>
          </div>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <FeeMetric
          title="Total Semester Fee"
          value={formatMoney(totalAmount)}
          icon={CircleDollarSign}
          description="Total payable amount"
        />
        <FeeMetric
          title="Paid Amount"
          value={formatMoney(paidAmount)}
          icon={Wallet}
          description="Amount already paid"
        />
        <FeeMetric
          title="Remaining Amount"
          value={formatMoney(remainingAmount)}
          icon={CreditCard}
          description="Outstanding balance"
        />
        <FeeMetric
          title="Per Credit Amount"
          value={formatMoney(perCreditRate)}
          icon={CreditCard}
          description="Fee per credit hour"
        />
      </div>

      {/* Installments Breakdown */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold tracking-tight">
            Installment Breakdown
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Review your outstanding balance and choose an amount to pay.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {installments.map((installment) => {
            const isPaid =
              installment.status === PaymentStatus.PAID ||
              installment.remaining <= 0;

            const canPay = !isPaid && installment.remaining > 0;
            const inputValue = amounts[installment.number];

            const enteredAmount =
              inputValue.trim() === ""
                ? installment.remaining
                : Number(inputValue);

            const invalidAmount =
              inputValue.trim() !== "" &&
              (!Number.isFinite(enteredAmount) ||
                enteredAmount <= 0 ||
                enteredAmount > installment.remaining);

            const paidForInstallment = Math.max(
              0,
              installment.amount - installment.remaining,
            );

            const progress =
              installment.amount > 0
                ? Math.min(
                    100,
                    Math.max(
                      0,
                      (paidForInstallment / installment.amount) * 100,
                    ),
                  )
                : 0;

    
            const isThisLoading = loadingInstallmentNumber === installment.number;

            return (
              <Card
                key={installment.number}
                className={`rounded-2xl transition-shadow hover:shadow-md ${
                  isPaid ? "border-emerald-200" : "border-border"
                }`}
              >
                <CardContent className="space-y-5 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                          isPaid
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-orange-500/10 text-orange-600"
                        }`}
                      >
                        {isPaid ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <CreditCard className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold">{installment.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          Installment {installment.number} of 3
                        </p>
                      </div>
                    </div>

                    {usegetStatusBadge(installment.status)}
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Installment Amount
                    </p>
                    <p className="mt-1 text-2xl font-bold tracking-tight">
                      {formatMoney(installment.amount)}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 text-sm">
                      <span className="text-muted-foreground">Remaining</span>
                      <span className="font-semibold">
                        {formatMoney(installment.remaining)}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  <Separator />

                  {!isPaid && (
                    <div className="space-y-2">
                      <Label htmlFor={`amount-${installment.number}`}>
                        Payment Amount (BDT)
                      </Label>
                      <Input
                        id={`amount-${installment.number}`}
                        type="number"
                        min="0.01"
                        max={installment.remaining}
                        step="0.01"
                        inputMode="decimal"
                        placeholder={String(installment.remaining)}
                        value={inputValue}
                        onChange={(event) =>
                          setAmounts((previous) => ({
                            ...previous,
                            [installment.number]: event.target.value,
                          }))
                        }
                        aria-invalid={invalidAmount}
                      />
                      <p className="text-xs text-muted-foreground">
                        Maximum payable: {formatMoney(installment.remaining)}
                      </p>
                      {invalidAmount && (
                        <p className="text-xs text-red-600">
                          Enter an amount greater than 0 and no more than the
                          remaining balance.
                        </p>
                      )}
                    </div>
                  )}

                  <Button
                    type="button"
                    className="w-full"
                    variant={isPaid ? "outline" : "default"}
                    disabled={!canPay || invalidAmount || isPending}
                    onClick={() => handlePayment(installment)}
                  >
                    {isThisLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : isPaid ? (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Fully Paid
                      </>
                    ) : (
                      <>
                        Pay {formatMoney(enteredAmount)}
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}