
"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center w-12 h-12 bg-[#F28C30] rounded-full shrink-0 shadow-lg", className)}>
      <div className="flex items-center justify-center leading-none">
        <div className="flex font-black text-xl select-none gap-1 ml-0.5">
          <span className="text-[#FF0000]">N</span>
          <span className="text-white">P</span>
          <span className="text-[#008000]">B</span>
        </div>
      </div>
    </div>
  );
}
