import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16 md:py-24">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2024</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground mb-4">
                ViVpod ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI voice agent services and website at vivpod.com.
              </p>
              <p className="text-muted-foreground">
                Please read this privacy policy carefully. By using our services, you consent to the practices described in this policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-medium mb-3">2.1 Information You Provide</h3>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li>Account registration information (name, email, phone number, company name)</li>
                <li>Payment and billing information</li>
                <li>Business configuration data (scripts, greetings, call handling rules)</li>
                <li>Communications with our support team</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">2.2 Information Collected Automatically</h3>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li>Call recordings and transcripts (when enabled)</li>
                <li>Call metadata (duration, timestamps, caller information)</li>
                <li>Usage data and analytics</li>
                <li>Device and browser information</li>
                <li>IP addresses and location data</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">2.3 Information from Third Parties</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Integration data from connected services (CRM, calendar, etc.)</li>
                <li>Information from business partners and service providers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">We use the collected information to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide and maintain our AI voice agent services</li>
                <li>Process calls and deliver call summaries</li>
                <li>Improve and personalize your experience</li>
                <li>Process payments and manage your account</li>
                <li>Send service-related communications</li>
                <li>Provide customer support</li>
                <li>Analyze usage patterns to improve our services</li>
                <li>Comply with legal obligations</li>
                <li>Protect against fraud and unauthorized access</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Data Sharing and Disclosure</h2>
              <p className="text-muted-foreground mb-4">We may share your information with:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Service Providers:</strong> Third parties that help us operate our services (hosting, payment processing, analytics)</li>
                <li><strong>Integration Partners:</strong> When you connect third-party services (CRM, calendar)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement appropriate technical and organizational measures to protect your information, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and audits</li>
                <li>Access controls and authentication measures</li>
                <li>Employee training on data protection</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
              <p className="text-muted-foreground">
                We retain your information for as long as necessary to provide our services and fulfill the purposes described in this policy. Call recordings and transcripts are retained according to your account settings and applicable legal requirements. You may request deletion of your data at any time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Your Rights and Choices</h2>
              <p className="text-muted-foreground mb-4">Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Access and receive a copy of your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Object to or restrict certain processing</li>
                <li>Data portability</li>
                <li>Withdraw consent where applicable</li>
                <li>Opt-out of marketing communications</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                To exercise these rights, contact us at contact@vivpod.com.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Cookies and Tracking</h2>
              <p className="text-muted-foreground">
                We use cookies and similar technologies to enhance your experience, analyze usage, and deliver personalized content. You can manage cookie preferences through your browser settings. For more details, see our cookie consent banner when you first visit our site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. International Data Transfers</h2>
              <p className="text-muted-foreground">
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers in compliance with applicable data protection laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on our website and updating the "Last updated" date. Your continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="mt-4 text-muted-foreground">
                <p><strong>ViVpod</strong></p>
                <p>Email: contact@vivpod.com</p>
                <p>Website: vivpod.com</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
