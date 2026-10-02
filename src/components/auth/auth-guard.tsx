"useClient";
import React, { ReactNode, useEffect } from "react";
import { useGetMe } from "../../hook/auth.hook";
import { useRouter } from 'next/navigation';
import AuthLoading from './auth-loading';

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { data, isPending, isError } = useGetMe();
  const router=useRouter()
const user=data?.data
  useEffect(() => {
    if (isPending) {
      return;
    }
    if(isError||!user)
    {
        router.replace('/')
    }
  },[isPending,user,isError]);

  if(isPending)
  {
   return  <AuthLoading/>
  }

  if(isError|| !user)
  {
    return <AuthLoading label='Redirecting...'/>
  }

  return <>{children}</>;
};

export default AuthGuard;
