import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

const blogPosts = [
  {
    slug: "ai-receptionist-small-business",
    title: "Why Every Small Business Needs an AI Receptionist in 2024",
    excerpt: "Discover how AI voice agents are leveling the playing field for small businesses, enabling 24/7 customer service without the overhead of a full-time receptionist.",
    category: "Business",
    date: "January 15, 2024",
    readTime: "5 min read",
  },
  {
    slug: "missed-calls-cost-business",
    title: "The Hidden Cost of Missed Calls: What You're Really Losing",
    excerpt: "Research shows that 85% of callers who can't reach a business won't call back. Learn how missed calls impact your bottom line and what you can do about it.",
    category: "Insights",
    date: "January 10, 2024",
    readTime: "4 min read",
  },
  {
    slug: "ai-voice-technology-2024",
    title: "The State of AI Voice Technology in 2024",
    excerpt: "From GPT-4 to advanced speech synthesis, explore the latest breakthroughs making AI voice agents virtually indistinguishable from human receptionists.",
    category: "Technology",
    date: "January 5, 2024",
    readTime: "7 min read",
  },
  {
    slug: "healthcare-ai-receptionist",
    title: "HIPAA-Compliant AI: Transforming Healthcare Communication",
    excerpt: "How medical practices are using AI receptionists to improve patient experience while maintaining strict compliance with healthcare regulations.",
    category: "Healthcare",
    date: "December 28, 2023",
    readTime: "6 min read",
  },
  {
    slug: "setup-ai-agent-guide",
    title: "Complete Guide: Setting Up Your AI Voice Agent",
    excerpt: "A step-by-step walkthrough of configuring your ViVpod AI agent, from choosing a voice to customizing call handling rules.",
    category: "Tutorial",
    date: "December 20, 2023",
    readTime: "8 min read",
  },
  {
    slug: "customer-service-automation",
    title: "The Future of Customer Service: Human + AI Collaboration",
    excerpt: "Why the best customer service combines AI efficiency with human empathy, and how to find the right balance for your business.",
    category: "Strategy",
    date: "December 15, 2023",
    readTime: "5 min read",
  },
];

const categoryColors: Record<string, string> = {
  Business: "bg-blue-100 text-blue-800",
  Insights: "bg-purple-100 text-purple-800",
  Technology: "bg-green-100 text-green-800",
  Healthcare: "bg-red-100 text-red-800",
  Tutorial: "bg-yellow-100 text-yellow-800",
  Strategy: "bg-orange-100 text-orange-800",
};

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 gradient-bg-subtle">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              ViVpod Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Insights, guides, and news about AI voice technology and business communication.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={categoryColors[post.category] || "bg-gray-100 text-gray-800"}>
                          {post.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{post.readTime}</span>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base mb-4">
                        {post.excerpt}
                      </CardDescription>
                      <p className="text-sm text-muted-foreground">{post.date}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container text-center max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get the latest insights on AI voice technology and business communication delivered to your inbox.
            </p>
            <p className="text-muted-foreground">
              Subscribe feature coming soon. Follow us on social media for updates.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
