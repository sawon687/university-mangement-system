"use client";

import {
  CreditCardIcon,
  LayoutDashboard,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { IUser } from "../../type";
import { useLoggedOut } from "../../hooks/auth.hook";
import { toast } from "./toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from 'next/link';

interface Props {
  user: IUser;
}

export function DropdownMenuProfile({ user }: Props) {
  const { mutate: logout } = useLoggedOut();
  const Queryclient = useQueryClient();
  const router = useRouter();
  const initials = user.name
    ?.split(" ")
    .map((name) => name.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handlelogout = () => {
    logout(undefined, {
      onSuccess: (res) => {
        console.log("response result", res);
        toast.add({
          title: "Logout success",
          description: res.message,
          type: "success",
        });
        Queryclient.removeQueries({ queryKey: ["user"] });
      },
      onError: (error) => {
        toast.add({
          title: "Logout Failed",
          description: error.message,
          type: "error",
        });
      },
    });
  };

  const userDashbaordUrl=user.role=='ADMIN'?'admin':user.role=='STUDENT'?'student':user.role=='INSTRUCTOR'?'instructor':'/'

  return (
    <DropdownMenuContent
      align="end"
      sideOffset={8}
      className="w-72 rounded-xl p-2"
    >
      {/* User Information */}
      <div className="flex items-center gap-3 rounded-lg px-2 py-3">
        {/* Avatar */}
        {user.userPhoto ? (
          <img
            src={user.userPhoto}
            alt={user.name || "User"}
            className="size-11 shrink-0 rounded-full object-cover ring-1 ring-border"
          />
        ) : (
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-sm font-bold text-orange-600 ring-1 ring-orange-500/20">
            {initials}
          </div>
        )}

        {/* User Details */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">
            {user.name}
          </p>

          <p className="truncate text-xs text-muted-foreground">{user.email}</p>

          {/* Role */}
          <span className="mt-1 inline-flex rounded-md bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-orange-600">
            {user.role}
          </span>
        </div>
      </div>

      <DropdownMenuSeparator />

      {/* Profile */}
      <DropdownMenuItem className="cursor-pointer gap-3 rounded-lg py-2.5">
        <UserIcon className="size-4" />
        <span>Profile</span>
      </DropdownMenuItem>

      {/* Billing */}
      <DropdownMenuItem className="cursor-pointer gap-3 rounded-lg py-2.5">
        <CreditCardIcon className="size-4" />
        <span>Billing</span>
      </DropdownMenuItem>
      {/* dashbaord */}
         <DropdownMenuItem render={<Link href={userDashbaordUrl} />} className="cursor-pointer gap-3 rounded-lg py-2.5">
        <LayoutDashboard  className="size-4" />
        <span>Dashboard</span>
      </DropdownMenuItem>
      {/* Settings */}
      <DropdownMenuItem className="cursor-pointer gap-3 rounded-lg py-2.5">
        <SettingsIcon className="size-4" />
        <span>Settings</span>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      {/* Logout */}
      <DropdownMenuItem
        variant="destructive"
        onClick={handlelogout}
        className="cursor-pointer gap-3 rounded-lg py-2.5"
      >
        <LogOutIcon className="size-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
