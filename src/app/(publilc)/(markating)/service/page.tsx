"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  ShieldCheck,
  Wallet,
  Users,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const services = [
  {
    title: "Course & Curriculum Management",
    description:
      "Create, organize, and manage academic courses, departments, semesters, and class schedules from one centralized platform.",
    icon: BookOpen,
    number: "01",
    features: ["Course management", "Semester planning", "Academic scheduling"],
  },
  {
    title: "Student & Faculty Portal",
    description:
      "Give students and instructors dedicated dashboards to manage academic activities, monitor progress, and stay connected.",
    icon: GraduationCap,
    number: "02",
    features: ["Student dashboard", "Faculty workspace", "Academic progress"],
  },
  {
    title: "Secure Fee & Payments",
    description:
      "Simplify tuition payments, track transactions, and manage installment records with clear financial information.",
    icon: Wallet,
    number: "03",
    features: ["Tuition tracking", "Payment history", "Installment management"],
  },
  {
    title: "Role-Based Access Control",
    description:
      "Protect sensitive university data with role-based permissions tailored to administrators, instructors, and students.",
    icon: ShieldCheck,
    number: "04",
    features: ["Role permissions", "Secure authentication", "Access management"],
  },
  {
    title: "User Management System",
    description:
      "Manage user accounts, review registrations, update account statuses, and organize your university community efficiently.",
    icon: Users,
    number: "05",
    features: ["Account management", "Registration review", "Status monitoring"],
  },
  {
    title: "Analytics & Reports",
    description:
      "Get a clearer view of enrollment, academic performance, and financial activity to support informed decisions.",
    icon: BarChart3,
    number: "06",
    features: ["Enrollment insights", "Academic reporting", "Financial overview"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function ServicesPage() {
  const shouldReduceMotion = useReducedMotion();

  const containerMotion = shouldReduceMotion
    ? {}
    : {
        variants: containerVariants,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.12 },
      };

  const itemMotion = shouldReduceMotion
    ? {}
    : {
        variants: itemVariants,
      };

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* Hero */}
      <section className="relative isolate border-b border-border/60">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl sm:h-[30rem] sm:w-[30rem]" />
          <div className="absolute right-0 top-20 h-56 w-56 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-orange-400/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge
              variant="outline"
              className="mb-6 gap-2 rounded-full border-orange-500/30 bg-orange-500/5 px-4 py-1.5 text-orange-600 dark:text-orange-400"
            >
              <Sparkles className="h-3.5 w-3.5" />
              UniSphere Features
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Everything your university needs
              <span className="mt-2 block text-orange-600 dark:text-orange-400">
                to run smarter.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Streamline university operations, simplify academic management,
              and empower students and educators with one connected platform.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                render={<Link href="/contact"/>}
                size="lg"
                className="group rounded-xl bg-orange-600 px-6 text-white shadow-lg shadow-orange-600/15 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
              >
                
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
             
              </Button>

              <Button
                 render={<Link href="/pricing">Explore Pricing</Link>}
                variant="outline"
                size="lg"
                className="rounded-xl"
              >
                
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Centralized management
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Role-based security
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Academic workflows
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">
              Everything in one place
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Powerful tools for your campus
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              From academic administration to financial management, discover
              the features designed to simplify everyday university operations.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted/50">
              <Zap className="h-4 w-4 text-orange-500" />
            </span>
            <span>One connected platform</span>
          </div>
        </motion.div>

        <motion.div
          {...containerMotion}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.number}
                {...itemMotion}
                className="h-full"
              >
                <Card className="group relative h-full overflow-hidden rounded-2xl border-border/70 bg-card py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-xl hover:shadow-orange-500/5">
                  <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-orange-500 transition-transform duration-300 group-hover:scale-x-100" />

                  <CardHeader className="p-6 pb-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-orange-500/15 bg-orange-500/10 text-orange-600 transition-all duration-300 group-hover:scale-105 group-hover:bg-orange-500 group-hover:text-white dark:text-orange-400 dark:group-hover:text-white">
                        <Icon className="h-6 w-6" />
                      </div>

                      <span className="font-mono text-sm font-medium text-muted-foreground/50 transition-colors group-hover:text-orange-500">
                        {service.number}
                      </span>
                    </div>

                    <CardTitle className="pt-2 text-xl leading-snug tracking-tight">
                      {service.title}
                    </CardTitle>

                    <CardDescription className="text-sm leading-6 text-muted-foreground">
                      {service.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex flex-col px-6 pb-6 pt-5">
                    <div className="mb-5 flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <Badge
                          key={feature}
                          variant="secondary"
                          className="rounded-md bg-muted px-2.5 py-1 font-normal text-muted-foreground"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-auto border-t border-border/70 pt-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-orange-600 dark:text-orange-400">
                        <span>Built for your campus</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-orange-500/20 bg-card"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-orange-500/5 blur-3xl" />
          </div>

          <div className="relative grid gap-8 px-6 py-12 sm:px-10 sm:py-14 lg:grid-cols-[1fr_auto] lg:items-center lg:px-14 lg:py-16">
            <div className="max-w-2xl">
              <Badge
                variant="outline"
                className="mb-4 gap-2 rounded-full border-orange-500/30 bg-orange-500/5 text-orange-600 dark:text-orange-400"
              >
                <GraduationCap className="h-3.5 w-3.5" />
                Your campus, connected
              </Badge>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to transform your institution?
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
                Bring academic workflows, student services, and administrative
                processes together with UniSphere.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button
                asChild
                size="lg"
                className="group rounded-xl bg-orange-600 px-6 text-white hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
              >
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-xl"
              >
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}               