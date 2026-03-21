
"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useUser, useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking, deleteDocumentNonBlocking } from "@/firebase";
import { collection, doc } from "firebase/firestore";
import { 
  Briefcase, 
  MapPin, 
  Trash2, 
  Loader2, 
  ShieldAlert,
  ArrowLeft,
  Plus,
  Zap,
  Globe,
  Clock,
  Search,
  CheckCircle2,
  X
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ADMIN_EMAILS = ["raushankumarray96@gmail.com", "admin@npbmedia.com"];

export default function CareerManagementPage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const { toast } = useToast();

  const isAdmin = user && ADMIN_EMAILS.includes(user.email || "");

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // New Job Form State
  const [newJob, setNewJob] = useState({
    title: "",
    category: "Engineering",
    type: "Full Time",
    experience: "Entry Level",
    location: "Remote",
    description: "",
    status: "active" as const
  });

  // Guard query with isAdmin check to prevent permission errors on load
  const careersQuery = useMemoFirebase(() => (db && isAdmin) ? collection(db, "careers") : null, [db, isAdmin]);
  const { data: careers, isLoading } = useCollection(careersQuery);

  const handlePostJob = () => {
    if (!newJob.title || !newJob.description) {
      toast({ variant: "destructive", title: "Missing Fields", description: "Please complete all mandatory job details." });
      return;
    }

    const jobRef = collection(db!, "careers");
    addDocumentNonBlocking(jobRef, {
      ...newJob,
      id: Math.random().toString(36).substring(7), // Quick ID generation
      createdAt: new Date().toISOString()
    });

    toast({ title: "Opportunity Posted", description: "The role is now live on the career board." });
    setIsPostModalOpen(false);
    setNewJob({ title: "", category: "Engineering", type: "Full Time", experience: "Entry Level", location: "Remote", description: "", status: "active" });
  };

  const handleDelete = () => {
    if (!selectedJob) return;
    deleteDocumentNonBlocking(doc(db!, "careers", selectedJob.id));
    toast({ title: "Listing Removed", description: "The career opportunity has been archived and removed." });
    setIsDeleteDialogOpen(false);
  };

  if (isUserLoading || (isAdmin && isLoading)) {
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
        <h1 className="text-3xl font-headline font-black text-white italic">Administrator Auth Required</h1>
        <Link href="/admin/dashboard" className="mt-8">
          <Button variant="outline" className="text-white border-white/20">Back to Dashboard</Button>
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
              Manage <span className="text-primary">Careers</span>
            </h1>
            <p className="text-muted-foreground font-medium">Job listings and professional opportunity board.</p>
          </div>
          <Button 
            onClick={() => setIsPostModalOpen(true)}
            className="rounded-2xl h-14 px-8 bg-primary text-white font-headline text-xl italic shadow-xl shadow-primary/20 group border-none"
          >
            Post Opportunity <Plus className="ml-2 w-5 h-5 transition-transform group-hover:rotate-90" />
          </Button>
        </div>

        {careers && careers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {careers.map((job) => (
              <Card key={job.id} className="border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden group hover:-translate-y-1 transition-all duration-500">
                <CardContent className="p-8 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 shrink-0 shadow-lg">
                      <Briefcase className="w-7 h-7" />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className="bg-primary/10 text-primary border-none font-black uppercase text-[8px] tracking-[0.2em] px-3 py-1 rounded-full">{job.type}</Badge>
                      <Badge variant="outline" className="border-slate-100 text-slate-400 font-black uppercase text-[8px] tracking-[0.2em] px-3 py-1 rounded-full">{job.category}</Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-headline font-black italic text-slate-900 group-hover:text-primary transition-colors">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-muted-foreground">
                      <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-primary" /> {job.location}</div>
                      <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-primary" /> {job.experience}</div>
                    </div>
                  </div>

                  <p className="text-slate-500 text-sm font-medium line-clamp-3 leading-relaxed">{job.description}</p>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Listing</span>
                    </div>
                    <Button 
                      onClick={() => {
                        setSelectedJob(job);
                        setIsDeleteDialogOpen(true);
                      }}
                      variant="ghost" 
                      className="rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-10 px-4 font-black uppercase tracking-widest text-[9px]"
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> Delete Posting
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 space-y-6 bg-white rounded-[3rem] shadow-inner border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
              <Zap className="w-10 h-10 text-slate-200" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-headline font-black italic text-slate-400">No Positions Active</h3>
              <p className="text-muted-foreground font-medium max-w-xs mx-auto">Start by posting a new technical role to the global talent pool.</p>
            </div>
          </div>
        )}
      </div>

      {/* Post Job Dialog */}
      <Dialog open={isPostModalOpen} onOpenChange={setIsPostModalOpen}>
        <DialogContent className="max-w-2xl rounded-[3rem] border-none shadow-2xl p-0 overflow-hidden">
          <div className="vibrant-gradient p-10 text-white space-y-2">
            <DialogTitle className="text-3xl font-headline font-black italic">Post Opportunity</DialogTitle>
            <DialogDescription className="text-white/80 text-xs font-medium uppercase tracking-widest">NPB Media Talent Acquisition</DialogDescription>
          </div>
          <div className="p-10 space-y-8 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Job Title*</label>
                <Input 
                  value={newJob.title}
                  onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                  placeholder="e.g. Lead React Engineer" 
                  className="h-14 rounded-2xl border-2 border-slate-100 px-6 font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Category</label>
                <Input 
                  value={newJob.category}
                  onChange={(e) => setNewJob({...newJob, category: e.target.value})}
                  placeholder="Engineering / Design / Ops" 
                  className="h-14 rounded-2xl border-2 border-slate-100 px-6 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Type</label>
                <Input 
                  value={newJob.type}
                  onChange={(e) => setNewJob({...newJob, type: e.target.value})}
                  placeholder="Full Time / Contract" 
                  className="h-14 rounded-2xl border-2 border-slate-100 px-6 font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Exp. Level</label>
                <Input 
                  value={newJob.experience}
                  onChange={(e) => setNewJob({...newJob, experience: e.target.value})}
                  placeholder="Junior / Senior" 
                  className="h-14 rounded-2xl border-2 border-slate-100 px-6 font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Location</label>
                <Input 
                  value={newJob.location}
                  onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                  placeholder="Remote / Begusarai" 
                  className="h-14 rounded-2xl border-2 border-slate-100 px-6 font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Job Description*</label>
              <Textarea 
                value={newJob.description}
                onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                placeholder="Detail the role requirements and expectations..." 
                className="min-h-[150px] rounded-3xl border-2 border-slate-100 p-6 font-medium resize-none"
              />
            </div>
          </div>
          <DialogFooter className="p-8 bg-slate-50 flex flex-row gap-4">
            <Button variant="ghost" onClick={() => setIsPostModalOpen(false)} className="flex-1 rounded-2xl font-black uppercase tracking-widest text-[10px]">Cancel</Button>
            <Button onClick={handlePostJob} className="flex-1 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] h-14 shadow-xl">Confirm & Publish</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-sm rounded-[3rem] border-none shadow-2xl">
          <DialogHeader className="space-y-4">
            <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center text-destructive mx-auto">
              <Trash2 className="w-8 h-8" />
            </div>
            <DialogTitle className="text-2xl font-headline font-black text-center">Archive Role?</DialogTitle>
            <DialogDescription className="text-center font-medium">This will remove the job listing from the career board. Active applications may still persist.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row gap-3 pt-6">
            <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)} className="flex-1 rounded-xl font-black uppercase tracking-widest text-[10px]">Cancel</Button>
            <Button onClick={handleDelete} variant="destructive" className="flex-1 rounded-xl font-black uppercase tracking-widest text-[10px] h-12">Delete Listing</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  );
}
