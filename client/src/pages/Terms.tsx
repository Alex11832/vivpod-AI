import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16 md:py-24">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2024</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground">
                By accessing or using ViVpod's services, website, and AI voice agent platform ("Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use our Services. These Terms constitute a legally binding agreement between you and ViVpod.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Description of Services</h2>
              <p className="text-muted-foreground mb-4">
                ViVpod provides AI-powered voice agent services that enable businesses to automate phone call handling, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Automated call answering and routing</li>
                <li>Appointment scheduling and management</li>
                <li>Lead capture and qualification</li>
                <li>Call transcription and summarization</li>
                <li>Integration with third-party business tools</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Account Registration</h2>
              <p className="text-muted-foreground mb-4">
                To use our Services, you must create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Promptly update any changes to your information</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
              <p className="text-muted-foreground mb-4">You agree not to use our Services to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit harmful, fraudulent, or deceptive content</li>
                <li>Harass, abuse, or harm others</li>
                <li>Interfere with or disrupt our Services</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated means to access our Services without permission</li>
                <li>Engage in telemarketing or spam activities</li>
                <li>Misrepresent your identity or affiliation</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Payment Terms</h2>
              <p className="text-muted-foreground mb-4">
                <strong>5.1 Fees:</strong> You agree to pay all fees associated with your selected plan. Fees are billed in advance on a monthly or annual basis.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>5.2 Overage:</strong> Usage exceeding your plan limits will be billed at the overage rates specified in your plan.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>5.3 Payment Methods:</strong> We accept major credit cards and other payment methods as displayed during checkout.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>5.4 Refunds:</strong> Fees are non-refundable except as required by law or as expressly stated in these Terms.
              </p>
              <p className="text-muted-foreground">
                <strong>5.5 Price Changes:</strong> We may modify pricing with 30 days' notice. Continued use after price changes constitutes acceptance.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Free Trial</h2>
              <p className="text-muted-foreground">
                New accounts may be eligible for a free trial period. Free trial terms, including duration and included minutes, are specified at signup. We reserve the right to modify or discontinue free trials at any time. At the end of the trial, your account will convert to a paid subscription unless cancelled.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
              <p className="text-muted-foreground mb-4">
                <strong>7.1 Our Property:</strong> ViVpod and its licensors own all rights to the Services, including software, designs, trademarks, and content. You may not copy, modify, or distribute our intellectual property without permission.
              </p>
              <p className="text-muted-foreground">
                <strong>7.2 Your Content:</strong> You retain ownership of content you provide (scripts, configurations, business data). You grant us a license to use this content to provide the Services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Data and Privacy</h2>
              <p className="text-muted-foreground">
                Your use of our Services is subject to our Privacy Policy, which describes how we collect, use, and protect your information. By using our Services, you consent to our data practices as described in the Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Call Recording Consent</h2>
              <p className="text-muted-foreground">
                You are responsible for complying with all applicable laws regarding call recording and consent. This includes informing callers that calls may be recorded and obtaining any required consent. ViVpod provides tools to help with compliance, but you are solely responsible for legal compliance in your jurisdiction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Service Availability</h2>
              <p className="text-muted-foreground">
                We strive to maintain high availability but do not guarantee uninterrupted service. We may perform maintenance, updates, or modifications that temporarily affect availability. We will provide reasonable notice of planned maintenance when possible.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>OUR SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND</li>
                <li>WE ARE NOT LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES</li>
                <li>OUR TOTAL LIABILITY IS LIMITED TO THE AMOUNT YOU PAID US IN THE PAST 12 MONTHS</li>
                <li>WE ARE NOT RESPONSIBLE FOR THIRD-PARTY SERVICES OR INTEGRATIONS</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">12. Indemnification</h2>
              <p className="text-muted-foreground">
                You agree to indemnify and hold harmless ViVpod and its officers, directors, employees, and agents from any claims, damages, or expenses arising from your use of the Services, violation of these Terms, or infringement of any third-party rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">13. Termination</h2>
              <p className="text-muted-foreground mb-4">
                <strong>13.1 By You:</strong> You may cancel your account at any time through your account settings or by contacting support.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>13.2 By Us:</strong> We may suspend or terminate your account for violation of these Terms, non-payment, or at our discretion with notice.
              </p>
              <p className="text-muted-foreground">
                <strong>13.3 Effect:</strong> Upon termination, your right to use the Services ends. We may retain certain data as required by law or for legitimate business purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">14. Modifications to Terms</h2>
              <p className="text-muted-foreground">
                We may update these Terms from time to time. We will notify you of material changes by email or through the Services. Continued use after changes constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">15. Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms are governed by the laws of the State of New York, without regard to conflict of law principles. Any disputes shall be resolved in the courts located in New York County, New York.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">16. General Provisions</h2>
              <p className="text-muted-foreground mb-4">
                <strong>16.1 Entire Agreement:</strong> These Terms constitute the entire agreement between you and ViVpod.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>16.2 Severability:</strong> If any provision is found unenforceable, the remaining provisions remain in effect.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>16.3 Waiver:</strong> Failure to enforce any right does not waive that right.
              </p>
              <p className="text-muted-foreground">
                <strong>16.4 Assignment:</strong> You may not assign these Terms without our consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">17. Contact Information</h2>
              <p className="text-muted-foreground">
                For questions about these Terms, please contact us at:
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
