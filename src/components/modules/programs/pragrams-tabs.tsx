"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SlidersHorizontal } from "lucide-react";

interface TabItem {
  value: string;
  label: string;
}

const statusTabs: TabItem[] = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const degreeTabs: TabItem[] = [
  { value: "all-degrees", label: "All Degrees" },
  { value: "bsc", label: "BSc" },
  { value: "msc", label: "MSc" },
];

const departmentTabs: TabItem[] = [
  { value: "all-depts", label: "All Departments" },
  { value: "CSE", label: "CSE" },
  { value: "EEE", label: "EEE" },
  { value: "BBA", label: "BBA" },
  { value: "ENG", label: "ENG" },
];

const ProgramsTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get("status") || "all";
  const currentDegree = searchParams.get("degree") || "all-degrees";
  const currentDept = searchParams.get("dept") || "all-depts";

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`, { scroll: false });
  };


  const tabClass = `
    relative h-8 rounded-lg px-3 text-xs font-medium text-muted-foreground transition-all duration-200
    hover:text-foreground
    data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm
  `;

  return (
    <div className="w-full px-5">
    
      <div className="w-full bg-muted/40 backdrop-blur-md border border-border/60 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
        
    
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Status Tabs */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Status</span>
            <Tabs value={currentStatus} onValueChange={(val) => handleFilterChange("status", val)} className="w-max">
              <TabsList className="h-10 gap-1 rounded-xl bg-muted/80 p-1 border border-border/40">
                {statusTabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className={tabClass}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Degree Tabs */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Degree</span>
            <Tabs value={currentDegree} onValueChange={(val) => handleFilterChange("degree", val)} className="w-max">
              <TabsList className="h-10 gap-1 rounded-xl bg-muted/80 p-1 border border-border/40">
                {degreeTabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className={tabClass}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

        </div>

        <div className="w-full h-px bg-border/40 my-0.5" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          
      
          <div className="flex flex-col gap-1.5 overflow-x-auto max-w-full pb-1">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Department</span>
            <Tabs value={currentDept} onValueChange={(val) => handleFilterChange("dept", val)} className="w-max">
              <TabsList className="h-10 gap-1 rounded-xl bg-muted/80 p-1 border border-border/40">
                {departmentTabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className={tabClass}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Advanced Filter Button */}
          <div className="flex items-end h-full">
            <button
              type="button"
              aria-label="More filters"
              className="
                flex items-center gap-2 h-10 px-3.5 rounded-xl
                bg-background border border-border/60 text-muted-foreground
                text-xs font-medium shadow-sm transition-all duration-200
                hover:bg-accent hover:text-accent-foreground active:scale-95
              "
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
              <span>More Filters</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProgramsTabs;