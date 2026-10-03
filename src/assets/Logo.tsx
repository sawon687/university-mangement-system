import { GraduationCap } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = ({flexColRow,state}:{flexColRow:string,state?:'collapsed'|'expanded'}) => {
  return (
    <Link href="/" className={`flex ${flexColRow} items-center text-xl gap-2 font-bold tracking-tight`}>
      <div className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground  shadow-lg shadow-orange-500/20 transition-transform group-hover:scale-105">
        <GraduationCap className="size-5" />
      </div>

      
           
              <span className={` ${state==='collapsed'?'hidden':''}`}>
              Uni<span className={`text-orange-500`}>Sphere</span>
            </span>
           
    </Link>
  );
};

export default Logo;
