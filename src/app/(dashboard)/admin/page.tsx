
"use client";

import {
  Users,
  GraduationCap,
  BriefcaseBusiness,
  Wallet,
  ArrowUpRight,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useGetAdminStats } from "../../../hooks/adminDashboar.hook";

const formatMoney = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);

export default function AdminDashboardPage() {
  const {
    data: result,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useGetAdminStats();

  const data = result?.data ?? null;

  const totalUsers = data?.userCount ?? 0;
  const totalStudents = data?.studentCoutn ?? 0;
  const totalInstructors = data?.instructorCount ?? 0;
  const totalMoney = data?.TotalMoney?._sum?.amount ?? 0;

  const otherUsers = Math.max(
    totalUsers - totalStudents - totalInstructors,
    0
  );

  const stats = [
    {
      title: "Total Users",
      value: totalUsers.toLocaleString(),
      description: "All registered users",
      icon: Users,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      accent: "bg-blue-500",
    },
    {
      title: "Total Students",
      value: totalStudents.toLocaleString(),
      description: "Registered students",
      icon: GraduationCap,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      accent: "bg-orange-500",
    },
    {
      title: "Total Instructors",
      value: totalInstructors.toLocaleString(),
      description: "Registered instructors",
      icon: BriefcaseBusiness,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      accent: "bg-emerald-500",
    },
    {
      title: "Total Revenue",
      value: formatMoney(totalMoney),
      description: "Successfully paid payments",
      icon: Wallet,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      accent: "bg-violet-500",
    },
  ];

  const chartData = [
    {
      name: "Students",
      total: totalStudents,
    },
    {
      name: "Instructors",
      total: totalInstructors,
    },
    {
      name: "Other Users",
      total: otherUsers,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50/80 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-orange-600">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              UniSphere Administration
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Dashboard Overview
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Monitor your university statistics and payment overview.
            </p>
          </div>

          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-orange-200 hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
          >
            <RefreshCw
              size={16}
              className={isFetching ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        {/* Error */}
        {isError && (
          <div className="flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center">
            <AlertCircle
              className="shrink-0 text-red-600"
              size={21}
            />

            <div className="flex-1">
              <p className="font-semibold text-red-800">
                Unable to load dashboard statistics
              </p>

              <p className="mt-1 text-sm text-red-700">
                Please check your connection and try again.
              </p>
            </div>

            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
            >
              {isFetching ? "Retrying..." : "Try again"}
            </button>
          </div>
        )}

        {/* Statistics Cards */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              Key Statistics
            </h2>

            <span className="text-xs font-medium text-slate-400">
              Live overview
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1 ${stat.accent}`}
                  />

                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-500">
                        {stat.title}
                      </p>

                      {isLoading ? (
                        <div className="mt-3 h-8 w-32 animate-pulse rounded-lg bg-slate-100" />
                      ) : (
                        <h3 className="mt-3 break-words text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                          {stat.value}
                        </h3>
                      )}
                    </div>

                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor} transition group-hover:scale-105`}
                    >
                      <Icon size={23} strokeWidth={1.8} />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                      <ArrowUpRight size={14} />
                    </span>

                    <p className="text-xs text-slate-500">
                      {stat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* University Summary */}
        <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
            <h2 className="font-bold text-slate-900">
              University Summary
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Current user distribution and collected revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {/* Total Users */}
            <div className="p-5 sm:p-6">
              <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">
                <Users size={17} />
                User Accounts
              </div>

              <p className="text-2xl font-bold text-slate-900">
                {isLoading ? "—" : totalUsers.toLocaleString()}
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Total accounts across all roles
              </p>
            </div>

            {/* Student Share */}
            <div className="p-5 sm:p-6">
              <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">
                <GraduationCap size={17} />
                Student Share
              </div>

              <p className="text-2xl font-bold text-slate-900">
                {isLoading
                  ? "—"
                  : `${
                      totalUsers > 0
                        ? Math.round(
                            (totalStudents / totalUsers) * 100
                          )
                        : 0
                    }%`}
              </p>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-orange-500 transition-all duration-500"
                  style={{
                    width: `${
                      totalUsers > 0
                        ? Math.min(
                            (totalStudents / totalUsers) * 100,
                            100
                          )
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Revenue */}
            <div className="p-5 sm:p-6">
              <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">
                <Wallet size={17} />
                Collected Revenue
              </div>

              <p className="break-words text-2xl font-bold text-slate-900">
                {isLoading ? "—" : formatMoney(totalMoney)}
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Based on payments marked as paid
              </p>
            </div>
          </div>
        </section>

        {/* User Distribution Chart */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              User Distribution
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Overview of students, instructors, and other user accounts.
            </p>
          </div>

          {isLoading ? (
            <div className="h-[320px] animate-pulse rounded-xl bg-slate-100" />
          ) : isError ? (
            <div className="flex h-[320px] items-center justify-center text-sm text-slate-500">
              Unable to load chart data.
            </div>
          ) : (
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 10,
                    right: 12,
                    left: -15,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e2e8f0"
                  />

                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#64748b",
                      fontSize: 12,
                    }}
                  />

                  <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#64748b",
                      fontSize: 12,
                    }}
                  />

                  <Tooltip
                    cursor={{ fill: "#f8fafc" }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      boxShadow:
                        "0 4px 12px rgba(0,0,0,0.05)",
                    }}
                    formatter={(value) => [
                      Number(value ?? 0).toLocaleString(),
                      "Users",
                    ]}
                  />

                  <Bar
                    dataKey="total"
                    name="Users"
                    fill="#f97316"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={64}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </section>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400">
          UniSphere · University Management System
        </p>
      </div>
    </main>
  );
}