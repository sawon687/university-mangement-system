import React, { ReactNode } from "react";
import Navbar from '../../../components/layout/public/Navbar';
import Footer from '../../../components/layout/public/Footer';


const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
  
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer/>
    </div>
  );
};

export default layout;
