import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CallExamples } from "@/components/CallExamples";
import { VapiWidget } from "@/components/VapiWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  Phone,
  Calendar,
  MessageSquare,
  Shield,
  Zap,
  Clock,
  Users,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Star,
  Wrench,
  Stethoscope,
  Scale,
  Home as HomeIcon,
  UtensilsCrossed,
  Building2,
  Send,
  Mail,
  Bot,
  PhoneCall,
  Filter,
  FileText,
} from "lucide-react";

// Social proof metrics
const metrics = [
  { value: "50K+", label: "Calls Handled" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Availability" },
  { value: "4.9★", label: "Rating" },
];

// How it works steps
const steps = [
  {
    icon: Bot,
    title: "Set Up Your Agent",
    description: "Choose a voice, customize the script, and configure your business rules in minutes.",
  },
  {
    icon: PhoneCall,
    title: "Forward Your Calls",
    description: "Route your business line to ViVpod. We answer every call like a trained receptionist.",
  },
  {
    icon: Zap,
    title: "Capture Every Lead",
    description: "Get instant notifications, CRM updates, and call summaries. Never miss an opportunity.",
  },
];

// Use cases / Industries
const industries = [
  { icon: Wrench, title: "Handyman", description: "Book service calls, dispatch technicians", href: "/industries/handyman" },
  { icon: Stethoscope, title: "Healthcare", description: "Schedule appointments, handle inquiries", href: "/industries/healthcare" },
  { icon: Scale, title: "Legal", description: "Screen clients, book consultations", href: "/industries/legal" },
  { icon: HomeIcon, title: "Real Estate", description: "Qualify leads, schedule viewings", href: "/industries/real-estate" },
  { icon: UtensilsCrossed, title: "Restaurant", description: "Take reservations, answer questions", href: "/industries/restaurant" },
  { icon: Building2, title: "Property Mgmt", description: "Handle tenant calls, maintenance requests", href: "/industries/property" },
];

// Features
const features = [
  { icon: Clock, title: "24/7 Availability", description: "Never miss a call, day or night. Your AI agent works around the clock." },
  { icon: Calendar, title: "Appointment Booking", description: "Seamlessly schedule appointments directly into your calendar." },
  { icon: Filter, title: "Spam Filtering", description: "Intelligent call screening blocks spam and prioritizes real customers." },
  { icon: MessageSquare, title: "Call Transfers", description: "Warm transfer to your team when human touch is needed." },
  { icon: FileText, title: "Call Summaries", description: "Get detailed transcripts and AI-generated summaries after each call." },
  { icon: Shield, title: "Compliance Ready", description: "HIPAA-friendly, with opt-out handling and audit logs." },
];

// Integrations
const integrations = [
  { name: "Telegram", icon: Send, status: "live" },
  { name: "Email", icon: Mail, status: "live" },
  { name: "Google Calendar", icon: Calendar, status: "live" },
  { name: "HubSpot", icon: Users, status: "live" },
  { name: "Salesforce", icon: BarChart3, status: "coming" },
  { name: "Zapier", icon: Zap, status: "coming" },
];

// Pricing tiers
const pricingTiers = [
  {
    name: "Starter",
    price: "$99",
    period: "/month",
    description: "Perfect for small businesses",
    features: [
      "100 minutes included",
      "1 AI agent",
      "Basic call routing",
      "Email notifications",
      "Call transcripts",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Pro",
    price: "$299",
    period: "/month",
    description: "For growing businesses",
    features: [
      "500 minutes included",
      "3 AI agents",
      "Advanced call routing",
      "CRM integrations",
      "Priority support",
      "Custom voice",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations",
    features: [
      "Unlimited minutes",
      "Unlimited agents",
      "White-label option",
      "Dedicated support",
      "SLA guarantee",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

// Testimonials
const testimonials = [
  {
    quote: "ViVpod transformed our business. We went from missing 40% of calls to capturing every single lead.",
    author: "Mike Johnson",
    role: "Owner, Johnson Plumbing",
    rating: 5,
  },
  {
    quote: "The AI sounds so natural, our patients often don't realize they're talking to a virtual receptionist.",
    author: "Dr. Sarah Chen",
    role: "Medical Director, CityHealth Clinic",
    rating: 5,
  },
  {
    quote: "Setup took 15 minutes. Now we have 24/7 coverage without hiring night staff. Game changer.",
    author: "David Martinez",
    role: "Managing Partner, Martinez Law",
    rating: 5,
  },
];

// FAQ items
const faqItems = [
  {
    question: "How natural does the AI voice sound?",
    answer: "Our AI uses state-of-the-art voice synthesis that's virtually indistinguishable from human speech. Most callers don't realize they're speaking with an AI.",
  },
  {
    question: "Can I customize what the AI says?",
    answer: "Absolutely. You have full control over greetings, responses, FAQs, and call handling rules. We also provide industry-specific templates to get you started quickly.",
  },
  {
    question: "What happens if the AI can't handle a call?",
    answer: "The AI can seamlessly transfer calls to your team when needed. You set the rules for when transfers happen—complex issues, VIP clients, or specific requests.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! Every new account gets 30 minutes of free call time to test the service. No credit card required to start.",
  },
  {
    question: "How do integrations work?",
    answer: "We integrate with popular CRMs, calendars, and messaging platforms. Call data, appointments, and leads sync automatically to your existing tools.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          {/* Background gradient */}
          <div className="absolute inset-0 gradient-bg-subtle -z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.1),transparent_50%)] -z-10" />

          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Copy */}
              <div className="text-center lg:text-left">
                <Badge variant="secondary" className="mb-4">
                  🎉 30 Minutes Free Trial
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-balance">
                  AI Voice Agent That{" "}
                  <span className="gradient-text">Never Misses a Call</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                  24/7 AI receptionist for any business. Capture leads, book appointments, 
                  and delight customers—even at 3 AM.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/demo">
                    <Button size="lg" className="gradient-bg text-white hover:opacity-90 w-full sm:w-auto">
                      Get a Demo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      See Pricing
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right: Vapi Widget */}
              <div className="lg:pl-8">
                <VapiWidget />
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Strip */}
        <section className="py-8 border-y bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {metrics.map((metric) => (
                <div key={metric.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call Examples Section */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                See How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real conversation examples across different industries. 
                Your AI agent handles calls just like a trained professional.
              </p>
            </div>
            <CallExamples />
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Up and Running in Minutes
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                No complex setup. No coding required. Get your AI receptionist working today.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={step.title} className="relative">
                  <Card className="h-full text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-bg flex items-center justify-center">
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{step.description}</CardDescription>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases / Industries */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Built for Every Business
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From solo contractors to enterprise teams. ViVpod adapts to your industry.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((industry) => (
                <Link key={industry.title} href={industry.href}>
                  <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer group">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                        <industry.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{industry.title}</CardTitle>
                      <CardDescription>{industry.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/industries">
                <Button variant="outline" size="lg">
                  View All Industries
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything You Need
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Powerful features that make your AI receptionist indispensable.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <Card key={feature.title} className="h-full">
                  <CardHeader>
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                      <feature.icon className="w-5 h-5 text-accent" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Connects to Your Tools
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Sync calls, leads, and appointments with the platforms you already use.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {integrations.map((integration) => (
                <Card key={integration.name} className="text-center hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-muted flex items-center justify-center">
                      <integration.icon className="w-6 h-6 text-foreground" />
                    </div>
                    <p className="font-medium text-sm">{integration.name}</p>
                    <Badge variant={integration.status === "live" ? "default" : "secondary"} className="mt-2 text-xs">
                      {integration.status === "live" ? "Live" : "Coming Soon"}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20 md:py-28 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                💰 30 Minutes Free Trial
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Start free. Scale as you grow. No hidden fees.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricingTiers.map((tier) => (
                <Card
                  key={tier.name}
                  className={`relative h-full ${tier.popular ? "border-primary shadow-lg scale-105" : ""}`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="gradient-bg text-white">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                    <div className="pt-4">
                      <span className="text-4xl font-bold">{tier.price}</span>
                      <span className="text-muted-foreground">{tier.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${tier.popular ? "gradient-bg text-white hover:opacity-90" : ""}`}
                      variant={tier.popular ? "default" : "outline"}
                    >
                      {tier.cta}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Loved by Businesses
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See what our customers have to say about ViVpod.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.author} className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-foreground mb-4 italic">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="container max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <Card key={item.question}>
                  <CardHeader>
                    <CardTitle className="text-lg">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Security & Compliance */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Enterprise-Grade Security
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Your data is protected with industry-leading security measures. 
                  We're built for businesses that take compliance seriously.
                </p>
                <ul className="space-y-4">
                  {[
                    "End-to-end encryption for all calls",
                    "SOC 2 Type II compliant infrastructure",
                    "HIPAA-friendly for healthcare",
                    "Automatic opt-out handling",
                    "Complete audit logs",
                    "Data residency options",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl gradient-bg-subtle border flex items-center justify-center">
                  <Shield className="w-32 h-32 text-primary/20" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-28 gradient-bg">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Never Miss a Call Again?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses using ViVpod to capture more leads and delight customers 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Get a Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white/10">
                  See Pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t md:hidden z-50">
        <Link href="/demo">
          <Button className="w-full gradient-bg text-white">
            <Phone className="w-4 h-4 mr-2" />
            Get a Demo
          </Button>
        </Link>
      </div>
    </div>
  );
}
