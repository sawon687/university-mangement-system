import React, { ReactNode } from "react";
import Navbar from '../../../components/layout/public/Navbar';
import Footer from '../../../components/layout/public/Footer';
import PublicAIWidget from '../../../components/ai/PublicAIWidget';


const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
  
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <PublicAIWidget/>
      <Footer/>
    </div>
  );
};

export default layout;
