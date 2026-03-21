
"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useUser, useFirestore, useCollection, useMemoFirebase, deleteDocumentNonBlocking } from "@/firebase";
import { collection, doc } from "firebase/firestore";
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Trash2, 
  Loader2, 
  ShieldAlert,
  ArrowLeft,
  Calendar,
  Sparkles,
  Search,
  User
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const ADMIN_EMAILS = ["raushankumarray96@gmail.com", "admin@npbmedia.com"];

export default function ContactManagementPage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const { toast } = useToast();

  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const inquiriesQuery = useMemoFirebase(() => db ? collection(db, "inquiries") : null, [db]);
  const { data: inquiries, isLoading } = useCollection(inquiriesQuery);

  const isAdmin = user && ADMIN_EMAILS.includes(user.email || "");

  const handleDelete = () => {
    if (!selectedInquiry) return;
    deleteDocumentNonBlocking(doc(db!, "inquiries", selectedInquiry.id));
    toast({ title: "Inquiry Deleted", description: "The submission has been cleared from the database." });
    setIsDeleteDialogOpen(false);
  };

  if (isUserLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
        <ShieldAlert className="w-16 h-16 text-destructive mb-6" />
        <h1 className="text-3xl font-headline font-black text-white italic">Access Restricted</h1>
        <Link href="/admin/dashboard" className="mt-8">
          <Button variant="outline" className="text-white border-white/20">Back to Safety</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 pt-32 pb-20 space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-4">
            <Link href="/admin/dashboard" className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-3 h-3 mr-2" /> Dashboard
            </Link>
            <h1 className="text-4xl md:text-6xl font-headline font-black italic text-slate-900">
              Manage <span className="text-primary">Inquiries</span>
            </h1>
            <p className="text-muted-foreground font-medium">Customer leads and general contact submissions.</p>
          </div>
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 rounded-full font-black uppercase text-[10px] tracking-widest">
            {inquiries?.length || 0} Total Submissions
          </Badge>
        </div>

        {inquiries && inquiries.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {inquiries.map((inquiry) => (
              <Card key={inquiry.id} className="border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden group hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-8 space-y-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0 shadow-lg group-hover:rotate-12">
                        <User className="w-7 h-7" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xl font-headline font-black italic text-slate-900">{inquiry.fullName}</p>
                        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground">
                          <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-primary" /> {inquiry.email}</div>
                          <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-primary" /> {inquiry.phone || 'N/A'}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden md:block">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Received On</p>
                        <p className="text-sm font-bold text-slate-700">{new Date(inquiry.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                      </div>
                      <Button 
                        onClick={() => {
                          setSelectedInquiry(inquiry);
                          setIsDeleteDialogOpen(true);
                        }}
                        variant="ghost" 
                        className="rounded-2xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-12 w-12"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-slate-900 text-white font-black uppercase text-[8px] tracking-[0.2em] px-3 py-1 rounded-full">Subject</Badge>
                      <h4 className="text-lg font-black italic text-slate-800">{inquiry.subject || 'General Inquiry'}</h4>
                    </div>
                    <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 relative group/msg overflow-hidden">
                      <MessageSquare className="absolute -bottom-4 -right-4 w-24 h-24 text-primary/5 -rotate-12 group-hover/msg:scale-110 transition-transform" />
                      <p className="text-slate-600 leading-relaxed font-medium italic text-lg relative z-10">"{inquiry.message}"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 space-y-6 bg-white rounded-[3rem] shadow-inner border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
              <Search className="w-10 h-10 text-slate-200" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-headline font-black italic text-slate-400">Inbox is Empty</h3>
              <p className="text-muted-foreground font-medium max-w-xs mx-auto">New inquiries from your contact forms will appear here automatically.</p>
            </div>
          </div>
        )}
      </div>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-sm rounded-[3rem] border-none shadow-2xl">
          <DialogHeader className="space-y-4">
            <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center text-destructive mx-auto">
              <Trash2 className="w-8 h-8" />
            </div>
            <DialogTitle className="text-2xl font-headline font-black text-center">Clear Submission?</DialogTitle>
            <DialogDescription className="text-center font-medium">Are you sure you want to permanently remove this inquiry from the database?</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row gap-3 pt-6">
            <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)} className="flex-1 rounded-xl font-black uppercase tracking-widest text-[10px]">Keep It</Button>
            <Button onClick={handleDelete} variant="destructive" className="flex-1 rounded-xl font-black uppercase tracking-widest text-[10px] h-12">Delete Submission</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  );
}
