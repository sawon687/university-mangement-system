"use client";

import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  Mail,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateInstructorPage = () => {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon">
          <ArrowLeft className="size-4" />
        </Button>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Create Instructor
          </h1>

          <p className="text-sm text-muted-foreground">
            Create a new instructor account for your university.
          </p>
        </div>
      </div>


      {/* Form Card */}
      <Card className="mx-auto max-w-3xl">

        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
              <BriefcaseBusiness className="size-4" />
            </div>

            <div>
              <CardTitle>Instructor Information</CardTitle>

              <CardDescription className="mt-1">
                Enter the instructor details below.
              </CardDescription>
            </div>
          </div>
        </CardHeader>


        <CardContent>
          <div className="space-y-6">

            {/* Name + Email */}
            <div className="grid gap-5 md:grid-cols-2">

              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Full Name
                </label>

                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    placeholder="Md. Rahim Uddin"
                    className="pl-9"
                  />
                </div>
              </div>


              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    type="email"
                    placeholder="rahim@example.com"
                    className="pl-9"
                  />
                </div>
              </div>

            </div>


            {/* Department + Gender */}
            <div className="grid gap-5 md:grid-cols-2">

              {/* Department */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Department
                </label>

                <Select>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <Building2 className="size-4 text-muted-foreground" />

                      <SelectValue placeholder="Select department" />
                    </div>
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="cse">
                      Computer Science & Engineering
                    </SelectItem>

                    <SelectItem value="eee">
                      Electrical & Electronic Engineering
                    </SelectItem>

                    <SelectItem value="bba">
                      Business Administration
                    </SelectItem>

                    <SelectItem value="english">
                      English
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>


              {/* Gender */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Gender
                </label>

                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="male">
                      Male
                    </SelectItem>

                    <SelectItem value="female">
                      Female
                    </SelectItem>

                    <SelectItem value="other">
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>


            {/* Account Information */}
            <div className="rounded-xl border border-orange-200 bg-orange-50/70 p-4 dark:border-orange-900/40 dark:bg-orange-950/10">

              <div className="flex gap-3">

                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                  <BriefcaseBusiness className="size-4" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold">
                    Account credentials
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    A temporary password and teacher code will be
                    generated automatically and sent to the instructor's
                    email address.
                  </p>
                </div>

              </div>

            </div>


            {/* Actions */}
            <div className="flex items-center justify-end gap-3 border-t pt-5">

              <Button
                type="button"
                variant="outline"
              >
                Cancel
              </Button>

              <Button type="button">
                Create Instructor
              </Button>

            </div>

          </div>
        </CardContent>

      </Card>

    </div>
  );
};

export default CreateInstructorPage;