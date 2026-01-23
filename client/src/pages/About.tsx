import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Target, Heart, Zap, Users } from "lucide-react";
import { Link } from "wouter";

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We believe every business deserves professional phone coverage. Our mission is to make AI-powered communication accessible to companies of all sizes.",
  },
  {
    icon: Heart,
    title: "Customer-First",
    description: "Your success is our success. We're obsessed with making sure our AI agents deliver exceptional experiences for your callers.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We're constantly pushing the boundaries of what's possible with voice AI, bringing you the latest advances in natural language processing.",
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We don't just provide software—we partner with you to ensure ViVpod works perfectly for your unique business needs.",
  },
];

const stats = [
  { value: "2023", label: "Founded" },
  { value: "50K+", label: "Calls Handled" },
  { value: "500+", label: "Happy Customers" },
  { value: "99.9%", label: "Uptime" },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 gradient-bg-subtle">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About ViVpod
              </h1>
              <p className="text-xl text-muted-foreground">
                We're building the future of business communication. Our AI voice agents help companies of all sizes deliver exceptional customer experiences, 24/7.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-b">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="prose prose-lg text-muted-foreground">
                <p className="mb-4">
                  ViVpod was born from a simple observation: small businesses were losing customers because they couldn't answer every phone call. Whether it was a plumber on a job site, a doctor with a patient, or a lawyer in court—missed calls meant missed opportunities.
                </p>
                <p className="mb-4">
                  We set out to build an AI receptionist that could handle calls with the same care and professionalism as a trained human. Not a clunky IVR system, but a genuine conversational AI that understands context, handles complex requests, and represents your business with excellence.
                </p>
                <p className="mb-4">
                  Today, ViVpod serves hundreds of businesses across dozens of industries. From solo contractors to multi-location enterprises, our AI agents handle thousands of calls every day—booking appointments, capturing leads, and delighting customers around the clock.
                </p>
                <p>
                  We're just getting started. Our team is constantly improving our AI, adding new features, and expanding our integrations. We're committed to making ViVpod the most powerful and easiest-to-use AI receptionist on the market.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {values.map((value) => (
                <Card key={value.title}>
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 md:py-24">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Based in New York</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Our team is headquartered in New York City, building technology that helps businesses across the globe communicate better.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 gradient-bg">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Join Us?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Experience the future of business communication with ViVpod.
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
