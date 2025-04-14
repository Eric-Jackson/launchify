import { htmlTemplateThemeVariants } from "../utils/theme";

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
  // Fallback to the light theme if the provided theme is invalid
  const styles = htmlTemplateThemeVariants[theme] || htmlTemplateThemeVariants.light;

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