
"use client";

import React from "react";
import { useFirestore, useCollection, useMemoFirebase, deleteDocumentNonBlocking } from "@/firebase";
import { collection, doc } from "firebase/firestore";
import { 
  MessageSquare, 
  User, 
  Mail, 
  Phone, 
  Clock, 
  Trash2, 
  CheckCircle2, 
  Loader2,
  Quote
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function AdminInquiries() {
  const db = useFirestore();
  const { toast } = useToast();

  const inquiriesQuery = useMemoFirebase(() => collection(db, "inquiries"), [db]);
  const { data: inquiries, isLoading } = useCollection(inquiriesQuery);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  const handleDelete = (id: string) => {
    if (confirm("Archive and remove this lead from NPB Nexus?")) {
      deleteDocumentNonBlocking(doc(db, "inquiries", id));
      toast({ title: "Lead Purged", description: "Information removed from active records." });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-black italic">Lead <span className="text-primary">Pipeline</span></h1>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">Total Incoming: {inquiries?.length || 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {inquiries && inquiries.length > 0 ? (
          inquiries.map((item) => (
            <Card key={item.id} className="group border-none shadow-lg rounded-[2.5rem] bg-white overflow-hidden transition-all hover:shadow-xl">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Left: Contact Info */}
                  <div className="lg:col-span-4 p-8 bg-slate-50 flex flex-col justify-between border-r border-slate-100">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-primary shadow-sm">
                          <User className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-headline font-black italic">{item.fullName}</h3>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Inquiry ID: {item.id.slice(0, 8)}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                          <Mail className="w-4 h-4 text-slate-300" /> {item.email}
                        </div>
                        <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                          <Phone className="w-4 h-4 text-slate-300" /> {item.phone || 'No Mobile'}
                        </div>
                        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                          <Clock className="w-4 h-4" /> Received: {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="pt-6">
                      <Button 
                        onClick={() => handleDelete(item.id)}
                        variant="ghost" 
                        className="w-full justify-start gap-3 h-12 rounded-xl text-slate-400 hover:text-destructive hover:bg-destructive/10 font-black uppercase text-[10px] tracking-widest"
                      >
                        <Trash2 className="w-4 h-4" /> Purge Lead
                      </Button>
                    </div>
                  </div>

                  {/* Right: Message Content */}
                  <div className="lg:col-span-8 p-10 relative">
                    <Quote className="absolute top-8 right-8 w-20 h-20 text-slate-50 pointer-events-none" />
                    <div className="relative z-10 space-y-6">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary">Subject</p>
                        <h4 className="text-2xl font-headline font-black italic text-slate-900">{item.subject || 'New Digital Inquiry'}</h4>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Message Detail</p>
                        <p className="text-slate-600 leading-relaxed font-medium">
                          {item.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="py-32 text-center space-y-6">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
              <MessageSquare className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-3xl font-headline font-black italic text-slate-300">Nexus Pipeline is Empty</h3>
          </div>
        )}
      </div>
    </div>
  );
}
