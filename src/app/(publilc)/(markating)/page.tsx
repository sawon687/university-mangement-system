"use client";

import React from "react";
import {
  GraduationCap,
  BookOpen,
  Building2,
  Calendar,
  ArrowRight,
  Search,
  Sparkles,
  Trophy,
  Users2,
  Newspaper,
} from "lucide-react";

// shadcn/ui components
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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative bg-slate-950 text-white py-28 px-6 md:px-12 overflow-hidden">
        {/* Background Radial & Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-orange-950/40 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="mb-6 flex justify-center">
            <Badge variant="outline" className="text-orange-400 border-orange-500/30 px-3 py-1.5 text-xs tracking-wider uppercase gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Admissions Open for Fall 2026
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Shape Your Future at <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400">
              Apex Global University
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Discover a world-class education powered by cutting-edge research, visionary faculty, and a vibrant global community.
          </p>

          {/* Action Buttons & Quick Search */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
            <Button size="lg" className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-white font-semibold px-8">
              Apply Now <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-700 text-slate-200 hover:bg-slate-900">
              Explore Programs
            </Button>
          </div>

          {/* Quick Program Search Bar */}
          <div className="mt-12 max-w-xl mx-auto relative">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 absolute left-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search degrees, majors, or courses..."
                className="pl-12 pr-28 py-6 bg-slate-900/80 border-slate-800 text-white placeholder:text-slate-500 rounded-full shadow-lg focus-visible:ring-orange-500"
              />
              <Button size="sm" className="absolute right-2 rounded-full px-5 bg-orange-600 hover:bg-orange-500 text-white">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ANNOUNCEMENTS & NEWS TICKER */}
      <section className="bg-slate-900 border-y border-slate-800 text-slate-300 py-3 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2 font-semibold text-orange-400 shrink-0">
            <Newspaper className="w-4 h-4" /> Latest Updates:
          </div>
          <p className="truncate text-center md:text-left text-slate-400">
            🎉 AGU ranked #12 globally for Sustainable Innovation and AI Engineering in 2026!
          </p>
          <a href="#" className="text-xs text-orange-400 hover:underline shrink-0 font-medium">
            Read All News &rarr;
          </a>
        </div>
      </section>

      {/* 3. ACADEMIC PROGRAMS */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-3 text-orange-600 bg-orange-500/10">Academics</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Explore Our Faculties</h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Choose from over 100 undergraduate and postgraduate degree programs tailored for tomorrow's careers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Engineering & Technology",
              desc: "Computer Science, Robotics, AI Systems, and Civil Engineering with modern lab facilities.",
              icon: Building2,
              count: "24 Programs",
            },
            {
              title: "Business & Management",
              desc: "Global MBA, Finance, Marketing, and Tech Entrepreneurship programs mentored by industry leaders.",
              icon: Trophy,
              count: "18 Programs",
            },
            {
              title: "Health & Life Sciences",
              desc: "Biomedical Engineering, Medicine, Pharmacy, and Neuroscience research units.",
              icon: BookOpen,
              count: "15 Programs",
            },
          ].map((faculty, idx) => (
            <Card key={idx} className="hover:shadow-xl transition-all duration-300 border-border/60 group">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-500/10 text-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <faculty.icon className="w-6 h-6" />
                </div>
                <Badge variant="outline" className="w-fit mb-2 text-xs">{faculty.count}</Badge>
                <CardTitle className="text-xl">{faculty.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {faculty.desc}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="p-0 text-orange-600 hover:text-orange-700 hover:bg-transparent font-semibold">
                  View Degree Options <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE AGU (FEATURES) */}
      <section className="bg-slate-100 dark:bg-slate-900/50 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 space-y-6">
              <Badge variant="outline" className="text-orange-600 border-orange-600/30">Why Apex Global?</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                An Ecosystem Designed for Student Success
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We combine hands-on industry placements with academic rigor, ensuring our graduates enter the workforce as confident, skilled professionals.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  { title: "Top-Tier Faculty", desc: "95% of professors hold PhDs from leading institutions." },
                  { title: "State-of-the-Art Labs", desc: "24/7 access to AI research centers and maker spaces." },
                  { title: "Global Mobility", desc: "Exchange programs with 150+ universities worldwide." },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50">
                    <div className="p-2 bg-orange-500/10 text-orange-600 rounded-lg shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Highlight Grid */}
            <div className="md:col-span-7 grid grid-cols-2 gap-4">
              <Card className="p-6 bg-gradient-to-br from-orange-600 to-amber-600 text-white border-none shadow-xl">
                <span className="text-4xl font-extrabold">#12</span>
                <p className="text-sm text-orange-100 mt-2 font-medium">Global Ranking for Innovation</p>
              </Card>

              <Card className="p-6 bg-card border-border/60">
                <Users2 className="w-8 h-8 text-orange-600 mb-2" />
                <span className="text-3xl font-extrabold">98%</span>
                <p className="text-sm text-muted-foreground mt-1">Employment within 6 Months</p>
              </Card>

              <Card className="p-6 bg-card border-border/60 col-span-2">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200" />
                    <AvatarFallback>ST</AvatarFallback>
                  </Avatar>
                  <div>
                    <blockquote className="text-xs italic text-muted-foreground">
                      "Studying at AGU gave me the opportunity to intern at a leading tech firm before graduating!"
                    </blockquote>
                    <p className="text-xs font-bold mt-1">— Maria Santos, CS Graduate</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 5. UPCOMING EVENTS */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <Badge variant="outline" className="mb-2">Campus Calendar</Badge>
            <h2 className="text-3xl font-bold tracking-tight">Upcoming Events</h2>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0">
            View Full Calendar <Calendar className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { date: "OCT 25", title: "Fall Open Campus Day 2026", time: "10:00 AM - 4:00 PM", loc: "Main Auditorium" },
            { date: "NOV 02", title: "Global Research Symposium", time: "09:00 AM - 5:00 PM", loc: "Innovation Center" },
            { date: "NOV 15", title: "Annual Tech Hackathon", time: "48-Hour Event", loc: "Engineering Complex" },
          ].map((event, idx) => (
            <Card key={idx} className="hover:border-orange-500/50 transition">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="bg-orange-500/10 text-orange-600 rounded-xl p-3 text-center shrink-0 w-16">
                  <span className="text-xs font-bold block leading-none">{event.date.split(" ")[0]}</span>
                  <span className="text-lg font-extrabold block leading-none mt-1">{event.date.split(" ")[1]}</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-snug">{event.title}</h4>
                  <p className="text-xs text-muted-foreground mt-2">{event.time}</p>
                  <p className="text-xs text-muted-foreground font-medium">{event.loc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* 6. CALL TO ACTION */}
      <section className="bg-slate-950 text-white py-20 px-6 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Take the first step toward an extraordinary academic experience at Apex Global University.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-500 font-semibold px-8 text-white">
              Start Application
            </Button>
            <Button size="lg" variant="outline" className="border-slate-800 text-white hover:bg-slate-900">
              Schedule a Campus Tour
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}