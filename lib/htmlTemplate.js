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
        wrapper: "bg-white text-gray-900 font-sans",
        heading: "text-4xl font-bold",
        description: "text-lg text-gray-600",
        button: "bg-black text-white hover:bg-gray-800",
      },
      dark: {
        wrapper: "bg-gray-900 text-white font-mono",
        heading: "text-4xl font-bold text-white",
        description: "text-lg text-gray-400",
        button: "bg-white text-black hover:bg-gray-200",
      },
      bold: {
        wrapper: "bg-yellow-50 text-black font-lobster",
        heading: "text-5xl font-extrabold tracking-tight",
        description: "text-base text-gray-800 italic",
        button: "bg-black text-yellow-50 hover:bg-gray-900",
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
        </head>
        <body class="${styles.wrapper}">
            <div class="min-h-screen px-8 py-12 text-center max-w-2xl mx-auto">
            <h1 class="${styles.heading} mb-2">${productName}</h1>
            <p class="${styles.description} mb-6">${tagline}</p>
            <p class="mb-6">${description}</p>
        
            <ul class="text-left list-disc list-inside mb-8">
                ${features.map((f) => `<li class="mb-1">${f}</li>`).join("")}
            </ul>
        
            <a href="${ctaLink}" class="inline-block px-6 py-3 rounded text-lg transition ${styles.button}">
                ${ctaText}
            </a>
            </div>
        </body>
        </html>
    `;
  }