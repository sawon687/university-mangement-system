"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import Logo from "../../../assets/Logo";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import { useGetMe } from "../../../hooks/auth.hook";

import { DropdownMenuProfile } from "../../ui/dropdown-menu-profile";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { IUser } from '../../../type';

const Navbar = () => {
  const pathname = usePathname();

  const {data}= useGetMe();
  const me=data?.data?? ''
  console.log('user',me)
  const user: IUser | undefined = me;

  const navItems = [
    { label: "Home", url: "/" },
        { label: "Programs", url: "/programs" },
    { label: "About", url: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Logo flexColRow="flex-row" />

        {/* Navigation */}
        <nav className="hidden items-center gap-1   md:flex">
          {navItems.map((item) => {
            const isActive =
              item.url === "/"
                ? pathname === "/"
                : pathname.startsWith(item.url);

            return (
              <Link
                key={item.url}
                href={item.url}
                className={cn(
                  "group relative flex items-center gap-2 text-sm font-medium",
                  "transition-colors duration-300 ease-out",
                  isActive
                    ? "bg-background text-primary "
                    : "text-muted-foreground hover:bg-background/60 hover:text-foreground",
                )}
              >
                {/* Active Indicator */}
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full bg-primary",
                    "transition-all duration-300 ease-out",
                    isActive
                      ? "scale-100 opacity-100"
                      : "scale-0 opacity-0",
                  )}
                />

                {item.label}

             
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-10 rounded-full p-0"
                />
              }
            >
              {user?.studentProfile?.profilePhoto ? (
                <Image
                  src={user.studentProfile?.profilePhoto}
                  alt={user.name || "Profile"}
                  width={40}
                  height={40}
                  className="size-10 rounded-full object-cover"
                />
              ) : (
                <div className="flex size-10 items-center justify-center rounded-full bg-orange-500/10 text-sm font-semibold text-orange-600 ring-1 ring-orange-500/20">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </DropdownMenuTrigger>

            {/* Profile Dropdown */}
            <DropdownMenuProfile user={user} />
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={<Link href="/auth/login" />}
            >
              Login
            </Button>

            <Button
              size="sm"
              className="rounded-lg"
              nativeButton={false}
              render={<Link href="/auth/register" />}
            >
              Register
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;