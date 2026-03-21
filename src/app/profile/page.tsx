
"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <Navbar />
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] -z-10" />

      <div className="flex-1 flex flex-col items-center justify-center p-6 pt-32 pb-20">
        <div className="max-w-4xl w-full space-y-12">
          <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom duration-700">
            <h1 className="text-5xl md:text-7xl font-headline font-black italic text-slate-900">
              User <span className="text-primary">Profile</span>
            </h1>
            <p className="text-muted-foreground text-xl font-medium italic">
              Your personalized Media dashboard.
            </p>
          </div>

          {/* Empty Main Section as requested */}
          <section className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 p-12 min-h-[400px] flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 grid-bg opacity-5" />
            <p className="text-slate-300 font-headline font-black text-2xl uppercase tracking-widest relative z-10">
              Main Section Empty
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
