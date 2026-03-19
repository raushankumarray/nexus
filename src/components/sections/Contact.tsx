
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl font-headline font-bold leading-tight">
                Let's Build Something <span className="text-gradient">Extraordinary</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Whether you have a fully-formed idea or just a spark, our team is ready to bring it to life. Reach out and let's start the conversation.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary transition-colors duration-300">
                  <Mail className="text-primary w-6 h-6 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email us at</p>
                  <p className="text-xl font-bold">hello@npbnexus.io</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                  <Phone className="text-primary w-6 h-6 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Call our office</p>
                  <p className="text-xl font-bold">+1 (555) 012-3456</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                  <MapPin className="text-primary w-6 h-6 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Visit our studio</p>
                  <p className="text-xl font-bold">Innovation Hub, Silicon Valley, CA</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 via-accent/5 to-secondary/10 rounded-[3rem] blur-2xl -z-10" />
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-border/50">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">First Name</label>
                    <Input placeholder="John" className="h-14 rounded-xl border-2 focus:border-primary transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Last Name</label>
                    <Input placeholder="Doe" className="h-14 rounded-xl border-2 focus:border-primary transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold">Email Address</label>
                  <Input type="email" placeholder="john@company.com" className="h-14 rounded-xl border-2 focus:border-primary transition-all" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold">Project Type</label>
                  <select className="w-full h-14 px-4 rounded-xl border-2 border-input bg-background focus:border-primary focus:outline-none transition-all">
                    <option>Software Development</option>
                    <option>UI/UX Design</option>
                    <option>AI Solutions</option>
                    <option>Cloud Migration</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold">Message</label>
                  <Textarea placeholder="Tell us about your project..." className="min-h-[150px] rounded-xl border-2 focus:border-primary transition-all" />
                </div>

                <Button className="w-full h-16 rounded-xl text-lg font-headline bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
                  Send Message <Send className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
