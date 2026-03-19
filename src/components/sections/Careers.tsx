"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight } from "lucide-react";

export function Careers() {
  return (
    <section id="careers" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-primary p-12 md:p-20 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl shadow-primary/30">
          <div className="absolute inset-0 grid-bg opacity-10" />
          
          <div className="space-y-6 relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-sm font-semibold">
              <Users className="w-4 h-4" />
              Join the Team
            </div>
            <h2 className="text-4xl md:text-6xl font-headline font-bold leading-tight">
              Careers at <span className="italic">NPB Media</span>
            </h2>
            <p className="text-xl text-white/80 leading-relaxed">
              We are always looking for talented developers, designers, and innovators to join our growing team. If you are passionate about technology and building impactful products, we would love to hear from you.
            </p>
          </div>

          <div className="relative z-10">
            <Button size="lg" className="rounded-full px-12 h-16 text-xl font-headline bg-white text-primary hover:bg-white/90 shadow-xl group">
              View Open Positions <ArrowRight className="ml-2 w-6 h-6 transition-transform group-hover:translate-x-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
