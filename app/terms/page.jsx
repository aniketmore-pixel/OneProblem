import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsOfServicePage() {
    return (
        <main className="max-w-4xl mx-auto px-6 py-20">
            {/* BACK BUTTON */}
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-green-600 hover:underline mb-10"
            >
                <ArrowLeft size={16} />
                Back to home
            </Link>

            <h1 className="text-4xl font-bold text-green-600 mb-6">
                Terms of Service
            </h1>

            <p className="text-gray-600 mb-10">
                Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="space-y-8 text-gray-700 leading-relaxed">
                <p>
                    Welcome to <strong>ExpressDeal</strong>. These Terms of Service
                    (“Terms”) govern your access to and use of our website, content,
                    and services. By accessing or using this website, you agree to be
                    bound by these Terms.
                </p>

                <p>
                    If you do not agree with any part of these Terms, please do not
                    use the website.
                </p>

                {/* USE OF WEBSITE */}
                <h2 className="text-2xl font-semibold">1. Use of the Website</h2>

                <p>
                    You agree to use this website only for lawful purposes and in a
                    way that does not infringe the rights of others or restrict
                    their use of the website.
                </p>

                <ul className="list-disc pl-6 space-y-2">
                    <li>You must not misuse, hack, or attempt to disrupt the website</li>
                    <li>You must not use the website for fraudulent or illegal activities</li>
                    <li>You must not attempt to copy or scrape content at scale</li>
                </ul>

                {/* CONTENT */}
                <h2 className="text-2xl font-semibold">2. Content Disclaimer</h2>

                <p>
                    All content provided on ExpressDeal is for informational and
                    educational purposes only. While we strive to keep information
                    accurate and up to date, we do not guarantee the completeness,
                    accuracy, or reliability of any content.
                </p>

                <p>
                    Product prices, availability, and specifications may change
                    without notice and may differ across platforms.
                </p>

                {/* AFFILIATE */}
                <h2 className="text-2xl font-semibold">3. Affiliate Links</h2>

                <p>
                    ExpressDeal may contain affiliate links. If you click on an
                    affiliate link and make a purchase, we may earn a commission
                    at no extra cost to you.
                </p>

                <p>
                    We do not control third-party websites and are not responsible
                    for their products, services, or policies.
                </p>

                {/* INTELLECTUAL PROPERTY */}
                <h2 className="text-2xl font-semibold">4. Intellectual Property</h2>

                <p>
                    All content on this website, including text, graphics, logos,
                    and design elements, is the property of ExpressDeal unless
                    otherwise stated.
                </p>

                <p>
                    You may not reproduce, distribute, or modify any content
                    without prior written permission.
                </p>

                {/* LIMITATION */}
                <h2 className="text-2xl font-semibold">5. Limitation of Liability</h2>

                <p>
                    To the fullest extent permitted by law, ExpressDeal shall not
                    be liable for any direct, indirect, incidental, or consequential
                    damages arising from your use of the website.
                </p>

                <p>
                    Your use of the website is at your own risk.
                </p>

                {/* TERMINATION */}
                <h2 className="text-2xl font-semibold">6. Termination</h2>

                <p>
                    We reserve the right to suspend or terminate access to the
                    website at any time, without notice, for conduct that violates
                    these Terms or is harmful to other users or the website.
                </p>

                {/* EXTERNAL LINKS */}
                <h2 className="text-2xl font-semibold">7. External Links</h2>

                <p>
                    Our website may contain links to third-party websites. We are
                    not responsible for the content, policies, or practices of
                    those websites.
                </p>

                {/* CHANGES */}
                <h2 className="text-2xl font-semibold">8. Changes to These Terms</h2>

                <p>
                    We may update these Terms from time to time. Any changes will
                    be posted on this page with an updated “Last updated” date.
                    Continued use of the website indicates acceptance of the new
                    Terms.
                </p>

                {/* CONTACT */}
                <h2 className="text-2xl font-semibold">9. Contact Us</h2>

                <p>
                    If you have any questions regarding these Terms of Service,
                    you can contact us at:
                </p>

                <p className="font-medium">
                    📧 Email: <span className="text-gray-600">expressdealhelp@gmail.com</span>
                </p>
            </section>
        </main>
    )
}
