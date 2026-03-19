
"use client";

import React from "react";
import Link from "next/link";
import { Rocket, Twitter, Linkedin, Github, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-white pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                <Rocket className="text-white w-7 h-7" />
              </div>
              <span className="font-headline font-bold text-3xl tracking-tight">
                NPB <span className="text-primary">Nexus</span>
              </span>
            </Link>
            <p className="text-slate-400 text-lg max-w-md leading-relaxed">
              Pioneering the next generation of digital infrastructure. We build high-impact software that powers the world's most innovative companies.
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Github].map((Icon, idx) => (
                <Link key={idx} href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-headline font-bold text-xl">Quick Links</h4>
            <ul className="space-y-4">
              {["Services", "Portfolio", "Case Studies", "AI Lab"].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group">
                    {item} <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-headline font-bold text-xl">Legal</h4>
            <ul className="space-y-4">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Contact Us"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-400 hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} NPB Digital Nexus. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-slate-500">
            <span>Made with Innovation</span>
            <span>Security Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
