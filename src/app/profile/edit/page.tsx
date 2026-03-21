
"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProfileEditPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden">
      <Navbar />
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="flex-1 max-w-4xl mx-auto w-full px-6 pt-32 pb-20 space-y-10">
        <div className="space-y-6">
          <Link href="/profile" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-black uppercase tracking-widest text-xs">
            <ArrowLeft className="w-4 h-4" /> Back to Profile
          </Link>
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-7xl font-headline font-black italic text-slate-900 leading-none">
              Edit <span className="text-primary">Details</span>
            </h1>
            <p className="text-muted-foreground text-xl font-medium uppercase tracking-widest text-xs">Update your information</p>
          </div>
        </div>

        {/* Empty Main Section as requested */}
        <section className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 p-12 min-h-[400px] flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 grid-bg opacity-5" />
          <p className="text-slate-300 font-headline font-black text-2xl uppercase tracking-widest relative z-10 text-center">
            Form Section Empty
          </p>
        </section>
      </div>

      <Footer />
    </main>
  );
}
