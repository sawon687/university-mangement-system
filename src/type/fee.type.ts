export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export interface IFee {
  id: string;
  studentId: string;
  semesterId: string;
  feeType: string;

  totalCredit: number;
  perCreditRate: number;

  totalAmount: number;
  remainingAmount: number;

  // 1st installment
  firstInstallmentAmount: number;
  firstInstallmentRemainingAmount: number;
  firstInstallmentStatus: PaymentStatus;

  // 2nd installment
  secondInstallmentAmount: number;
  secondInstallmentRemainingAmount: number;
  secondInstallmentStatus: PaymentStatus;

  // 3rd installment
  thirdInstallmentAmount: number;
  thirdInstallmentRemainingAmount: number;
  thirdInstallmentStatus: PaymentStatus;
}
