import { GraduationCap, MailCheck } from "lucide-react";
import VerifyFrom from "../../../../../components/form/verify-account-from";
import Logo from "../../../../../assets/Logo";
import { OtpPurpose } from '../../../../../constants';

export default function VerificationPage() {
  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden px-6">
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative w-full max-w-md text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Logo flexColRow="flex-col" />
        </div>

        {/* Icon */}
        <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <MailCheck className="size-7" />
        </div>

        <VerifyFrom
          title="Verify your email"
          description="We've sent a verification code to"
          successRedirect="/"
          buttonText="Verify Email"
          purpose={OtpPurpose.EMAIL_VERIFICATION}
        />
      </div>
    </main>
  );
}
