import { Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProgramPublic from "../../../../components/modules/program.public/program.public";
import { getAllPublicPrograms } from "../../../../api/program.public.api";
import { QueryParms } from '../../../../type/courses.type';
import { Suspense } from 'react';
import Loading from '../../../loading';

const Page = async ({searchParams}:{searchParams:QueryParms}) => {
    const params=await searchParams
  const result = await getAllPublicPrograms(params);
  const data = result?.data;
  

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-orange-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-500/10 via-background to-background pt-24 pb-16 transition-colors duration-300 lg:pt-28 lg:pb-20">
        {/* Decorative Background */}
        <div className="pointer-events-none absolute -left-20 -top-20 size-[500px] animate-pulse rounded-full bg-orange-500/15 blur-[130px]" />

        <div className="pointer-events-none absolute -right-20 top-10 size-[500px] animate-pulse rounded-full bg-amber-500/10 blur-[150px] [animation-duration:4s]" />

        {/* Grid Pattern */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.035]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="mb-6 gap-2.5 rounded-full border-orange-500/30 bg-orange-500/10 px-4 py-2 text-xs font-semibold text-orange-700 shadow-md shadow-orange-500/5 backdrop-blur-xl transition-all duration-300 hover:scale-105 dark:text-orange-400"
            >
              <Sparkles className="size-4 animate-spin text-orange-600 [animation-duration:3s] dark:text-orange-400" />
              Empowering Future Leaders • Admission 2026
            </Badge>

            <h1 className="text-4xl leading-[1.1] font-black tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Find the right program{" "}
              <span className="mt-2 block bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 bg-clip-text text-transparent dark:from-orange-400 dark:via-amber-400 dark:to-rose-400">
                for your bright future.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed font-normal text-muted-foreground sm:text-lg">
              Explore our world-class undergraduate and graduate programs
              engineered with modern curriculums, practical skills, and global
              opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
 
        <ProgramPublic data={data} />
  
     
    </main>
  );
};

export default Page;
