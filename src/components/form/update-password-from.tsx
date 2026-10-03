"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { useUpdatePassword } from "../../hooks/auth.hook";
import { toast } from '../ui/toast';
import { useSearchParams } from 'next/navigation';
import { Spinner } from '../ui/spinner';
const updatePasswordFrom = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { mutate: updatePassword, isPending } = useUpdatePassword();
  const searchParams=useSearchParams()
  const passwordsMatch =
    password.length >= 8 &&
    confirmPassword.length >= 0 &&
    password === confirmPassword;
  const email =searchParams.get('email')||'' ;
  const token = searchParams.get('token')||'';
  const handlePasswordUpdate = () => {
    console.log("click update", password);

    updatePassword(
      { password, email, token,confirmPassword },
      {
        onSuccess: (res) => {
            console.log('respons update password',res)
           toast.add({
            title: "Update Password",
            description: res.message||res.erros[0],
            type: "success",
          });
            
        },
        onError:(error:any)=>{
             console.log("erros", error.data);
         
          toast.add({
            title: "Update feild",
            description:error.data.message||error.errors.message,
            type: "Error",
          });
        }
      },
    );
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePasswordUpdate();
         
        }}
      >
        <FieldGroup className="gap-5">
          {/* New Password */}
          <Field>
            <FieldLabel htmlFor="password">New password</FieldLabel>

            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your new password"
                className="h-11 pl-10 pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>

            <FieldDescription>
              Password must be at least 8 characters.
            </FieldDescription>
          </Field>

          {/* Confirm Password */}
          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>

            <div className="relative">
              <ShieldCheck className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                className="h-11 pl-10 pr-10"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              >
                {showConfirmPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>

            {confirmPassword.length > 0 && !passwordsMatch && (
              <FieldError>Passwords do not match.</FieldError>
            )}

            {passwordsMatch && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-600">
                <CheckCircle2 className="size-3.5" />
                Passwords match
              </div>
            )}
          </Field>

          {/* Submit */}
          <Button
            type="submit"
            disabled={!passwordsMatch || password.length <= 8||isPending}
            className="h-11 w-full bg-orange-500 font-medium text-white hover:bg-orange-600"
          >
            {isPending?<Spinner/>:<> Update password
            <ArrowRight className="ml-1 size-4" /></>}
          </Button>
        </FieldGroup>
      </form>
    </>
  );
};

export default updatePasswordFrom;
