import Link from "next/link";
import { generatedThemeVariants } from "../utils/theme";
import { motion } from "framer-motion";

export default function CTAButton({ label, href, variant = "primary", size = "md", theme = "light", fullWidth = false }) {
  const themeStyles = generatedThemeVariants[theme];
  const variants = {
    primary: themeStyles.ctaButton,
    secondary: themeStyles.ctaButton, // Fallback to primary style for now
  };
  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-3",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block relative"
      style={{ zIndex: 10 }}
    >
      <a
        href={href}
        className={`relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 ease-in-out ${
          fullWidth ? "w-full" : ""
        } ${variants[variant]} ${sizes[size]}`}
        style={{
          backgroundImage: theme === 'light' 
            ? 'linear-gradient(to bottom right, #4f46e5, #2563eb, #1d4ed8)'
            : theme === 'dark'
            ? 'linear-gradient(to bottom right, #7c3aed, #9333ea, #a855f7)'
            : 'linear-gradient(to bottom right, #f97316, #f59e0b, #eab308)'
        }}
      >
        <span className={`relative z-10 ${themeStyles.ctaButtonText}`}>{label}</span>
      </a>
    </motion.div>
  );
}