import { motion } from "framer-motion";
import { generatedThemeVariants } from "../utils/theme";

export default function Hero({ title, description, ctaText, ctaLink }) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${generatedThemeVariants.light.heading}`}>
            {title}
          </h1>
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${generatedThemeVariants.light.text}`}>
            {description}
          </p>
          <motion.a
            href={ctaLink}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-block px-8 py-3 rounded-lg font-semibold ${generatedThemeVariants.light.ctaButton}`}
          >
            {ctaText}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
} 