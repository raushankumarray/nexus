
"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-6 pt-32 pb-20">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-headline font-black italic text-slate-900">
            Admin <span className="text-primary">Dashboard</span>
          </h1>
          <p className="text-muted-foreground font-medium">Select a management module from the menu above.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
