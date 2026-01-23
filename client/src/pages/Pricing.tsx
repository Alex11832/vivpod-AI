import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const pricingTiers = [
  {
    name: "Starter",
    price: "$99",
    period: "/month",
    description: "Perfect for small businesses getting started",
    features: [
      "100 minutes included",
      "1 AI agent",
      "Basic call routing",
      "Email notifications",
      "Call transcripts",
      "Standard support",
    ],
    notIncluded: [
      "CRM integrations",
      "Custom voice",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Pro",
    price: "$299",
    period: "/month",
    description: "For growing businesses that need more",
    features: [
      "500 minutes included",
      "3 AI agents",
      "Advanced call routing",
      "CRM integrations",
      "Custom voice selection",
      "Priority support",
      "Call analytics",
      "Telegram & Calendar sync",
    ],
    notIncluded: [],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with custom needs",
    features: [
      "Unlimited minutes",
      "Unlimited agents",
      "White-label option",
      "Dedicated account manager",
      "SLA guarantee",
      "Custom integrations",
      "On-premise option",
      "Training & onboarding",
    ],
    notIncluded: [],
    cta: "Contact Sales",
    popular: false,
  },
];

const faqItems = [
  {
    question: "What counts as a minute?",
    answer: "A minute is counted as any time the AI agent is actively on a call with a customer. Hold time and transfers to your team don't count against your minutes.",
  },
  {
    question: "Can I change plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.",
  },
  {
    question: "What happens if I exceed my minutes?",
    answer: "You'll be notified when you reach 80% of your limit. Additional minutes are billed at $0.15/minute for Starter and $0.12/minute for Pro.",
  },
  {
    question: "Is there a contract?",
    answer: "No long-term contracts. All plans are month-to-month and you can cancel anytime.",
  },
  {
    question: "Do you offer annual billing?",
    answer: "Yes! Save 20% with annual billing. Contact us for annual pricing.",
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 gradient-bg-subtle">
          <div className="container text-center">
            <Badge variant="secondary" className="mb-4">
              💰 30 Minutes Free Trial
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start free. Scale as you grow. No hidden fees, no surprises.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingTiers.map((tier) => (
                <Card
                  key={tier.name}
                  className={`relative h-full flex flex-col ${
                    tier.popular ? "border-primary shadow-xl scale-105 z-10" : ""
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="gradient-bg text-white px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <CardDescription className="text-base">{tier.description}</CardDescription>
                    <div className="pt-6 pb-2">
                      <span className="text-5xl font-bold">{tier.price}</span>
                      <span className="text-muted-foreground text-lg">{tier.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-3 mb-8 flex-1">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={tier.name === "Enterprise" ? "/contact" : "/demo"}>
                      <Button
                        className={`w-full ${
                          tier.popular ? "gradient-bg text-white hover:opacity-90" : ""
                        }`}
                        variant={tier.popular ? "default" : "outline"}
                        size="lg"
                      >
                        {tier.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <Card key={item.question}>
                  <CardHeader className="pb-2">
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

        {/* CTA */}
        <section className="py-16 md:py-24 gradient-bg">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Try ViVpod free for 30 minutes. No credit card required.
            </p>
            <Link href="/demo">
              <Button size="lg" variant="secondary">
                Start Your Free Trial
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
