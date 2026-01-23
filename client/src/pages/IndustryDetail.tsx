import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, Phone, Calendar, MessageSquare, Clock, Wrench, Stethoscope, Scale, Home, UtensilsCrossed, Building2, Sparkles, Pill } from "lucide-react";
import { Link, useParams } from "wouter";

const industryData: Record<string, {
  icon: any;
  title: string;
  tagline: string;
  description: string;
  benefits: string[];
  useCases: { title: string; description: string }[];
  testimonial?: { quote: string; author: string; role: string };
}> = {
  handyman: {
    icon: Wrench,
    title: "Handyman & Home Services",
    tagline: "Never Miss a Service Call Again",
    description: "Your AI receptionist handles emergency calls, books appointments, and dispatches technicians—24/7. Perfect for plumbers, electricians, HVAC techs, and general contractors.",
    benefits: [
      "Capture after-hours emergency calls",
      "Book and schedule service appointments",
      "Dispatch technicians based on availability",
      "Qualify leads and estimate job scope",
      "Send appointment reminders",
      "Handle rescheduling and cancellations",
    ],
    useCases: [
      { title: "TV Mounting", description: "Schedule installations, confirm TV size and mount type, collect address details." },
      { title: "Furniture Assembly", description: "Book assembly appointments, note furniture types, estimate time needed." },
      { title: "Plumbing Emergency", description: "Triage urgent vs. routine calls, dispatch on-call technicians for emergencies." },
      { title: "HVAC Service", description: "Schedule maintenance, handle AC/heating emergencies, book seasonal tune-ups." },
    ],
    testimonial: {
      quote: "ViVpod captures calls I used to miss while on jobs. My bookings are up 40% since I started using it.",
      author: "Mike Thompson",
      role: "Owner, Thompson Home Services",
    },
  },
  healthcare: {
    icon: Stethoscope,
    title: "Healthcare & Medical",
    tagline: "Patient-First Communication, 24/7",
    description: "HIPAA-friendly AI receptionist for clinics, dental offices, and medical practices. Handle appointments, prescription refills, and patient inquiries with care.",
    benefits: [
      "HIPAA-compliant call handling",
      "Schedule and confirm appointments",
      "Handle prescription refill requests",
      "Triage urgent vs. routine calls",
      "Send appointment reminders",
      "Manage patient callbacks",
    ],
    useCases: [
      { title: "Appointment Scheduling", description: "Book new patient visits, follow-ups, and specialist referrals." },
      { title: "Prescription Refills", description: "Collect refill requests and route to pharmacy for processing." },
      { title: "After-Hours Triage", description: "Screen urgent calls and route emergencies to on-call providers." },
      { title: "Insurance Verification", description: "Collect insurance information before appointments." },
    ],
    testimonial: {
      quote: "Our patients love the quick response times. The AI handles routine calls so our staff can focus on in-office care.",
      author: "Dr. Sarah Chen",
      role: "Medical Director, CityHealth Clinic",
    },
  },
  legal: {
    icon: Scale,
    title: "Legal Services",
    tagline: "Professional Intake, Every Time",
    description: "Screen potential clients, book consultations, and handle intake calls with the professionalism your firm demands. Perfect for law offices of all sizes.",
    benefits: [
      "Professional client screening",
      "Book consultation appointments",
      "Collect case details for intake",
      "Route calls to appropriate attorneys",
      "Handle after-hours inquiries",
      "Maintain client confidentiality",
    ],
    useCases: [
      { title: "New Client Intake", description: "Gather case details, contact information, and schedule initial consultations." },
      { title: "Consultation Booking", description: "Schedule meetings with appropriate attorneys based on practice area." },
      { title: "Case Status Inquiries", description: "Handle routine status questions and route complex issues to staff." },
      { title: "Emergency Legal Matters", description: "Identify urgent matters and connect clients with on-call attorneys." },
    ],
    testimonial: {
      quote: "The AI screens calls exactly like our best paralegal would. We're capturing more qualified leads than ever.",
      author: "David Martinez",
      role: "Managing Partner, Martinez Law",
    },
  },
  "real-estate": {
    icon: Home,
    title: "Real Estate",
    tagline: "Capture Every Lead, Day or Night",
    description: "Qualify buyers, schedule property viewings, and answer listing questions around the clock. Never let a hot lead go cold.",
    benefits: [
      "Qualify buyer and seller leads",
      "Schedule property viewings",
      "Answer listing questions",
      "Capture contact information",
      "Route leads to appropriate agents",
      "Handle rental inquiries",
    ],
    useCases: [
      { title: "Property Inquiries", description: "Answer questions about listings, pricing, and availability." },
      { title: "Viewing Scheduling", description: "Book property tours and open house visits." },
      { title: "Lead Qualification", description: "Assess buyer readiness, budget, and timeline." },
      { title: "Rental Applications", description: "Collect initial information for rental inquiries." },
    ],
  },
  restaurant: {
    icon: UtensilsCrossed,
    title: "Restaurant & Food Service",
    tagline: "Every Reservation, Every Order",
    description: "Take reservations, handle takeout orders, and answer menu questions. Keep your kitchen focused while your AI handles the phones.",
    benefits: [
      "Take and confirm reservations",
      "Handle takeout and delivery orders",
      "Answer menu and allergy questions",
      "Manage waitlist during busy times",
      "Process large party bookings",
      "Handle catering inquiries",
    ],
    useCases: [
      { title: "Table Reservations", description: "Book tables, note special requests, and manage party sizes." },
      { title: "Takeout Orders", description: "Take orders, confirm details, and provide pickup times." },
      { title: "Menu Questions", description: "Answer questions about dishes, ingredients, and dietary options." },
      { title: "Event Catering", description: "Handle catering inquiries and schedule consultations." },
    ],
  },
  cleaning: {
    icon: Sparkles,
    title: "Cleaning Services",
    tagline: "Book More Cleanings, Automatically",
    description: "Schedule house cleanings, provide instant quotes, and manage recurring appointments. Your AI receptionist keeps your calendar full.",
    benefits: [
      "Instant quote generation",
      "Schedule one-time and recurring cleanings",
      "Handle rescheduling requests",
      "Collect property details",
      "Manage cleaning crew dispatch",
      "Send appointment reminders",
    ],
    useCases: [
      { title: "House Cleaning", description: "Book standard, deep, or move-out cleanings with accurate quotes." },
      { title: "Commercial Cleaning", description: "Schedule office and commercial space cleanings." },
      { title: "Recurring Service", description: "Set up weekly, bi-weekly, or monthly cleaning schedules." },
      { title: "Special Requests", description: "Handle carpet cleaning, window washing, and other add-ons." },
    ],
  },
  pharmacy: {
    icon: Pill,
    title: "Pharmacy",
    tagline: "Prescriptions Made Simple",
    description: "Handle refill requests, check medication availability, and answer pharmacy questions. Keep your pharmacists focused on patient care.",
    benefits: [
      "Process refill requests",
      "Check medication availability",
      "Answer pharmacy hours and location questions",
      "Handle insurance inquiries",
      "Send refill ready notifications",
      "Route complex questions to pharmacists",
    ],
    useCases: [
      { title: "Prescription Refills", description: "Collect prescription numbers and process refill requests." },
      { title: "Medication Availability", description: "Check stock and provide pickup time estimates." },
      { title: "Transfer Requests", description: "Handle prescription transfers from other pharmacies." },
      { title: "Insurance Questions", description: "Answer basic coverage and copay questions." },
    ],
  },
  property: {
    icon: Building2,
    title: "Property Management",
    tagline: "Tenant Support, Around the Clock",
    description: "Handle maintenance requests, tenant inquiries, and emergency dispatching. Keep your properties running smoothly 24/7.",
    benefits: [
      "Log maintenance requests",
      "Dispatch emergency repairs",
      "Handle tenant inquiries",
      "Process rent payment questions",
      "Schedule property viewings",
      "Manage vendor coordination",
    ],
    useCases: [
      { title: "Maintenance Requests", description: "Log issues, assess urgency, and dispatch appropriate vendors." },
      { title: "Emergency Response", description: "Handle after-hours emergencies and dispatch on-call technicians." },
      { title: "Leasing Inquiries", description: "Answer questions about available units and schedule tours." },
      { title: "Rent Questions", description: "Handle payment inquiries and direct to appropriate resources." },
    ],
  },
};

export default function IndustryDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "handyman";
  const industry = industryData[slug] || industryData.handyman;
  const Icon = industry.icon;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 gradient-bg-subtle">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl gradient-bg flex items-center justify-center">
                <Icon className="w-10 h-10 text-white" />
              </div>
              <Badge variant="secondary" className="mb-4">
                Industry Solution
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {industry.title}
              </h1>
              <p className="text-xl text-primary font-medium mb-4">
                {industry.tagline}
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                {industry.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/demo">
                  <Button size="lg" className="gradient-bg text-white">
                    Get a Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline">
                    See Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              How ViVpod Helps {industry.title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {industry.benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              Common Use Cases
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {industry.useCases.map((useCase) => (
                <Card key={useCase.title}>
                  <CardHeader>
                    <CardTitle className="text-lg">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {useCase.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        {industry.testimonial && (
          <section className="py-16 md:py-24">
            <div className="container max-w-3xl">
              <Card className="text-center p-8">
                <CardContent>
                  <p className="text-xl italic mb-6">
                    "{industry.testimonial.quote}"
                  </p>
                  <p className="font-semibold">{industry.testimonial.author}</p>
                  <p className="text-muted-foreground">{industry.testimonial.role}</p>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 md:py-24 gradient-bg">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your {industry.title.split(" ")[0]} Business?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Start your free 30-minute trial today. No credit card required.
            </p>
            <Link href="/demo">
              <Button size="lg" variant="secondary">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
