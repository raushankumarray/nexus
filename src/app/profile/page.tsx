
"use client";

import React, { useEffect, useState, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useUser, useFirestore, useDoc, useCollection, useMemoFirebase, updateDocumentNonBlocking } from "@/firebase";
import { doc, collection, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  ArrowLeft,
  Loader2,
  MapPin,
  GraduationCap,
  FileText,
  Briefcase,
  ShoppingBag,
  Plus,
  Camera,
  Save,
  Navigation,
  Trash2,
  Upload,
  Eye,
  IdCard,
  Facebook,
  Github,
  Linkedin,
  ExternalLink,
  History,
  AlertCircle,
  CheckCircle2,
  Video,
  ClipboardList,
  FileCheck
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface EducationItem {
  qualification: string;
  institution: string;
  passingYear: string;
  university: string;
  subject: string;
  percentage: string;
}

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const profilePhotoRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const idCardInputRef = useRef<HTMLInputElement>(null);

  const userDocRef = useMemoFirebase(() => {
    if (!user || !db) return null;
    return doc(db, "users", user.uid);
  }, [user, db]);

  const { data: profileData, isLoading: isProfileLoading } = useDoc(userDocRef);

  // Fetch User Applications
  const applicationsQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(collection(db, "jobApplications"), where("userId", "==", user.uid));
  }, [db, user]);
  const { data: userApplications, isLoading: isAppsLoading } = useCollection(applicationsQuery);

  // Form States...
  const [formData, setFormData] = useState({ fullName: "", fathersName: "", mobile: "", dob: "", photoURL: "" });
  const [contactData, setContactData] = useState({ alternateMobile: "" });
  const [addressData, setAddressData] = useState({ fullAddress: "", block: "", district: "", state: "", pincode: "", country: "" });
  const [educationData, setEducationData] = useState<EducationItem[]>([{ qualification: "", institution: "", passingYear: "", university: "", subject: "", percentage: "" }]);
  const [docData, setDocData] = useState({ resumeURL: "", idCardType: "", idCardURL: "" });
  const [socialData, setSocialData] = useState({ linkedin: "", github: "", facebook: "", portfolio: "" });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    if (!isUserLoading && !user) router.push("/login");
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if (profileData) {
      setFormData({
        fullName: profileData.fullName || "",
        fathersName: profileData.fathersName || "",
        mobile: profileData.mobile || "",
        dob: profileData.dob || "",
        photoURL: profileData.photoURL || user?.photoURL || ""
      });
      setContactData({ alternateMobile: profileData.alternateMobile || "" });
      setAddressData({
        fullAddress: profileData.fullAddress || "",
        block: profileData.block || "",
        district: profileData.district || "",
        state: profileData.state || "",
        pincode: profileData.pincode || "",
        country: profileData.country || ""
      });
      setDocData({
        resumeURL: profileData.resumeURL || "",
        idCardType: profileData.idCardType || "",
        idCardURL: profileData.idCardURL || ""
      });
      setSocialData({
        linkedin: profileData.socialLinks?.linkedin || "",
        github: profileData.socialLinks?.github || "",
        facebook: profileData.socialLinks?.facebook || "",
        portfolio: profileData.socialLinks?.portfolio || ""
      });
      if (profileData.education && profileData.education.length > 0) setEducationData(profileData.education);
    }
  }, [profileData, user]);

  if (isUserLoading || isProfileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="font-headline font-black uppercase tracking-widest text-xs text-primary">Synchronizing Profile...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressData(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialData(prev => ({ ...prev, [name]: value }));
  };

  const handleEducationChange = (index: number, field: keyof EducationItem, value: string) => {
    const updated = [...educationData];
    updated[index] = { ...updated[index], [field]: value };
    setEducationData(updated);
  };

  const addEducationRow = () => setEducationData([...educationData, { qualification: "", institution: "", passingYear: "", university: "", subject: "", percentage: "" }]);
  const removeEducationRow = (index: number) => {
    if (educationData.length === 1) return;
    setEducationData(educationData.filter((_, i) => i !== index));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData(prev => ({ ...prev, photoURL: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'resume' | 'idCard') => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (type === 'resume' && file.type !== 'application/pdf') {
      toast({ variant: "destructive", title: "Invalid File", description: "Resume must be in PDF format." });
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setDocData(prev => ({ ...prev, [type === 'resume' ? 'resumeURL' : 'idCardURL']: reader.result as string }));
      toast({ title: "File Selected", description: `${type === 'resume' ? 'Resume' : 'ID Card'} is ready.` });
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfile = () => {
    if (!userDocRef) return;
    setIsUpdating(true);
    updateDocumentNonBlocking(userDocRef, { ...formData, updatedAt: new Date().toISOString() });
    setTimeout(() => { setIsUpdating(false); toast({ title: "Profile Updated" }); }, 800);
  };

  const handleUpdateAddress = () => {
    if (!userDocRef) return;
    setIsUpdating(true);
    updateDocumentNonBlocking(userDocRef, { ...addressData, updatedAt: new Date().toISOString() });
    setTimeout(() => { setIsUpdating(false); toast({ title: "Address Updated" }); }, 800);
  };

  const handleUpdateEducation = () => {
    if (!userDocRef) return;
    setIsUpdating(true);
    updateDocumentNonBlocking(userDocRef, { education: educationData, updatedAt: new Date().toISOString() });
    setTimeout(() => { setIsUpdating(false); toast({ title: "Education Updated" }); }, 800);
  };

  const handleUpdateDocuments = () => {
    if (!userDocRef) return;
    setIsUpdating(true);
    updateDocumentNonBlocking(userDocRef, { ...docData, updatedAt: new Date().toISOString() });
    setTimeout(() => { setIsUpdating(false); toast({ title: "Vault Updated" }); }, 800);
  };

  const handleUpdateSocial = () => {
    if (!userDocRef) return;
    setIsUpdating(true);
    updateDocumentNonBlocking(userDocRef, { socialLinks: socialData, updatedAt: new Date().toISOString() });
    setTimeout(() => { setIsUpdating(false); toast({ title: "Social Links Updated" }); }, 800);
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
      const data = await res.json();
      if (data && data.address) {
        setAddressData({
          fullAddress: data.display_name || "",
          block: data.address.suburb || "",
          district: data.address.city || data.address.town || "",
          state: data.address.state || "",
          pincode: data.address.postcode || "",
          country: data.address.country || ""
        });
      }
      setIsLocating(false);
    }, () => setIsLocating(false));
  };

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const sections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "address", label: "Address", icon: MapPin },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "social", label: "Social link", icon: Share2 },
    { id: "career", label: "Career", icon: Briefcase },
  ];

  return (
    <main className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 overflow-hidden vibrant-gradient text-white">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h1 className="text-5xl md:text-7xl font-headline font-black leading-[0.9] tracking-tighter drop-shadow-2xl">Profile</h1>
        </div>
      </section>

      <section className="py-24 bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <Tabs defaultValue="profile" className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4 space-y-8">
                <Card className="border-none shadow-2xl rounded-[3rem] bg-white overflow-hidden p-2">
                  <CardContent className="p-10 text-center space-y-6">
                    <Avatar className="w-32 h-32 border-4 border-primary/20 shadow-xl mx-auto">
                      <AvatarImage src={formData.photoURL} />
                      <AvatarFallback className="bg-primary text-white text-4xl font-black">{getInitials(formData.fullName)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-2xl font-headline font-black italic">{formData.fullName || "NPB User"}</h3>
                      <p className="text-muted-foreground font-medium text-sm">{user.email}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-2xl rounded-[3rem] bg-white overflow-hidden p-4">
                  <TabsList className="flex flex-col w-full h-auto bg-transparent gap-2">
                    {sections.map((sec) => (
                      <TabsTrigger key={sec.id} value={sec.id} className={cn("w-full justify-start rounded-2xl px-6 py-4 font-headline font-black text-sm transition-all flex items-center gap-4", "data-[state=active]:bg-primary data-[state=active]:text-white")}>
                        <sec.icon className="w-5 h-5" /> {sec.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Card>
              </div>

              <div className="lg:col-span-8 space-y-8">
                <TabsContent value="profile" className="mt-0 animate-in fade-in slide-in-from-right-4">
                  <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-10 md:p-16 space-y-8">
                    <h3 className="text-3xl font-headline font-black italic">Personal <span className="text-primary">Identity</span></h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Full Name</Label>
                        <Input name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Name" className="h-16 rounded-2xl border-2 bg-slate-50" />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Father's Name</Label>
                        <Input name="fathersName" value={formData.fathersName} onChange={handleInputChange} placeholder="Father's Name" className="h-16 rounded-2xl border-2 bg-slate-50" />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Mobile</Label>
                        <Input name="mobile" value={formData.mobile} onChange={handleInputChange} className="h-16 rounded-2xl border-2 bg-slate-50" />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">DOB</Label>
                        <Input name="dob" value={formData.dob} onChange={handleInputChange} type="date" className="h-16 rounded-2xl border-2 bg-slate-50" />
                      </div>
                    </div>
                    <Button onClick={handleUpdateProfile} disabled={isUpdating} className="w-full h-16 rounded-2xl text-xl font-headline bg-primary text-white">Update Profile</Button>
                  </Card>
                </TabsContent>

                <TabsContent value="address" className="mt-0 animate-in fade-in slide-in-from-right-4">
                  <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-10 md:p-16 space-y-8">
                    <div className="flex justify-between items-center">
                      <h3 className="text-3xl font-headline font-black italic">Postal <span className="text-primary">Coordinates</span></h3>
                      <Button variant="outline" onClick={handleLocateMe} disabled={isLocating} className="rounded-full gap-2 border-2 border-primary/20 text-primary">
                        {isLocating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />} Locate Me
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-xs font-black uppercase tracking-widest ml-2">Full Address</Label>
                      <Input name="fullAddress" value={addressData.fullAddress} onChange={handleAddressInputChange} className="h-16 rounded-2xl border-2 bg-slate-50" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <Input name="district" value={addressData.district} onChange={handleAddressInputChange} placeholder="District" className="h-16 rounded-2xl border-2 bg-slate-50" />
                      <Input name="state" value={addressData.state} onChange={handleAddressInputChange} placeholder="State" className="h-16 rounded-2xl border-2 bg-slate-50" />
                    </div>
                    <Button onClick={handleUpdateAddress} disabled={isUpdating} className="w-full h-16 rounded-2xl text-xl font-headline bg-primary text-white">Update Address</Button>
                  </Card>
                </TabsContent>

                <TabsContent value="education" className="mt-0 animate-in fade-in slide-in-from-right-4">
                  <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-10 md:p-16 space-y-8">
                    <div className="flex justify-between items-center">
                      <h3 className="text-3xl font-headline font-black italic">Academic <span className="text-primary">History</span></h3>
                      <Button variant="outline" onClick={addEducationRow} className="rounded-full border-2 border-primary/20 text-primary">Add More</Button>
                    </div>
                    {educationData.map((edu, idx) => (
                      <div key={idx} className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-100 space-y-4 relative">
                        <Input value={edu.institution} onChange={(e) => handleEducationChange(idx, "institution", e.target.value)} placeholder="Institution" className="bg-white" />
                        <div className="grid grid-cols-2 gap-4">
                          <Input value={edu.passingYear} onChange={(e) => handleEducationChange(idx, "passingYear", e.target.value)} placeholder="Year" className="bg-white" />
                          <Input value={edu.percentage} onChange={(e) => handleEducationChange(idx, "percentage", e.target.value)} placeholder="%" className="bg-white" />
                        </div>
                        {educationData.length > 1 && <Button variant="ghost" size="icon" onClick={() => removeEducationRow(idx)} className="absolute top-2 right-2 text-destructive"><Trash2 className="w-4 h-4" /></Button>}
                      </div>
                    ))}
                    <Button onClick={handleUpdateEducation} disabled={isUpdating} className="w-full h-16 rounded-2xl text-xl font-headline bg-primary text-white">Update Education</Button>
                  </Card>
                </TabsContent>

                <TabsContent value="documents" className="mt-0 animate-in fade-in slide-in-from-right-4">
                  <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-10 md:p-16 space-y-8">
                    <h3 className="text-3xl font-headline font-black italic">Digital <span className="text-primary">Vault</span></h3>
                    <div className="p-8 border-2 border-dashed border-slate-200 rounded-[2rem] flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <FileText className="w-10 h-10 text-primary" />
                        <div>
                          <p className="font-bold">Resume (PDF)</p>
                          <p className="text-xs text-muted-foreground">{docData.resumeURL ? "File Attached" : "Not Uploaded"}</p>
                        </div>
                      </div>
                      <Button onClick={() => resumeInputRef.current?.click()} className="rounded-full bg-primary text-white">{docData.resumeURL ? "Replace" : "Upload"}</Button>
                      <input type="file" ref={resumeInputRef} onChange={(e) => handleDocumentUpload(e, 'resume')} className="hidden" accept=".pdf" />
                    </div>
                    <Button onClick={handleUpdateDocuments} disabled={isUpdating} className="w-full h-16 rounded-2xl text-xl font-headline bg-primary text-white">Update Vault</Button>
                  </Card>
                </TabsContent>

                <TabsContent value="social" className="mt-0 animate-in fade-in slide-in-from-right-4">
                  <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-10 md:p-16 space-y-8">
                    <h3 className="text-3xl font-headline font-black italic">Public <span className="text-primary">Profile</span></h3>
                    <div className="space-y-4">
                      <Input name="linkedin" value={socialData.linkedin} onChange={handleSocialInputChange} placeholder="LinkedIn URL" className="h-14 rounded-xl border-2 bg-slate-50" />
                      <Input name="github" value={socialData.github} onChange={handleSocialInputChange} placeholder="GitHub URL" className="h-14 rounded-xl border-2 bg-slate-50" />
                    </div>
                    <Button onClick={handleUpdateSocial} disabled={isUpdating} className="w-full h-16 rounded-2xl text-xl font-headline bg-primary text-white">Save Socials</Button>
                  </Card>
                </TabsContent>

                <TabsContent value="career" className="mt-0 animate-in fade-in slide-in-from-right-4">
                  <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-10 md:p-16 space-y-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-3xl font-headline font-black italic">My <span className="text-primary">Applications</span></h3>
                      <Link href="/career/opportunities">
                        <Button variant="ghost" className="rounded-full font-black uppercase text-[10px] tracking-widest gap-2">
                          Apply More <ArrowUpRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>

                    {isAppsLoading ? (
                      <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
                    ) : userApplications && userApplications.length > 0 ? (
                      <div className="space-y-6">
                        {userApplications.map((app) => (
                          <div key={app.id} className="relative p-8 rounded-[2.5rem] bg-slate-50 border-2 border-slate-100 overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                              <Badge className={cn(
                                "px-6 py-2 rounded-full font-black uppercase text-[10px] tracking-widest border-none text-white",
                                app.status === 'pending' ? "bg-amber-500" : 
                                app.status === 'rejected' ? "bg-destructive" :
                                app.status === 'onboarding' ? "bg-emerald-600 animate-pulse" : "bg-primary"
                              )}>
                                {app.status.replace('_', ' ')}
                              </Badge>
                            </div>

                            <div className="space-y-6">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md">
                                  <Briefcase className="text-primary w-6 h-6" />
                                </div>
                                <div>
                                  <h4 className="text-2xl font-headline font-black italic leading-tight">{app.jobTitle}</h4>
                                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 mt-1">
                                    <History className="w-3 h-3" /> Applied on {new Date(app.appliedAt).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>

                              {/* Stage Specific Notifications */}
                              {app.status === 'test_scheduled' && app.hiringContext?.examLink && (
                                <div className="p-6 bg-blue-600 rounded-3xl text-white space-y-4 animate-in zoom-in duration-500">
                                  <div className="flex items-center gap-3">
                                    <ClipboardList className="w-6 h-6" />
                                    <h5 className="font-headline font-black italic text-xl">Technical Test Scheduled</h5>
                                  </div>
                                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-4">
                                    <div className="space-y-1">
                                      <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Schedule Date</p>
                                      <p className="font-bold">{app.hiringContext.examDate}</p>
                                    </div>
                                    <Button asChild className="bg-white text-blue-600 hover:bg-white/90 rounded-full font-black uppercase text-[10px] tracking-widest px-8">
                                      <a href={app.hiringContext.examLink} target="_blank">Start Test Now</a>
                                    </Button>
                                  </div>
                                </div>
                              )}

                              {app.status === 'interview' && app.hiringContext?.interviewLink && (
                                <div className="p-6 bg-indigo-600 rounded-3xl text-white space-y-4 animate-in zoom-in duration-500">
                                  <div className="flex items-center gap-3">
                                    <Video className="w-6 h-6" />
                                    <h5 className="font-headline font-black italic text-xl">Interview Details</h5>
                                  </div>
                                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-4">
                                    <div className="space-y-1">
                                      <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Time & Date</p>
                                      <p className="font-bold">{app.hiringContext.interviewDate}</p>
                                    </div>
                                    <Button asChild className="bg-white text-indigo-600 hover:bg-white/90 rounded-full font-black uppercase text-[10px] tracking-widest px-8">
                                      <a href={app.hiringContext.interviewLink} target="_blank">Join Meeting</a>
                                    </Button>
                                  </div>
                                </div>
                              )}

                              {app.status === 'document_verification' && app.hiringContext?.verificationFormLink && (
                                <div className="p-6 bg-orange-500 rounded-3xl text-white space-y-4 animate-in zoom-in duration-500">
                                  <div className="flex items-center gap-3">
                                    <FileCheck className="w-6 h-6" />
                                    <h5 className="font-headline font-black italic text-xl">Verification Action Required</h5>
                                  </div>
                                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-4">
                                    <div className="space-y-1">
                                      <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Submission Deadline</p>
                                      <p className="font-bold">{app.hiringContext.deadline || 'ASAP'}</p>
                                    </div>
                                    <Button asChild className="bg-white text-orange-500 hover:bg-white/90 rounded-full font-black uppercase text-[10px] tracking-widest px-8">
                                      <a href={app.hiringContext.verificationFormLink} target="_blank">Fill Verification Form</a>
                                    </Button>
                                  </div>
                                </div>
                              )}

                              {app.status === 'rejected' && app.hiringContext?.rejectionReason && (
                                <div className="p-6 bg-destructive/5 rounded-3xl border-2 border-destructive/10 space-y-3">
                                  <div className="flex items-center gap-3 text-destructive">
                                    <AlertCircle className="w-5 h-5" />
                                    <h5 className="font-headline font-black italic text-lg">Application Feedback</h5>
                                  </div>
                                  <p className="text-sm font-medium text-muted-foreground leading-relaxed">{app.hiringContext.rejectionReason}</p>
                                </div>
                              )}

                              {app.status === 'onboarding' && (
                                <div className="p-8 vibrant-gradient rounded-[2.5rem] text-white space-y-6 text-center shadow-xl">
                                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto animate-bounce">
                                    <CheckCircle2 className="w-10 h-10 text-white" />
                                  </div>
                                  <div className="space-y-2">
                                    <h5 className="text-3xl font-headline font-black italic">Congratulations!</h5>
                                    <p className="font-bold opacity-90">Welcome to the NPB Media Team. Check your primary email for onboarding documents and next steps.</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-20 space-y-6 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                          <Briefcase className="w-10 h-10 text-slate-200" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-headline font-black italic">No active applications</h3>
                          <p className="text-muted-foreground max-w-xs mx-auto font-medium">Your hiring journey hasn't started yet. View our open roles to begin.</p>
                        </div>
                      </div>
                    )}
                  </Card>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </section>

      <Footer />
    </main>
  );
}
