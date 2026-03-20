
"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center w-12 h-12 bg-[#F28C30] rounded-full shrink-0 shadow-lg", className)}>
      <div className="flex flex-col items-center justify-center leading-none relative">
        <div className="flex font-black text-xl tracking-tighter select-none">
          <span className="text-[#FF0000]">N</span>
          <span className="text-white">P</span>
          <span className="text-[#008000]">B</span>
        </div>
        <div 
          className="text-[#0000FF] font-black uppercase text-[7px] leading-none absolute"
          style={{ 
            bottom: '-6px', 
            left: '52%',
          }}
        >
          Media
        </div>
      </div>
    </div>
  );
}
