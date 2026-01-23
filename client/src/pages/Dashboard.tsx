import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Phone,
  Clock,
  Users,
  TrendingUp,
  Settings,
  Play,
  Calendar,
  MessageSquare,
  Bot,
  Plus,
  ChevronRight,
  PhoneCall,
  PhoneOff,
  PhoneMissed,
  Volume2,
} from "lucide-react";
import { useLocation, Route, Switch } from "wouter";
import { useEffect, useState } from "react";

// Dashboard sub-pages
import DashboardHome from "./dashboard/DashboardHome";
import DashboardAgents from "./dashboard/DashboardAgents";
import DashboardCalls from "./dashboard/DashboardCalls";
import DashboardSettings from "./dashboard/DashboardSettings";
import DashboardIntegrations from "./dashboard/DashboardIntegrations";

const sidebarItems = [
  { icon: TrendingUp, label: "Overview", href: "/dashboard" },
  { icon: Bot, label: "AI Agents", href: "/dashboard/agents" },
  { icon: Phone, label: "Call History", href: "/dashboard/calls" },
  { icon: MessageSquare, label: "Integrations", href: "/dashboard/integrations" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function Dashboard() {
  const { user, loading, isAuthenticated } = useAuth();
  const [location, setLocation] = useLocation();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = getLoginUrl();
    }
  }, [loading, isAuthenticated]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      title="ViVpod Dashboard"
    >
      <Switch>
        <Route path="/dashboard" component={DashboardHome} />
        <Route path="/dashboard/agents" component={DashboardAgents} />
        <Route path="/dashboard/calls" component={DashboardCalls} />
        <Route path="/dashboard/integrations" component={DashboardIntegrations} />
        <Route path="/dashboard/settings" component={DashboardSettings} />
        <Route>
          <DashboardHome />
        </Route>
      </Switch>
    </DashboardLayout>
  );
}
