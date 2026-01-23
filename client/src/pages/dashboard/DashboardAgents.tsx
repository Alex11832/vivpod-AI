import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Bot,
  Plus,
  Settings,
  Play,
  Pause,
  Trash2,
  Edit,
  Volume2,
  Wrench,
  Sparkles,
  UtensilsCrossed,
  Pill,
  Scale,
  Home,
  ChevronRight,
  Loader2,
  Stethoscope,
  Thermometer,
  Car,
  Droplets,
} from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

// Industry templates with sub-categories
const industryTemplates = [
  {
    id: "handyman",
    name: "Handyman Services",
    icon: Wrench,
    description: "Home repair and maintenance services",
    subCategories: [
      { id: "tv-mounting", name: "TV Mounting", prompt: "You are a friendly AI receptionist for a TV mounting service. Help customers schedule TV mounting appointments, ask about TV size, wall type, and preferred time slots." },
      { id: "furniture-assembly", name: "Furniture Assembly", prompt: "You are a helpful AI receptionist for furniture assembly services. Assist customers with scheduling assembly appointments, ask about furniture type and quantity." },
      { id: "wall-hanging", name: "Wall Hanging", prompt: "You are a professional AI receptionist for wall hanging services. Help customers schedule appointments for hanging mirrors, art, shelves, and other wall items." },
      { id: "plumbing", name: "Plumbing", prompt: "You are an AI receptionist for plumbing services. Handle emergency and routine plumbing calls, assess urgency, and schedule appointments." },
      { id: "electrical", name: "Electrical", prompt: "You are an AI receptionist for electrical services. Help customers with electrical repairs, installations, and safety inspections." },
    ],
  },
  {
    id: "cleaning",
    name: "Cleaning Services",
    icon: Sparkles,
    description: "House and commercial cleaning",
    subCategories: [
      { id: "house-cleaning", name: "House Cleaning", prompt: "You are an AI receptionist for house cleaning services. Help customers book regular or deep cleaning, ask about home size and specific needs." },
      { id: "move-out", name: "Move-out Cleaning", prompt: "You are an AI receptionist for move-out cleaning services. Assist with scheduling thorough cleaning for moving situations." },
      { id: "commercial", name: "Commercial Cleaning", prompt: "You are an AI receptionist for commercial cleaning services. Handle office and business cleaning inquiries and scheduling." },
      { id: "carpet", name: "Carpet Cleaning", prompt: "You are an AI receptionist for carpet cleaning services. Help customers schedule carpet cleaning, ask about carpet type and room count." },
    ],
  },
  {
    id: "restaurant",
    name: "Restaurant",
    icon: UtensilsCrossed,
    description: "Reservations and food orders",
    subCategories: [
      { id: "reservations", name: "Table Reservations", prompt: "You are a friendly AI host for a restaurant. Help guests make table reservations, ask about party size, date, time, and special occasions." },
      { id: "takeout", name: "Takeout Orders", prompt: "You are an AI assistant for restaurant takeout orders. Help customers place orders, confirm items, and provide pickup times." },
      { id: "catering", name: "Catering Inquiries", prompt: "You are an AI receptionist for restaurant catering services. Handle catering inquiries, collect event details, and schedule consultations." },
    ],
  },
  {
    id: "pharmacy",
    name: "Pharmacy",
    icon: Pill,
    description: "Prescription and medication services",
    subCategories: [
      { id: "refills", name: "Prescription Refills", prompt: "You are an AI assistant for a pharmacy. Help customers request prescription refills, verify patient information, and provide pickup times." },
      { id: "availability", name: "Medication Availability", prompt: "You are an AI assistant for a pharmacy. Help customers check medication availability and pricing." },
      { id: "transfers", name: "Prescription Transfers", prompt: "You are an AI assistant for a pharmacy. Help customers transfer prescriptions from other pharmacies." },
    ],
  },
  {
    id: "legal",
    name: "Law Firm",
    icon: Scale,
    description: "Legal consultations and intake",
    subCategories: [
      { id: "intake", name: "Client Intake", prompt: "You are a professional AI receptionist for a law firm. Conduct initial client intake, gather case details, and schedule consultations." },
      { id: "consultation", name: "Consultation Booking", prompt: "You are an AI receptionist for a law firm. Help potential clients schedule consultations with appropriate attorneys." },
      { id: "status", name: "Case Status", prompt: "You are an AI receptionist for a law firm. Help existing clients with case status inquiries and route to appropriate staff." },
    ],
  },
  {
    id: "realestate",
    name: "Real Estate",
    icon: Home,
    description: "Property inquiries and viewings",
    subCategories: [
      { id: "listings", name: "Listing Inquiries", prompt: "You are an AI receptionist for a real estate agency. Answer questions about property listings and collect lead information." },
      { id: "viewings", name: "Property Viewings", prompt: "You are an AI receptionist for a real estate agency. Schedule property viewings and tours for interested buyers." },
      { id: "rentals", name: "Rental Inquiries", prompt: "You are an AI receptionist for a real estate agency. Handle rental property inquiries and schedule showings." },
    ],
  },
  {
    id: "dental",
    name: "Dental Practice",
    icon: Stethoscope,
    description: "Dental appointments and patient care",
    subCategories: [
      { id: "checkup", name: "Routine Checkups", prompt: "You are a friendly AI receptionist for a dental practice. Help patients schedule routine dental checkups and cleanings, ask about their last visit and any concerns." },
      { id: "emergency", name: "Emergency Dental", prompt: "You are an AI receptionist for a dental practice handling emergencies. Assess the urgency of dental emergencies like severe pain, broken teeth, or infections, and schedule same-day appointments when needed." },
      { id: "cosmetic", name: "Cosmetic Dentistry", prompt: "You are an AI receptionist for cosmetic dental services. Help patients schedule consultations for teeth whitening, veneers, Invisalign, and other cosmetic procedures." },
      { id: "pediatric", name: "Pediatric Dentistry", prompt: "You are a warm AI receptionist for pediatric dental services. Help parents schedule appointments for their children, explain kid-friendly procedures, and address common concerns." },
      { id: "oral-surgery", name: "Oral Surgery", prompt: "You are an AI receptionist for oral surgery consultations. Schedule appointments for wisdom teeth removal, dental implants, and other surgical procedures." },
    ],
  },
  {
    id: "hvac",
    name: "HVAC Services",
    icon: Thermometer,
    description: "Heating, ventilation, and air conditioning",
    subCategories: [
      { id: "ac-repair", name: "AC Repair", prompt: "You are an AI receptionist for HVAC services. Help customers schedule air conditioning repairs, assess urgency based on symptoms like no cooling, strange noises, or leaks." },
      { id: "heating-repair", name: "Heating Repair", prompt: "You are an AI receptionist for HVAC services. Handle heating system repair calls, prioritize no-heat emergencies in cold weather, and schedule service appointments." },
      { id: "maintenance", name: "Seasonal Maintenance", prompt: "You are an AI receptionist for HVAC maintenance services. Help customers schedule seasonal tune-ups for their heating and cooling systems to prevent breakdowns." },
      { id: "installation", name: "New Installation", prompt: "You are an AI receptionist for HVAC installation services. Help customers schedule consultations for new AC units, furnaces, or complete HVAC system installations." },
      { id: "duct-cleaning", name: "Duct Cleaning", prompt: "You are an AI receptionist for duct cleaning services. Help customers schedule air duct cleaning and explain the benefits for air quality and system efficiency." },
    ],
  },
  {
    id: "auto-repair",
    name: "Auto Repair Shop",
    icon: Car,
    description: "Vehicle maintenance and repairs",
    subCategories: [
      { id: "oil-change", name: "Oil Change", prompt: "You are an AI receptionist for an auto repair shop. Help customers schedule oil changes, ask about vehicle make/model and mileage, and provide estimated service times." },
      { id: "brake-service", name: "Brake Service", prompt: "You are an AI receptionist for auto brake services. Help customers schedule brake inspections and repairs, ask about symptoms like squeaking, grinding, or soft pedal feel." },
      { id: "tire-service", name: "Tire Service", prompt: "You are an AI receptionist for tire services. Help customers schedule tire rotations, replacements, balancing, and flat repairs." },
      { id: "diagnostics", name: "Engine Diagnostics", prompt: "You are an AI receptionist for auto diagnostics. Help customers schedule check engine light diagnostics and explain the diagnostic process." },
      { id: "transmission", name: "Transmission Service", prompt: "You are an AI receptionist for transmission services. Help customers schedule transmission fluid changes, repairs, and rebuilds." },
      { id: "ac-service", name: "Auto AC Service", prompt: "You are an AI receptionist for auto AC services. Help customers schedule AC recharges, leak repairs, and compressor replacements." },
    ],
  },
  {
    id: "plumbing",
    name: "Plumbing Services",
    icon: Droplets,
    description: "Plumbing repairs and installations",
    subCategories: [
      { id: "emergency-plumbing", name: "Emergency Plumbing", prompt: "You are an AI receptionist for emergency plumbing services. Handle urgent calls for burst pipes, major leaks, sewage backups, and no water situations. Prioritize and dispatch quickly." },
      { id: "drain-cleaning", name: "Drain Cleaning", prompt: "You are an AI receptionist for drain cleaning services. Help customers schedule drain cleaning for clogged sinks, showers, toilets, and main sewer lines." },
      { id: "water-heater", name: "Water Heater Service", prompt: "You are an AI receptionist for water heater services. Help customers with water heater repairs, replacements, and tankless water heater installations." },
      { id: "leak-detection", name: "Leak Detection", prompt: "You are an AI receptionist for leak detection services. Help customers schedule professional leak detection for hidden water leaks in walls, floors, or underground." },
      { id: "fixture-install", name: "Fixture Installation", prompt: "You are an AI receptionist for plumbing fixture installation. Help customers schedule installation of faucets, toilets, sinks, showers, and garbage disposals." },
      { id: "repiping", name: "Repiping Services", prompt: "You are an AI receptionist for repiping services. Help customers schedule consultations for whole-house repiping due to old pipes, low pressure, or frequent leaks." },
    ],
  },
];

export default function DashboardAgents() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createStep, setCreateStep] = useState<"template" | "voice" | "customize">("template");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("21m00Tcm4TlvDq8ikWAM");
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>("Rachel");
  const [agentName, setAgentName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [firstMessage, setFirstMessage] = useState("");
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);

  // Fetch agents from API
  const { data: agents = [], isLoading, refetch } = trpc.agents.list.useQuery();
  
  // Fetch available voices
  const { data: voices = [] } = trpc.voices.list.useQuery();

  // Mutations
  const createAgent = trpc.agents.create.useMutation({
    onSuccess: () => {
      toast.success("AI Agent created successfully!");
      setIsCreateOpen(false);
      resetForm();
      refetch();
    },
    onError: (error) => {
      toast.error(`Failed to create agent: ${error.message}`);
    },
  });

  const deleteAgentMutation = trpc.agents.delete.useMutation({
    onSuccess: () => {
      toast.success("Agent deleted");
      refetch();
    },
    onError: (error) => {
      toast.error(`Failed to delete agent: ${error.message}`);
    },
  });

  const updateAgent = trpc.agents.update.useMutation({
    onSuccess: () => {
      toast.success("Agent updated");
      refetch();
    },
  });

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setSelectedSubCategories([]);
  };

  const handleSubCategoryToggle = (subCategoryId: string) => {
    setSelectedSubCategories((prev) =>
      prev.includes(subCategoryId)
        ? prev.filter((id) => id !== subCategoryId)
        : [...prev, subCategoryId]
    );
  };

  const handleVoicePlay = (voiceId: string) => {
    if (playingVoice === voiceId) {
      setPlayingVoice(null);
    } else {
      setPlayingVoice(voiceId);
      // Simulate audio playback - in production would use ElevenLabs API
      setTimeout(() => setPlayingVoice(null), 3000);
    }
  };

  const generatePrompt = () => {
    if (!selectedTemplate || selectedSubCategories.length === 0) return "";
    
    const template = industryTemplates.find((t) => t.id === selectedTemplate);
    if (!template) return "";

    const selectedSubs = template.subCategories.filter((s) =>
      selectedSubCategories.includes(s.id)
    );

    const prompts = selectedSubs.map((s) => s.prompt).join("\n\n");
    return `Company: ${companyName || "[Your Company Name]"}\n\n${prompts}`;
  };

  const generateFirstMessage = () => {
    return `Thank you for calling ${companyName || "[Your Company Name]"}. How can I help you today?`;
  };

  const handleNext = () => {
    if (createStep === "template") {
      if (!selectedTemplate || selectedSubCategories.length === 0) {
        toast.error("Please select a template and at least one service type");
        return;
      }
      setCustomPrompt(generatePrompt());
      setFirstMessage(generateFirstMessage());
      setCreateStep("voice");
    } else if (createStep === "voice") {
      setCreateStep("customize");
    }
  };

  const handleBack = () => {
    if (createStep === "voice") {
      setCreateStep("template");
    } else if (createStep === "customize") {
      setCreateStep("voice");
    }
  };

  const handleCreate = () => {
    if (!agentName) {
      toast.error("Please enter an agent name");
      return;
    }

    createAgent.mutate({
      name: agentName,
      voiceId: selectedVoice,
      voiceName: selectedVoiceName,
      voiceProvider: "11labs",
      industry: industryTemplates.find((t) => t.id === selectedTemplate)?.name,
      subCategories: selectedSubCategories,
      systemPrompt: customPrompt,
      firstMessage: firstMessage,
    });
  };

  const resetForm = () => {
    setCreateStep("template");
    setSelectedTemplate(null);
    setSelectedSubCategories([]);
    setSelectedVoice("21m00Tcm4TlvDq8ikWAM");
    setSelectedVoiceName("Rachel");
    setAgentName("");
    setCompanyName("");
    setCustomPrompt("");
    setFirstMessage("");
  };

  const handleToggleStatus = (agent: typeof agents[0]) => {
    const newStatus = agent.status === "active" ? "paused" : "active";
    updateAgent.mutate({ id: agent.id, status: newStatus });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">AI Agents</h1>
          <p className="text-muted-foreground">Manage your AI receptionists</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-bg text-white gap-2">
              <Plus className="w-4 h-4" />
              Create Agent
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New AI Agent</DialogTitle>
              <DialogDescription>
                {createStep === "template" && "Choose an industry template to get started"}
                {createStep === "voice" && "Give your AI receptionist a voice"}
                {createStep === "customize" && "Customize your agent's behavior"}
              </DialogDescription>
            </DialogHeader>

            {/* Step 1: Template Selection */}
            {createStep === "template" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input
                    placeholder="Your Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <Label>Select Industry Template</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {industryTemplates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => handleTemplateSelect(template.id)}
                        className={`p-4 rounded-lg border text-left transition-all ${
                          selectedTemplate === template.id
                            ? "border-primary bg-primary/5"
                            : "hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <template.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{template.name}</p>
                            <p className="text-xs text-muted-foreground">{template.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedTemplate && (
                  <div className="space-y-4">
                    <Label>Select Service Types</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {industryTemplates
                        .find((t) => t.id === selectedTemplate)
                        ?.subCategories.map((sub) => (
                          <label
                            key={sub.id}
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                              selectedSubCategories.includes(sub.id)
                                ? "border-primary bg-primary/5"
                                : "hover:border-primary/50"
                            }`}
                          >
                            <Checkbox
                              checked={selectedSubCategories.includes(sub.id)}
                              onCheckedChange={() => handleSubCategoryToggle(sub.id)}
                            />
                            <span className="text-sm">{sub.name}</span>
                          </label>
                        ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <Button onClick={handleNext} className="gap-2">
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Voice Selection */}
            {createStep === "voice" && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-sm font-medium mb-1">🎤 Choose the tone and personality that fits your business best</p>
                    <p className="text-xs text-muted-foreground">
                      Click play to hear: "Thank you for calling {companyName || "your company"}. How can I help you today?"
                    </p>
                  </div>
                  <div className="grid gap-3 max-h-[400px] overflow-y-auto">
                    {voices.map((voice) => (
                      <div
                        key={voice.id}
                        className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                          selectedVoice === voice.id
                            ? "border-primary bg-primary/5"
                            : "hover:border-primary/50"
                        }`}
                        onClick={() => {
                          setSelectedVoice(voice.id);
                          setSelectedVoiceName(voice.name);
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-xl">
                            {voice.gender === "female" ? "👩" : "👨"}
                          </div>
                          <div>
                            <p className="font-medium">{voice.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {voice.accent} • {voice.description}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleVoicePlay(voice.id);
                          }}
                        >
                          {playingVoice === voice.id ? (
                            <>
                              <Volume2 className="w-4 h-4 animate-pulse" />
                              Playing...
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4" />
                              Play
                            </>
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button onClick={handleNext} className="gap-2">
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Customize */}
            {createStep === "customize" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Agent Name</Label>
                  <Input
                    placeholder="e.g., Main Receptionist"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Greeting Message</Label>
                  <Input
                    value={firstMessage}
                    onChange={(e) => setFirstMessage(e.target.value)}
                    placeholder="Thank you for calling..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Agent Instructions (Prompt)</Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Customize how your AI agent behaves and responds to callers
                  </p>
                  <Textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    rows={10}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button 
                    onClick={handleCreate} 
                    className="gradient-bg text-white"
                    disabled={createAgent.isPending}
                  >
                    {createAgent.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Agent"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && agents.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <Bot className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No AI Agents Yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first AI receptionist to start handling calls
            </p>
            <Button onClick={() => setIsCreateOpen(true)} className="gradient-bg text-white gap-2">
              <Plus className="w-4 h-4" />
              Create Your First Agent
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Agents List */}
      {!isLoading && agents.length > 0 && (
        <div className="grid gap-4">
          {agents.map((agent) => (
            <Card key={agent.id}>
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{agent.name}</h3>
                        <Badge variant={agent.status === "active" ? "default" : "secondary"}>
                          {agent.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Voice: {agent.voiceName || "Default"} • {agent.industry || "General"} • {agent.totalCalls} calls
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleToggleStatus(agent)}
                    >
                      {agent.status === "active" ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this agent?")) {
                          deleteAgentMutation.mutate({ id: agent.id });
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
