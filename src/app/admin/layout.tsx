
"use client";

import React, { useEffect } from "react";
import { useUser } from "@/firebase";
import { useRouter, usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  CalendarDays, 
  MessageSquare, 
  Briefcase, 
  LogOut, 
  Loader2,
  ShieldAlert,
  Menu,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { useAuth } from "@/firebase";

const ADMIN_EMAIL = "adminr@npbmedia.com";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const auth = useAuth();

  useEffect(() => {
    // Permission Verification Logic
    if (!isUserLoading && (!user || user.email !== ADMIN_EMAIL)) {
      if (pathname !== "/admin/login") {
        router.push("/admin/login");
      }
    }
  }, [user, isUserLoading, router, pathname]);

  if (isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Security Wall for Unauthorized Access
  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-8">
        <div className="w-24 h-24 bg-destructive/10 rounded-[2rem] flex items-center justify-center border border-destructive/20 shadow-2xl">
          <ShieldAlert className="w-12 h-12 text-destructive" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-black italic text-white">Access Denied</h1>
          <p className="text-slate-500 font-medium">Your credentials do not have NPB Admin Clearance.</p>
          <div className="pt-4 p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-[10px] font-black uppercase text-slate-400">Authorized Personnel Only</p>
            <p className="text-xs text-primary font-bold">raushankumarray96@gmail.com | adminr@npbmedia.com</p>
          </div>
        </div>
        <Link href="/login">
          <Button variant="outline" className="rounded-full px-8 text-white border-white/10 hover:bg-white/5">Return to Portal</Button>
        </Link>
      </main>
    );
  }

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Meetings", href: "/admin/meetings", icon: CalendarDays },
    { name: "Inquiries", href: "/admin/contacts", icon: MessageSquare },
    { name: "Careers", href: "/admin/careers", icon: Briefcase },
    { name: "Users", href: "/admin/users", icon: Users },
  ];

  const handleSignOut = () => {
    signOut(auth).then(() => router.push("/login"));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-950 text-white flex flex-col border-r border-white/5 fixed inset-y-0 z-50">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-black italic shadow-lg shadow-primary/20">NPB</div>
          <span className="font-headline font-black text-xl tracking-tighter">Admin <span className="text-primary italic">Nexus</span></span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={cn(
                  "flex items-center justify-between p-4 rounded-2xl transition-all group font-black uppercase text-[10px] tracking-widest",
                  isActive ? "bg-primary text-white shadow-xl shadow-primary/20" : "text-slate-500 hover:bg-white/5 hover:text-white"
                )}
              >
                <div className="flex items-center gap-4">
                  <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-500 group-hover:text-primary transition-colors")} />
                  {item.name}
                </div>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 mt-auto border-t border-white/5 space-y-4">
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Verified Session</span>
          </div>
          <Button 
            onClick={handleSignOut}
            variant="ghost" 
            className="w-full justify-start gap-4 h-14 rounded-2xl text-slate-500 hover:text-destructive hover:bg-destructive/10 font-black uppercase text-[10px] tracking-widest"
          >
            <LogOut className="w-5 h-5" /> Sign Out Admin
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-72">
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-4">
            <Menu className="w-5 h-5 text-slate-400 cursor-pointer lg:hidden" />
            <h2 className="font-headline font-black italic text-slate-900 capitalize">{pathname.split('/').pop()}</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Master Admin</p>
              <p className="text-xs font-bold text-slate-900">{user.email}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center overflow-hidden">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
          </div>
        </header>

        <div className="p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
