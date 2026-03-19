"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TechStack } from "@/components/sections/TechStack";
import { Cpu } from "lucide-react";

export default function TechnologyPage() {
  return (
    <main className="relative bg-background min-h-screen">
      <Navbar />
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-semibold">
              <Cpu className="w-4 h-4" />
              Modern Ecosystem
            </div>
            <h1 className="text-5xl md:text-6xl font-headline font-bold">
              Our <span className="text-primary italic">Tech Stack</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We leverage the latest and most reliable technologies to build scalable, high-performance software solutions.
            </p>
          </div>
          <TechStack />
        </div>
      </section>
      <Footer />
    </main>
  );
}
