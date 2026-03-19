"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Portfolio } from "@/components/sections/Portfolio";
import { Layers } from "lucide-react";

export default function ProductsPage() {
  return (
    <main className="relative bg-background min-h-screen">
      <Navbar />
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold">
              <Layers className="w-4 h-4" />
              Innovation Hub
            </div>
            <h1 className="text-5xl md:text-6xl font-headline font-bold">
              Our <span className="text-accent italic">Products</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Explore our curated selection of high-impact digital products and proprietary solutions.
            </p>
          </div>
          <Portfolio />
        </div>
      </section>
      <Footer />
    </main>
  );
}
