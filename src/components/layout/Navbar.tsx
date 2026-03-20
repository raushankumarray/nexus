
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Technology", href: "/technology" },
    { name: "Products", href: "/products" },
    { name: "Career", href: "/career" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled 
          ? "bg-background/80 backdrop-blur-md border-b py-3" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Logo className="transition-transform group-hover:scale-110 duration-500" />
          <span className="font-headline font-black text-2xl tracking-tight hidden sm:block">
            <span className="text-[#FF0000]">N</span>
            <span className="text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">P</span>
            <span className="text-[#008000]">B</span>
            <span className="text-[#00008B] ml-2 italic">Media</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-black uppercase tracking-widest hover:text-primary transition-colors whitespace-nowrap",
                pathname === link.href ? "text-primary border-b-2 border-primary pb-1" : "text-foreground/70"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
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
        </div>
      )}
    </nav>
  );
}
