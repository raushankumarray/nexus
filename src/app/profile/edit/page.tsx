
"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  useUser, 
  useFirestore, 
  useDoc, 
  useMemoFirebase, 
  updateDocumentNonBlocking 
} from "@/firebase";
import { doc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Users, 
  Save, 
  Loader2,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const personalDetailsSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  fathersName: z.string().optional(),
  mobile: z.string().min(10, "Valid mobile number is required"),
  dob: z.string().min(1, "Date of birth is required"),
});

type PersonalDetailsValues = z.infer<typeof personalDetailsSchema>;

export default function ProfileEditPage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const { toast } = useToast();
  const router = useRouter();
  const [isUpdating, setIsSubmitting] = useState(false);

  const profileRef = useMemoFirebase(() => {
    if (!user || !db) return null;
    return doc(db, "users", user.uid);
  }, [user, db]);

  const { data: profileData, isLoading: isProfileLoading } = useDoc(profileRef);

  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<PersonalDetailsValues>({
    resolver: zodResolver(personalDetailsSchema),
  });

  // Sync form with fetched data
  useEffect(() => {
    if (profileData) {
      reset({
        fullName: profileData.fullName || "",
        fathersName: profileData.fathersName || "",
        mobile: profileData.mobile || "",
        dob: profileData.dob || "",
      });
    }
  }, [profileData, reset]);

  const onSubmit = (values: PersonalDetailsValues) => {
    if (!profileRef) return;
    
    setIsSubmitting(true);
    
    updateDocumentNonBlocking(profileRef, {
      ...values,
      updatedAt: new Date().toISOString()
    });

    // Simulate a short delay for UX before showing success and redirecting
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Profile Updated",
        description: "Your personal details have been synchronized successfully.",
      });
      router.push("/profile");
    }, 800);
  };

  if (isUserLoading || isProfileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center space-y-8">
        <h1 className="text-4xl font-headline font-black italic">Access Denied</h1>
        <Link href="/login">
          <Button size="lg" className="rounded-full px-12 h-16 bg-primary text-white">Sign In</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden">
      <Navbar />
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="flex-1 max-w-4xl mx-auto w-full px-6 pt-32 pb-20 space-y-10">
        <div className="space-y-6">
          <Link href="/profile" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-black uppercase tracking-widest text-xs">
            <ArrowLeft className="w-4 h-4" /> Back to Profile
          </Link>
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-7xl font-headline font-black italic text-slate-900 leading-none">
              Edit <span className="text-primary">Details</span>
            </h1>
            <p className="text-muted-foreground text-xl font-medium uppercase tracking-widest text-xs">Update your information</p>
          </div>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <div className="flex justify-center mb-10">
            <TabsList className="bg-white p-1 h-auto rounded-full border-2 border-slate-100 shadow-xl w-full max-w-md">
              <TabsTrigger 
                value="personal" 
                className="rounded-full px-8 py-3 font-headline font-black text-xs uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
              >
                Personal Details
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="personal" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="border-none shadow-2xl rounded-[3rem] bg-white overflow-hidden p-2">
              <CardContent className="p-8 md:p-12 space-y-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Full Name */}
                    <div className="space-y-3">
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Full Name *</Label>
                      <div className="relative">
                        <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                        <Input 
                          {...register("fullName")}
                          placeholder="Enter your full name" 
                          className="h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:border-primary focus:bg-white transition-all text-lg font-medium pl-14 pr-6"
                        />
                      </div>
                      {errors.fullName && <p className="text-[10px] text-destructive font-black ml-4 uppercase">{errors.fullName.message}</p>}
                    </div>

                    {/* Father's Name */}
                    <div className="space-y-3">
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Father's Name</Label>
                      <div className="relative">
                        <Users className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                        <Input 
                          {...register("fathersName")}
                          placeholder="Enter father's name" 
                          className="h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:border-primary focus:bg-white transition-all text-lg font-medium pl-14 pr-6"
                        />
                      </div>
                    </div>

                    {/* Email - Disabled */}
                    <div className="space-y-3">
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Email Address (Primary Key)</Label>
                      <div className="relative group">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                        <Input 
                          disabled
                          value={user.email || ""}
                          className="h-16 rounded-2xl border-2 border-slate-100 bg-slate-100 text-slate-400 cursor-not-allowed pl-14 pr-6 font-medium"
                        />
                        <ShieldCheck className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 opacity-50" />
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 ml-4 uppercase tracking-tighter">Email cannot be changed as it is your unique identifier.</p>
                    </div>

                    {/* Mobile */}
                    <div className="space-y-3">
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Mobile Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                        <Input 
                          {...register("mobile")}
                          type="tel"
                          placeholder="Enter mobile number" 
                          className="h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:border-primary focus:bg-white transition-all text-lg font-medium pl-14 pr-6"
                        />
                      </div>
                      {errors.mobile && <p className="text-[10px] text-destructive font-black ml-4 uppercase">{errors.mobile.message}</p>}
                    </div>

                    {/* DOB */}
                    <div className="space-y-3">
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Date of Birth *</Label>
                      <div className="relative">
                        <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                        <Input 
                          {...register("dob")}
                          type="date"
                          className="h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:border-primary focus:bg-white transition-all text-lg font-medium pl-14 pr-6"
                        />
                      </div>
                      {errors.dob && <p className="text-[10px] text-destructive font-black ml-4 uppercase">{errors.dob.message}</p>}
                    </div>
                  </div>

                  <div className="pt-8 border-t border-slate-100">
                    <Button 
                      disabled={isUpdating}
                      className="w-full h-20 rounded-[2rem] text-xl font-headline bg-primary text-white hover:bg-foreground transition-all duration-500 shadow-2xl group relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        {isUpdating ? (
                          <><Loader2 className="w-6 h-6 animate-spin" /> Updating...</>
                        ) : (
                          <>Update Details <Save className="w-6 h-6 transition-transform group-hover:scale-110" /></>
                        )}
                      </span>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </main>
  );
}
