
"use client";

import React, { useState } from "react";
import { useFirestore, useCollection, useMemoFirebase, updateDocumentNonBlocking, deleteDocumentNonBlocking } from "@/firebase";
import { collection, doc } from "firebase/firestore";
import { 
  CalendarDays, 
  Video, 
  Mail, 
  Phone, 
  Clock, 
  ExternalLink, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Loader2,
  Sparkles,
  Link2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { useToast } from "@/hooks/use-toast";

export default function AdminMeetings() {
  const db = useFirestore();
  const { toast } = useToast();
  
  // Dialog State
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const meetingsQuery = useMemoFirebase(() => collection(db, "meetings"), [db]);
  const { data: meetings, isLoading } = useCollection(meetingsQuery);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  const handleUpdateLink = (meeting: any) => {
    setSelectedMeeting(meeting);
    setVideoLink(meeting.videoLink || "");
    setIsLinkModalOpen(true);
  };

  const saveVideoLink = () => {
    if (!selectedMeeting) return;
    setIsUpdating(true);
    
    updateDocumentNonBlocking(doc(db, "meetings", selectedMeeting.id), {
      videoLink: videoLink,
      status: "confirmed"
    });

    setTimeout(() => {
      setIsUpdating(false);
      setIsLinkModalOpen(false);
      toast({ title: "Meeting Updated", description: "Virtual credentials sent to user portal." });
    }, 800);
  };

  const handleDelete = (id: string) => {
    if (confirm("Permanently remove this meeting record from NPB Nexus?")) {
      deleteDocumentNonBlocking(doc(db, "meetings", id));
      toast({ title: "Record Purged", description: "The meeting slot has been released." });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-black italic">Consultation <span className="text-primary">Manager</span></h1>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">Total Consultations: {meetings?.length || 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {meetings && meetings.length > 0 ? (
          meetings.map((meeting) => (
            <Card key={meeting.id} className="group border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden transition-all hover:shadow-2xl">
              <CardContent className="p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                      <Video className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-headline font-black italic text-slate-900">{meeting.fullName}</h3>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{meeting.subject || 'General Discovery'}</p>
                    </div>
                  </div>
                  <Badge className={cn(
                    "rounded-full px-4 py-1 text-[8px] font-black uppercase tracking-widest",
                    meeting.status === 'confirmed' ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
                  )}>
                    {meeting.status || 'Pending Verification'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-6 py-6 border-y border-slate-50">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <CalendarDays className="w-3 h-3" /> Targeted Date
                    </div>
                    <p className="text-sm font-bold text-slate-700">{meeting.date}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <Clock className="w-3 h-3" /> Time Slot
                    </div>
                    <p className="text-sm font-bold text-slate-700">{meeting.timeSlot}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <Mail className="w-3 h-3" /> Email Link
                    </div>
                    <p className="text-sm font-bold text-slate-700 truncate max-w-[150px]">{meeting.email}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <Phone className="w-3 h-3" /> Contact
                    </div>
                    <p className="text-sm font-bold text-slate-700">{meeting.phone}</p>
                  </div>
                </div>

                {meeting.videoLink && (
                  <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Link2 className="w-4 h-4 text-blue-600" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 truncate max-w-[200px]">{meeting.videoLink}</span>
                    </div>
                    <a href={meeting.videoLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 text-blue-600 cursor-pointer hover:scale-110" />
                    </a>
                  </div>
                )}

                <div className="flex items-center gap-3 pt-2">
                  <Button 
                    onClick={() => handleUpdateLink(meeting)}
                    className="flex-1 h-12 rounded-xl bg-slate-900 text-white hover:bg-primary transition-all font-black uppercase text-[10px] tracking-widest"
                  >
                    Update Video Link
                  </Button>
                  <Button 
                    onClick={() => handleDelete(meeting.id)}
                    variant="ghost" 
                    className="w-12 h-12 rounded-xl text-slate-300 hover:text-destructive hover:bg-destructive/10 transition-colors"
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
              <CalendarDays className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-3xl font-headline font-black italic text-slate-300">No appointments logged</h3>
          </div>
        )}
      </div>

      {/* Link Update Dialog */}
      <Dialog open={isLinkModalOpen} onOpenChange={setIsLinkModalOpen}>
        <DialogContent className="max-w-md rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl">
          <div className="vibrant-gradient p-10 text-white space-y-2">
            <DialogTitle className="text-3xl font-headline font-black italic">Establish Portal</DialogTitle>
            <DialogDescription className="text-white/80 font-medium">Update credentials for: <span className="font-bold text-yellow-300">{selectedMeeting?.fullName}</span></DialogDescription>
          </div>
          <div className="p-10 space-y-8">
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Google Meet / Zoom URL</Label>
              <div className="relative">
                <Video className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <Input 
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                  placeholder="https://meet.google.com/..." 
                  className="h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:border-primary px-14 text-sm font-medium"
                />
              </div>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-600 shrink-0" />
              <p className="text-[10px] font-bold text-blue-800 leading-relaxed uppercase tracking-wider">Note: This link will be visible to the user in their portal session instantly.</p>
            </div>
          </div>
          <DialogFooter className="p-8 bg-slate-50 border-t flex flex-row items-center justify-between">
            <Button variant="ghost" onClick={() => setIsLinkModalOpen(false)} className="rounded-full text-[10px] font-black uppercase tracking-widest">Cancel</Button>
            <Button 
              onClick={saveVideoLink}
              disabled={isUpdating}
              className="rounded-full px-8 h-12 bg-primary text-white font-black uppercase text-[10px] tracking-widest shadow-xl"
            >
              {isUpdating ? <Loader2 className="animate-spin" /> : "Deploy Link"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
