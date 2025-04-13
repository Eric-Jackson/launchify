import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { generateHTML } from "../lib/htmlTemplate";
import { downloadZip } from "../lib/zipPage";
import Header from "../components/Header";
import { generatedThemeVariants } from "../utils/theme";

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

  if (!data) return <div className="p-8 text-gray-900 dark:text-white">Loading preview...</div>;

  const theme = data.theme || "light";
  const themeStyles = generatedThemeVariants[theme];

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
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <Header />

      {/* Edit Settings Button */}
      <div className="max-w-5xl mx-auto px-6 mt-6">
        <button
          onClick={() => router.push("/generator")}
          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
        >
          ← Back to Editor
        </button>
      </div>

      {/* Preview Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Preview</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={handleDownload}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              >
                Download HTML
              </button>
              <button
                onClick={handleDeploy}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              >
                Deploy to Vercel
              </button>
            </div>
          </div>
          <div className={`${themeStyles.wrapper}`}>
            <div className="min-h-[500px] text-center max-w-2xl mx-auto">
              <h1 className="text-4xl font-bold mb-2">{data.productName}</h1>
              <p className="text-lg mb-6">{data.description}</p>
              <div className="space-y-4">
                {data.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              {data.ctaText && data.ctaLink && (
                <a
                  href={data.ctaLink}
                  className={`inline-block mt-8 ${themeStyles.ctaButton}`}
                >
                  {data.ctaText}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}