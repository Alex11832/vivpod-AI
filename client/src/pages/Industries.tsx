import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Wrench, Stethoscope, Scale, Home, UtensilsCrossed, Building2, Car, Scissors, Sparkles, Pill, GraduationCap, Dumbbell } from "lucide-react";
import { Link } from "wouter";

const industries = [
  {
    slug: "handyman",
    icon: Wrench,
    title: "Handyman & Home Services",
    description: "Book service calls, dispatch technicians, and capture emergency requests 24/7.",
    useCases: ["TV mounting", "Furniture assembly", "Plumbing", "Electrical", "HVAC"],
  },
  {
    slug: "healthcare",
    icon: Stethoscope,
    title: "Healthcare & Medical",
    description: "Schedule appointments, handle patient inquiries, and manage prescription refills.",
    useCases: ["Clinics", "Dental offices", "Pharmacies", "Mental health", "Veterinary"],
  },
  {
    slug: "legal",
    icon: Scale,
    title: "Legal Services",
    description: "Screen potential clients, book consultations, and handle intake calls professionally.",
    useCases: ["Law firms", "Legal aid", "Immigration", "Personal injury", "Family law"],
  },
  {
    slug: "real-estate",
    icon: Home,
    title: "Real Estate",
    description: "Qualify leads, schedule property viewings, and answer listing inquiries.",
    useCases: ["Agents", "Property management", "Rentals", "Commercial", "Mortgage"],
  },
  {
    slug: "restaurant",
    icon: UtensilsCrossed,
    title: "Restaurant & Food Service",
    description: "Take reservations, handle takeout orders, and answer menu questions.",
    useCases: ["Fine dining", "Casual restaurants", "Cafes", "Catering", "Food trucks"],
  },
  {
    slug: "property",
    icon: Building2,
    title: "Property Management",
    description: "Handle tenant calls, maintenance requests, and emergency dispatching.",
    useCases: ["Apartments", "HOAs", "Commercial properties", "Vacation rentals"],
  },
  {
    slug: "automotive",
    icon: Car,
    title: "Automotive",
    description: "Schedule service appointments, handle parts inquiries, and manage recalls.",
    useCases: ["Dealerships", "Auto repair", "Body shops", "Tire shops", "Detailing"],
  },
  {
    slug: "beauty",
    icon: Scissors,
    title: "Beauty & Wellness",
    description: "Book appointments, manage cancellations, and handle service inquiries.",
    useCases: ["Salons", "Spas", "Barbershops", "Nail studios", "Med spas"],
  },
  {
    slug: "cleaning",
    icon: Sparkles,
    title: "Cleaning Services",
    description: "Schedule cleanings, provide quotes, and manage recurring appointments.",
    useCases: ["House cleaning", "Commercial cleaning", "Carpet cleaning", "Window washing"],
  },
  {
    slug: "pharmacy",
    icon: Pill,
    title: "Pharmacy",
    description: "Handle prescription refills, check availability, and answer medication questions.",
    useCases: ["Retail pharmacy", "Compounding", "Specialty pharmacy", "Mail order"],
  },
  {
    slug: "education",
    icon: GraduationCap,
    title: "Education",
    description: "Handle enrollment inquiries, schedule tours, and answer program questions.",
    useCases: ["Schools", "Tutoring", "Training centers", "Online courses"],
  },
  {
    slug: "fitness",
    icon: Dumbbell,
    title: "Fitness & Sports",
    description: "Book classes, handle membership inquiries, and manage personal training.",
    useCases: ["Gyms", "Studios", "Personal training", "Sports facilities"],
  },
];

export default function Industries() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 gradient-bg-subtle">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Built for Every Industry
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From solo contractors to enterprise teams, ViVpod adapts to your specific business needs with industry-tailored AI agents.
            </p>
          </div>
        </section>

        {/* Industries Grid */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((industry) => (
                <Link key={industry.slug} href={`/industries/${industry.slug}`}>
                  <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer group">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <industry.icon className="w-7 h-7 text-primary" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {industry.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {industry.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {industry.useCases.slice(0, 3).map((useCase) => (
                          <span
                            key={useCase}
                            className="text-xs bg-muted px-2 py-1 rounded-full"
                          >
                            {useCase}
                          </span>
                        ))}
                        {industry.useCases.length > 3 && (
                          <span className="text-xs text-muted-foreground">
                            +{industry.useCases.length - 3} more
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 gradient-bg">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Don't See Your Industry?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              ViVpod works for any business that takes phone calls. Contact us for a custom solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo">
                <Button size="lg" variant="secondary">
                  Get a Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
