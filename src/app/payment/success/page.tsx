"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Home,
  FileText,
  ShieldCheck,
  Printer,
  User,
  CreditCard,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();

  // Dynamic parameters from URL (with fallback mock values if testing directly)
  const transactionId = searchParams.get("tranId") || searchParams.get("txId") || "TXN-2026-89421A";
  const amount = searchParams.get("amount") || "10,500";
  const currency = searchParams.get("currency") || "BDT";
  const studentName = searchParams.get("name") || "Student";
  const paymentMethod = searchParams.get("method") || "Stripe";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg space-y-6">
        
        {/* Main Success Card */}
        <Card className="overflow-hidden border-border/60 shadow-lg transition-all">
          <div className="h-2 bg-emerald-500" />
          
          <CardHeader className="flex flex-col items-center text-center pb-2 pt-8">
            <div className="mb-4 rounded-full bg-emerald-100 p-4 text-emerald-600 shadow-inner animate-bounce duration-1000">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            
            <Badge variant="outline" className="mb-2 border-emerald-200 bg-emerald-50 text-emerald-700">
              Payment Successful
            </Badge>
            
            <CardTitle className="text-2xl font-bold tracking-tight">
              Admission Fee Received!
            </CardTitle>
            
            <CardDescription className="text-sm mt-1">
              Thank you, <span className="font-semibold text-foreground">{studentName}</span>. Your transaction has been securely processed.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5 p-6">
            {/* Dynamic Receipt Summary Box */}
            <div className="rounded-xl bg-muted/50 p-4 space-y-3 border border-border/50 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Transaction ID</span>
                <span className="font-mono font-semibold text-xs text-foreground">{transactionId}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Payment Date</span>
                <span className="font-medium text-xs text-foreground">
                  {new Date().toLocaleDateString("en-BD", { year: "numeric", month: "short", day: "numeric" })}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Payment Method</span>
                <span className="font-medium text-xs text-foreground">{paymentMethod}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Total Paid</span>
                <span className="font-bold text-sm text-emerald-600">{currency} {amount}</span>
              </div>
            </div>

            {/* Note Box */}
            <div className="flex items-start gap-3 rounded-lg bg-orange-50/50 p-3.5 border border-orange-100">
              <ShieldCheck className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                A confirmation receipt and orientation details have been sent to your registered email address.
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-2.5 px-6 pb-6 pt-0">
            <div className="grid grid-cols-2 gap-3 w-full">
              <Button  render={<Link href={'/student/application'}/>} >
           
                  <FileText className="mr-1.5 h-4 w-4" /> My Application
                
              </Button>
              
              <Button render={<Link href={'student'}/>}>
          
                  <Home className="mr-1.5 h-4 w-4" /> Dashboard
               
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrint}
              className="w-full text-xs text-muted-foreground hover:text-foreground mt-1"
            >
              <Printer className="mr-1.5 h-3.5 w-3.5" /> Print or Save Receipt
            </Button>
          </CardFooter>
        </Card>

      </div>
    </div>
  );
};

export default PaymentSuccessPage;