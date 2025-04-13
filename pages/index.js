import Link from "next/link";
import Header from "../components/Header";
import CTAButton from "../components/CTAButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900 font-sans">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
          Build beautiful landing pages <br className="hidden sm:inline" /> in minutes.
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Launchify helps you generate, preview, and deploy conversion-ready SaaS landing pages with zero code.
        </p>

        {/* Call to Action */}
        <CTAButton label="Launch Your Page" href="/generator" />

        {/* Hero Image */}
        <div className="mt-16">
          <img
            src="/themes/light.png"
            alt="Launchify sample screenshot"
            className="rounded-xl shadow-xl border max-w-full sm:max-w-3xl mx-auto"
          />
        </div>
      </div>

      {/* Features Section */}
      <section className="bg-white py-20 mt-24 border-t">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Launchify?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <Feature
              title="⚡ Instant HTML + Deploys"
              desc="Export clean code or go live with one click via Vercel."
            />
            <Feature
              title="🎨 Modern Themes"
              desc="Pick from polished, responsive layouts and fonts."
            />
            <Feature
              title="🧠 Built for Speed"
              desc="No builder bloat. Just type, preview, and launch."
            />
            <Feature
              title="💾 No Sign Up Needed"
              desc="Fully usable without accounts or paywalls."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-10">
        &copy; {new Date().getFullYear()} Launchify. Made with 💻 in West Virginia.
      </footer>
    </main>
  );
}

/**
 * Feature Component
 * Displays a single feature with a title and description.
 */
function Feature({ title, desc }) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}