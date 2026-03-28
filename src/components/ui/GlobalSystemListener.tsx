
"use client";

import React, { useState, useEffect } from "react";
import { useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { usePathname } from "next/navigation";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  ShieldAlert, 
  MonitorOff, 
  Loader2, 
  AlertTriangle, 
  Info, 
  Sparkles,
  ArrowRight,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

export function GlobalSystemListener() {
  const db = useFirestore();
  const pathname = usePathname();
  const systemRef = useMemoFirebase(() => doc(db, "settings", "system"), [db]);
  const { data: settings } = useDoc(systemRef);
  
  const [isPopupDismissed, setIsPopupDismissed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Keep current time updated for range checks
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Reset dismissal when a new popup payload is pushed
  useEffect(() => {
    if (settings?.popup?.isActive) {
      setIsPopupDismissed(false);
    }
  }, [settings?.popup?.isActive, settings?.popup?.broadcastMessage]);

  const isAdminPage = pathname.startsWith('/admin');

  // Time-based maintenance check
  const isMaintenanceActive = () => {
    if (!settings?.maintenance?.isActive) return false;
    
    const start = settings.maintenance.startTime ? new Date(settings.maintenance.startTime) : null;
    const end = settings.maintenance.endTime ? new Date(settings.maintenance.endTime) : null;
    
    // If no specific times set, treat isActive as absolute manual override
    if (!start && !end) return true;
    
    // Check if current time falls within defined schedule
    if (start && currentTime < start) return false;
    if (end && currentTime > end) return false;
    
    return true;
  };

  // 1. Maintenance Mode Overlay
  if (isMaintenanceActive() && !isAdminPage) {
    return (
      <div className="fixed inset-0 z-[9999] bg-slate-950 flex items-center justify-center p-6 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute top-0 left-0 w-full h-1 bg-rose-600 animate-pulse" />
        
        <div className="max-w-2xl w-full space-y-12 relative z-10 text-center animate-in fade-in zoom-in duration-700">
          <div className="space-y-6">
            <div className="w-24 h-24 rounded-3xl bg-rose-600/10 border-2 border-rose-600/20 flex items-center justify-center mx-auto shadow-2xl shadow-rose-600/20 animate-bounce">
              <MonitorOff className="w-12 h-12 text-rose-600" />
            </div>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest">
                <ShieldAlert className="w-4 h-4" />
                System Protocol: Dark Mode
              </div>
              <h1 className="text-5xl md:text-7xl font-headline font-black italic text-white leading-none uppercase tracking-tighter">
                Under <br /> <span className="text-rose-600">Maintenance</span>
              </h1>
              <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-lg mx-auto italic">
                "{settings?.maintenance?.message || 'We are currently upgrading our core infrastructure to serve you better.'}"
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-slate-900 rounded-[2.5rem] border-2 border-slate-800 space-y-4 shadow-xl">
              <TimerIcon className="w-8 h-8 text-primary mx-auto" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Access Restored Post</p>
                <p className="text-xl font-headline font-black text-white">
                  {settings?.maintenance?.endTime ? new Date(settings.maintenance.endTime).toLocaleString() : 'Syncing...'}
                </p>
              </div>
            </div>
            <div className="p-8 bg-slate-900 rounded-[2.5rem] border-2 border-slate-800 space-y-4 shadow-xl">
              <Loader2 className="w-8 h-8 text-primary mx-auto animate-spin" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Deployment Status</p>
                <p className="text-2xl font-headline font-black text-emerald-500 uppercase">Auto-Sync</p>
              </div>
            </div>
          </div>

          <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.4em]">
            NPB Media Global Operations | Protocol established 2025
          </p>
        </div>
      </div>
    );
  }

  // 2. Global Popup
  const showPopup = settings?.popup?.isActive && !isPopupDismissed;
  const popupConfig = {
    info: { icon: Info, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    warning: { icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" },
    success: { icon: Sparkles, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" }
  }[settings?.popup?.type as 'info'|'warning'|'success'] || { icon: Info, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" };

  return (
    <Dialog open={showPopup} onOpenChange={(open) => !open && setIsPopupDismissed(true)}>
      <DialogContent className="max-w-lg rounded-[3rem] p-0 overflow-hidden border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)]">
        <div className={cn("p-10 text-center space-y-6", popupConfig.bg)}>
          <div className={cn("w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto shadow-xl transition-transform hover:rotate-12 bg-white", popupConfig.color)}>
            <popupConfig.icon className="w-10 h-10" />
          </div>
          
          <div className="space-y-3">
            <div className={cn("inline-flex items-center gap-2 px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border", popupConfig.border, popupConfig.color)}>
              System Dispatch
            </div>
            <DialogTitle className="text-3xl font-headline font-black italic uppercase tracking-tighter">
              {settings?.popup?.title || 'System Alert'}
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-4">
              {settings?.popup?.displayMessage}
            </DialogDescription>
            <div className="p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/50 text-base text-slate-700 font-medium leading-relaxed italic">
              "{settings?.popup?.broadcastMessage}"
            </div>
          </div>
        </div>

        <div className="p-8 bg-white border-t border-slate-100">
          <Button 
            onClick={() => setIsPopupDismissed(true)}
            className="w-full h-16 rounded-2xl bg-slate-900 text-white font-black uppercase text-xs tracking-widest hover:bg-primary transition-all shadow-xl group"
          >
            Acknowledge Protocol <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function TimerIcon(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="10" x2="14" y1="2" y2="2"/>
      <line x1="12" x2="15" y1="14" y2="11"/>
      <circle cx="12" cy="14" r="8"/>
    </svg>
  );
}
