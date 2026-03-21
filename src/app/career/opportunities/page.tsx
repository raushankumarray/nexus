
"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  MapPin, 
  Briefcase, 
  ArrowUpRight,
  Zap,
  CheckCircle2,
  Lock,
  Loader2,
  History,
  GraduationCap,
  Cpu,
  User,
  ShieldCheck,
  Calendar,
  Phone,
  FileText
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useFirestore, useCollection, useUser, useMemoFirebase, useDoc } from "@/firebase";
import { collection, query, where, doc, serverTimestamp } from "firebase/firestore";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function OpportunitiesPage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  // Dialog State
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [experience, setExperience] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch live career listings
  const careersQuery = useMemoFirebase(() => {
    if (!db) return null;
    return collection(db, "careers");
  }, [db]);
  const { data: allCareers, isLoading: isCareersLoading } = useCollection(careersQuery);

  // Fetch user profile for data sync
  const profileRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, "users", user.uid);
  }, [db, user]);
  const { data: userProfile } = useDoc(profileRef);

  // Fetch user's applications to track "Applied" state
  const applicationsQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(collection(db, "jobApplications"), where("userId", "==", user.uid));
  }, [db, user]);
  const { data: userApplications } = useCollection(applicationsQuery);

  const appliedJobIds = userApplications?.map(app => app.jobId) || [];

  if (isCareersLoading || isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  const handleApplyClick = (job: any) => {
    if (!user) {
      toast({ title: "Auth Required", description: "Please sign in to apply for roles." });
      router.push("/login");
      return;
    }

    // Profile Completion Check
    const isProfileComplete = 
      userProfile?.fullName && 
      userProfile?.fathersName && 
      userProfile?.dob && 
      userProfile?.mobile && 
      userProfile?.resumeURL && 
      userProfile?.fullAddress;

    if (!isProfileComplete) {
      toast({ 
        variant: "destructive", 
        title: "Profile Incomplete", 
        description: "Please complete your professional profile (Personal, Address, and Documents) before applying." 
      });
      router.push("/profile");
      return;
    }

    setSelectedJob(job);
    setIsAppModalOpen(true);
  };

  const submitApplication = () => {
    if (!experience.trim()) {
      toast({ variant: "destructive", title: "Missing Information", description: "Please provide your relevant experience." });
      return;
    }

    setIsSubmitting(true);
    const appId = `${user!.uid}_${selectedJob.id}`;
    
    setDocumentNonBlocking(doc(db, "jobApplications", appId), {
      id: appId,
      userId: user!.uid,
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      experience: experience,
      status: "pending",
      appliedAt: new Date().toISOString(),
      applicantSnapshot: {
        fullName: userProfile?.fullName,
        email: userProfile?.email,
        mobile: userProfile?.mobile,
        fathersName: userProfile?.fathersName,
        dob: userProfile?.dob,
        resumeURL: userProfile?.resumeURL,
        address: userProfile?.fullAddress
      }
    }, { merge: true });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsAppModalOpen(false);
      setExperience("");
      toast({ title: "Application Sent!", description: "Your profile has been forwarded to the hiring team." });
    }, 800);
  };

  const activeRoles = allCareers?.filter(r => r.status === "active" && !appliedJobIds.includes(r.id)) || [];
  const closedRoles = allCareers?.filter(r => r.status === "closed") || [];
  const userAppliedRoles = allCareers?.filter(r => appliedJobIds.includes(r.id)) || [];

  const RoleCard = ({ role, isApplied = false, isClosed = false }: { role: any, isApplied?: boolean, isClosed?: boolean }) => (
    <Card className="group border-none shadow-2xl rounded-[3rem] bg-white overflow-hidden hover:-translate-y-2 transition-all duration-500">
      <CardContent className="p-8 md:p-10 flex flex-col h-full space-y-6">
        <div className="flex justify-between items-start">
          <div className={cn(
            "w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-white transition-all duration-700 group-hover:rotate-[360deg] shadow-xl",
            isClosed ? "bg-slate-300" : "bg-primary"
          )}>
            {isClosed ? <Lock className="w-7 h-7" /> : <Briefcase className="w-7 h-7" />}
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="outline" className="px-3 py-1 rounded-full border-2 border-slate-100 font-black uppercase text-[10px] tracking-widest text-muted-foreground">
              {role.type || 'Full Time'}
            </Badge>
            <Badge className={cn(
              "px-3 py-1 rounded-full text-white border-none font-black uppercase text-[10px] tracking-widest",
              isClosed ? "bg-slate-400" : "bg-secondary"
            )}>
              {role.category || 'Engineering'}
            </Badge>
          </div>
        </div>

        <div className="space-y-4 flex-1">
          <h3 className={cn(
            "text-2xl md:text-3xl font-headline font-black italic transition-colors",
            isClosed ? "text-slate-400" : "group-hover:text-primary"
          )}>
            {role.title}
          </h3>
          
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground font-bold text-xs">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              {role.location || 'Remote'}
            </div>
            <div className="flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-primary" />
              {role.experience || 'Entry Level'}
            </div>
            <div className="flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-primary" />
              {role.qualification || 'Degree'}
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed font-semibold text-sm line-clamp-3">
            {role.description}
          </p>

          {role.technologies && (
            <div className="flex flex-wrap gap-2 pt-2">
              {role.technologies.split(',').map((tech: string, i: number) => (
                <Badge key={i} variant="secondary" className="bg-slate-50 text-slate-500 font-black uppercase text-[8px] tracking-widest border border-slate-100">
                  {tech.trim()}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          {isApplied ? (
            <div className="flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-[10px]">
              <CheckCircle2 className="w-4 h-4" />
              Application Submitted
            </div>
          ) : isClosed ? (
            <div className="text-slate-400 font-black uppercase tracking-widest text-[10px]">
              Applications Closed
            </div>
          ) : (
            <Button 
              onClick={() => handleApplyClick(role)}
              className="w-full rounded-full h-12 text-xs font-black uppercase tracking-widest text-white border-none group/btn shadow-lg bg-primary"
            >
              Apply Now <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <main className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 overflow-hidden vibrant-gradient text-white">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom duration-1000">
            <Link href="/career" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4 group">
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              Back to Careers
            </Link>
            <h1 className="text-5xl md:text-8xl font-headline font-black leading-[0.9] tracking-tighter drop-shadow-2xl">
              Career <span className="italic text-yellow-300">Nexus</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-bold border-l-4 border-yellow-300 pl-6">
              Your professional journey starts here. Explore live opportunities and track your growth within the NPB ecosystem.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <Tabs defaultValue="active" className="space-y-8 md:space-y-12">
            <div className="flex justify-center">
              <TabsList className="bg-slate-100 p-1 md:p-1.5 h-auto rounded-full border-2 border-slate-200 w-full grid grid-cols-3 max-w-xl mx-auto overflow-hidden">
                <TabsTrigger value="active" className="rounded-full px-1 py-3 md:py-4 font-headline font-black text-[10px] md:text-lg data-[state=active]:bg-primary data-[state=active]:text-white transition-all uppercase tracking-tight">
                  Active
                </TabsTrigger>
                <TabsTrigger value="closed" className="rounded-full px-1 py-3 md:py-4 font-headline font-black text-[10px] md:text-lg data-[state=active]:bg-slate-800 data-[state=active]:text-white transition-all uppercase tracking-tight">
                  Closed
                </TabsTrigger>
                <TabsTrigger value="applied" className="rounded-full px-1 py-3 md:py-4 font-headline font-black text-[10px] md:text-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all uppercase tracking-tight">
                  Applied ({appliedJobIds.length})
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="active" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {activeRoles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {activeRoles.map((role) => (
                    <RoleCard key={role.id} role={role} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 space-y-6">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <Zap className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-3xl font-headline font-black italic">No active roles found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto font-medium">Check back soon or explore our other tabs for your status.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="closed" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {closedRoles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 grayscale opacity-80">
                  {closedRoles.map((role) => (
                    <RoleCard key={role.id} role={role} isClosed />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 space-y-6">
                  <h3 className="text-3xl font-headline font-black italic">No archived roles</h3>
                </div>
              )}
            </TabsContent>

            <TabsContent value="applied" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {userAppliedRoles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {userAppliedRoles.map((role) => (
                    <RoleCard key={role.id} role={role} isApplied />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 space-y-6">
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-3xl font-headline font-black italic">No applications found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto font-medium">Start your journey by applying to our active openings.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Application Dialog */}
      <Dialog open={isAppModalOpen} onOpenChange={setIsAppModalOpen}>
        <DialogContent className="max-w-2xl rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl">
          <div className="vibrant-gradient p-10 text-white space-y-2">
            <DialogTitle className="text-3xl font-headline font-black italic">Job Application</DialogTitle>
            <DialogDescription className="text-white/80 font-medium">Applying for: <span className="text-yellow-300 font-bold">{selectedJob?.title}</span></DialogDescription>
          </div>
          <div className="p-10 space-y-8 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Full Name (Locked)</Label>
                <div className="h-12 bg-slate-50 border-2 border-slate-100 rounded-xl px-4 flex items-center text-sm font-bold text-slate-500 gap-2">
                  <User className="w-4 h-4" /> {userProfile?.fullName}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Email (Locked)</Label>
                <div className="h-12 bg-slate-50 border-2 border-slate-100 rounded-xl px-4 flex items-center text-sm font-bold text-slate-500 gap-2">
                  <ShieldCheck className="w-4 h-4" /> {userProfile?.email}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Date of Birth (Locked)</Label>
                <div className="h-12 bg-slate-50 border-2 border-slate-100 rounded-xl px-4 flex items-center text-sm font-bold text-slate-500 gap-2">
                  <Calendar className="w-4 h-4" /> {userProfile?.dob}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Mobile (Locked)</Label>
                <div className="h-12 bg-slate-50 border-2 border-slate-100 rounded-xl px-4 flex items-center text-sm font-bold text-slate-500 gap-2">
                  <Phone className="w-4 h-4" /> {userProfile?.mobile}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Professional Resume (Attached)</Label>
              <div className="h-14 bg-emerald-50 border-2 border-emerald-100 rounded-xl px-4 flex items-center justify-between text-xs font-bold text-emerald-700">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5" /> profile_resume_latest.pdf
                </div>
                <Badge className="bg-emerald-600 text-white text-[8px] border-none">Verified</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Your Experience & Summary*</Label>
              <Input 
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="e.g. 3 Years in React development, previously at..."
                className="h-14 rounded-xl border-2 border-slate-100 focus:border-primary px-4 font-medium"
              />
            </div>
          </div>
          <DialogFooter className="p-8 bg-slate-50 flex flex-row items-center justify-between">
            <Button variant="ghost" onClick={() => setIsAppModalOpen(false)} className="rounded-full font-black uppercase tracking-widest text-[10px]">Cancel</Button>
            <Button 
              onClick={submitApplication}
              disabled={isSubmitting}
              className="rounded-full px-10 h-12 bg-primary text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Confirm & Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  );
}
