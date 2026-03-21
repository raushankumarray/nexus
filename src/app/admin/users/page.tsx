
"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center space-y-8">
      <Navbar />
      <div className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
        <ShieldAlert className="w-12 h-12 text-destructive" />
      </div>
      <div className="space-y-2">
        <h1 className="text-4xl font-headline font-black italic">Page Removed</h1>
        <p className="text-muted-foreground font-medium max-w-sm mx-auto">Administrative user management is inactive.</p>
      </div>
      <Link href="/">
        <Button size="lg" className="rounded-full px-12 h-16 text-lg font-headline bg-primary text-white">
          Return Home
        </Button>
      </Link>
      <Footer />
    </main>
  );
}
