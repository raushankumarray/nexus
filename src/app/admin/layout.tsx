
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin/login") {
      setIsChecking(false);
      return;
    }

    const session = localStorage.getItem("npb_admin_session");
    if (!session) {
      router.push("/admin/login");
    } else {
      setIsChecking(false);
    }
  }, [router, pathname]);

  const handleLogout = () => {
    localStorage.removeItem("npb_admin_session");
    router.push("/admin/login");
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  // Hide header on login page
  const showHeader = pathname !== "/admin/login";

  const navItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Enquiry", href: "/admin/enquiries" },
    { label: "Schedule Meetings", href: "/admin/meetings" },
    { label: "Career", href: "/admin/careers" },
    { label: "Products", href: "/admin/products" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-primary/30">
      {showHeader && (
        <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="flex items-center gap-3 group">
                <Logo className="w-10 h-10 border border-slate-800 p-0.5 group-hover:border-primary transition-colors" />
                <div className="hidden sm:block">
                  <h1 className="text-lg font-headline font-black italic uppercase tracking-tighter">Command <span className="text-primary">Center</span></h1>
                </div>
              </Link>

              <nav className="hidden md:flex items-center gap-2">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "rounded-full px-6 h-10 text-[10px] font-black uppercase tracking-widest transition-all",
                        pathname === item.href 
                          ? "bg-primary text-white hover:bg-primary" 
                          : "text-slate-400 hover:text-white hover:bg-slate-900"
                      )}
                    >
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <Button 
                onClick={handleLogout}
                variant="outline" 
                className="rounded-full h-10 px-6 border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:bg-destructive/10 hover:border-destructive/20 text-[10px] font-black uppercase tracking-widest"
              >
                <LogOut className="w-3.5 h-3.5 mr-2" /> Session Terminate
              </Button>
            </div>
          </div>
        </header>
      )}
      <main className="relative">
        <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />
        {children}
      </main>
    </div>
  );
}
