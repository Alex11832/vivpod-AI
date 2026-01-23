import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Phone,
  PhoneCall,
  PhoneOff,
  PhoneMissed,
  PhoneIncoming,
  PhoneForwarded,
  Voicemail,
  Search,
  Filter,
  Download,
  Play,
  FileText,
  Clock,
  Calendar,
  Loader2,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { format } from "date-fns";

const statusIcons: Record<string, any> = {
  completed: PhoneIncoming,
  missed: PhoneMissed,
  transferred: PhoneForwarded,
  voicemail: Voicemail,
};

const statusColors: Record<string, string> = {
  completed: "text-green-500 bg-green-100",
  missed: "text-red-500 bg-red-100",
  transferred: "text-blue-500 bg-blue-100",
  voicemail: "text-orange-500 bg-orange-100",
};

export default function DashboardCalls() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCall, setSelectedCall] = useState<any | null>(null);

  const { data: calls = [], isLoading } = trpc.calls.list.useQuery({ limit: 100 });

  const filteredCalls = calls.filter((call) => {
    const matchesSearch =
      call.callerPhone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.summary?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || call.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Calculate stats
  const totalCalls = calls.length;
  const completedCalls = calls.filter((c) => c.status === "completed").length;
  const missedCalls = calls.filter((c) => c.status === "missed").length;
  const avgDuration = calls.length > 0 
    ? Math.round(calls.reduce((acc, c) => acc + (c.duration || 0), 0) / calls.length)
    : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Call History</h1>
          <p className="text-muted-foreground">View and manage your call recordings</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalCalls}</p>
                <p className="text-sm text-muted-foreground">Total Calls</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <PhoneIncoming className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedCalls}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                <PhoneMissed className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{missedCalls}</p>
                <p className="text-sm text-muted-foreground">Missed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{formatDuration(avgDuration)}</p>
                <p className="text-sm text-muted-foreground">Avg Duration</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by phone number..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Calls</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="missed">Missed</SelectItem>
                <SelectItem value="transferred">Transferred</SelectItem>
                <SelectItem value="voicemail">Voicemail</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {/* Calls List */}
      {!isLoading && filteredCalls.length > 0 && (
        <div className="space-y-3">
          {filteredCalls.map((call) => {
            const StatusIcon = statusIcons[call.status] || Phone;
            return (
              <Card
                key={call.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedCall(call)}
              >
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${statusColors[call.status] || "bg-gray-100"}`}>
                        <StatusIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{call.callerPhone || "Unknown"}</p>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {call.createdAt ? format(new Date(call.createdAt), "MMM d, yyyy") : ""}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {call.createdAt ? format(new Date(call.createdAt), "h:mm a") : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatDuration(call.duration)}</p>
                      <Badge variant="outline" className="capitalize">
                        {call.status}
                      </Badge>
                    </div>
                  </div>
                  {call.summary && (
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-1">
                      {call.summary}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {!isLoading && filteredCalls.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <Phone className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Calls Yet</h3>
            <p className="text-muted-foreground">
              {searchQuery || statusFilter !== "all"
                ? "No calls match your filters"
                : "Calls will appear here once your AI agent starts receiving them"}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Call Detail Dialog */}
      <Dialog open={!!selectedCall} onOpenChange={() => setSelectedCall(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedCall && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  {selectedCall.callerPhone || "Unknown"}
                </DialogTitle>
                <DialogDescription>
                  {selectedCall.createdAt ? format(new Date(selectedCall.createdAt), "MMM d, yyyy 'at' h:mm a") : ""} • {formatDuration(selectedCall.duration)}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Call Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant="outline" className="capitalize">
                      {selectedCall.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{formatDuration(selectedCall.duration)}</p>
                  </div>
                  {selectedCall.sentiment && (
                    <div>
                      <p className="text-sm text-muted-foreground">Sentiment</p>
                      <Badge variant="outline" className="capitalize">
                        {selectedCall.sentiment}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Summary */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Call Summary
                  </h4>
                  <p className="text-muted-foreground bg-muted/50 p-4 rounded-lg">
                    {selectedCall.summary || "No summary available"}
                  </p>
                </div>

                {/* Transcript */}
                {selectedCall.transcript && (
                  <div>
                    <h4 className="font-semibold mb-2">Transcript</h4>
                    <div className="bg-muted/50 p-4 rounded-lg text-sm whitespace-pre-wrap">
                      {selectedCall.transcript}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 gap-2">
                    <Play className="w-4 h-4" />
                    Play Recording
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
