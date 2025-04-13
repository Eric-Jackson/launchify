import Link from "next/link";
import { themeVariants } from "../utils/theme";
import { motion } from "framer-motion";

export default function CTAButton({ label, href, variant = "primary", size = "md", theme = "light", fullWidth = false }) {
  const themeStyles = themeVariants[theme];
  const variants = {
    primary: themeStyles.ctaButton,
    secondary: themeStyles.ctaButton, // Fallback to primary style for now
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block"
    >
      <a
        href={href}
        className={`relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 ease-in-out ${
          fullWidth ? "w-full" : ""
        } ${variants[variant]} ${sizes[size]} overflow-hidden`}
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