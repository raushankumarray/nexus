
"use client";

import React from "react";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import { 
  Users, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Loader2,
  ShieldCheck,
  UserCheck
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AdminUsers() {
  const db = useFirestore();

  const usersQuery = useMemoFirebase(() => collection(db, "users"), [db]);
  const { data: users, isLoading } = useCollection(usersQuery);

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
          <h1 className="text-3xl font-headline font-black italic">Ecosystem <span className="text-primary">Registry</span></h1>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">Verified Professionals: {users?.length || 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {users && users.length > 0 ? (
          users.map((user) => (
            <Card key={user.id} className="group border-none shadow-lg rounded-[2.5rem] bg-white overflow-hidden transition-all hover:shadow-xl">
              <CardContent className="p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 border-2 border-slate-100 flex items-center justify-center relative">
                    <UserCheck className="w-8 h-8 text-slate-300 group-hover:text-primary transition-colors" />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                      <ShieldCheck className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-slate-100 text-slate-400">
                    ID: {user.id.slice(0, 6)}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-headline font-black italic text-slate-900">{user.fullName || 'Anonymous User'}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">{user.provider || 'Password'} Auth</p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                      <Mail className="w-4 h-4 text-slate-300" /> {user.email}
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                      <Phone className="w-4 h-4 text-slate-300" /> {user.mobile || 'Not Linked'}
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                      <Calendar className="w-4 h-4 text-slate-300" /> Member Since: {new Date(user.createdAt?.seconds * 1000 || Date.now()).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                      <MapPin className="w-4 h-4 text-slate-300" /> {user.state || 'Unknown Location'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-32 text-center space-y-6">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
              <Users className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-3xl font-headline font-black italic text-slate-300">Registry is Empty</h3>
          </div>
        )}
      </div>
    </div>
  );
}
