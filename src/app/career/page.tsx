"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Careers } from "@/components/sections/Careers";
import { Users } from "lucide-react";

export default function CareerPage() {
  return (
    <main className="relative bg-background min-h-screen">
      <Navbar />
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
              <Users className="w-4 h-4" />
              Join Our Mission
            </div>
            <h1 className="text-5xl md:text-6xl font-headline font-bold">
              Careers at <span className="text-primary italic">NPB Media</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're looking for visionary thinkers and expert engineers. Build the future of technology with us.
            </p>
          </div>
          <Careers />
        </div>
      </section>
      <Footer />
    </main>
  );
}
