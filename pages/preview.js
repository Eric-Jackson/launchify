import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { generateHTML } from "../lib/htmlTemplate";
import { downloadZip } from "../lib/zipPage";
import Header from "../components/Header";

export default function Preview() {
  const router = useRouter();
  const [data, setData] = useState(null);

  // Parse query parameters and set data
  useEffect(() => {
    if (router.isReady) {
      const query = { ...router.query };
      const parsed = {
        ...query,
        features: query.features ? JSON.parse(query.features) : [],
        theme: query.theme || "light",
      };
      setData(parsed);
    }
  }, [router.isReady, router.query]);

  if (!data) return <div className="p-8">Loading preview...</div>;

  // Theme variants for styling
  const themeVariants = {
    light: {
      wrapper: "bg-white text-gray-900 font-sans",
    },
    dark: {
      wrapper: "bg-gray-900 text-white font-mono",
    },
    bold: {
      wrapper: "bg-yellow-50 text-black font-lobster",
    },
  };

  const theme = data.theme || "light";
  const styles = themeVariants[theme];

  // Handle HTML download
  const handleDownload = () => {
    const htmlContent = generateHTML(data);
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.productName.toLowerCase().replace(/\s/g, "-")}-landing.html`;
    a.click();

    URL.revokeObjectURL(url);
  };

  // Handle deployment to Vercel
  const handleDeploy = async () => {
    const res = await fetch("/api/deploy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.url) {
      window.open(result.url, "_blank");
    } else {
      alert("Deployment failed 😢");
      console.error(result);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900">
        {/* Header */}
        <Header />

        {/* Edit Settings Button */}
        <div className="max-w-5xl mx-auto px-6 mt-6">
          <button
            onClick={() => {
              router.push({
                pathname: "/generator",
                query: {
                  ...data,
                  features: JSON.stringify(data.features),
                },
              });
            }}
            className="mb-6 inline-flex items-center gap-2 bg-white text-black border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17 9H7.83l3.58-3.59L10 4l-6 6 6 6 1.41-1.41L7.83 11H17V9z" />
            </svg>
            Edit Settings
          </button>
        </div>

        {/* Preview Section */}
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="bg-white shadow-2xl rounded-xl overflow-hidden border ring-1 ring-gray-200 transition-all duration-500 ease-out animate-fade-in">
            {/* Browser-like Header */}
            <div className="bg-gray-100 px-4 py-2 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
              </div>
              <div className="text-sm text-gray-500 font-mono">launchify.app</div>
            </div>

            {/* Preview Content */}
            <div className={`${styles.wrapper} p-6 sm:p-12`}>
              <div className="min-h-[500px] text-center max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold mb-2">{data.productName}</h1>
                <p className="text-lg text-gray-600 mb-6">{data.tagline}</p>
                <p className="mb-6">{data.description}</p>
                <ul className="text-left list-disc list-inside mb-8">
                  {data.features.map((feat, i) => (
                    <li key={i} className="mb-1">
                      {feat}
                    </li>
                  ))}
                </ul>
                <a
                  href={data.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 rounded text-lg transition bg-black text-white hover:bg-gray-800"
                >
                  {data.ctaText}
                </a>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDownload}
              className="border border-black text-black px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              Download HTML
            </button>

            <button
              onClick={() => downloadZip(data)}
              className="border border-black text-black px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              Download ZIP
            </button>

            <button
              onClick={handleDeploy}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Deploy to Vercel
            </button>
          </div>
        </div>
      </main>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </>
  );
}