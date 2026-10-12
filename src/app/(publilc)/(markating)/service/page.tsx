

import { 
  GraduationCap, 
  BookOpen, 
  ShieldCheck, 
  Wallet, 
  Users, 
  BarChart3, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Course & Curriculum Management",
    description: "Easily create, organize, and manage academic courses, departments, and class schedules in real-time.",
    icon: BookOpen,
    color: "bg-blue-50 text-blue-600",
    accent: "group-hover:border-blue-200",
  },
  {
    title: "Student & Faculty Portal",
    description: "Dedicated dashboards for students to track grades and assignments, and instructors to manage lectures.",
    icon: GraduationCap,
    color: "bg-orange-50 text-orange-600",
    accent: "group-hover:border-orange-200",
  },
  {
    title: "Secure Fee & Payment Gateway",
    description: "Automated tuition fee collection, payment tracking, and robust financial reporting in BDT.",
    icon: Wallet,
    color: "bg-violet-50 text-violet-600",
    accent: "group-hover:border-violet-200",
  },
  {
    title: "Role-Based Access Control",
    description: "Granular security permissions ensuring administrators, instructors, and students access only what they need.",
    icon: ShieldCheck,
    color: "bg-emerald-50 text-emerald-600",
    accent: "group-hover:border-emerald-200",
  },
  {
    title: "User Management System",
    description: "Handle bulk user registrations, verification, status updates, and account monitoring seamlessly.",
    icon: Users,
    color: "bg-pink-50 text-pink-600",
    accent: "group-hover:border-pink-200",
  },
  {
    title: "Advanced Analytics & Reports",
    description: "Generate deep insights into student enrollment trends, revenue collection, and academic performance.",
    icon: BarChart3,
    color: "bg-amber-50 text-amber-600",
    accent: "group-hover:border-amber-200",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50/80 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-16">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
            UniSphere Features
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Everything your university needs to run smarter
          </h1>
          <p className="text-base text-slate-600 sm:text-lg">
            Streamline administrative tasks, empower educators, and enhance student engagement with our all-in-one management platform.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`group relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md ${service.accent}`}
              >
                <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${service.color}`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-6 flex items-center gap-1 text-sm font-semibold text-orange-600 group-hover:gap-2 transition-all">
                  <span>Learn more</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action Banner */}
        <div className="rounded-3xl bg-slate-900 px-8 py-12 text-center text-white sm:px-12">
          <h2 className="text-2xl font-bold sm:text-3xl mb-4">
            Ready to transform your institution?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8 text-sm sm:text-base">
            Join hundreds of modern universities using UniSphere to optimize their campus operations today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
            >
              Get in Touch
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              View Pricing
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}