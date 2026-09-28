import React, { ReactNode } from "react";
import Navbar from '../../../components/layout/public/Navbar';


const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen">
      layout
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default layout;
