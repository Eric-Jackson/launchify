/**
 * Generates an HTML string for a landing page based on the provided data and theme.
 * @param {Object} params - The data for the landing page.
 * @param {string} params.productName - The name of the product.
 * @param {string} params.tagline - The tagline of the product.
 * @param {string} params.description - The description of the product.
 * @param {string[]} params.features - A list of features for the product.
 * @param {string} params.ctaText - The call-to-action button text.
 * @param {string} params.ctaLink - The call-to-action button link.
 * @param {string} params.theme - The selected theme for the page.
 * @returns {string} - The generated HTML string.
 */
export function generateHTML({ productName, tagline, description, features, ctaText, ctaLink, theme }) {
  // Theme-specific styles
  const themeClasses = {
    light: {
      wrapper: "bg-white text-gray-900",
      hero: "bg-white",
      features: "bg-gray-50",
      featureIcon: "bg-indigo-50 text-indigo-600",
      featureText: "text-gray-600",
      footer: "bg-gray-900 text-white",
      footerText: "text-gray-400",
      footerHover: "hover:text-white",
      ctaButton: "bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-700 text-white shadow-[0_8px_30px_rgb(79,70,229,0.2)] backdrop-blur-sm border border-indigo-500/30 hover:shadow-[0_8px_30px_rgb(79,70,229,0.3)] hover:border-indigo-400 hover:from-indigo-500 hover:via-blue-500 hover:to-blue-600",
      ctaButtonText: "text-white font-semibold",
      header: "bg-white/70 border-b border-gray-200",
      border: "border-b border-gray-200",
      textPrimary: "text-gray-900",
      textSecondary: "text-gray-700",
    },
    dark: {
      wrapper: "bg-slate-900 text-white",
      hero: "bg-slate-900",
      features: "bg-slate-800",
      featureIcon: "bg-purple-900/50 text-purple-400",
      featureText: "text-gray-300",
      footer: "bg-black text-white",
      footerText: "text-gray-400",
      footerHover: "hover:text-white",
      ctaButton: "bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-600 text-white shadow-[0_8px_30px_rgb(147,51,234,0.2)] backdrop-blur-sm border border-purple-500/30 hover:shadow-[0_8px_30px_rgb(147,51,234,0.3)] hover:border-purple-400 hover:from-purple-500 hover:via-fuchsia-500 hover:to-pink-500",
      ctaButtonText: "text-white font-semibold",
      header: "bg-slate-900/70 border-b border-slate-800",
      border: "border-b border-slate-800",
      textPrimary: "text-white",
      textSecondary: "text-gray-300",
    },
    bold: {
      wrapper: "bg-yellow-50 text-black",
      hero: "bg-yellow-50",
      features: "bg-yellow-100",
      featureIcon: "bg-yellow-500 text-white",
      featureText: "text-gray-700",
      footer: "bg-black text-white",
      footerText: "text-gray-400",
      footerHover: "hover:text-white",
      ctaButton: "bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 text-white shadow-[0_8px_30px_rgb(245,158,11,0.2)] backdrop-blur-sm border border-orange-400/30 hover:shadow-[0_8px_30px_rgb(245,158,11,0.3)] hover:border-orange-300 hover:from-orange-400 hover:via-amber-400 hover:to-yellow-400",
      ctaButtonText: "text-white font-semibold",
      header: "bg-yellow-50/70 border-b border-yellow-200",
      border: "border-b border-yellow-200",
      textPrimary: "text-black",
      textSecondary: "text-gray-700",
    },
  };

  // Fallback to the light theme if the provided theme is invalid
  const styles = themeClasses[theme] || themeClasses.light;

  // Generate the HTML string
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${productName}</title>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Inter&family=JetBrains+Mono&family=Lobster&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: 'Inter', sans-serif;
        }
        .font-mono {
          font-family: 'JetBrains Mono', monospace;
        }
        .font-lobster {
          font-family: 'Lobster', cursive;
        }
      </style>
    </head>
    <body class="${styles.wrapper}">
      <div class="min-h-screen px-8 py-12">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-16">
            <h1 class="text-4xl sm:text-5xl font-bold mb-6 ${styles.textPrimary}">${productName}</h1>
            ${tagline ? `<p class="text-xl sm:text-2xl mb-4 ${styles.textSecondary}">${tagline}</p>` : ''}
            <p class="text-lg ${styles.textSecondary}">${description}</p>
          </div>

          ${features.length > 0 ? `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              ${features.map(feature => `
                <div class="flex flex-col items-center text-center">
                  <div class="w-14 h-14 rounded-lg ${styles.featureIcon} flex items-center justify-center mb-6">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 class="text-xl font-semibold mb-3 ${styles.textPrimary}">${feature}</h3>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${ctaText && ctaLink ? `
            <div class="text-center">
              <a href="${ctaLink}" class="${styles.ctaButton} inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300">
                ${ctaText}
              </a>
            </div>
          ` : ''}
        </div>
      </div>
    </body>
    </html>
  `;
}