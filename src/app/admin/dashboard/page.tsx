
"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  LogOut,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-8">
            <div className="space-y-1">
              <h1 className="text-4xl font-headline font-black italic flex items-center gap-3 text-slate-900">
                <LayoutDashboard className="w-10 h-10 text-primary" />
                Admin <span className="text-primary">Portal</span>
              </h1>
              <p className="text-muted-foreground font-medium">Internal Management System for NPB Media.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="outline" className="rounded-full border-2 border-primary/20 hover:bg-primary/5 font-black uppercase tracking-widest text-xs">
                  <LogOut className="mr-2 w-4 h-4" /> Sign Out
                </Button>
              </Link>
            </div>
          </div>

          {/* Clean Slate Content Area */}
          <div className="grid grid-cols-1 gap-8">
            <Card className="border-none shadow-xl rounded-[3rem] bg-white p-12 text-center space-y-6">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                <LayoutDashboard className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-headline font-black italic text-slate-900">Dashboard Ready</h3>
                <p className="text-muted-foreground font-medium max-w-md mx-auto">
                  This portal is ready for data integration. Use this space to manage your services, inquiries, and internal configurations.
                </p>
              </div>
              <div className="pt-4">
                <Button className="rounded-full h-14 px-8 font-black uppercase tracking-widest text-xs bg-primary text-white hover:bg-foreground transition-all border-none">
                  <Plus className="mr-2 w-4 h-4" /> Add New Resource
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
