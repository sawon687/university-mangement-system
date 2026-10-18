"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Building2,
  ArrowRight,
  Search,
  Sparkles,
  Trophy,
  Users2,
  Newspaper,
  FlaskConical,
  Globe2,
  Clock3,
  MapPin,
  CheckCircle2,
  Flame,
  Award,
  Star,
  Quote,
  Palette,
  Atom,
  Laptop,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// --- Academic Categories & Programs Data ---
const categories = [
  { id: "all", label: "All Disciplines" },
  { id: "engineering", label: "Tech & Engineering" },
  { id: "business", label: "Business & Innovation" },
  { id: "health", label: "Health Sciences" },
  { id: "arts", label: "Arts & Design" },
];

const programList = [
  {
    title: "Computer Science & AI",
    category: "engineering",
    description:
      "Master machine learning, software engineering, and next-gen computing architectures.",
    icon: Laptop,
    count: "12 Specializations",
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
    tags: ["Artificial Intelligence", "Cloud Computing", "Cybersecurity"],
  },
  {
    title: "Robotics & Automation",
    category: "engineering",
    description:
      "Design intelligent physical systems, autonomous drones, and modern industrial automation.",
    icon: Atom,
    count: "8 Specializations",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    tags: ["Mechatronics", "Neural Networks", "IoT"],
  },
  {
    title: "Global Business & MBA",
    category: "business",
    description:
      "Build strategic leadership skills, navigate global markets, and spearhead startups.",
    icon: Trophy,
    count: "10 Specializations",
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    tags: ["Entrepreneurship", "Fintech", "Global Logistics"],
  },
  {
    title: "Biomedical Engineering",
    category: "health",
    description:
      "Bridge technology and medicine to develop revolutionary healthcare equipment and prosthetics.",
    icon: FlaskConical,
    count: "6 Specializations",
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    tags: ["Bio-Tech", "Genetic Lab", "Medical Robotics"],
  },
  {
    title: "Digital Media & Interactive Design",
    category: "arts",
    description:
      "Craft immersive UI/UX experiences, 3D animations, and human-centered interactive media.",
    icon: Palette,
    count: "7 Specializations",
    gradient: "from-rose-500/20 via-orange-500/10 to-transparent",
    tags: ["UI/UX Design", "3D Animation", "Game Design"],
  },
  {
    title: "Public Health & Epidemiology",
    category: "health",
    description:
      "Analyze health data trends, create global health policy, and pioneer preventive care.",
    icon: Building2,
    count: "5 Specializations",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    tags: ["Healthcare Data", "Global Health", "Immunology"],
  },
];

const keyFeatures = [
  {
    title: "World-Class Mentors",
    description:
      "Learn directly from industry leaders, award-winning researchers, and global pioneers.",
    icon: GraduationCap,
  },
  {
    title: "Next-Gen Research Hubs",
    description:
      "Access state-of-the-art supercomputers, robotics labs, and specialized innovation spaces.",
    icon: FlaskConical,
  },
  {
    title: "Global Exchange Networks",
    description:
      "Study abroad with 50+ partner institutions and land international career placements.",
    icon: Globe2,
  },
];

const upcomingEvents = [
  {
    month: "OCT",
    day: "25",
    title: "Fall Open Campus & Career Fair 2026",
    time: "10:00 AM – 04:00 PM",
    location: "Main Auditorium, Campus A",
    badge: "Open for All",
  },
  {
    month: "NOV",
    day: "02",
    title: "Global AI & Robotics Symposium",
    time: "09:00 AM – 05:00 PM",
    location: "Innovation Hub & Online",
    badge: "Keynote",
  },
  {
    month: "NOV",
    day: "15",
    title: "Annual Student Hackathon & Expo",
    time: "48-Hour Live Coding",
    location: "Engineering Complex",
    badge: "Students",
  },
];

const campusLifeMoments = [
  {
    title: "Collaborative Labs",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
    tag: "Innovation",
  },
  {
    title: "Global Cultural Fest",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
    tag: "Community",
  },
  {
    title: "Modern Campus Library",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80",
    tag: "Research",
  },
];

const keyStats = [
  { value: "100+", label: "Academic Programs", highlight: "Top Tier" },
  { value: "96%", label: "Graduate Employment Rate", highlight: "Industry Preferred" },
  { value: "50+", label: "Global Partner Universities", highlight: "Study Abroad" },
  { value: "12:1", label: "Student-to-Faculty Ratio", highlight: "Personal Mentorship" },
];

const popularSearches = [
  "Computer Science",
  "Artificial Intelligence",
  "MBA Leadership",
  "Cybersecurity",
  "Biotechnology",
  "UX Design",
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.15 },
        variants: fadeUpVariant,
        transition: { duration: 0.55, ease: "easeOut" as const },
      };

  const filteredPrograms =
    selectedCategory === "all"
      ? programList
      : programList.filter((p) => p.category === selectedCategory);

  return (
    <main className="min-h-screen overflow-hidden bg-background font-sans text-foreground transition-colors duration-300">
      {/* ================= HERO SECTION ================= */}
      <section className="relative isolate overflow-hidden border-b border-border/60 bg-gradient-to-b from-orange-500/10 via-background to-background dark:from-orange-950/20 dark:via-background dark:to-background">
        {/* Ambient Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(249,115,22,0.18),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.1),transparent_40%)]"
        />

        {/* Subtle Background Mesh */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.07] [background-image:linear-gradient(to_right,#71717a_1px,transparent_1px),linear-gradient(to_bottom,#71717a_1px,transparent_1px)] [background-size:40px_40px]"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
          {/* Hero Left Content */}
          <motion.div {...motionProps} className="max-w-2xl">
            <Badge
              variant="outline"
              className="mb-6 inline-flex items-center gap-2 rounded-full border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-600 dark:text-orange-400"
            >
              <Sparkles className="h-4 w-4" />
              Admissions Open for Fall 2026
            </Badge>

            <h1 className="text-4xl font-black leading-[1.10] tracking-tight sm:text-6xl lg:text-7xl">
              Shape Your Potential.
              <br />
              Lead The Future.
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">
                Apex University.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Empowering global thinkers, innovator builders, and visionary leaders through hands-on learning, world-class labs, and global industry opportunities.
            </p>

            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-xl bg-orange-500 px-8 font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:-translate-y-0.5 hover:bg-orange-600"
              >
                <Link href="/admission">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-xl border-border/80 px-7 font-bold transition-all hover:-translate-y-0.5 hover:bg-muted"
              >
                <Link href="/programs">Explore All Degrees</Link>
              </Button>
            </div>

            {/* Quick Benefits Checklist */}
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="h-4 w-4 text-orange-500" />
                Industry-Accredited Curriculum
              </span>
              <span className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="h-4 w-4 text-orange-500" />
                Global Internship Placement
              </span>
            </div>
          </motion.div>

          {/* Hero Right Decorative Glass Card */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-lg"
          >
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-rose-500/10 blur-2xl" />

            <Card className="relative overflow-hidden rounded-[2rem] border-border/80 bg-card shadow-2xl backdrop-blur-xl">
              {/* Header Dark Box for Readable Text */}
              <div className="relative overflow-hidden bg-slate-950 p-7 text-white sm:p-9">
                <div className="absolute -right-10 -top-12 h-44 w-44 rounded-full border border-white/10 bg-orange-500/10" />
                <div className="absolute -right-4 -top-6 h-28 w-28 rounded-full border border-white/10" />

                <div className="relative z-10">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur">
                    <GraduationCap className="h-7 w-7 text-orange-400" />
                  </div>

                  <p className="text-xs font-bold tracking-widest text-orange-400 uppercase">
                    INNOVATE · DISCOVER · EXCEL
                  </p>

                  <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-3xl">
                    Where Education Meets Tomorrow.
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    Gain practical experience in cutting-edge facilities led by educators shaping global industries.
                  </p>
                </div>
              </div>

              {/* Lower Stats Bar */}
              <CardContent className="grid grid-cols-2 gap-3 p-5 sm:p-6 bg-card">
                <div className="rounded-2xl border border-border/70 bg-muted/40 p-4">
                  <BookOpen className="mb-2 h-5 w-5 text-orange-500" />
                  <p className="text-2xl font-black text-foreground">100+</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Degree Pathways</p>
                </div>

                <div className="rounded-2xl border border-border/70 bg-muted/40 p-4">
                  <Users2 className="mb-2 h-5 w-5 text-blue-500" />
                  <p className="text-2xl font-black text-foreground">12 : 1</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Student-Faculty Ratio</p>
                </div>
              </CardContent>
            </Card>

            {/* Floating Live Badge */}
            <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-2xl border border-border/80 bg-card p-4 shadow-xl sm:flex">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                <Flame className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Top Ranked University</p>
                <p className="text-xs text-muted-foreground">#1 in Innovation & Employability</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Global Accreditations Row */}
        <div className="border-t border-border/60 bg-muted/20 py-4">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
            <div className="flex items-center gap-2 text-xs font-semibold sm:text-sm text-muted-foreground">
              <Award className="h-4 w-4 text-orange-500" />
              <span>Ranked Top 50 Global Universities</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold sm:text-sm text-muted-foreground">
              <Star className="h-4 w-4 text-orange-500" />
              <span>98% Graduate Satisfaction Rate</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold sm:text-sm text-muted-foreground">
              <Globe2 className="h-4 w-4 text-orange-500" />
              <span>200+ Corporate & Tech Industry Partners</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ANNOUNCEMENT BAR ================= */}
      <section className="border-b border-border/60 bg-orange-500/5 dark:bg-orange-500/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-3.5 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div className="flex shrink-0 items-center gap-2 text-sm font-bold text-orange-600 dark:text-orange-400">
            <Newspaper className="h-4 w-4" />
            <span>Campus Updates</span>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground leading-snug">
            Fall semester merit-based scholarship applications are now open. Deadline: November 30.
          </p>

          <Link
            href="/news"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-orange-600 transition-colors hover:text-orange-500 dark:text-orange-400"
          >
            Read Announcements <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ================= INTERACTIVE PROGRAM EXPLORER ================= */}
      <motion.section
        {...motionProps}
        className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10"
      >
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <Badge
            variant="secondary"
            className="mb-4 rounded-full bg-orange-500/10 px-3.5 py-1 text-xs font-bold text-orange-600 dark:text-orange-400"
          >
            Interactive Major Explorer
          </Badge>

          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Find The Field That Sparks Your Passion
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Filter through our top-tier academic faculties and discover specializations structured for modern careers.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-full px-5 py-2 text-xs font-bold transition-all duration-300 sm:text-sm ${
                selectedCategory === cat.id
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Program Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPrograms.map((program, index) => {
            const Icon = program.icon;

            return (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <Card className="group flex h-full flex-col overflow-hidden rounded-2xl border-border/70 bg-card transition-all duration-300 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/5 dark:hover:shadow-black/20">
                  <CardHeader className="relative overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-b ${program.gradient} opacity-50`}
                    />
                    <div className="relative z-10">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
                        <Icon className="h-6 w-6" />
                      </div>

                      <Badge variant="outline" className="mb-2 border-orange-500/20 text-orange-600 dark:text-orange-400">
                        {program.count}
                      </Badge>

                      <CardTitle className="text-xl font-bold leading-snug">
                        {program.title}
                      </CardTitle>

                      <CardDescription className="pt-2 text-sm leading-relaxed">
                        {program.description}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="mt-auto pt-0">
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {program.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="border-t border-border/40 pt-4">
                    <Button
                      asChild
                      variant="ghost"
                      className="-ml-2 text-orange-600 hover:bg-orange-500/10 hover:text-orange-600 dark:text-orange-400"
                    >
                      <Link href="/programs">
                        Explore Specializations
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ================= CAMPUS LIFE & GALLERY ================= */}
      <section className="border-y border-border/60 bg-muted/30 py-20 sm:py-24">
        <motion.div {...motionProps} className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Badge variant="outline" className="mb-3 rounded-full border-orange-500/20 px-3.5 py-1 text-xs font-bold text-orange-600 dark:text-orange-400">
                Vibrant Student Community
              </Badge>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Experience Life At Apex
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              From late-night hackathons to international exchange programs, life at Apex is vibrant, collaborative, and inspiring.
            </p>
          </div>

          {/* Image Showcase Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {campusLifeMoments.map((item, idx) => (
              <div
                key={idx}
                className="group relative h-64 overflow-hidden rounded-2xl border border-border/70 shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <Badge className="mb-2 bg-orange-500 text-white">{item.tag}</Badge>
                  <p className="text-lg font-bold text-white">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ================= WHY CHOOSE US & TESTIMONIAL ================= */}
      <section className="py-20 sm:py-24">
        <motion.div
          {...motionProps}
          className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-10"
        >
          <div>
            <Badge variant="outline" className="mb-5 rounded-full border-orange-500/20 px-3.5 py-1 text-xs font-bold text-orange-600 dark:text-orange-400">
              The Academic Experience
            </Badge>

            <h2 className="max-w-xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              More Than A Degree. A Foundation For Life.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              A modern learning framework designed to merge academic theory with active enterprise labs and international career mentorship.
            </p>

            <div className="mt-8 space-y-4">
              {keyFeatures.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="group flex gap-4 rounded-2xl border border-border/70 bg-card p-4 transition-all duration-300 hover:border-orange-500/40 hover:shadow-md"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-bold text-foreground">{feature.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats Grid & Testimonial */}
          <div className="grid grid-cols-2 gap-4">
            {keyStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card
                  className={`flex h-full min-h-36 flex-col justify-center rounded-2xl border-border/70 p-5 sm:p-6 ${
                    index === 0
                      ? "bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/20"
                      : "bg-card"
                  }`}
                >
                  <p
                    className={`text-3xl font-black tracking-tight sm:text-4xl ${
                      index === 0 ? "text-white" : "text-foreground"
                    }`}
                  >
                    {stat.value}
                  </p>

                  <p
                    className={`mt-1.5 text-xs sm:text-sm font-medium ${
                      index === 0 ? "text-orange-50" : "text-muted-foreground"
                    }`}
                  >
                    {stat.label}
                  </p>
                </Card>
              </motion.div>
            ))}

            {/* Student Review Card */}
            <Card className="col-span-2 overflow-hidden rounded-2xl border-border/70 bg-card shadow-sm">
              <CardContent className="p-6">
                <Quote className="mb-3 h-6 w-6 text-orange-500/40" />
                <p className="text-sm font-medium leading-relaxed italic text-foreground">
                  “The active project labs and direct mentor network empowered my team to launch an AI startup before our final semester.”
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80"
                      alt="Student"
                    />
                    <AvatarFallback>ST</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs font-bold text-foreground">Sarah Jenkins</p>
                    <p className="text-[11px] text-muted-foreground">Class of &apos;26, Computer Science & AI</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </section>

      {/* ================= UPCOMING EVENTS ================= */}
      <motion.section
        {...motionProps}
        className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-24 lg:px-10"
      >
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge variant="outline" className="mb-4 rounded-full border-orange-500/20 px-3.5 py-1 text-xs font-bold text-orange-600 dark:text-orange-400">
              Campus Calendar
            </Badge>

            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Upcoming Events & Symposiums
            </h2>

            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
              Participate in tech expos, industry keynotes, and student hackathons.
            </p>
          </div>

          <Button asChild variant="outline" className="w-fit rounded-xl border-border/80 font-bold hover:bg-muted">
            <Link href="/events">
              View Calendar <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
            >
              <Card className="h-full rounded-2xl border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-lg">
                <CardContent className="flex gap-4 p-5 sm:p-6">
                  <div className="flex h-[80px] w-[70px] shrink-0 flex-col items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
                    <span className="text-xs font-extrabold tracking-wider">{event.month}</span>
                    <span className="mt-0.5 text-2xl font-black">{event.day}</span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <Badge variant="secondary" className="mb-2 text-[10px] font-bold">
                      {event.badge}
                    </Badge>
                    <h3 className="font-bold text-foreground leading-snug">{event.title}</h3>

                    <p className="mt-2.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock3 className="h-3.5 w-3.5 shrink-0 text-orange-500" />
                      {event.time}
                    </p>

                    <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-orange-500" />
                      {event.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ================= PROGRAM SEARCH & DISCOVERY ================= */}
      <section className="px-5 pb-20 sm:px-8 sm:pb-24 lg:px-10">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-border/60 bg-muted/40 dark:bg-[#0c0e12]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.15),transparent_55%)]"
          />

          <div className="relative mx-auto max-w-3xl px-5 py-14 text-center sm:px-10 sm:py-16">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
              <Search className="h-6 w-6" />
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Quick Program & Major Finder
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
              Search undergraduate, graduate, and certification courses directly.
            </p>

            <form
              action="/programs"
              method="GET"
              className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
            >
              <Input
                name="search"
                type="search"
                placeholder="Search by major, degree, or keyword..."
                aria-label="Search programs"
                className="h-12 rounded-xl border-border/80 bg-background shadow-sm focus-visible:ring-orange-500"
              />

              <Button
                type="submit"
                className="h-12 rounded-xl bg-orange-500 px-7 font-bold text-white hover:bg-orange-600 shadow-md shadow-orange-500/20"
              >
                Search <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <span className="font-bold text-foreground">Trending:</span>
              {popularSearches.map((term) => (
                <Link
                  key={term}
                  href={`/programs?search=${encodeURIComponent(term)}`}
                  className="rounded-full border border-border/70 bg-background px-3 py-1 font-medium transition-colors hover:border-orange-500/50 hover:text-orange-600 dark:hover:text-orange-400"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Separator className="opacity-60" />

      {/* ================= CALL TO ACTION ================= */}
      <section className="relative isolate overflow-hidden bg-slate-950 px-5 py-20 text-white sm:px-8 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.22),transparent_55%)]"
        />

        <motion.div
          {...motionProps}
          className="relative mx-auto max-w-3xl text-center"
        >
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/10 text-orange-400">
            <GraduationCap className="h-7 w-7" />
          </div>

          <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
            Your Future Starts Today.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-300">
            Begin your application, tour our campus, or consult with an admissions counselor.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3.5 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-xl bg-orange-500 px-8 font-bold text-white hover:bg-orange-600 shadow-lg shadow-orange-500/25"
            >
              <Link href="/admission">
                Apply Online <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-slate-700 bg-transparent px-7 font-bold text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/contact">Schedule Campus Tour</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-border/60 bg-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
              <GraduationCap className="h-5 w-5" />
            </div>

            <div>
              <p className="font-bold text-foreground">Apex Global University</p>
              <p className="text-xs text-muted-foreground">Shape Your Potential.</p>
            </div>
          </Link>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground">
            <Link className="transition-colors hover:text-orange-500" href="/programs">
              Programs
            </Link>
            <Link className="transition-colors hover:text-orange-500" href="/admission">
              Admissions
            </Link>
            <Link className="transition-colors hover:text-orange-500" href="/events">
              Events
            </Link>
            <Link className="transition-colors hover:text-orange-500" href="/contact">
              Contact
            </Link>
          </div>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Apex Global University. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}