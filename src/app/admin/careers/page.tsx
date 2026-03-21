
"use client";

import React, { useState } from "react";
import { useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking, deleteDocumentNonBlocking } from "@/firebase";
import { collection, doc } from "firebase/firestore";
import { 
  Briefcase, 
  Plus, 
  Trash2, 
  Loader2, 
  MapPin, 
  History, 
  GraduationCap,
  Zap,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function AdminCareers() {
  const db = useFirestore();
  const { toast } = useToast();
  
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    category: "Engineering",
    type: "Full Time",
    experience: "3+ Years",
    location: "Begusarai / Remote",
    description: "",
    technologies: "",
    status: "active" as const
  });

  const careersQuery = useMemoFirebase(() => collection(db, "careers"), [db]);
  const { data: careers, isLoading } = useCollection(careersQuery);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewJob(prev => ({ ...prev, [name]: value }));
  };

  const createJobListing = () => {
    if (!newJob.title || !newJob.description) {
      toast({ variant: "destructive", title: "Missing Data", description: "Title and description are essential." });
      return;
    }

    setIsSubmitting(true);
    addDocumentNonBlocking(collection(db, "careers"), {
      ...newJob,
      id: `npb_${Date.now()}`,
      createdAt: new Date().toISOString()
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsNewModalOpen(false);
      setNewJob({ title: "", category: "Engineering", type: "Full Time", experience: "3+ Years", location: "Begusarai / Remote", description: "", technologies: "", status: "active" });
      toast({ title: "Nexus Career Deployed", description: "Opportunity is now live for talent acquisition." });
    }, 800);
  };

  const handleDelete = (id: string) => {
    if (confirm("Purge this career opportunity from NPB Nexus?")) {
      deleteDocumentNonBlocking(doc(db, "careers", id));
      toast({ title: "Role Purged", description: "Listing removed from public ecosystem." });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-black italic">Talent <span className="text-primary">Acquisition</span></h1>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">Total Openings: {careers?.length || 0}</p>
        </div>
        <Button 
          onClick={() => setIsNewModalOpen(true)}
          className="rounded-full px-8 h-14 bg-primary text-white hover:bg-slate-900 transition-all font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary/20"
        >
          <Plus className="w-4 h-4 mr-2" /> Deploy New Role
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {careers && careers.length > 0 ? (
          careers.map((job) => (
            <Card key={job.id} className="group border-none shadow-xl rounded-[3rem] bg-white overflow-hidden transition-all hover:shadow-2xl">
              <CardContent className="p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                    <Briefcase className="w-7 h-7" />
                  </div>
                  <Badge variant="outline" className="rounded-full border-slate-100 text-slate-400 px-4 py-1 text-[8px] font-black uppercase tracking-widest">
                    {job.status}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-headline font-black italic text-slate-900">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {job.location}</div>
                    <div className="flex items-center gap-1.5"><History className="w-3.5 h-3.5" /> {job.experience}</div>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-3 font-medium leading-relaxed">{job.description}</p>
                </div>

                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Verified Posting</span>
                  </div>
                  <Button 
                    onClick={() => handleDelete(job.id)}
                    variant="ghost" 
                    className="w-10 h-10 rounded-xl text-slate-300 hover:text-destructive hover:bg-destructive/10 transition-colors p-0"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-32 text-center space-y-6">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
              <Zap className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-3xl font-headline font-black italic text-slate-300">Nexus Career Grid Inactive</h3>
          </div>
        )}
      </div>

      {/* New Job Modal */}
      <Dialog open={isNewModalOpen} onOpenChange={setIsNewModalOpen}>
        <DialogContent className="max-w-2xl rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl">
          <div className="vibrant-gradient p-10 text-white space-y-2">
            <DialogTitle className="text-3xl font-headline font-black italic">Deploy Opportunity</DialogTitle>
            <DialogDescription className="text-white/80 font-medium">Broadcast a new career opening to the NPB talent ecosystem.</DialogDescription>
          </div>
          <div className="p-10 space-y-6 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Job Title</Label>
                <Input name="title" value={newJob.title} onChange={handleInputChange} placeholder="e.g. Senior Cloud Architect" className="h-14 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:border-primary px-6" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Category</Label>
                <Input name="category" value={newJob.category} onChange={handleInputChange} placeholder="e.g. Infrastructure" className="h-14 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:border-primary px-6" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Location</Label>
                <Input name="location" value={newJob.location} onChange={handleInputChange} placeholder="City or Remote" className="h-14 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:border-primary px-6" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Experience Req.</Label>
                <Input name="experience" value={newJob.experience} onChange={handleInputChange} placeholder="Years" className="h-14 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:border-primary px-6" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Role Overview</Label>
              <Textarea name="description" value={newJob.description} onChange={handleInputChange} placeholder="Enter full description..." className="min-h-[150px] rounded-2xl border-2 border-slate-50 bg-slate-50 focus:border-primary p-6" />
            </div>
          </div>
          <DialogFooter className="p-8 bg-slate-50 border-t flex flex-row items-center justify-between">
            <Button variant="ghost" onClick={() => setIsNewModalOpen(false)} className="rounded-full text-[10px] font-black uppercase tracking-widest">Cancel</Button>
            <Button 
              onClick={createJobListing}
              disabled={isSubmitting}
              className="rounded-full px-10 h-12 bg-primary text-white font-black uppercase text-[10px] tracking-widest shadow-xl"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Authorize Deployment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
