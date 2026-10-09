export interface IPaymentReference {
	applicationsId?: string;
	feeId?: string;
	semesterFees?: number;
}

export interface Payment {
  id: string
  userId: string
  feeId?: string | null
  amount: number
  paymentType:   "ADMISSION_FEE"|"SEMESTER_FEE"
  paymentMethod: 'STRIPE' | 'SSLCOMMERZ' | 'BKASH' | 'CASH'
  paymentStatus: 'PENDING' | 'SUCCESS' | 'FAILED' | 'PAID'
  transactionId?: string | null
  admissionId?: string | null
  paidAt?: string | null
  createdAt: string
  user?: {
    name?: string
    email?: string
  }
}