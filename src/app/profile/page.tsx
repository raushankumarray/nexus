
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
  Navigation
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Address Form State
  const [addressData, setAddressData] = useState({
    fullAddress: "",
    block: "",
    district: "",
    state: "",
    pincode: "",
    country: ""
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
      setAddressData({
        fullAddress: profileData.fullAddress || "",
        block: profileData.block || "",
        district: profileData.district || "",
        state: profileData.state || "",
        pincode: profileData.pincode || "",
        country: profileData.country || ""
      });
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

  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressData(prev => ({ ...prev, [name]: value }));
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

  const handleUpdateAddress = () => {
    if (!userDocRef) return;
    
    // Check if all fields are filled
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

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      toast({
        variant: "destructive",
        title: "Not Supported",
        description: "Geolocation is not supported by your browser."
      });
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Using OpenStreetMap Nominatim for free reverse geocoding
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
            toast({
              title: "Location Found",
              description: "Address fields have been auto-filled."
            });
          }
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Lookup Failed",
            description: "Could not retrieve address details from GPS coordinates."
          });
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        toast({
          variant: "destructive",
          title: "Permission Denied",
          description: "Please allow location access to use this feature."
        });
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
                      <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 z-20 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all scale-0 group-hover/avatar:scale-100">
                        <Camera className="w-5 h-5" />
                      </button>
                      <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" accept="image/*" />
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
                        <Button 
                          variant="outline" 
                          onClick={handleLocateMe}
                          disabled={isLocating}
                          className="rounded-full h-12 px-6 border-2 font-black uppercase tracking-widest text-[10px] gap-2 border-primary/20 hover:border-primary text-primary"
                        >
                          {isLocating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
                          Locate Me (GPS)
                        </Button>
                      </div>
                      <p className="text-muted-foreground font-semibold text-sm">Please provide your precise physical location details for global shipments and compliance.</p>
                    </CardHeader>
                    <CardContent className="p-10 md:p-16 space-y-8">
                      <div className="space-y-3">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Full Address (House/Street/Area)</Label>
                        <Input 
                          required
                          name="fullAddress"
                          value={addressData.fullAddress}
                          onChange={handleAddressInputChange}
                          placeholder="e.g. 123 Innovation Street, Begusarai" 
                          className="h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:border-primary focus:bg-white transition-all text-lg font-medium px-6"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Block / Sub-District</Label>
                          <Input 
                            required
                            name="block"
                            value={addressData.block}
                            onChange={handleAddressInputChange}
                            placeholder="Enter Block" 
                            className="h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:border-primary focus:bg-white transition-all text-lg font-medium px-6"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">District</Label>
                          <Input 
                            required
                            name="district"
                            value={addressData.district}
                            onChange={handleAddressInputChange}
                            placeholder="Enter District" 
                            className="h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:border-primary focus:bg-white transition-all text-lg font-medium px-6"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-3">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">State</Label>
                          <Input 
                            required
                            name="state"
                            value={addressData.state}
                            onChange={handleAddressInputChange}
                            placeholder="Enter State" 
                            className="h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:border-primary focus:bg-white transition-all text-lg font-medium px-6"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Pincode</Label>
                          <Input 
                            required
                            name="pincode"
                            value={addressData.pincode}
                            onChange={handleAddressInputChange}
                            placeholder="Postal Code" 
                            className="h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:border-primary focus:bg-white transition-all text-lg font-medium px-6"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Country</Label>
                          <Input 
                            required
                            name="country"
                            value={addressData.country}
                            onChange={handleAddressInputChange}
                            placeholder="Enter Country" 
                            className="h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:border-primary focus:bg-white transition-all text-lg font-medium px-6"
                          />
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button 
                          onClick={handleUpdateAddress} 
                          disabled={isUpdating} 
                          className="w-full h-16 rounded-2xl text-xl font-headline bg-primary text-white hover:bg-foreground transition-all duration-500 shadow-xl group"
                        >
                          {isUpdating ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Update Address <Save className="ml-2 w-5 h-5 transition-transform group-hover:scale-110" /></>}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="contact" className="mt-0 animate-in fade-in slide-in-from-right-4 duration-500">
                  <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-10 md:p-16 space-y-8">
                    <h3 className="text-3xl font-headline font-black italic">Communication <span className="text-primary">Preferences</span></h3>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { label: "Primary Email", value: user.email, status: "Verified" },
                        { label: "Alternate Phone", value: formData.mobile || "Not provided", status: formData.mobile ? "Active" : "Add Now" }
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
