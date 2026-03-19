"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="relative bg-background min-h-screen">
      <Navbar />
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              Our Identity
            </div>
            <h1 className="text-5xl md:text-6xl font-headline font-bold">
              Engineering <span className="text-primary italic">Reliability</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              NPB Media is a technology-driven company committed to building reliable, high-quality digital products for the modern market.
            </p>
          </div>
          <WhoWeAre />
        </div>
      </section>
      <Footer />
    </main>
  );
}
