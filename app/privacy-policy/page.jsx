import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
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

            <h1 className="text-4xl font-bold text-green-600 mb-6">Privacy Policy</h1>

            <p className="text-gray-600 mb-10">
                Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="space-y-8 text-gray-700 leading-relaxed">
                <p>
                    Welcome to <strong>ExpressDeal</strong> (“we”, “our”, “us”).
                    Protecting your privacy is important to us. This Privacy Policy
                    explains how we collect, use, disclose, and safeguard your information
                    when you visit our website.
                </p>

                <p>
                    By accessing or using this website, you agree to the terms of this
                    Privacy Policy. If you do not agree, please do not use the website.
                </p>

                {/* INFORMATION COLLECTION */}
                <h2 className="text-2xl font-semibold">1. Information We Collect</h2>

                <p>
                    We may collect limited information about you in the following ways:
                </p>

                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>Personal Information:</strong> We do not collect personally
                        identifiable information (such as name, email address, or phone
                        number) unless you voluntarily provide it (for example, through a
                        contact form).
                    </li>
                    <li>
                        <strong>Non-Personal Information:</strong> This includes browser
                        type, device type, operating system, pages visited, time spent on
                        pages, and referring URLs.
                    </li>
                </ul>

                {/* COOKIES */}
                <h2 className="text-2xl font-semibold">2. Cookies & Tracking Technologies</h2>

                <p>
                    We may use cookies, web beacons, and similar tracking technologies to:
                </p>

                <ul className="list-disc pl-6 space-y-2">
                    <li>Analyze website traffic and usage patterns</li>
                    <li>Improve website performance and user experience</li>
                    <li>Understand which content is most useful to visitors</li>
                </ul>

                <p>
                    You can choose to disable cookies through your browser settings.
                    Please note that some features of the website may not function
                    properly if cookies are disabled.
                </p>

                {/* AFFILIATE LINKS */}
                <h2 className="text-2xl font-semibold">3. Affiliate Links & Advertising</h2>

                <p>
                    This website may contain affiliate links. This means that when you
                    click on certain links and make a purchase, we may earn a commission
                    at no additional cost to you.
                </p>

                <p>
                    Affiliate programs may use cookies or tracking technologies to track
                    referrals. We do not control these third-party technologies and are
                    not responsible for how affiliate partners collect or use your data.
                </p>

                {/* ANALYTICS */}
                <h2 className="text-2xl font-semibold">4. Analytics & Third-Party Services</h2>

                <p>
                    We may use third-party analytics services (such as Google Analytics or
                    similar tools) to understand how visitors interact with the website.
                    These services may collect non-personal information in accordance
                    with their own privacy policies.
                </p>

                <p>
                    We do not sell, rent, or trade your personal information to third
                    parties.
                </p>

                {/* DATA SECURITY */}
                <h2 className="text-2xl font-semibold">5. Data Security</h2>

                <p>
                    We implement reasonable technical and organizational measures to
                    protect your information. However, no method of transmission over the
                    Internet or electronic storage is 100% secure, and we cannot
                    guarantee absolute security.
                </p>

                {/* EXTERNAL LINKS */}
                <h2 className="text-2xl font-semibold">6. External Links</h2>

                <p>
                    Our website may contain links to external websites that are not
                    operated by us. We are not responsible for the content, privacy
                    policies, or practices of any third-party websites. We encourage you
                    to review their privacy policies before providing any information.
                </p>

                {/* CHILDREN */}
                <h2 className="text-2xl font-semibold">7. Children’s Information</h2>

                <p>
                    This website is not intended for children under the age of 13. We do
                    not knowingly collect personal information from children. If you
                    believe that a child has provided personal information on our
                    website, please contact us and we will promptly remove it.
                </p>

                {/* CHANGES */}
                <h2 className="text-2xl font-semibold">8. Changes to This Privacy Policy</h2>

                <p>
                    We may update this Privacy Policy from time to time. Any changes will
                    be posted on this page with an updated “Last updated” date. Continued
                    use of the website after changes constitutes acceptance of the
                    updated policy.
                </p>

                {/* CONTACT */}
                <h2 className="text-2xl font-semibold">9. Contact Us</h2>

                <p>
                    If you have any questions or concerns about this Privacy Policy, you
                    may contact us at:
                </p>

                <p className="font-medium">
                    📧 Email: <span className="text-gray-600">expressdealhelp@gmail.com</span>
                </p>
            </section>
        </main>
    )
}
