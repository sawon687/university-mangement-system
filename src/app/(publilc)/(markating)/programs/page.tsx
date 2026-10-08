import { Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProgramPublic from "../../../../components/modules/program.public/program.public";
import { getAllPublicPrograms } from "../../../../api/program.public.api";
import { QueryParms } from '../../../../type/courses.type';
import { Suspense } from 'react';

const Page = async ({searchParams}:{searchParams:QueryParms}) => {
    const params=await searchParams
  const result = await getAllPublicPrograms(params);
  const data = result?.data;
  

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-primary selection:text-white ">
      {/* Ultra-Modern Hero Section with Video-like Dynamic Animation (Pure Light Mode) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/80 via-white to-[#F8FAFC] pt-24 pb-16 lg:pt-28 lg:pb-20">
        {/* Animated Background Glowing Orbs (Simulating Video Background Effects) */}
        <div className="pointer-events-none absolute -left-20 -top-20 size-[500px] rounded-full bg-orange-400/20 blur-[130px] animate-pulse" />
        <div className="pointer-events-none absolute -right-20 top-10 size-[500px] rounded-full bg-amber-400/15 blur-[150px] animate-pulse [animation-duration:4s]" />

        {/* Tech Grid Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-60" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="mb-6 gap-2.5 border-orange-300 bg-orange-100/70 px-4 py-2 text-orange-700 backdrop-blur-xl shadow-md shadow-orange-500/5 transition-all hover:scale-105 duration-300 rounded-full text-xs font-semibold"
            >
              <Sparkles className="size-4 animate-spin [animation-duration:3s] text-orange-600" />
              Empowering Future Leaders • Admission 2026
            </Badge>

            <h1 className="text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl leading-[1.1] text-slate-900">
              Find the right program{" "}
              <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 bg-clip-text text-transparent block mt-2">
                for your bright future.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg font-normal">
              Explore our world-class undergraduate and graduate programs
              engineered with modern curriculums, practical skills, and global
              opportunities.
            </p>
          </div>
        </div>
      </section>

     <Suspense fallback={<h1>h1....</h1>}>
       <ProgramPublic data={data} />
     </Suspense>

      {/* Modern CTA Section */}
      <section className="mt-24 max-w-7xl mx-auto rounded-2xl mb-4 relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-amber-600 py-20 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_50%)] pointer-events-none" />
        <div className="mx-auto max-w-4xl px-4 text-center relative z-10">
          <h2 className="text-3xl font-black sm:text-4xl tracking-tight">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>

          <p className="mt-3 text-base text-orange-100 max-w-xl mx-auto font-medium">
            Get personalized program recommendations tailored specifically to
            your academic interests and career goals.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button className="h-12 px-8 rounded-2xl bg-white text-orange-600 font-bold hover:bg-orange-50 shadow-2xl transition-transform hover:scale-105">
              Get Recommendations
            </Button>

            <Button
              variant="outline"
              className="h-12 px-8 rounded-2xl border-white/40 bg-transparent text-white font-bold hover:bg-white/10 backdrop-blur-md transition-all shadow-sm"
            >
              Contact Advisor
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
