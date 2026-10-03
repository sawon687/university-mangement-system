"use client";

import React, { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// interface Props {
//   onTabChange: (value: string) => void;
// }

const ProgramsTabs = () => {
  const [activeTab, setActiveTab] = useState("all");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // onTabChange(value);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange}>
      <TabsList>
        <TabsTrigger value="all">
          All Programs
        </TabsTrigger>

        <TabsTrigger value="active">
          Active
        </TabsTrigger>

        <TabsTrigger value="inactive">
          Inactive
        </TabsTrigger>

        <TabsTrigger value="bsc">
          BSc
        </TabsTrigger>

        <TabsTrigger value="msc">
          MSc
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ProgramsTabs;