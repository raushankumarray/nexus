
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, UserCircle, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAdminPath = pathname.startsWith("/admin");
  const isAdminLogin = pathname === "/admin/login";
  const isAdminDashboard = isAdminPath && !isAdminLogin;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Technology", href: "/technology" },
    { name: "Products", href: "/products" },
    { name: "Career", href: "/career" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  const adminLinks = [
    { name: "Products", href: "/admin/products" },
    { name: "Careers", href: "/admin/careers" },
    { name: "Inquiries", href: "/admin/contacts" },
    { name: "Meetings", href: "/admin/meetings" },
    { name: "Profiles", href: "/admin/profiles" },
    { name: "Users", href: "/admin/users" },
  ];

  const handleSignOut = () => {
    router.push("/admin/login");
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled 
          ? "bg-background/80 backdrop-blur-md border-b py-3 shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          href={isAdminDashboard ? "/admin/dashboard" : "/"} 
          className="flex items-center gap-3 group"
        >
          <Logo className="transition-transform group-hover:scale-110 duration-500" />
          <span className="font-headline font-black text-2xl tracking-tight text-[#00008B]">
            Media
          </span>
        </Link>

        {/* Conditional Rendering Based on Admin State */}
        {!isAdminLogin && (
          <>
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              {isAdminDashboard ? (
                <>
                  {adminLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={cn(
                        "text-[9px] lg:text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors whitespace-nowrap",
                        pathname === link.href ? "text-primary" : "text-foreground/70"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Button 
                    onClick={handleSignOut}
                    variant="ghost" 
                    size="sm" 
                    className="rounded-full text-foreground/70 hover:text-destructive hover:bg-destructive/10 font-black uppercase tracking-widest text-[10px]"
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Sign Out
                  </Button>
                </>
              ) : (
                <>
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={cn(
                        "text-[10px] lg:text-xs font-black uppercase tracking-widest hover:text-primary transition-colors whitespace-nowrap",
                        pathname === link.href ? "text-primary" : "text-foreground/70"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link href="/login" title="Login">
                    <Button variant="ghost" size="icon" className="rounded-full text-foreground/70 hover:text-primary hover:bg-primary/10 transition-all">
                      <UserCircle className="w-6 h-6" />
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Nav Actions */}
            <div className="flex items-center gap-2 md:hidden">
              {!isAdminDashboard && (
                <Link href="/login">
                  <Button variant="ghost" size="icon" className="rounded-full text-foreground/70">
                    <UserCircle className="w-6 h-6" />
                  </Button>
                </Link>
              )}
              <button
                className="p-2 text-foreground"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && !isAdminLogin && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300 shadow-xl">
          {(isAdminDashboard ? adminLinks : navLinks).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "text-lg font-black uppercase tracking-widest py-3 border-b border-muted transition-colors",
                pathname === link.href ? "text-primary" : "text-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
          {isAdminDashboard && (
            <Button 
              onClick={handleSignOut}
              variant="destructive" 
              className="w-full rounded-2xl h-14 font-black uppercase tracking-widest"
            >
              <LogOut className="mr-2 w-5 h-5" /> Sign Out
            </Button>
          )}
        </div>
      )}
    </nav>
  );
}
