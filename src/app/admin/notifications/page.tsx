
"use client";

import React, { useState } from "react";
import { useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking, updateDocumentNonBlocking, deleteDocumentNonBlocking } from "@/firebase";
import { collection, query, orderBy, doc } from "firebase/firestore";
import { 
  Bell, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  XCircle, 
  Clock, 
  Search, 
  Zap, 
  Loader2,
  Filter,
  Send,
  Layout,
  BellRing
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const NOTIFICATION_TYPES = [
  { value: "info", label: "General Info", icon: Info, color: "text-blue-500", bg: "bg-blue-500/10" },
  { value: "success", label: "Success Alert", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { value: "warning", label: "System Warning", icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-500/10" },
  { value: "error", label: "Critical Error", icon: XCircle, color: "text-rose-500", bg: "bg-rose-500/10" }
];

export default function AdminNotificationsPage() {
  const db = useFirestore();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "info"
  });

  const notificationsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "notifications"), orderBy("createdAt", "desc"));
  }, [db]);

  const { data: notifications, isLoading } = useCollection(notificationsQuery);

  const filteredNotifications = notifications?.filter(n => {
    const matchesSearch = n.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         n.message?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || n.type === typeFilter;
    return matchesSearch && matchesType;
  }) || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;

    addDocumentNonBlocking(collection(db, "notifications"), {
      ...formData,
      status: "unread",
      createdAt: new Date().toISOString()
    });

    toast({ title: "Dispatch Success", description: "Notification broadcasted to ecosystem." });
    setIsModalOpen(false);
    setFormData({ title: "", message: "", type: "info" });
  };

  const handleMarkRead = (id: string) => {
    if (!db) return;
    updateDocumentNonBlocking(doc(db, "notifications", id), { status: "read" });
    toast({ title: "Registry Updated", description: "Notification marked as read." });
  };

  const handleDelete = (id: string) => {
    if (!db) return;
    deleteDocumentNonBlocking(doc(db, "notifications", id));
    toast({ variant: "destructive", title: "Record Purged", description: "Notification removed from system logs." });
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-73px)] flex items-center justify-center bg-slate-950">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  const unreadCount = notifications?.filter(n => n.status === 'unread').length || 0;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-10">
        <div className="space-y-2">
          <h2 className="text-4xl font-headline font-black italic text-white uppercase tracking-tighter">
            Notification <span className="text-primary">Command</span>
          </h2>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Operational Alert & Broadcast Module</p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="relative w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input 
              placeholder="Search Alerts" 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="h-12 bg-slate-900 border-slate-800 rounded-xl pl-12 text-[10px] font-black uppercase tracking-widest text-white"
            />
          </div>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="h-12 px-8 rounded-xl bg-primary text-white font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/10"
          >
            <Plus className="w-4 h-4 mr-2" /> Dispatch Alert
          </Button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-900 border-slate-800 rounded-[2rem] group hover:border-primary transition-all duration-500">
          <CardContent className="p-8 flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <BellRing className="w-7 h-7" />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Total Dispatch</p>
              <h4 className="text-3xl font-headline font-black text-white">{notifications?.length || 0}</h4>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 rounded-[2rem] group hover:border-emerald-500 transition-all duration-500">
          <CardContent className="p-8 flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7" />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Unread Alerts</p>
              <h4 className="text-3xl font-headline font-black text-white">{unreadCount}</h4>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 rounded-[2rem] group hover:border-blue-500 transition-all duration-500">
          <CardContent className="p-8 flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
              <Send className="w-7 h-7" />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Active Filters</p>
              <h4 className="text-3xl font-headline font-black text-white">{typeFilter === 'all' ? 'NONE' : typeFilter.toUpperCase()}</h4>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Type Filter Tabs */}
      <div className="flex gap-2 p-1.5 bg-slate-900/50 border border-slate-800 rounded-2xl w-fit">
        {['all', 'info', 'success', 'warning', 'error'].map(type => (
          <Button 
            key={type}
            variant="ghost"
            onClick={() => setTypeFilter(type)}
            className={cn(
              "h-10 px-6 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all",
              typeFilter === type ? "bg-slate-800 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
            )}
          >
            {type}
          </Button>
        ))}
      </div>

      {/* Main List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif) => {
            const config = NOTIFICATION_TYPES.find(t => t.value === notif.type) || NOTIFICATION_TYPES[0];
            return (
              <Card key={notif.id} className="bg-slate-900/50 border-slate-800/50 rounded-[2.5rem] overflow-hidden group hover:bg-slate-900 transition-all duration-500">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row justify-between gap-8">
                    <div className="flex items-start gap-6 flex-1">
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg", config.bg, config.color)}>
                        <config.icon className="w-7 h-7" />
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h4 className="text-2xl font-headline font-black italic text-white uppercase tracking-tighter">{notif.title}</h4>
                          <Badge className={cn(
                            "text-[8px] font-black uppercase tracking-widest border-none px-3 py-1",
                            notif.status === 'unread' ? "bg-primary animate-pulse" : "bg-slate-700"
                          )}>
                            {notif.status}
                          </Badge>
                        </div>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed italic">"{notif.message}"</p>
                        <div className="flex items-center gap-4 text-slate-600 font-bold text-[9px] uppercase tracking-widest pt-2">
                          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {new Date(notif.createdAt).toLocaleString()}</span>
                          <span className="flex items-center gap-1.5"><Layout className="w-3.5 h-3.5" /> REF: {notif.id.slice(0, 8).toUpperCase()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row lg:flex-col gap-3 shrink-0 justify-end">
                      {notif.status === 'unread' && (
                        <Button 
                          onClick={() => handleMarkRead(notif.id)}
                          variant="outline"
                          className="h-12 rounded-xl border-slate-800 bg-slate-950 text-slate-400 hover:text-white text-[9px] font-black uppercase tracking-widest transition-all px-6"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" /> Mark Read
                        </Button>
                      )}
                      <Button 
                        onClick={() => handleDelete(notif.id)}
                        variant="outline"
                        className="h-12 rounded-xl border-destructive/20 bg-destructive/5 text-destructive hover:bg-destructive hover:text-white text-[9px] font-black uppercase tracking-widest transition-all px-6"
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Purge
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="text-center py-32 space-y-6 bg-slate-900/20 rounded-[3rem] border-2 border-dashed border-slate-800">
            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto shadow-xl">
              <Bell className="w-10 h-10 text-slate-700" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-headline font-black italic text-slate-600 uppercase tracking-tighter">Quiet Stream</h3>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">No notifications detected matching current filters</p>
            </div>
          </div>
        )}
      </div>

      {/* Dispatch Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl bg-slate-950 border-slate-800 text-white rounded-[3rem] p-0 overflow-hidden">
          <div className="bg-slate-900 p-8 border-b border-slate-800">
            <DialogTitle className="text-3xl font-headline font-black italic uppercase tracking-tighter">
              Initialize <span className="text-primary">Dispatch</span>
            </DialogTitle>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">System Broadcast Protocol</p>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Alert Heading</Label>
                <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="h-14 rounded-2xl border-slate-800 bg-slate-900 focus:border-primary px-6" placeholder="Brief Summary" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Protocol Type</Label>
                <Select value={formData.type} onValueChange={val => setFormData({...formData, type: val})}>
                  <SelectTrigger className="h-14 rounded-2xl border-slate-800 bg-slate-900 text-sm px-6">
                    <SelectValue placeholder="Alert Level" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-950 border-slate-800 text-white rounded-xl">
                    {NOTIFICATION_TYPES.map(type => (
                      <SelectItem key={type.value} value={type.value} className="py-3">
                        <div className="flex items-center gap-3">
                          <type.icon className={cn("w-4 h-4", type.color)} />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Message Payload</Label>
              <Textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="min-h-[150px] rounded-2xl border-slate-800 bg-slate-900 focus:border-primary p-6 resize-none" placeholder="Detailed alert documentation..." />
            </div>

            <div className="p-6 bg-primary/5 border border-primary/10 rounded-2xl flex items-start gap-4">
              <Zap className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div className="space-y-1">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest">Broadcast Warning</p>
                <p className="text-xs font-medium text-slate-400 leading-relaxed italic">Dispatched alerts are immediately written to the global registry and prioritized based on level.</p>
              </div>
            </div>
          </form>

          <DialogFooter className="p-8 bg-slate-900 border-t border-slate-800">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)} className="rounded-full text-[10px] font-black uppercase tracking-widest">Abort</Button>
            <Button onClick={handleSubmit} className="h-14 px-10 rounded-2xl bg-primary text-white font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all">
              Launch Broadcast <Send className="ml-2 w-4 h-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
