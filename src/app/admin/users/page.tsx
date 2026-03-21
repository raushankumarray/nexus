
"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import { 
  Users, 
  Mail, 
  Phone, 
  ShieldAlert,
  ArrowLeft,
  Search,
  User,
  ExternalLink,
  MapPin,
  Calendar,
  Loader2,
  FileText,
  CreditCard
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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const ADMIN_EMAILS = ["raushankumarray96@gmail.com", "admin@npbmedia.com"];

export default function UserDataPage() {
  const { user: authUser, isUserLoading } = useUser();
  const db = useFirestore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const usersQuery = useMemoFirebase(() => db ? collection(db, "users") : null, [db]);
  const { data: users, isLoading } = useCollection(usersQuery);

  const isAdmin = authUser && ADMIN_EMAILS.includes(authUser.email || "");

  const filteredUsers = users?.filter(u => 
    u.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

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
        <h1 className="text-3xl font-headline font-black text-white italic">Administrator Access Denied</h1>
        <Link href="/admin/dashboard" className="mt-8">
          <Button variant="outline" className="text-white border-white/20">Return Home</Button>
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
              User <span className="text-primary">Ecosystem</span>
            </h1>
            <p className="text-muted-foreground font-medium">Directory of registered users and professional profiles.</p>
          </div>
          <Badge className="bg-blue-100 text-blue-600 border-blue-200 px-4 py-2 rounded-full font-black uppercase text-[10px] tracking-widest">
            {users?.length || 0} Registered Entities
          </Badge>
        </div>

        <div className="relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by name or email address..." 
            className="h-16 rounded-3xl border-2 border-slate-100 bg-white focus:border-primary px-16 font-medium shadow-xl transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUsers.map((u) => (
            <Card key={u.id} className="border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden group hover:shadow-2xl transition-all duration-500 cursor-pointer" onClick={() => { setSelectedUser(u); setIsDetailsOpen(true); }}>
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shrink-0 shadow-lg">
                    {u.photoURL ? (
                      <img src={u.photoURL} alt="" className="w-full h-full object-cover rounded-2xl" />
                    ) : (
                      <User className="w-8 h-8" />
                    )}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <p className="text-xl font-headline font-black italic text-slate-900 truncate">{u.fullName || 'Anonymous'}</p>
                    <p className="text-xs font-bold text-muted-foreground truncate">{u.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="space-y-1">
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground">Mobile</p>
                    <p className="text-xs font-bold text-slate-700">{u.mobile || 'N/A'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground">Location</p>
                    <p className="text-xs font-bold text-slate-700">{u.state || 'N/A'}</p>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center text-primary font-black uppercase text-[9px] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  View Full Intelligence <ExternalLink className="w-3 h-3" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-32 space-y-6 bg-white rounded-[3rem] shadow-inner border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
              <Users className="w-10 h-10 text-slate-200" />
            </div>
            <h3 className="text-3xl font-headline font-black italic text-slate-400">No Entities Found</h3>
          </div>
        )}
      </div>

      {/* User Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl rounded-[3.5rem] border-none shadow-2xl p-0 overflow-hidden">
          {selectedUser && (
            <>
              <div className="vibrant-gradient p-10 text-white">
                <div className="flex items-center gap-8">
                  <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border-2 border-white/30 overflow-hidden">
                    {selectedUser.photoURL ? <img src={selectedUser.photoURL} className="w-full h-full object-cover" /> : <User className="w-10 h-10" />}
                  </div>
                  <div className="space-y-2">
                    <DialogTitle className="text-4xl font-headline font-black italic">{selectedUser.fullName}</DialogTitle>
                    <DialogDescription className="text-white/80 font-black uppercase tracking-widest text-[10px] flex items-center gap-2">
                      <ShieldAlert className="w-3 h-3" /> UID: {selectedUser.id}
                    </DialogDescription>
                  </div>
                </div>
              </div>
              <div className="p-10 space-y-10 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <h4 className="text-xs font-black uppercase tracking-widest text-primary border-b pb-2">Identity Details</h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Mail className="w-5 h-5 text-slate-300" />
                        <div><p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Email</p><p className="font-bold text-slate-700">{selectedUser.email}</p></div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Phone className="w-5 h-5 text-slate-300" />
                        <div><p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Mobile</p><p className="font-bold text-slate-700">{selectedUser.mobile || 'Not Provided'}</p></div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Calendar className="w-5 h-5 text-slate-300" />
                        <div><p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Date of Birth</p><p className="font-bold text-slate-700">{selectedUser.dob || 'Not Provided'}</p></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-xs font-black uppercase tracking-widest text-primary border-b pb-2">Postal Metadata</h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <MapPin className="w-5 h-5 text-slate-300 mt-1" />
                        <div>
                          <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Residential Address</p>
                          <p className="font-bold text-slate-700 leading-relaxed">{selectedUser.fullAddress || 'N/A'}</p>
                          <p className="text-xs text-slate-500">{selectedUser.district}, {selectedUser.state}, {selectedUser.pincode}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-xs font-black uppercase tracking-widest text-primary border-b pb-2">Professional Credentials</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <FileText className="w-6 h-6 text-slate-400" />
                        <span className="font-black uppercase text-[10px] tracking-widest text-slate-600">Resume / CV</span>
                      </div>
                      {selectedUser.resumeURL ? (
                        <Badge className="bg-emerald-100 text-emerald-600 font-black text-[8px] uppercase">Available</Badge>
                      ) : (
                        <Badge variant="outline" className="text-slate-300 font-black text-[8px] uppercase">Missing</Badge>
                      )}
                    </div>
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <CreditCard className="w-6 h-6 text-slate-400" />
                        <span className="font-black uppercase text-[10px] tracking-widest text-slate-600">{selectedUser.idCardType || 'Identity Proof'}</span>
                      </div>
                      {selectedUser.idCardURL ? (
                        <Badge className="bg-emerald-100 text-emerald-600 font-black text-[8px] uppercase">Uploaded</Badge>
                      ) : (
                        <Badge variant="outline" className="text-slate-300 font-black text-[8px] uppercase">Pending</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-slate-50 border-t flex justify-center">
                <Button variant="ghost" onClick={() => setIsDetailsOpen(false)} className="rounded-full font-black uppercase tracking-widest text-[10px] h-12 px-10">Close Viewer</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  );
}
