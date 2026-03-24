"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip session check for the login page itself to avoid infinite redirect
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

  if (isChecking) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 selection:bg-primary/30">
      {children}
    </div>
  );
}
