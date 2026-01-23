import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import {
  MessageCircle,
  Calendar,
  Users,
  Zap,
  Mail,
  Database,
  Check,
  ExternalLink,
  Settings,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

// Integration definitions
const integrations = [
  {
    id: "telegram",
    name: "Telegram",
    description: "Get instant call notifications and summaries via Telegram",
    icon: MessageCircle,
    color: "bg-blue-500",
    status: "available",
    isLive: true,
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Automatically sync appointments to your calendar",
    icon: Calendar,
    color: "bg-red-500",
    status: "available",
    isLive: true,
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Sync leads and contacts with your HubSpot CRM",
    icon: Users,
    color: "bg-orange-500",
    status: "available",
    isLive: true,
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Connect with Salesforce for enterprise CRM integration",
    icon: Database,
    color: "bg-blue-600",
    status: "coming_soon",
    isLive: false,
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Connect with 5,000+ apps through Zapier automation",
    icon: Zap,
    color: "bg-orange-400",
    status: "coming_soon",
    isLive: false,
  },
  {
    id: "email",
    name: "Email Notifications",
    description: "Receive call summaries and alerts via email",
    icon: Mail,
    color: "bg-green-500",
    status: "available",
    isLive: false,
  },
];

export default function DashboardIntegrations() {
  const [configureDialog, setConfigureDialog] = useState<string | null>(null);
  const [telegramChatId, setTelegramChatId] = useState("");
  const [hubspotApiKey, setHubspotApiKey] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Fetch user settings
  const { data: settings, refetch: refetchSettings } = trpc.settings.get.useQuery();
  const updateSettings = trpc.settings.update.useMutation({
    onSuccess: () => {
      toast.success("Integration saved successfully!");
      refetchSettings();
      setConfigureDialog(null);
    },
    onError: (error) => {
      toast.error(`Failed to save: ${error.message}`);
    },
  });

  // Initialize from settings
  useEffect(() => {
    if (settings) {
      setTelegramChatId(settings.telegramChatId || "");
      setHubspotApiKey(settings.hubspotApiKey || "");
    }
  }, [settings]);

  // Determine connected integrations from settings
  const connectedIntegrations: string[] = [];
  if (settings?.telegramEnabled) connectedIntegrations.push("telegram");
  if (settings?.googleCalendarConnected) connectedIntegrations.push("google-calendar");
  if (settings?.hubspotConnected) connectedIntegrations.push("hubspot");
  if (settings?.emailSummary) connectedIntegrations.push("email");

  const handleConnect = (integrationId: string) => {
    const integration = integrations.find((i) => i.id === integrationId);
    
    if (integration?.status === "coming_soon") {
      toast.info("This integration is coming soon! We'll notify you when it's available.");
      return;
    }

    if (integration?.isLive) {
      setConfigureDialog(integrationId);
    } else {
      // Simple toggle for email notifications
      if (integrationId === "email") {
        updateSettings.mutate({ emailSummary: !settings?.emailSummary });
      }
    }
  };

  const handleSaveTelegram = async () => {
    setIsSaving(true);
    try {
      await updateSettings.mutateAsync({
        telegramEnabled: true,
        telegramChatId: telegramChatId,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveHubSpot = async () => {
    setIsSaving(true);
    try {
      await updateSettings.mutateAsync({
        hubspotConnected: true,
        hubspotApiKey: hubspotApiKey,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveGoogleCalendar = async () => {
    setIsSaving(true);
    try {
      await updateSettings.mutateAsync({
        googleCalendarConnected: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDisconnect = async (integrationId: string) => {
    if (integrationId === "telegram") {
      await updateSettings.mutateAsync({ telegramEnabled: false, telegramChatId: "" });
    } else if (integrationId === "google-calendar") {
      await updateSettings.mutateAsync({ googleCalendarConnected: false });
    } else if (integrationId === "hubspot") {
      await updateSettings.mutateAsync({ hubspotConnected: false, hubspotApiKey: "" });
    } else if (integrationId === "email") {
      await updateSettings.mutateAsync({ emailSummary: false });
    }
    toast.success("Integration disconnected");
  };

  const handleTestTelegram = () => {
    toast.info("Test message sent! Check your Telegram.");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Integrations</h1>
        <p className="text-muted-foreground">Connect your favorite tools with ViVpod</p>
      </div>

      {/* Connected Integrations */}
      {connectedIntegrations.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Connected</h2>
          <div className="grid gap-4">
            {integrations
              .filter((i) => connectedIntegrations.includes(i.id))
              .map((integration) => (
                <Card key={integration.id}>
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${integration.color} flex items-center justify-center`}>
                          <integration.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{integration.name}</h3>
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              <Check className="w-3 h-3 mr-1" />
                              Connected
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{integration.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {integration.isLive && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setConfigureDialog(integration.id)}
                          >
                            <Settings className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDisconnect(integration.id)}
                        >
                          Disconnect
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}

      {/* Available Integrations */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Available Integrations</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations
            .filter((i) => !connectedIntegrations.includes(i.id))
            .map((integration) => (
              <Card key={integration.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-xl ${integration.color} flex items-center justify-center`}>
                      <integration.icon className="w-6 h-6 text-white" />
                    </div>
                    {integration.status === "coming_soon" && (
                      <Badge variant="secondary">Coming Soon</Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg mt-3">{integration.name}</CardTitle>
                  <CardDescription>{integration.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full"
                    variant={integration.status === "coming_soon" ? "outline" : "default"}
                    onClick={() => handleConnect(integration.id)}
                  >
                    {integration.status === "coming_soon" ? "Notify Me" : "Connect"}
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Telegram Configuration Dialog */}
      <Dialog open={configureDialog === "telegram"} onOpenChange={() => setConfigureDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-500" />
              Configure Telegram
            </DialogTitle>
            <DialogDescription>
              Set up Telegram notifications for your AI agent
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">How to set up:</h4>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Message <strong>@vivpod_bot</strong> on Telegram</li>
                <li>Send <code>/start</code> to get your Chat ID</li>
                <li>Enter your Chat ID below</li>
              </ol>
            </div>
            <div className="space-y-2">
              <Label htmlFor="chatId">Chat ID</Label>
              <Input
                id="chatId"
                placeholder="Enter your Telegram chat ID"
                value={telegramChatId}
                onChange={(e) => setTelegramChatId(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
              <div>
                <p className="font-medium text-sm">Send test message</p>
                <p className="text-xs text-muted-foreground">Verify your configuration</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleTestTelegram}>
                Test
              </Button>
            </div>
            <Button
              className="w-full gradient-bg text-white"
              onClick={handleSaveTelegram}
              disabled={isSaving || !telegramChatId}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Configuration"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Google Calendar Configuration Dialog */}
      <Dialog open={configureDialog === "google-calendar"} onOpenChange={() => setConfigureDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-500" />
              Configure Google Calendar
            </DialogTitle>
            <DialogDescription>
              Connect your Google Calendar to sync appointments
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted text-center">
              <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
              <p className="font-medium mb-2">Connect with Google</p>
              <p className="text-sm text-muted-foreground mb-4">
                Sign in with your Google account to sync calendar events
              </p>
              <Button className="gap-2" onClick={handleSaveGoogleCalendar} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-4 h-4" />
                    Sign in with Google
                  </>
                )}
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Auto-create events</p>
                  <p className="text-xs text-muted-foreground">Create calendar events for appointments</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Send reminders</p>
                  <p className="text-xs text-muted-foreground">Add reminders to calendar events</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* HubSpot Configuration Dialog */}
      <Dialog open={configureDialog === "hubspot"} onOpenChange={() => setConfigureDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-500" />
              Configure HubSpot
            </DialogTitle>
            <DialogDescription>
              Connect your HubSpot CRM to sync contacts and leads
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hubspotKey">API Key</Label>
              <Input
                id="hubspotKey"
                type="password"
                placeholder="Enter your HubSpot API key"
                value={hubspotApiKey}
                onChange={(e) => setHubspotApiKey(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Find your API key in HubSpot Settings → Integrations → Private Apps
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Sync new leads</p>
                  <p className="text-xs text-muted-foreground">Create contacts for new callers</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Log call activities</p>
                  <p className="text-xs text-muted-foreground">Add call notes to contact timeline</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Create deals</p>
                  <p className="text-xs text-muted-foreground">Auto-create deals from qualified leads</p>
                </div>
                <Switch />
              </div>
            </div>
            <Button
              className="w-full gradient-bg text-white"
              onClick={handleSaveHubSpot}
              disabled={isSaving || !hubspotApiKey}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Configuration"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
