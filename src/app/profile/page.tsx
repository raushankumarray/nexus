"use client";

import React, { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  ArrowLeft,
  Loader2,
  MapPin,
  GraduationCap,
  FileText,
  Briefcase,
  ShoppingBag,
  Plus,
  ChevronRight,
  Share2,
  Globe,
  Link as LinkIcon
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const router = useRouter();

  const userDocRef = useMemoFirebase(() => {
    if (!user || !db) return null;
    return doc(db, "users", user.uid);
  }, [user, db]);

  const { data: profileData, isLoading: isProfileLoading } = useDoc(userDocRef);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/login");
    }
  }, [user, isUserLoading, router]);

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

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const sections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "address", label: "Address", icon: MapPin },
    { id: "contact", label: "Contact", icon: Phone },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "social", label: "Social Link", icon: Share2 },
    { id: "career", label: "Career", icon: Briefcase },
    { id: "order", label: "Order", icon: ShoppingBag },
  ];

  return (
    <main className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Profile Header */}
      <section className="relative pt-32 pb-20 overflow-hidden vibrant-gradient text-white">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom duration-1000">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4 group"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
            <h1 className="text-5xl md:text-7xl font-headline font-black leading-[0.9] tracking-tighter drop-shadow-2xl">
              Profile
            </h1>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-24 bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <Tabs defaultValue="profile" className="space-y-12">
            
            {/* Horizontal Scrollable Menu for better fit on all screens */}
            <div className="flex justify-start lg:justify-center overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
              <TabsList className="bg-slate-100 p-2 h-auto rounded-[2rem] border-2 border-slate-200 inline-flex flex-nowrap shrink-0">
                {sections.map((sec) => (
                  <TabsTrigger 
                    key={sec.id}
                    value={sec.id} 
                    className="rounded-full px-6 md:px-8 py-4 font-headline font-black text-[10px] md:text-sm data-[state=active]:bg-primary data-[state=active]:text-white transition-all flex items-center gap-2 whitespace-nowrap"
                  >
                    <sec.icon className="w-3.5 h-3.5 md:w-4 h-4" />
                    {sec.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Sidebar: Profile Summary */}
              <div className="lg:col-span-4 space-y-8">
                <Card className="border-none shadow-2xl rounded-[3rem] bg-white overflow-hidden p-2">
                  <CardContent className="p-10 text-center space-y-6">
                    <div className="relative mx-auto w-32 h-32">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                      <Avatar className="w-32 h-32 border-4 border-primary/20 shadow-xl relative z-10">
                        <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
                        <AvatarFallback className="bg-primary text-white text-4xl font-black">
                          {getInitials(user.displayName || profileData?.fullName)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="text-2xl font-headline font-black italic">{profileData?.fullName || user.displayName || "NPB User"}</h3>
                      <p className="text-muted-foreground font-medium text-sm">{user.email}</p>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                        <ShieldCheck className="w-3 h-3" /> Identity Verified
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="p-10 rounded-[3rem] bg-foreground text-white space-y-6 relative overflow-hidden group">
                  <div className="absolute inset-0 grid-bg opacity-10" />
                  <div className="relative z-10 space-y-6">
                    <h4 className="text-xl font-headline font-black italic">Account Status</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="font-bold text-slate-300">Member Since</span> 
                        <span className="font-black text-primary uppercase text-xs">
                          {profileData?.createdAt ? new Date(profileData.createdAt.seconds * 1000).getFullYear() : '2025'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="font-bold text-slate-300">Level</span> 
                        <span className="text-secondary font-black text-xs uppercase">Elite Member</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Tab Contents */}
              <div className="lg:col-span-8 space-y-8">
                
                <TabsContent value="profile" className="mt-0 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-2">
                    <CardHeader className="p-10 md:p-16 pb-0">
                      <CardTitle className="text-3xl font-headline font-black italic">Personal <span className="text-primary">Identity</span></CardTitle>
                    </CardHeader>
                    <CardContent className="p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                      {[
                        { label: "Full Name", value: profileData?.fullName || user.displayName || "N/A", icon: User },
                        { label: "Email Address", value: user.email, icon: Mail },
                        { label: "Mobile Number", value: profileData?.mobile || "N/A", icon: Phone },
                        { label: "Date of Birth", value: profileData?.dob || "N/A", icon: Calendar },
                      ].map((item, idx) => (
                        <div key={idx} className="p-8 bg-slate-50 rounded-[2.5rem] border-2 border-transparent hover:border-primary/20 hover:bg-white transition-all duration-500">
                          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">{item.label}</p>
                          <p className="text-lg font-headline font-black break-words">{item.value}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="address" className="mt-0 animate-in fade-in slide-in-from-right-4 duration-500">
                  <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-10 md:p-16 space-y-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-3xl font-headline font-black italic">Registered <span className="text-primary">Addresses</span></h3>
                      <Button variant="outline" className="rounded-full h-12 px-6 border-2 font-black uppercase tracking-widest text-xs">
                        <Plus className="w-4 h-4 mr-2" /> Add New
                      </Button>
                    </div>
                    <div className="p-8 border-2 border-dashed border-slate-200 rounded-[2.5rem] text-center space-y-4">
                      <MapPin className="w-12 h-12 text-slate-300 mx-auto" />
                      <p className="text-muted-foreground font-semibold">No addresses saved yet. Start by adding your first one.</p>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="contact" className="mt-0 animate-in fade-in slide-in-from-right-4 duration-500">
                  <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-10 md:p-16 space-y-8">
                    <h3 className="text-3xl font-headline font-black italic">Communication <span className="text-primary">Preferences</span></h3>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { label: "Primary Email", value: user.email, status: "Verified" },
                        { label: "Alternate Phone", value: "Not provided", status: "Add Now" }
                      ].map((c, i) => (
                        <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl">
                          <div>
                            <p className="text-xs font-black uppercase text-muted-foreground">{c.label}</p>
                            <p className="font-bold">{c.value}</p>
                          </div>
                          <span className="text-[10px] font-black uppercase text-primary bg-primary/10 px-3 py-1 rounded-full">{c.status}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="education" className="mt-0 animate-in fade-in slide-in-from-right-4 duration-500">
                  <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-10 md:p-16 space-y-8">
                    <h3 className="text-3xl font-headline font-black italic">Academic <span className="text-primary">Portfolio</span></h3>
                    <p className="text-muted-foreground font-semibold">Keep your education history up to date for potential career advancements within NPB Media.</p>
                    <Button className="rounded-full h-14 px-10 font-headline text-lg bg-primary hover:bg-foreground shadow-xl border-none">
                      Manage Education <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Card>
                </TabsContent>

                <TabsContent value="documents" className="mt-0 animate-in fade-in slide-in-from-right-4 duration-500">
                  <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-10 md:p-16 space-y-8">
                    <h3 className="text-3xl font-headline font-black italic">Digital <span className="text-primary">Vault</span></h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {["Resume", "Degree", "ID Card", "Certifications"].map((doc) => (
                        <div key={doc} className="group p-6 bg-slate-50 border-2 border-transparent hover:border-primary rounded-2xl text-center cursor-pointer transition-all">
                          <FileText className="w-8 h-8 mx-auto mb-2 text-slate-300 group-hover:text-primary transition-colors" />
                          <p className="text-xs font-black uppercase tracking-widest">{doc}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="social" className="mt-0 animate-in fade-in slide-in-from-right-4 duration-500">
                  <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-10 md:p-16 space-y-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-3xl font-headline font-black italic">Social <span className="text-primary">Profiles</span></h3>
                      <Button variant="outline" className="rounded-full h-12 px-6 border-2 font-black uppercase tracking-widest text-xs">
                        <Plus className="w-4 h-4 mr-2" /> Connect
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { platform: "LinkedIn", status: "Not Connected", icon: Globe },
                        { platform: "GitHub", status: "Not Connected", icon: Share2 },
                        { platform: "Twitter", status: "Not Connected", icon: Globe },
                        { platform: "Portfolio", status: "Not Connected", icon: LinkIcon },
                      ].map((social, i) => (
                        <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-primary transition-all">
                          <div className="flex items-center gap-4">
                            <social.icon className="w-5 h-5 text-slate-400 group-hover:text-primary" />
                            <span className="font-black text-sm uppercase tracking-widest">{social.platform}</span>
                          </div>
                          <span className="text-[10px] font-black uppercase text-muted-foreground">{social.status}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="career" className="mt-0 animate-in fade-in slide-in-from-right-4 duration-500">
                  <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-10 md:p-16 space-y-8">
                    <h3 className="text-3xl font-headline font-black italic">Your <span className="text-primary">NPB Career</span></h3>
                    <div className="space-y-4">
                      <div className="p-8 bg-slate-50 rounded-[2.5rem] border-l-8 border-primary">
                        <h4 className="font-headline font-black text-xl italic mb-2">No Active Applications</h4>
                        <p className="text-muted-foreground">You haven't applied for any positions yet. Explore our opportunities to join the team.</p>
                      </div>
                      <Link href="/career/opportunities">
                        <Button variant="outline" className="w-full rounded-full h-14 border-2 font-black uppercase tracking-widest text-xs">
                          Explore Career Opportunities
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="order" className="mt-0 animate-in fade-in slide-in-from-right-4 duration-500">
                  <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-10 md:p-16 space-y-8">
                    <h3 className="text-3xl font-headline font-black italic">Service <span className="text-primary">History</span></h3>
                    <div className="space-y-4">
                      <div className="text-center py-10">
                        <ShoppingBag className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                        <p className="text-muted-foreground font-semibold">No services purchased yet. Check out our high-performance products.</p>
                      </div>
                      <Link href="/products">
                        <Button className="w-full rounded-full h-14 bg-foreground text-white font-black uppercase tracking-widest text-xs border-none hover:bg-primary transition-all">
                          View Products
                        </Button>
                      </Link>
                    </div>
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
