import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function SecurityPage() {
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
                Security
            </h1>

            <p className="text-gray-600 mb-10">
                Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="space-y-8 text-gray-700 leading-relaxed">
                <p>
                    At <strong>ExpressDeal</strong>, protecting the security of your
                    information is a top priority. This page explains the measures
                    we take to keep your data safe and secure while using our website.
                </p>

                {/* ACCOUNT SECURITY */}
                <h2 className="text-2xl font-semibold">1. Account Security</h2>

                <p>
                    Users are responsible for maintaining the confidentiality of
                    their account credentials. You agree not to share your password
                    with anyone and to notify us immediately if you suspect any
                    unauthorized access to your account.
                </p>

                <ul className="list-disc pl-6 space-y-2">
                    <li>Use strong, unique passwords for your account</li>
                    <li>Enable two-factor authentication (2FA) if available</li>
                    <li>Log out after using shared or public devices</li>
                </ul>

                {/* DATA PROTECTION */}
                <h2 className="text-2xl font-semibold">2. Data Protection</h2>

                <p>
                    We implement technical and administrative measures to protect
                    your personal data from unauthorized access, disclosure,
                    alteration, or destruction.
                </p>

                <p>
                    These measures include secure servers, encryption where
                    applicable, and access control procedures for authorized personnel.
                </p>

                {/* COMMUNICATION SECURITY */}
                <h2 className="text-2xl font-semibold">3. Communication Security</h2>

                <p>
                    All communications between your browser and our servers are
                    encrypted using industry-standard protocols such as HTTPS.
                </p>

                <p>
                    We strongly advise against transmitting sensitive information
                    through unencrypted channels or via third-party platforms.
                </p>

                {/* INCIDENT RESPONSE */}
                <h2 className="text-2xl font-semibold">4. Incident Response</h2>

                <p>
                    In the event of a security incident or data breach, we will take
                    immediate action to contain and resolve the issue. We will notify
                    affected users promptly, in accordance with applicable laws.
                </p>

                {/* EXTERNAL LINKS */}
                <h2 className="text-2xl font-semibold">5. External Links</h2>

                <p>
                    Our website may contain links to third-party websites. We
                    are not responsible for the security practices of those sites
                    and encourage you to review their policies.
                </p>

                {/* USER RESPONSIBILITY */}
                <h2 className="text-2xl font-semibold">6. Your Responsibility</h2>

                <p>
                    You play a critical role in maintaining your own security. This
                    includes keeping software up to date, using secure devices, and
                    being cautious with suspicious emails or links.
                </p>

                {/* CHANGES */}
                <h2 className="text-2xl font-semibold">7. Changes to This Security Page</h2>

                <p>
                    We may update this Security page from time to time. Any changes
                    will be posted on this page with an updated “Last updated” date.
                    Continued use of the website indicates acceptance of the updated
                    security practices.
                </p>

                {/* CONTACT */}
                <h2 className="text-2xl font-semibold">8. Contact Us</h2>

                <p>
                    If you have questions or concerns about security on our platform,
                    please reach out to us at:
                </p>

                <p className="font-medium">
                    📧 Email: <span className="text-gray-600">expressdealhelp@gmail.com</span>
                </p>
            </section>
        </main>
    )
}
