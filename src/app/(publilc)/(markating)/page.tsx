"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  GraduationCap,
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  FlaskConical,
  Palette,
  Search,
  Users,
  Globe2,
  Trophy,
  CalendarDays,
  Clock3,
  MapPin,
  Star,
  Quote,
  Sparkles,
  CheckCircle2,
  Code2,
  HeartPulse,
  ChevronRight,
  Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const categories = [
  { id: "all", label: "All Programs" },
  { id: "technology", label: "Technology" },
  { id: "business", label: "Business" },
  { id: "science", label: "Science" },
  { id: "design", label: "Design" },
];

const programs = [
  {
    title: "Computer Science",
    category: "technology",
    description:
      "Build modern software, explore AI, and develop the skills to solve real-world problems.",
    icon: Code2,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    tags: ["AI & ML", "Software Engineering"],
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=85",
  },
  {
    title: "Business Administration",
    category: "business",
    description:
      "Develop leadership, strategic thinking, and entrepreneurial skills for a changing world.",
    icon: BriefcaseBusiness,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    tags: ["Management", "Entrepreneurship"],
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=85",
  },
  {
    title: "Applied Sciences",
    category: "science",
    description:
      "Turn scientific curiosity into practical discoveries through research and experimentation.",
    icon: FlaskConical,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    tags: ["Research", "Innovation"],
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=85",
  },
  {
    title: "Creative Design",
    category: "design",
    description:
      "Combine creativity and technology to craft engaging digital experiences and visual stories.",
    icon: Palette,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    tags: ["UI/UX", "Digital Media"],
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=85",
  },
  {
    title: "Artificial Intelligence",
    category: "technology",
    description:
      "Explore intelligent systems, machine learning, and the technologies shaping tomorrow.",
    icon: BrainCircuit,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    tags: ["Machine Learning", "Data"],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=85",
  },
  {
    title: "Health Sciences",
    category: "science",
    description:
      "Understand health, wellbeing, and scientific approaches to improving human lives.",
    icon: HeartPulse,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    tags: ["Healthcare", "Biology"],
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=85",
  },
];

const stats = [
  { value: "12K+", label: "Students", icon: Users },
  { value: "100+", label: "Programs", icon: BookOpen },
  { value: "40+", label: "Departments", icon: GraduationCap },
  { value: "25+", label: "Global Partners", icon: Globe2 },
];

const features = [
  {
    number: "01",
    title: "Learn by Doing",
    description:
      "Build practical skills through projects, workshops, and hands-on learning.",
    icon: Code2,
  },
  {
    number: "02",
    title: "Expert Faculty",
    description:
      "Learn from experienced educators who encourage curiosity and critical thinking.",
    icon: GraduationCap,
  },
  {
    number: "03",
    title: "Research & Innovation",
    description:
      "Explore new ideas, collaborate on research, and develop creative solutions.",
    icon: BrainCircuit,
  },
  {
    number: "04",
    title: "Career Preparation",
    description:
      "Prepare for professional opportunities with practical knowledge and guidance.",
    icon: BriefcaseBusiness,
  },
];

const events = [
  {
    month: "OCT",
    day: "25",
    type: "CAREER",
    title: "Career Connect 2026",
    time: "10:00 AM – 4:00 PM",
    location: "Main Auditorium",
  },
  {
    month: "NOV",
    day: "02",
    type: "TECHNOLOGY",
    title: "AI & Innovation Summit",
    time: "9:00 AM – 3:00 PM",
    location: "Innovation Center",
  },
  {
    month: "NOV",
    day: "15",
    type: "COMMUNITY",
    title: "Student Project Showcase",
    time: "11:00 AM – 5:00 PM",
    location: "University Campus",
  },
];

const testimonials = [
  {
    quote:
      "The supportive learning environment encouraged me to explore new ideas, work on meaningful projects, and become more confident in my career.",
    name: "Sarah Ahmed",
    role: "Computer Science Student",
    initials: "SA",
  },
  {
    quote:
      "Working with classmates and experienced faculty helped me turn classroom concepts into practical skills that I can use in the real world.",
    name: "Rahim Hasan",
    role: "Business Student",
    initials: "RH",
  },
  {
    quote:
      "University life has given me opportunities to collaborate, participate in research, and discover what I really want to achieve.",
    name: "Nusrat Jahan",
    role: "Science Student",
    initials: "NJ",
  },
];

const gallery = [
  {
    title: "Ideas in Action",
    label: "Collaborative Learning",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Spaces to Discover",
    label: "Campus Library",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Together We Grow",
    label: "Student Community",
    image:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1000&q=85",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const filteredPrograms = useMemo(() => {
    const term = search.trim().toLowerCase();

    return programs.filter((program) => {
      const matchesCategory =
        selectedCategory === "all" ||
        program.category === selectedCategory;

      const matchesSearch =
        !term ||
        program.title.toLowerCase().includes(term) ||
        program.description.toLowerCase().includes(term) ||
        program.tags.some((tag) =>
          tag.toLowerCase().includes(term)
        );

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  const reveal = shouldReduceMotion
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.12 },
        variants: containerVariants,
      };

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">

      {/* 1. HERO */}
      <section
        id="home"
        className="relative isolate flex min-h-[520px] items-center overflow-hidden border-b border-border/60 sm:min-h-[570px] lg:min-h-[min(680px,70svh)]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_20%,rgba(249,115,22,0.14),transparent_38%),radial-gradient(ellipse_at_90%_80%,rgba(59,130,246,0.10),transparent_38%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:36px_36px]"
        />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-12">
          <motion.div {...reveal} className="max-w-2xl">
            <Badge
              variant="outline"
              className="mb-5 gap-2 rounded-full border-orange-500/30 bg-orange-500/10 px-3.5 py-2 text-orange-600 dark:text-orange-400"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Your Future Starts Here
            </Badge>

            <h1 className="text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              Discover Your
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">
                Next Chapter.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              Explore opportunities, connect with inspiring minds, and
              build the knowledge and skills to shape your future at
              UniSphere.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button
                render={ <Link href="/admission">
                  Apply for Admission
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>}
                size="lg"
                className="h-12 rounded-xl bg-orange-500 px-6 font-bold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600"
              >
               
              </Button>

              <Button
               render={<Link href="/programs">
                  Explore Programs
                </Link>}
                size="lg"
                variant="outline"
                className="h-12 rounded-xl px-6 font-semibold"
              >
                
              </Button>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground sm:text-sm">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-orange-500" />
                Student-centered learning
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-orange-500" />
                Real-world opportunities
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65 }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-orange-500/15 via-transparent to-blue-500/15 blur-2xl" />

            <div className="relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-card p-2 shadow-2xl">
              <div className="relative h-[300px] overflow-hidden rounded-[1.25rem] sm:h-[365px]">
                <Image
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=90"
                  alt="Students walking together on a university campus"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />

                <div className="absolute left-5 top-5">
                  <Badge className="border border-white/20 bg-white/15 text-white backdrop-blur-md hover:bg-white/20">
                    <GraduationCap className="mr-1.5 h-3.5 w-3.5" />
                    Learn. Grow. Lead.
                  </Badge>
                </div>

                <div className="absolute inset-x-5 bottom-5 text-white sm:bottom-6 sm:left-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">
                    A community of possibilities
                  </p>
                  <h2 className="mt-2 max-w-sm text-2xl font-bold leading-tight sm:text-3xl">
                    Knowledge that opens doors.
                  </h2>
                  <Link
                    href="/programs"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-orange-300"
                  >
                    Find your program
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 p-2 pt-3">
                <div className="rounded-xl bg-muted/60 p-3">
                  <BookOpen className="mb-2 h-4 w-4 text-orange-500" />
                  <p className="text-sm font-bold">Learn</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    New skills
                  </p>
                </div>
                <div className="rounded-xl bg-muted/60 p-3">
                  <Users className="mb-2 h-4 w-4 text-blue-500" />
                  <p className="text-sm font-bold">Connect</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    New people
                  </p>
                </div>
                <div className="rounded-xl bg-muted/60 p-3">
                  <Trophy className="mb-2 h-4 w-4 text-emerald-500" />
                  <p className="text-sm font-bold">Achieve</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    Your goals
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. STATISTICS */}
      <section className="border-b border-border/60 bg-muted/20">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-border/60 sm:grid-cols-4 sm:divide-y-0 lg:px-10">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div key={stat.label} className="flex items-center gap-3 px-5 py-6 sm:justify-center sm:py-8">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xl font-black tracking-tight sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURES */}
      <section id="features" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <motion.div {...reveal} className="mb-10 max-w-2xl">
          <Badge variant="outline" className="mb-4 rounded-full border-orange-500/30 text-orange-600 dark:text-orange-400">
            The UniSphere Advantage
          </Badge>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            An education designed
            <span className="text-orange-500"> for what comes next.</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            Go beyond the classroom with an environment that values
            discovery, collaboration, and continuous growth.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.number}
                {...reveal}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                <Card className="group h-full rounded-2xl border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-xl hover:shadow-orange-500/5">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 transition-transform group-hover:scale-110">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-bold tracking-widest text-muted-foreground/60">
                        {feature.number}
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-bold">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. PROGRAM EXPLORER */}
      <section id="programs" className="border-y border-border/60 bg-muted/20 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <motion.div {...reveal} className="mb-9 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-4 rounded-full border-orange-500/30 text-orange-600 dark:text-orange-400">
                Explore Your Future
              </Badge>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                Find your field.
                <span className="text-orange-500"> Find your passion.</span>
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                Explore learning paths and discover an area that matches
                your interests.
              </p>
            </div>

            <Button render={ <Link href="/programs">
                All Programs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>} variant="outline" className="w-fit rounded-xl">
             
            </Button>
          </motion.div>

          <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  aria-pressed={selectedCategory === category.id}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                    selectedCategory === category.id
                      ? "border-orange-500 bg-orange-500 text-white shadow-md shadow-orange-500/20"
                      : "border-border bg-background text-muted-foreground hover:border-orange-500/50 hover:text-foreground"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search programs..."
                aria-label="Search academic programs"
                className="h-10 rounded-xl bg-background pl-9"
              />
            </div>
          </div>

          {filteredPrograms.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPrograms.map((program, index) => {
                const Icon = program.icon;

                return (
                  <motion.div
                    layout
                    key={program.title}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                  >
                    <Card className="group h-full overflow-hidden rounded-2xl border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-xl">
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          src={program.image}
                          alt={program.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                        <div className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/90 text-slate-900 backdrop-blur">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>

                      <CardContent className="p-5">
                        <h3 className="text-lg font-bold">{program.title}</h3>
                        <p className="mt-2 min-h-[66px] text-sm leading-6 text-muted-foreground">
                          {program.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {program.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="rounded-md text-[11px] font-medium">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <Separator className="my-4 opacity-60" />

                        <Link
                          href="/programs"
                          className="inline-flex items-center text-sm font-bold text-orange-600 transition-colors hover:text-orange-500 dark:text-orange-400"
                        >
                          Explore program
                          <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border py-14 text-center">
              <Search className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-3 font-semibold">No matching programs</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try another keyword or choose a different category.
              </p>
              <Button
                variant="outline"
                className="mt-4 rounded-xl"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* 5. CAMPUS LIFE */}
      <section id="campus" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <motion.div {...reveal} className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge variant="outline" className="mb-4 rounded-full border-orange-500/30 text-orange-600 dark:text-orange-400">
              Life at UniSphere
            </Badge>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              More than a classroom.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Discover the people, places, and experiences that make campus life special.
            </p>
          </div>
          <Button render={<Link href="/contact">
              Visit Our Campus <ArrowRight className="ml-2 h-4 w-4" />
            </Link>} variant="outline" className="w-fit rounded-xl">
            
          </Button>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {gallery.map((item, index) => (
            <motion.div
              key={item.title}
              {...reveal}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className={`group relative h-[280px] overflow-hidden rounded-2xl border border-border/60 sm:h-[330px] ${
                index === 1 ? "md:translate-y-5" : ""
              }`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <Badge className="mb-3 bg-orange-500 text-white hover:bg-orange-500">
                  {item.label}
                </Badge>
                <h3 className="text-xl font-bold text-white sm:text-2xl">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. LEARNING EXPERIENCE */}
      <section className="border-y border-border/60 bg-muted/20 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:px-10">
          <motion.div {...reveal} className="relative min-h-[300px] overflow-hidden rounded-2xl border border-border/70 sm:min-h-[390px]">
            <Image
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=85"
              alt="Students participating in a university learning session"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur-md">
              <p className="text-sm font-semibold">Curiosity becomes capability.</p>
              <p className="mt-1 text-xs text-white/80">
                Learn together. Build together. Grow together.
              </p>
            </div>
          </motion.div>

          <motion.div {...reveal}>
            <Badge variant="outline" className="mb-4 rounded-full border-orange-500/30 text-orange-600 dark:text-orange-400">
              Learning Experience
            </Badge>
            <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl">
              Skills for today.
              <span className="block text-orange-500">Confidence for tomorrow.</span>
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
              A meaningful education connects ideas with action. Explore
              new disciplines, collaborate with peers, and discover
              practical ways to apply what you learn.
            </p>

            <div className="mt-7 space-y-5">
              {[
                ["Project-Based Learning", "Turn knowledge into practical experience."],
                ["Collaborative Community", "Share ideas and learn from others."],
                ["Personal Development", "Grow your skills and discover your strengths."],
              ].map(([title, description]) => (
                <div key={title} className="flex gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold sm:text-base">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button render={<Link href="/programs">
                Discover Learning Paths
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>} className="mt-7 rounded-xl bg-orange-500 font-semibold text-white hover:bg-orange-600">
              
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 7. UPCOMING EVENTS */}
      <section id="events" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <motion.div {...reveal} className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge variant="outline" className="mb-4 rounded-full border-orange-500/30 text-orange-600 dark:text-orange-400">
              Save the Date
            </Badge>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              What&apos;s happening?
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Connect, participate, and make the most of university life.
            </p>
          </div>
          <Button render={   <Link href="/events">
              All Events <ArrowRight className="ml-2 h-4 w-4" />
            </Link>} variant="outline" className="w-fit rounded-xl">
         
          </Button>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-3">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              {...reveal}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card className="group h-full rounded-2xl border-border/70 transition-all hover:border-orange-500/40 hover:shadow-lg">
                <CardContent className="flex gap-4 p-5 sm:p-6">
                  <div className="flex h-[88px] w-[74px] shrink-0 flex-col items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
                    <span className="text-xs font-bold tracking-widest">{event.month}</span>
                    <span className="mt-1 text-3xl font-black">{event.day}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <Badge variant="secondary" className="mb-2 text-[10px] font-bold">
                      {event.type}
                    </Badge>
                    <h3 className="font-bold leading-snug">{event.title}</h3>
                    <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock3 className="h-3.5 w-3.5 shrink-0 text-orange-500" />
                      {event.time}
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-orange-500" />
                      {event.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="border-y border-border/60 bg-muted/20 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <motion.div {...reveal} className="mx-auto mb-10 max-w-2xl text-center">
            <Badge variant="outline" className="mb-4 rounded-full border-orange-500/30 text-orange-600 dark:text-orange-400">
              Student Stories
            </Badge>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Every journey has a story.
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              Discover how learning, community, and opportunity can shape a student experience.
            </p>
          </motion.div>

          <motion.div {...reveal} className="mx-auto max-w-3xl">
            <Card className="overflow-hidden rounded-3xl border-border/70 bg-card shadow-sm">
              <CardContent className="p-6 sm:p-10">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <Quote className="mt-7 h-9 w-9 text-orange-500/30" />

                <blockquote className="mt-4 min-h-[105px] text-lg font-medium leading-8 sm:text-2xl sm:leading-9">
                  “{testimonials[activeTestimonial].quote}”
                </blockquote>

                <Separator className="my-6" />

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10 font-bold text-orange-600 dark:text-orange-400">
                      {testimonials[activeTestimonial].initials}
                    </div>
                    <div>
                      <p className="font-bold">
                        {testimonials[activeTestimonial].name}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                        {testimonials[activeTestimonial].role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {testimonials.map((item, index) => (
                      <button
                        key={item.initials}
                        type="button"
                        onClick={() => setActiveTestimonial(index)}
                        aria-label={`Show testimonial from ${item.name}`}
                        aria-pressed={activeTestimonial === index}
                        className={`h-2.5 rounded-full transition-all ${
                          activeTestimonial === index
                            ? "w-8 bg-orange-500"
                            : "w-2.5 bg-muted-foreground/30 hover:bg-orange-500/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* 9. NEWSLETTER */}
      <section id="newsletter" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <motion.div {...reveal} className="relative overflow-hidden rounded-3xl border border-border/70 bg-card">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.12),transparent_55%)]" />
          <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:p-12">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                <Mail className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                Stay in the loop.
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
                Keep up with university announcements, upcoming events,
                and new academic opportunities.
              </p>
            </div>

            <form
              action="/news"
              method="GET"
              className="flex flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                name="email"
                required
                placeholder="Enter your email address"
                aria-label="Email address"
                className="h-12 min-w-0 rounded-xl bg-background"
              />
              <Button
                type="submit"
                className="h-12 shrink-0 rounded-xl bg-orange-500 px-5 font-bold text-white hover:bg-orange-600"
              >
                Stay Updated
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </motion.div>
      </section>

      {/* 10. FINAL CALL TO ACTION */}
      <section className="relative isolate overflow-hidden border-t border-border/60 bg-slate-950 px-5 py-16 text-white sm:px-8 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.20),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.12),transparent_50%)]"
        />

        <motion.div {...reveal} className="relative mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-400/30 bg-orange-500/10 text-orange-400">
            <GraduationCap className="h-7 w-7" />
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-400">
            Your next chapter awaits
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
            Ready to shape your future?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            Take the first step toward your academic goals. Explore your
            options and begin your journey with UniSphere.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              render={<Link href="/admission">
                Start Your Application
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>}
              size="lg"
              className="h-12 rounded-xl bg-orange-500 px-7 font-bold text-white hover:bg-orange-600"
            >
              
            </Button>

            <Button
              render={  <Link href="/contact"/>}
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-slate-600 bg-transparent px-7 font-bold text-white hover:bg-white/10 hover:text-white"
            >
      Contact Us
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Existing Footer will render outside this page. */}
    </main>
  );
}