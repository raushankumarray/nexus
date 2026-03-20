
"use client";

import React from "react";
import Link from "next/link";
import { Twitter, Linkedin, Github, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="bg-foreground text-white pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-4">
              <Logo />
              <span className="font-headline font-black text-3xl tracking-tight">
                <span className="text-[#FF0000]">N</span>
                <span className="text-white">P</span>
                <span className="text-[#008000]">B</span>
                <span className="text-[#00008B] ml-2 italic">Media</span>
              </span>
            </Link>
            <p className="text-slate-400 text-lg max-w-md leading-relaxed font-medium">
              Pioneering the next generation of digital infrastructure. We build high-impact software that powers the world's most innovative companies from Begusarai to the World.
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Github].map((Icon, idx) => (
                <Link key={idx} href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-300 group">
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-headline font-black text-xl italic text-primary">Quick Links</h4>
            <ul className="space-y-4">
              {["Services", "Technology", "Products", "Career"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(" ", "-")}`} className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group font-black uppercase text-xs tracking-widest">
                    {item} <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-headline font-black text-xl italic text-primary">Support</h4>
            <ul className="space-y-4">
              {["About", "Contact", "Career"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(" ", "-")}`} className="text-slate-400 hover:text-white transition-colors font-black uppercase text-xs tracking-widest">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm font-black uppercase tracking-widest">
            © {new Date().getFullYear()} NPB Media. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
            <span>Made in India</span>
            <span>Security Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
