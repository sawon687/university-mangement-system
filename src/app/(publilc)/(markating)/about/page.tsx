

import React from "react";
import {
  GraduationCap,
  Users,
  Award,
  Globe,
  BookOpen,
  Target,
  ArrowRight,
  Quote,
} from "lucide-react";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative bg-slate-950 text-white py-24 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950 to-slate-950 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="mb-4 flex justify-center">
            <Badge variant="outline" className="text-blue-400 border-blue-500/30 px-3 py-1 text-xs tracking-wider uppercase">
              Welcome to Apex Global University
            </Badge>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Empowering Leaders, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-sky-400">
              Transforming the Future.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Dedicating over five decades to academic excellence, groundbreaking research, and fostering an inclusive community of thinkers and innovators.
          </p>
        </div>
      </section>

      {/* 2. STATS OVERLAY SECTION */}
      <section className="max-w-6xl mx-auto px-6 -mt-12 relative z-20">
        <Card className="shadow-2xl border-border/50 bg-card backdrop-blur">
          <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-border">
              {[
                { label: "Students Enrolled", value: "25,000+", icon: Users },
                { label: "Global Partners", value: "150+", icon: Globe },
                { label: "Graduation Rate", value: "94%", icon: GraduationCap },
                { label: "Research Awards", value: "320+", icon: Award },
              ].map((stat, idx) => (
                <div key={idx} className={`flex flex-col items-center text-center ${idx !== 0 ? "pt-4 md:pt-0" : ""}`}>
                  <div className="p-2.5 bg-primary/10 rounded-xl text-primary mb-3">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-extrabold tracking-tight">{stat.value}</span>
                  <span className="text-xs md:text-sm font-medium text-muted-foreground mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 3. OUR MISSION & VISION */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/60">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Target className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To provide transformative education that combines rigorous academic standards with practical experience, empowering students to tackle complex global challenges and lead with integrity.
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/60">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-500/10 text-teal-600 rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To be recognized globally as a premier institution for innovation, research, and inclusive excellence, cultivating lifelong learners who drive positive societal change.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. PRESIDENT'S MESSAGE SECTION */}
      <section className="bg-slate-100 dark:bg-slate-900/50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Card className="border-none shadow-md overflow-hidden bg-card">
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-4 flex justify-center">
                  <Avatar className="w-48 h-48 md:w-60 md:h-60 rounded-2xl border-4 border-background shadow-xl">
                    <AvatarImage src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400" alt="President" />
                    <AvatarFallback className="rounded-2xl text-xl font-bold">SJ</AvatarFallback>
                  </Avatar>
                </div>
                <div className="md:col-span-8">
                  <Badge variant="secondary" className="mb-3">
                    Leadership Message
                  </Badge>
                  <h2 className="text-3xl font-bold tracking-tight mb-6">A Message from Our President</h2>
                  <blockquote className="text-lg text-foreground/90 italic mb-6 leading-relaxed border-l-4 border-primary pl-4 relative">
                    <Quote className="w-8 h-8 text-primary/20 absolute -top-3 -left-2 -z-10" />
                    "At Apex Global University, we believe that education extends beyond the classroom walls. It is about curiosity, collaboration, and building a better world for generations to come."
                  </blockquote>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Dr. Sarah Jenkins has served as University President since 2018, leading groundbreaking initiatives in sustainable campus design, digital learning ecosystems, and interdisciplinary research.
                  </p>
                  <div>
                    <h4 className="font-bold text-foreground">Dr. Sarah Jenkins</h4>
                    <p className="text-sm text-muted-foreground">President & Vice-Chancellor</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 5. TIMELINE / OUR HISTORY */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-2">Our Journey</Badge>
          <h2 className="text-3xl font-bold tracking-tight">History & Milestones</h2>
          <p className="text-muted-foreground mt-2">A legacy of over 50 years of academic excellence and growth.</p>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-border">
          {[
            { year: "1975", title: "University Founded", desc: "Established with 3 faculties and an initial cohort of 200 students." },
            { year: "1998", title: "Global Accreditation", desc: "Received international university accreditation and opened research labs." },
            { year: "2012", title: "Innovation Hub Launch", desc: "Partnered with tech leaders to build state-of-the-art incubation facilities." },
            { year: "2024", title: "Sustainable Campus Initiative", desc: "Achieved 100% renewable energy reliance across all main campus buildings." },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-between gap-8 ${
                index % 2 === 0 ? "flex-row-reverse" : ""
              }`}
            >
              <div className="w-1/2 text-left">
                <Card className="hover:shadow-md transition">
                  <CardHeader className="p-5 pb-2">
                    <Badge className="w-fit mb-1">{item.year}</Badge>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-0">
                    <CardDescription className="text-sm">{item.desc}</CardDescription>
                  </CardContent>
                </Card>
              </div>
              <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-background z-10 shrink-0" />
              <div className="w-1/2" />
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* 6. CALL TO ACTION (CTA) */}
      <section className="bg-slate-950 text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Ready to Join Our Community?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-lg">
            Discover academic programs, explore campus life, or schedule a tour to see what makes Apex Global University unique.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-semibold">
              Explore Programs <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Schedule Campus Visit
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}