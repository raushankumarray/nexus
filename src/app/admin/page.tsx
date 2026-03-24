
"use client";

import React from "react";

export default function AdminDashboard() {
  return (
    <div className="min-h-[calc(100vh-73px)] flex items-center justify-center p-6">
      <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom duration-1000">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/20">
          <div className="w-3 h-3 bg-primary rounded-full animate-ping" />
        </div>
        <h2 className="text-3xl font-headline font-black italic text-white uppercase tracking-tighter">System <span className="text-primary">Dashboard</span></h2>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Operational Readiness: Active</p>
      </div>
    </div>
  );
}
