
"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useUser, useFirestore, useCollection, useMemoFirebase, updateDocumentNonBlocking, deleteDocumentNonBlocking } from "@/firebase";
import { collection, doc } from "firebase/firestore";
import { 
  CalendarDays, 
  Clock, 
  Mail, 
  Phone, 
  Video, 
  Trash2, 
  Loader2, 
  ShieldAlert,
  ArrowLeft,
  ExternalLink,
  MessageSquare,
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
import { useToast } from "@/hooks/use-toast";

const ADMIN_EMAILS = ["raushankumarray96@gmail.com", "admin@npbmedia.com"];

export default function MeetingManagementPage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const { toast } = useToast();

  const isAdmin = user && ADMIN_EMAILS.includes(user.email || "");

  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);
  const [meetLink, setMeetLink] = useState("");
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Guard query with isAdmin check to prevent permission errors on load
  const meetingsQuery = useMemoFirebase(() => (db && isAdmin) ? collection(db, "meetings") : null, [db, isAdmin]);
  const { data: meetings, isLoading } = useCollection(meetingsQuery);

  const handleUpdateLink = () => {
    if (!selectedMeeting || !meetLink.trim()) return;
    
    updateDocumentNonBlocking(doc(db!, "meetings", selectedMeeting.id), {
      videoCallLink: meetLink,
      status: "link_provided"
    });

    toast({ title: "Link Updated", description: "The video call link has been saved successfully." });
    setIsLinkModalOpen(false);
    setMeetLink("");
  };

  const handleDelete = () => {
    if (!selectedMeeting) return;
    deleteDocumentNonBlocking(doc(db!, "meetings", selectedMeeting.id));
    toast({ title: "Record Deleted", description: "Meeting request has been removed from database." });
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
        <h1 className="text-3xl font-headline font-black text-white italic">Authorization Required</h1>
        <Link href="/admin/dashboard" className="mt-8">
          <Button variant="outline" className="text-white border-white/20">Back to Safety</Button>
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
              Manage <span className="text-primary">Meetings</span>
            </h1>
            <p className="text-muted-foreground font-medium">Virtual consultation requests and scheduling.</p>
          </div>
          <Badge className="bg-emerald-100 text-emerald-600 border-emerald-200 px-4 py-2 rounded-full font-black uppercase text-[10px] tracking-widest">
            {meetings?.length || 0} Total Requests
          </Badge>
        </div>

        {meetings && meetings.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {meetings.map((meeting) => (
              <Card key={meeting.id} className="border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden group hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-8 flex flex-col lg:flex-row items-start lg:items-center gap-8">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0">
                    <CalendarDays className="w-8 h-8" />
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Full Name</p>
                      <p className="text-xl font-headline font-black italic">{meeting.fullName}</p>
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        <Mail className="w-3 h-3" /> {meeting.email}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Schedule</p>
                      <div className="flex items-center gap-2 font-bold text-slate-700">
                        <CalendarDays className="w-4 h-4 text-primary" /> {meeting.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                        <Clock className="w-3 h-3 text-primary" /> {meeting.timeSlot}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Subject</p>
                      <p className="text-sm font-bold text-slate-700 line-clamp-2">{meeting.subject}</p>
                    </div>

                    <div className="flex flex-col justify-center items-start lg:items-end gap-2">
                      {meeting.videoCallLink ? (
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 font-black uppercase text-[10px] tracking-widest py-1.5 px-3 rounded-full flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3" /> Link Provided
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 font-black uppercase text-[10px] tracking-widest py-1.5 px-3 rounded-full flex items-center gap-2">
                          <Clock className="w-3 h-3" /> Pending Link
                        </Badge>
                      )}
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Added: {new Date(meeting.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 w-full lg:w-auto pt-6 lg:pt-0 border-t lg:border-none border-slate-100">
                    <Button 
                      onClick={() => {
                        setSelectedMeeting(meeting);
                        setMeetLink(meeting.videoCallLink || "");
                        setIsLinkModalOpen(true);
                      }}
                      className="flex-1 lg:flex-none rounded-2xl bg-slate-900 text-white hover:bg-primary transition-all font-black uppercase text-[10px] tracking-widest h-12 px-6"
                    >
                      <Video className="w-4 h-4 mr-2" /> {meeting.videoCallLink ? "Update Link" : "Provide Link"}
                    </Button>
                    <Button 
                      onClick={() => {
                        setSelectedMeeting(meeting);
                        setIsDeleteDialogOpen(true);
                      }}
                      variant="ghost" 
                      className="rounded-2xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-12 w-12"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 space-y-6 bg-white rounded-[3rem] shadow-inner border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
              <CalendarDays className="w-10 h-10 text-slate-200" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-headline font-black italic text-slate-400">No Meetings Found</h3>
              <p className="text-muted-foreground font-medium max-w-xs mx-auto">New requests from your consultation forms will appear here in real-time.</p>
            </div>
          </div>
        )}
      </div>

      {/* Meet Link Dialog */}
      <Dialog open={isLinkModalOpen} onOpenChange={setIsLinkModalOpen}>
        <DialogContent className="max-w-md rounded-[3rem] border-none shadow-2xl p-0 overflow-hidden">
          <div className="bg-slate-900 p-8 text-white space-y-2">
            <DialogTitle className="text-2xl font-headline font-black italic">Meeting Access</DialogTitle>
            <DialogDescription className="text-slate-400 text-xs font-medium uppercase tracking-widest">For: {selectedMeeting?.fullName}</DialogDescription>
          </div>
          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Video Call URL (Google Meet/Zoom)</label>
              <Input 
                value={meetLink}
                onChange={(e) => setMeetLink(e.target.value)}
                placeholder="https://meet.google.com/xxx-xxxx-xxx" 
                className="h-14 rounded-2xl border-2 border-slate-100 focus:border-primary px-6 font-medium"
              />
            </div>
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3">
              <MessageSquare className="w-5 h-5 text-blue-600 shrink-0" />
              <p className="text-[10px] font-bold text-blue-800 leading-relaxed uppercase">Update the user via email manually after providing this link here for record tracking.</p>
            </div>
          </div>
          <DialogFooter className="p-6 bg-slate-50 flex flex-row gap-3">
            <Button variant="ghost" onClick={() => setIsLinkModalOpen(false)} className="flex-1 rounded-xl font-black uppercase tracking-widest text-[10px]">Cancel</Button>
            <Button onClick={handleUpdateLink} className="flex-1 rounded-xl bg-primary text-white font-black uppercase tracking-widest text-[10px] h-12 shadow-lg shadow-primary/20">Confirm Details</Button>
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
            <DialogTitle className="text-2xl font-headline font-black text-center">Delete Request?</DialogTitle>
            <DialogDescription className="text-center font-medium">Are you sure you want to permanently remove this consultation request from the database?</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row gap-3 pt-6">
            <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)} className="flex-1 rounded-xl font-black uppercase tracking-widest text-[10px]">Back</Button>
            <Button onClick={handleDelete} variant="destructive" className="flex-1 rounded-xl font-black uppercase tracking-widest text-[10px] h-12">Delete Now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  );
}
