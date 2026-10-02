import { LoaderIcon } from "lucide-react";
import React from "react";

const AuthLoading = ({ label }: { label?: string }) => {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="flex gap-3">
        <LoaderIcon />
        {label}
      </div>
    </div>
  );
};

export default AuthLoading;
