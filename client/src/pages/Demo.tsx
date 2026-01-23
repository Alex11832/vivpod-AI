import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VapiWidget } from "@/components/VapiWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "wouter";

const industries = [
  "Handyman & Home Services",
  "Healthcare & Medical",
  "Legal Services",
  "Real Estate",
  "Restaurant & Food Service",
  "Cleaning Services",
  "Property Management",
  "Other",
];

export default function Demo() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    toast.success("Demo request submitted! We'll contact you shortly.");
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 gradient-bg-subtle">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Form or Success */}
              <div>
                {submitted ? (
                  <Card className="text-center p-8">
                    <CardContent>
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
                      <p className="text-muted-foreground mb-6">
                        Your demo request has been submitted. Our team will contact you within 24 hours to schedule your personalized demo.
                      </p>
                      <p className="text-sm text-muted-foreground mb-6">
                        In the meantime, try our live AI agent demo on the right →
                      </p>
                      <Link href="/">
                        <Button variant="outline">
                          Back to Home
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">Get Your Free Demo</CardTitle>
                      <CardDescription className="text-base">
                        See how ViVpod can transform your business communication. Fill out the form and we'll schedule a personalized demo.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input id="firstName" name="firstName" required placeholder="John" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name *</Label>
                            <Input id="lastName" name="lastName" required placeholder="Doe" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Work Email *</Label>
                          <Input id="email" name="email" type="email" required placeholder="john@company.com" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input id="phone" name="phone" type="tel" required placeholder="+1 (555) 123-4567" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="company">Company Name *</Label>
                          <Input id="company" name="company" required placeholder="Your Company" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="industry">Industry *</Label>
                          <Select name="industry" required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your industry" />
                            </SelectTrigger>
                            <SelectContent>
                              {industries.map((industry) => (
                                <SelectItem key={industry} value={industry}>
                                  {industry}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <Button type="submit" className="w-full gradient-bg text-white" size="lg" disabled={isSubmitting}>
                          {isSubmitting ? "Submitting..." : "Request Demo"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>

                        <p className="text-xs text-center text-muted-foreground">
                          By submitting, you agree to our{" "}
                          <Link href="/privacy" className="underline hover:text-primary">
                            Privacy Policy
                          </Link>{" "}
                          and{" "}
                          <Link href="/terms" className="underline hover:text-primary">
                            Terms of Service
                          </Link>
                          .
                        </p>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right: Live Demo */}
              <div className="lg:pl-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">Try It Now</h2>
                  <p className="text-muted-foreground">
                    Experience our AI agent live. Click the button below to start a demo call.
                  </p>
                </div>
                <VapiWidget />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              What You'll Get in Your Demo
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                "Personalized walkthrough of ViVpod features",
                "Custom AI agent configured for your industry",
                "Live demonstration with your business scenario",
                "Pricing and implementation timeline",
              ].map((benefit) => (
                <Card key={benefit}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
