
"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function ProfileManagementPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-6 pt-32 pb-20">
        <h1 className="text-4xl font-headline font-black italic text-slate-900">
          Manage <span className="text-primary">Profiles</span>
        </h1>
      </div>
      <Footer />
    </main>
  );
}
