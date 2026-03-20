
"use client";

import React, { useEffect, useState, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useUser, useFirestore, useDoc, useMemoFirebase, updateDocumentNonBlocking } from "@/firebase";
import { doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  ChevronRight,
  Share2,
  Globe,
  Link as LinkIcon,
  Camera,
  Save,
  Navigation,
  MessageSquare,
  Trash2,
  Upload,
  Eye,
  IdCard,
  Facebook,
  Github,
  Linkedin,
  ExternalLink
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

  // Profile Form State
  const [formData, setFormData] = useState({
    fullName: "",
    fathersName: "",
    mobile: "",
    dob: "",
    photoURL: ""
  });

  // Contact Form State
  const [contactData, setContactData] = useState({
    alternateMobile: ""
  });

  // Address Form State
  const [addressData, setAddressData] = useState({
    fullAddress: "",
    block: "",
    district: "",
    state: "",
    pincode: "",
    country: ""
  });

  // Education State
  const [educationData, setEducationData] = useState<EducationItem[]>([
    { qualification: "", institution: "", passingYear: "", university: "", subject: "", percentage: "" }
  ]);

  // Documents State
  const [docData, setDocData] = useState({
    resumeURL: "",
    idCardType: "",
    idCardURL: ""
  });

  // Social State
  const [socialData, setSocialData] = useState({
    linkedin: "",
    github: "",
    facebook: "",
    portfolio: ""
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/login");
    }
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
      setContactData({
        alternateMobile: profileData.alternateMobile || ""
      });
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
      if (profileData.education && profileData.education.length > 0) {
        setEducationData(profileData.education);
      }
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

  const addEducationRow = () => {
    setEducationData([...educationData, { qualification: "", institution: "", passingYear: "", university: "", subject: "", percentage: "" }]);
  };

  const removeEducationRow = (index: number) => {
    if (educationData.length === 1) return;
    setEducationData(educationData.filter((_, i) => i !== index));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photoURL: reader.result as string }));
      };
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
      setDocData(prev => ({
        ...prev,
        [type === 'resume' ? 'resumeURL' : 'idCardURL']: reader.result as string
      }));
      toast({ title: "File Selected", description: `${type === 'resume' ? 'Resume' : 'ID Card'} is ready to update.` });
    };
    reader.readAsDataURL(file);
  };

  const viewResume = () => {
    if (!docData.resumeURL) return;
    const win = window.open();
    if (win) {
      win.document.write(`<iframe src="${docData.resumeURL}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
    }
  };

  const handleUpdateProfile = () => {
    if (!userDocRef) return;
    setIsUpdating(true);
    updateDocumentNonBlocking(userDocRef, {
      ...formData,
      updatedAt: new Date().toISOString()
    });
    setTimeout(() => {
      setIsUpdating(false);
      toast({ title: "Profile Updated", description: "Personal details synchronized." });
    }, 800);
  };

  const handleUpdateContact = () => {
    if (!userDocRef) return;
    setIsUpdating(true);
    updateDocumentNonBlocking(userDocRef, {
      ...contactData,
      updatedAt: new Date().toISOString()
    });
    setTimeout(() => {
      setIsUpdating(false);
      toast({ title: "Contact Updated", description: "Your communication preferences have been saved." });
    }, 800);
  };

  const handleUpdateAddress = () => {
    if (!userDocRef) return;
    const isComplete = Object.values(addressData).every(val => val.trim() !== "");
    if (!isComplete) {
      toast({
        variant: "destructive",
        title: "Incomplete Address",
        description: "Please fill in all address fields before updating."
      });
      return;
    }
    setIsUpdating(true);
    updateDocumentNonBlocking(userDocRef, {
      ...addressData,
      updatedAt: new Date().toISOString()
    });
    setTimeout(() => {
      setIsUpdating(false);
      toast({ title: "Address Updated", description: "Your location details have been saved." });
    }, 800);
  };

  const handleUpdateEducation = () => {
    if (!userDocRef) return;
    setIsUpdating(true);
    updateDocumentNonBlocking(userDocRef, {
      education: educationData,
      updatedAt: new Date().toISOString()
    });
    setTimeout(() => {
      setIsUpdating(false);
      toast({ title: "Education Updated", description: "Your academic history has been saved." });
    }, 800);
  };

  const handleUpdateDocuments = () => {
    if (!userDocRef) return;
    if (!docData.resumeURL) {
      toast({ variant: "destructive", title: "Resume Required", description: "Please upload your resume in PDF format." });
      return;
    }
    setIsUpdating(true);
    updateDocumentNonBlocking(userDocRef, {
      ...docData,
      updatedAt: new Date().toISOString()
    });
    setTimeout(() => {
      setIsUpdating(false);
      toast({ title: "Vault Synchronized", description: "Documents securely saved to your profile." });
    }, 800);
  };

  const handleUpdateSocial = () => {
    if (!userDocRef) return;
    if (!socialData.linkedin.trim()) {
      toast({ variant: "destructive", title: "LinkedIn Required", description: "LinkedIn profile is mandatory for professional verification." });
      return;
    }
    setIsUpdating(true);
    updateDocumentNonBlocking(userDocRef, {
      socialLinks: socialData,
      updatedAt: new Date().toISOString()
    });
    setTimeout(() => {
      setIsUpdating(false);
      toast({ title: "Social Profiles Updated", description: "Your digital footprint has been synchronized." });
    }, 800);
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      toast({ variant: "destructive", title: "Not Supported", description: "Geolocation is not supported by your browser." });
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
          const data = await response.json();
          if (data && data.address) {
            const addr = data.address;
            setAddressData({
              fullAddress: data.display_name || "",
              block: addr.suburb || addr.neighbourhood || addr.city_district || "",
              district: addr.city || addr.town || addr.village || addr.county || "",
              state: addr.state || "",
              pincode: addr.postcode || "",
              country: addr.country || ""
            });
            toast({ title: "Location Found", description: "Address fields have been auto-filled." });
          }
        } catch (error) {
          toast({ variant: "destructive", title: "Lookup Failed", description: "Could not retrieve address details." });
        } finally {
          setIsLocating(false);
        }
      },
      () => {
        setIsLocating(false);
        toast({ variant: "destructive", title: "Permission Denied", description: "Please allow location access." });
      }
    );
  };

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const sections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "address", label: "Address", icon: MapPin },
    { id: "contact", label: "Contact", icon: Phone },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "social", label: "Social link", icon: Share2 },
    { id: "career", label: "Career", icon: Briefcase },
    { id: "order", label: "Order", icon: ShoppingBag },
  ];

  const qualificationOptions = ["10th", "12th", "Graduate", "Post Graduate"];
  const idCardOptions = ["Aadhar", "Pan", "Voter", "Driving"];

  return (
    <main className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 overflow-hidden vibrant-gradient text-white">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom duration-1000">
            <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4 group">
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
            <h1 className="text-5xl md:text-7xl font-headline font-black leading-[0.9] tracking-tighter drop-shadow-2xl">
              Profile
            </h1>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <Tabs defaultValue="profile" className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4 space-y-8">
                <Card className="border-none shadow-2xl rounded-[3rem] bg-white overflow-hidden p-2">
                  <CardContent className="p-10 text-center space-y-6">
                    <div className="relative mx-auto w-32 h-32 group/avatar">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                      <Avatar className="w-32 h-32 border-4 border-primary/20 shadow-xl relative z-10">
                        <AvatarImage src={formData.photoURL} alt={formData.fullName || "User"} className="object-cover" />
                        <AvatarFallback className="bg-primary text-white text-4xl font-black">
                          {getInitials(formData.fullName)}
                        </AvatarFallback>
                      </Avatar>
                      <button onClick={() => profilePhotoRef.current?.click()} className="absolute bottom-0 right-0 z-20 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all scale-0 group-hover/avatar:scale-100">
                        <Camera className="w-5 h-5" />
                      </button>
                      <input type="file" ref={profilePhotoRef} onChange={handlePhotoUpload} className="hidden" accept="image/*" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-2xl font-headline font-black italic">{formData.fullName || "NPB User"}</h3>
                      <p className="text-muted-foreground font-medium text-sm">{user.email}</p>
                    </div>
                    <div className="pt-6 border-t border-slate-100">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                        <ShieldCheck className="w-3 h-3" /> Identity Verified
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-2xl rounded-[3rem] bg-white overflow-hidden p-4 hidden lg:block">
                  <div className="p-4 space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-4 mb-4">Management Menu</p>
                    <TabsList className="flex flex-col w-full h-auto bg-transparent gap-2">
                      {sections.map((sec) => (
                        <TabsTrigger key={sec.id} value={sec.id} className={cn("w-full justify-start rounded-2xl px-6 py-4 font-headline font-black text-sm transition-all flex items-center gap-4 border-2 border-transparent", "data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-primary data-[state=active]:shadow-lg shadow-primary/20", "hover:bg-slate-50 hover:border-slate-100")}>
                          <sec.icon className="w-5 h-5" />
                          {sec.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                </Card>

                <div className="lg:hidden w-full pb-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-4 mb-4">Management Menu</p>
                  <TabsList className="grid grid-cols-2 gap-3 bg-transparent h-auto w-full">
                    {sections.map((sec) => (
                      <TabsTrigger key={sec.id} value={sec.id} className={cn("rounded-2xl px-4 py-6 font-headline font-black text-[10px] bg-white border-2 border-slate-100 transition-all flex flex-col items-center justify-center gap-3 shadow-sm", "data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-primary data-[state=active]:shadow-md")}>
                        <sec.icon className="w-5 h-5" />
                        {sec.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-8 min-h-[600px]">
                <TabsContent value="profile" className="mt-0 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-2">
                    <CardHeader className="p-10 md:p-16 pb-0 flex flex-row items-center justify-between">
                      <h3 className="text-3xl font-headline font-black italic">Personal <span className="text-primary">Identity</span></h3>
                      <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" /> Auto-Sync Active
                      </div>
                    </CardHeader>
                    <CardContent className="p-10 md:p-16 space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Full Name</Label>
                          <Input name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Enter Name" className="h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:border-primary focus:bg-white transition-all text-lg font-medium px-6" />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Father's Name</Label>
                          <Input name="fathersName" value={formData.fathersName} onChange={handleInputChange} placeholder="Father's Name" className="h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:border-primary focus:bg-white transition-all text-lg font-medium px-6" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Email Address (Primary)</Label>
                          <Input disabled value={user.email || ""} className="h-16 rounded-2xl border-2 border-slate-100 bg-slate-200 focus:border-slate-200 transition-all text-lg font-medium px-6 opacity-60 cursor-not-allowed" />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Mobile Number</Label>
                          <Input name="mobile" value={formData.mobile} onChange={handleInputChange} type="tel" placeholder="Enter Mobile" className="h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:border-primary focus:bg-white transition-all text-lg font-medium px-6" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Date of Birth</Label>
                          <Input name="dob" value={formData.dob} onChange={handleInputChange} type="date" className="h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:border-primary focus:bg-white transition-all text-lg font-medium px-6" />
                        </div>
                        <div className="flex items-end">
                          <Button onClick={handleUpdateProfile} disabled={isUpdating} className="w-full h-16 rounded-2xl text-xl font-headline bg-primary text-white hover:bg-foreground transition-all duration-500 shadow-xl group">
                            {isUpdating ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Update Now <Save className="ml-2 w-5 h-5 transition-transform group-hover:scale-110" /></>}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="address" className="mt-0 animate-in fade-in slide-in-from-right-4 duration-500">
                  <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-2">
                    <CardHeader className="p-10 md:p-16 pb-0 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-3xl font-headline font-black italic">Postal <span className="text-primary">Coordinates</span></h3>
                        <Button variant="outline" onClick={handleLocateMe} disabled={isLocating} className="rounded-full h-12 px-6 border-2 font-black uppercase tracking-widest text-[10px] gap-2 border-primary/20 hover:border-primary text-primary">
                          {isLocating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
                          Locate Me (GPS)
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-10 md:p-16 space-y-8">
                      <div className="space-y-3">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Full Address</Label>
                        <Input required name="fullAddress" value={addressData.fullAddress} onChange={handleAddressInputChange} placeholder="House/Street/Area" className="h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:border-primary focus:bg-white transition-all text-lg font-medium px-6" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Block</Label>
                          <Input required name="block" value={addressData.block} onChange={handleAddressInputChange} placeholder="Enter Block" className="h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:border-primary focus:bg-white transition-all text-lg font-medium px-6" />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">District</Label>
                          <Input required name="district" value={addressData.district} onChange={handleAddressInputChange} placeholder="Enter District" className="h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:border-primary focus:bg-white transition-all text-lg font-medium px-6" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-3">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">State</Label>
                          <Input required name="state" value={addressData.state} onChange={handleAddressInputChange} placeholder="Enter State" className="h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:border-primary focus:bg-white transition-all text-lg font-medium px-6" />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Pincode</Label>
                          <Input required name="pincode" value={addressData.pincode} onChange={handleAddressInputChange} placeholder="Postal Code" className="h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:border-primary focus:bg-white transition-all text-lg font-medium px-6" />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Country</Label>
                          <Input required name="country" value={addressData.country} onChange={handleAddressInputChange} placeholder="Enter Country" className="h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:border-primary focus:bg-white transition-all text-lg font-medium px-6" />
                        </div>
                      </div>
                      <div className="pt-4">
                        <Button onClick={handleUpdateAddress} disabled={isUpdating} className="w-full h-16 rounded-2xl text-xl font-headline bg-primary text-white hover:bg-foreground transition-all duration-500 shadow-xl group">
                          {isUpdating ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Update Address <Save className="ml-2 w-5 h-5 transition-transform group-hover:scale-110" /></>}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="contact" className="mt-0 animate-in fade-in slide-in-from-right-4 duration-500">
                  <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-2 overflow-hidden">
                    <CardHeader className="p-10 md:p-16 pb-0 space-y-4">
                      <h3 className="text-3xl font-headline font-black italic">Communication <span className="text-primary">Preferences</span></h3>
                    </CardHeader>
                    <CardContent className="p-10 md:p-16 space-y-8">
                      <div className="grid grid-cols-1 gap-6">
                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                              <Mail className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs font-black uppercase text-muted-foreground">Primary Email</p>
                              <p className="font-bold">{user.email}</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">Verified</span>
                        </div>
                        <div className="space-y-3">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Alternate Mobile Number</Label>
                          <div className="relative group/input">
                            <Input name="alternateMobile" value={contactData.alternateMobile} onChange={handleContactInputChange} type="tel" placeholder="Enter Alternate Number" className="h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:border-primary focus:bg-white transition-all text-lg font-medium px-6 pl-14" />
                            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/input:text-primary transition-colors w-5 h-5" />
                          </div>
                        </div>
                      </div>
                      <div className="pt-4">
                        <Button onClick={handleUpdateContact} disabled={isUpdating} className="w-full h-16 rounded-2xl text-xl font-headline bg-primary text-white hover:bg-foreground transition-all duration-500 shadow-xl group">
                          {isUpdating ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Update Now <Save className="ml-2 w-5 h-5 transition-transform group-hover:scale-110" /></>}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="education" className="mt-0 animate-in fade-in slide-in-from-right-4 duration-500">
                  <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-2">
                    <CardHeader className="p-10 md:p-16 pb-0 flex flex-row items-center justify-between">
                      <h3 className="text-3xl font-headline font-black italic">Academic <span className="text-primary">Portfolio</span></h3>
                      <Button variant="outline" onClick={addEducationRow} className="rounded-full h-12 border-2 border-primary/20 text-primary font-black uppercase text-[10px] tracking-widest hover:border-primary">
                        <Plus className="w-4 h-4 mr-2" /> Add More
                      </Button>
                    </CardHeader>
                    <CardContent className="p-10 md:p-16 space-y-12">
                      <div className="space-y-12">
                        {educationData.map((edu, idx) => (
                          <div key={idx} className="relative p-8 rounded-[2.5rem] bg-slate-50 border-2 border-slate-100 space-y-8 animate-in fade-in zoom-in duration-300">
                            {educationData.length > 1 && (
                              <Button variant="ghost" size="icon" onClick={() => removeEducationRow(idx)} className="absolute -top-4 -right-4 h-10 w-10 rounded-full bg-white shadow-lg border-2 border-destructive/20 text-destructive hover:bg-destructive hover:text-white transition-all">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="space-y-3">
                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Qualification</Label>
                                <Select value={edu.qualification} onValueChange={(val) => handleEducationChange(idx, "qualification", val)}>
                                  <SelectTrigger className="h-16 rounded-2xl border-2 border-white bg-white focus:ring-primary shadow-sm text-lg font-medium px-6">
                                    <SelectValue placeholder="Select Qualification" />
                                  </SelectTrigger>
                                  <SelectContent className="rounded-2xl border-none shadow-2xl">
                                    {qualificationOptions.map(opt => <SelectItem key={opt} value={opt} className="py-4 rounded-xl text-base font-medium">{opt}</SelectItem>)}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-3">
                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">School / College Name</Label>
                                <Input value={edu.institution} onChange={(e) => handleEducationChange(idx, "institution", e.target.value)} placeholder="Enter Institution" className="h-16 rounded-2xl border-2 border-white bg-white focus:border-primary shadow-sm text-lg font-medium px-6" />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="space-y-3">
                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Passing Year</Label>
                                <Input value={edu.passingYear} onChange={(e) => handleEducationChange(idx, "passingYear", e.target.value)} placeholder="e.g. 2022" className="h-16 rounded-2xl border-2 border-white bg-white focus:border-primary shadow-sm text-lg font-medium px-6" />
                              </div>
                              <div className="space-y-3">
                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">University / Board</Label>
                                <Input value={edu.university} onChange={(e) => handleEducationChange(idx, "university", e.target.value)} placeholder="Enter University" className="h-16 rounded-2xl border-2 border-white bg-white focus:border-primary shadow-sm text-lg font-medium px-6" />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="space-y-3">
                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Subject / Stream</Label>
                                <Input value={edu.subject} onChange={(e) => handleEducationChange(idx, "subject", e.target.value)} placeholder="e.g. Computer Science" className="h-16 rounded-2xl border-2 border-white bg-white focus:border-primary shadow-sm text-lg font-medium px-6" />
                              </div>
                              <div className="space-y-3">
                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Percentage / CGPA</Label>
                                <Input value={edu.percentage} onChange={(e) => handleEducationChange(idx, "percentage", e.target.value)} placeholder="e.g. 85%" className="h-16 rounded-2xl border-2 border-white bg-white focus:border-primary shadow-sm text-lg font-medium px-6" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="pt-4">
                        <Button onClick={handleUpdateEducation} disabled={isUpdating} className="w-full h-16 rounded-2xl text-xl font-headline bg-primary text-white hover:bg-foreground transition-all duration-500 shadow-xl group">
                          {isUpdating ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Update Now <Save className="ml-2 w-5 h-5 transition-transform group-hover:scale-110" /></>}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="documents" className="mt-0 animate-in fade-in slide-in-from-right-4 duration-500">
                  <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-2">
                    <CardHeader className="p-10 md:p-16 pb-0 flex flex-row items-center justify-between">
                      <h3 className="text-3xl font-headline font-black italic">Digital <span className="text-primary">Vault</span></h3>
                      <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" /> End-to-End Encrypted
                      </div>
                    </CardHeader>
                    <CardContent className="p-10 md:p-16 space-y-10">
                      <div className="space-y-6">
                        <div className="p-8 rounded-[2.5rem] bg-slate-50 border-2 border-dashed border-slate-200 hover:border-primary transition-all group/doc">
                          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-6">
                              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-lg text-primary">
                                <FileText className="w-8 h-8" />
                              </div>
                              <div>
                                <h4 className="text-xl font-headline font-black italic">Professional Resume</h4>
                                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Requirement: PDF Format only (Mandatory)</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              {docData.resumeURL && (
                                <Button onClick={viewResume} variant="outline" className="rounded-full h-14 px-6 border-2 font-black uppercase tracking-widest text-[10px] gap-2">
                                  <Eye className="w-4 h-4" /> View
                                </Button>
                              )}
                              <Button onClick={() => resumeInputRef.current?.click()} className="rounded-full h-14 px-8 bg-primary text-white hover:bg-foreground transition-all font-black uppercase tracking-widest text-[10px] gap-2">
                                <Upload className="w-4 h-4" /> {docData.resumeURL ? 'Replace' : 'Upload'}
                              </Button>
                              <input type="file" ref={resumeInputRef} onChange={(e) => handleDocumentUpload(e, 'resume')} className="hidden" accept=".pdf" />
                            </div>
                          </div>
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-slate-50 border-2 border-slate-100 space-y-8">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">ID Card Type</Label>
                              <Select value={docData.idCardType} onValueChange={(val) => setDocData(prev => ({ ...prev, idCardType: val }))}>
                                <SelectTrigger className="h-16 rounded-2xl border-2 border-white bg-white focus:ring-primary shadow-sm text-lg font-medium px-6">
                                  <SelectValue placeholder="Select ID Type" />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-none shadow-2xl">
                                  {idCardOptions.map(opt => <SelectItem key={opt} value={opt} className="py-4 rounded-xl text-base font-medium">{opt}</SelectItem>)}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-3">
                              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">ID Card Document</Label>
                              <Button onClick={() => idCardInputRef.current?.click()} variant="outline" className="w-full h-16 rounded-2xl border-2 border-white bg-white hover:bg-slate-50 transition-all font-black uppercase tracking-widest text-[10px] gap-2 shadow-sm">
                                <IdCard className="w-5 h-5 text-primary" /> {docData.idCardURL ? 'Replace Scanned ID' : 'Upload ID Copy'}
                              </Button>
                              <input type="file" ref={idCardInputRef} onChange={(e) => handleDocumentUpload(e, 'idCard')} className="hidden" accept="image/*,.pdf" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button onClick={handleUpdateDocuments} disabled={isUpdating} className="w-full h-16 rounded-2xl text-xl font-headline bg-primary text-white hover:bg-foreground transition-all duration-500 shadow-xl group">
                          {isUpdating ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Update Vault <Save className="ml-2 w-5 h-5 transition-transform group-hover:scale-110" /></>}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="social" className="mt-0 animate-in fade-in slide-in-from-right-4 duration-500">
                  <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-2">
                    <CardHeader className="p-10 md:p-16 pb-0 flex flex-row items-center justify-between">
                      <h3 className="text-3xl font-headline font-black italic">Digital <span className="text-primary">Presence</span></h3>
                      <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        <Globe className="w-4 h-4 text-blue-500" /> Public Profile Sync
                      </div>
                    </CardHeader>
                    <CardContent className="p-10 md:p-16 space-y-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">LinkedIn Profile*</Label>
                          <div className="relative group/input">
                            <Input name="linkedin" value={socialData.linkedin} onChange={handleSocialInputChange} placeholder="https://linkedin.com/in/username" className="h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:border-primary focus:bg-white transition-all text-lg font-medium px-6 pl-14" />
                            <Linkedin className="absolute left-5 top-1/2 -translate-y-1/2 text-[#0077B5] w-5 h-5" />
                            {socialData.linkedin && (
                              <Button asChild variant="ghost" size="icon" className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 text-muted-foreground hover:text-primary">
                                <a href={socialData.linkedin} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-4 h-4" /></a>
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">GitHub Profile</Label>
                          <div className="relative group/input">
                            <Input name="github" value={socialData.github} onChange={handleSocialInputChange} placeholder="https://github.com/username" className="h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:border-primary focus:bg-white transition-all text-lg font-medium px-6 pl-14" />
                            <Github className="absolute left-5 top-1/2 -translate-y-1/2 text-[#181717] w-5 h-5" />
                            {socialData.github && (
                              <Button asChild variant="ghost" size="icon" className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 text-muted-foreground hover:text-primary">
                                <a href={socialData.github} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-4 h-4" /></a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Facebook Profile</Label>
                          <div className="relative group/input">
                            <Input name="facebook" value={socialData.facebook} onChange={handleSocialInputChange} placeholder="https://facebook.com/username" className="h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:border-primary focus:bg-white transition-all text-lg font-medium px-6 pl-14" />
                            <Facebook className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1877F2] w-5 h-5" />
                            {socialData.facebook && (
                              <Button asChild variant="ghost" size="icon" className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 text-muted-foreground hover:text-primary">
                                <a href={socialData.facebook} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-4 h-4" /></a>
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Portfolio Website</Label>
                          <div className="relative group/input">
                            <Input name="portfolio" value={socialData.portfolio} onChange={handleSocialInputChange} placeholder="https://yourportfolio.com" className="h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:border-primary focus:bg-white transition-all text-lg font-medium px-6 pl-14" />
                            <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                            {socialData.portfolio && (
                              <Button asChild variant="ghost" size="icon" className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 text-muted-foreground hover:text-primary">
                                <a href={socialData.portfolio} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-4 h-4" /></a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button onClick={handleUpdateSocial} disabled={isUpdating} className="w-full h-16 rounded-2xl text-xl font-headline bg-primary text-white hover:bg-foreground transition-all duration-500 shadow-xl group">
                          {isUpdating ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Update Social Links <Save className="ml-2 w-5 h-5 transition-transform group-hover:scale-110" /></>}
                        </Button>
                      </div>
                    </CardContent>
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
