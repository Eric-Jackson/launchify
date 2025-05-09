// Available themes for generated landing pages
export const generatedThemes = ["light", "dark", "bold"];

// Base theme styles for landing pages
const landingPageThemeStyles = {
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
    textPrimary: "text-black",
    textSecondary: "text-gray-700",
  },
};

// Base theme styles for the builder interface
const builderThemeStyles = {
  light: {
    wrapper: "bg-white text-gray-900",
    header: "bg-white/70 border-b border-gray-200",
    border: "border-b border-gray-200",
    input: "bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
    inputText: "text-gray-900 placeholder-gray-500",
    card: "bg-white border-gray-200",
    cardHover: "hover:border-gray-300",
  },
  dark: {
    wrapper: "bg-slate-900 text-white",
    header: "bg-slate-900/70 border-b border-slate-800",
    border: "border-b border-slate-800",
    input: "bg-slate-800 border-slate-700 focus:border-purple-500 focus:ring-purple-500",
    inputText: "text-white placeholder-gray-400",
    card: "bg-slate-800 border-slate-700",
    cardHover: "hover:border-slate-600",
  },
};

// Theme styles for generated landing pages (what users create)
export const generatedThemeVariants = landingPageThemeStyles;

// Theme styles for the builder interface itself (light/dark mode)
export const builderThemeVariants = builderThemeStyles;

// Theme styles for HTML template generation
export const htmlTemplateThemeVariants = landingPageThemeStyles; 