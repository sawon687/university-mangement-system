import React, { ReactNode } from "react";
import DashboardShell from '../../../components/dashboard/dashbaord-shell';


const layout = ({ children }: { children: ReactNode }) => {
  return <DashboardShell>{children}</DashboardShell>;
};

export default layout;
