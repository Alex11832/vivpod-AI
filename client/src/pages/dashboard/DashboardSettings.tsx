import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  User,
  Building,
  CreditCard,
  Bell,
  Shield,
  Phone,
  Save,
  Check,
  Gift,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

export default function DashboardSettings() {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  // Fetch user settings
  const { data: settings, refetch: refetchSettings } = trpc.settings.get.useQuery();
  const updateSettings = trpc.settings.update.useMutation({
    onSuccess: () => {
      toast.success("Settings saved successfully");
      refetchSettings();
    },
    onError: (error) => {
      toast.error(`Failed to save settings: ${error.message}`);
    },
  });

  // Profile settings
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    timezone: "America/New_York",
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailSummary: true,
    missedCalls: true,
    weeklyReport: true,
    telegram: false,
    telegramChatId: "",
  });

  // Initialize from user and settings
  useEffect(() => {
    if (user) {
      const nameParts = (user.name || "").split(" ");
      setProfile((prev) => ({
        ...prev,
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        email: user.email || "",
        phone: (user as any).phone || "",
        company: (user as any).company || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    if (settings) {
      setProfile((prev) => ({
        ...prev,
        timezone: settings.timezone || "America/New_York",
      }));
      setNotifications({
        emailSummary: settings.emailSummary ?? true,
        missedCalls: settings.emailMissedCalls ?? true,
        weeklyReport: settings.emailWeeklyReport ?? true,
        telegram: settings.telegramEnabled ?? false,
        telegramChatId: settings.telegramChatId || "",
      });
    }
  }, [settings]);

  // Trial info from user
  const trialMinutesUsed = (user as any)?.trialMinutesUsed || 0;
  const trialMinutesTotal = (user as any)?.trialMinutesTotal || 30;
  const plan = (user as any)?.plan || "free";

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateSettings.mutateAsync({
        timezone: profile.timezone,
        emailSummary: notifications.emailSummary,
        emailMissedCalls: notifications.missedCalls,
        emailWeeklyReport: notifications.weeklyReport,
        telegramEnabled: notifications.telegram,
        telegramChatId: notifications.telegramChatId || undefined,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="notifications">Alerts</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Business Information
              </CardTitle>
              <CardDescription>Your business details for AI agents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  value={profile.company}
                  onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                  placeholder="Your Company Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  value={profile.timezone}
                  onValueChange={(value) => setProfile({ ...profile, timezone: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                    <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                    <SelectItem value="Europe/London">London (GMT)</SelectItem>
                    <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSave} className="gradient-bg text-white gap-2" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </Button>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          {/* Free Trial Banner */}
          {plan === "free" && (
            <Card className="border-primary/50 bg-primary/5">
              <CardContent className="py-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Gift className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Free Trial</h3>
                    <p className="text-muted-foreground mb-4">
                      You have <strong>{trialMinutesTotal - trialMinutesUsed} minutes</strong> remaining in your free trial.
                    </p>
                    <div className="mb-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Minutes Used</span>
                        <span className="text-sm font-medium">
                          {trialMinutesUsed} / {trialMinutesTotal}
                        </span>
                      </div>
                      <Progress value={(trialMinutesUsed / trialMinutesTotal) * 100} className="h-2" />
                    </div>
                    <Button className="gradient-bg text-white mt-2">
                      Upgrade to Pro
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Current Plan
              </CardTitle>
              <CardDescription>Manage your subscription</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold capitalize">{plan} Plan</h3>
                    <Badge>Current</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    {plan === "free" ? "30 minutes free trial" : 
                     plan === "starter" ? "$49/month • 200 minutes" :
                     plan === "pro" ? "$99/month • 500 minutes" :
                     "Custom pricing"}
                  </p>
                </div>
                <Button variant="outline">
                  {plan === "free" ? "Upgrade" : "Change Plan"}
                </Button>
              </div>

              {plan !== "free" && (
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Payment Method</h4>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                        VISA
                      </div>
                      <span>•••• •••• •••• 4242</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Update
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className={plan === "starter" ? "border-primary" : ""}>
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <CardDescription>For small businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-4">$49<span className="text-sm font-normal">/mo</span></p>
                <ul className="space-y-2 text-sm">
                  <li>✓ 200 minutes/month</li>
                  <li>✓ 1 AI agent</li>
                  <li>✓ Email notifications</li>
                  <li>✓ Basic analytics</li>
                </ul>
                <Button variant={plan === "starter" ? "outline" : "default"} className="w-full mt-4">
                  {plan === "starter" ? "Current Plan" : "Select"}
                </Button>
              </CardContent>
            </Card>

            <Card className={plan === "pro" ? "border-primary" : "border-primary/50"}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Pro</CardTitle>
                  <Badge>Popular</Badge>
                </div>
                <CardDescription>For growing businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-4">$99<span className="text-sm font-normal">/mo</span></p>
                <ul className="space-y-2 text-sm">
                  <li>✓ 500 minutes/month</li>
                  <li>✓ 3 AI agents</li>
                  <li>✓ All notifications</li>
                  <li>✓ Advanced analytics</li>
                  <li>✓ CRM integrations</li>
                </ul>
                <Button className={plan === "pro" ? "w-full mt-4" : "w-full mt-4 gradient-bg text-white"}>
                  {plan === "pro" ? "Current Plan" : "Select"}
                </Button>
              </CardContent>
            </Card>

            <Card className={plan === "enterprise" ? "border-primary" : ""}>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>For large organizations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-4">Custom</p>
                <ul className="space-y-2 text-sm">
                  <li>✓ Unlimited minutes</li>
                  <li>✓ Unlimited agents</li>
                  <li>✓ Priority support</li>
                  <li>✓ Custom integrations</li>
                  <li>✓ SLA guarantee</li>
                </ul>
                <Button variant="outline" className="w-full mt-4">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Daily Email Summary</p>
                  <p className="text-sm text-muted-foreground">
                    Receive a daily summary of all calls
                  </p>
                </div>
                <Switch
                  checked={notifications.emailSummary}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, emailSummary: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Missed Call Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified immediately when a call is missed
                  </p>
                </div>
                <Switch
                  checked={notifications.missedCalls}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, missedCalls: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Weekly Analytics Report</p>
                  <p className="text-sm text-muted-foreground">
                    Receive weekly performance insights
                  </p>
                </div>
                <Switch
                  checked={notifications.weeklyReport}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, weeklyReport: checked })
                  }
                />
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Telegram Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Get real-time alerts via Telegram
                    </p>
                  </div>
                  <Switch
                    checked={notifications.telegram}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, telegram: checked })
                    }
                  />
                </div>

                {notifications.telegram && (
                  <div className="space-y-2 pl-4 border-l-2 border-primary/20">
                    <Label htmlFor="telegramChatId">Telegram Chat ID</Label>
                    <Input
                      id="telegramChatId"
                      value={notifications.telegramChatId}
                      onChange={(e) =>
                        setNotifications({ ...notifications, telegramChatId: e.target.value })
                      }
                      placeholder="Enter your Telegram chat ID"
                    />
                    <p className="text-xs text-muted-foreground">
                      Message @vivpod_bot on Telegram to get your chat ID
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSave} className="gradient-bg text-white gap-2" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Preferences"
            )}
          </Button>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <p className="font-medium">Password</p>
                  <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                </div>
                <Button variant="outline">Change Password</Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Button variant="outline">Enable 2FA</Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <p className="font-medium">Active Sessions</p>
                  <p className="text-sm text-muted-foreground">Manage your logged-in devices</p>
                </div>
                <Button variant="outline">View Sessions</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
