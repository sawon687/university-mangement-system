import apiFetch from '../lib/api-ofetch';
import { IPaymentReference } from '../type/payments.type';

export function userPayments(payload:IPaymentReference) {
  return apiFetch("/payments/initiate", {
    method: "POST",
    body:payload
  });
}

export function getStudentPayments() {
  return apiFetch(`/payments`, {
    method: "GET",
  });
}