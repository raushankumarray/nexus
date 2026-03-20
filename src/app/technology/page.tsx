"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function TechnologyPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-2xl font-headline font-bold">Technology - Coming Soon</h1>
      </div>
      <Footer />
    </main>
  );
}
