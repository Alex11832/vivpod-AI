import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Phone,
  Clock,
  Users,
  TrendingUp,
  PhoneCall,
  PhoneOff,
  PhoneMissed,
  ArrowRight,
  Bot,
} from "lucide-react";
import { Link } from "wouter";

// Mock data for dashboard
const stats = [
  { label: "Total Calls", value: "1,247", change: "+12%", icon: Phone },
  { label: "Minutes Used", value: "342", limit: 500, icon: Clock },
  { label: "Leads Captured", value: "89", change: "+8%", icon: Users },
  { label: "Avg. Call Duration", value: "2:34", icon: TrendingUp },
];

const recentCalls = [
  { id: 1, caller: "+1 (555) 123-4567", duration: "3:45", status: "completed", time: "10 min ago" },
  { id: 2, caller: "+1 (555) 987-6543", duration: "1:22", status: "completed", time: "25 min ago" },
  { id: 3, caller: "+1 (555) 456-7890", duration: "0:00", status: "missed", time: "1 hour ago" },
  { id: 4, caller: "+1 (555) 321-0987", duration: "5:12", status: "transferred", time: "2 hours ago" },
  { id: 5, caller: "+1 (555) 654-3210", duration: "2:08", status: "completed", time: "3 hours ago" },
];

const statusIcons: Record<string, any> = {
  completed: PhoneCall,
  missed: PhoneMissed,
  transferred: PhoneOff,
};

const statusColors: Record<string, string> = {
  completed: "text-green-500",
  missed: "text-red-500",
  transferred: "text-yellow-500",
};

export default function DashboardHome() {
  const minutesUsed = 342;
  const minutesLimit = 500;
  const minutesPercent = (minutesUsed / minutesLimit) * 100;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <Card className="gradient-bg text-white">
        <CardContent className="py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
              <p className="text-white/80">
                Your AI agents handled 47 calls today. Here's your overview.
              </p>
            </div>
            <Link href="/dashboard/agents">
              <Button variant="secondary" className="gap-2">
                <Bot className="w-4 h-4" />
                Manage Agents
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  {stat.change && (
                    <Badge variant="secondary" className="mt-2 text-green-600 bg-green-100">
                      {stat.change} this week
                    </Badge>
                  )}
                  {stat.limit && (
                    <div className="mt-3">
                      <Progress value={minutesPercent} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {stat.limit - minutesUsed} minutes remaining
                      </p>
                    </div>
                  )}
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Calls */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Calls</CardTitle>
            <CardDescription>Your latest call activity</CardDescription>
          </div>
          <Link href="/dashboard/calls">
            <Button variant="outline" size="sm" className="gap-2">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCalls.map((call) => {
              const StatusIcon = statusIcons[call.status];
              return (
                <div
                  key={call.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full bg-background flex items-center justify-center ${statusColors[call.status]}`}>
                      <StatusIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium">{call.caller}</p>
                      <p className="text-sm text-muted-foreground">{call.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{call.duration}</p>
                    <Badge variant="outline" className="capitalize">
                      {call.status}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/dashboard/agents">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Create New Agent</h3>
                  <p className="text-sm text-muted-foreground">Set up a new AI receptionist</p>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/dashboard/integrations">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">Connect CRM</h3>
                  <p className="text-sm text-muted-foreground">Sync leads automatically</p>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/dashboard/settings">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Upgrade Plan</h3>
                  <p className="text-sm text-muted-foreground">Get more minutes</p>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  );
}
