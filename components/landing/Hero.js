import CTAButton from "../../components/CTAButton";
import { themeVariants } from "../../utils/theme";
import { motion } from "framer-motion";

export default function Hero({ title, description, ctaText, ctaLink, theme = "light" }) {
  const themeStyles = themeVariants[theme];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 ${theme === 'light' ? 'bg-gradient-to-br from-gray-50 to-white' : theme === 'dark' ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-gradient-to-br from-yellow-50 to-white'}`} />
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, ${theme === 'light' ? '#000' : theme === 'dark' ? '#fff' : '#000'} 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight ${themeStyles.textPrimary} mb-6`}
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-xl sm:text-2xl ${themeStyles.textSecondary} max-w-3xl mx-auto mb-8`}
          >
            {description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <CTAButton
              label={ctaText}
              href={ctaLink}
              variant="primary"
              size="lg"
              theme={theme}
            />
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden -z-10">
        <div className={`absolute inset-0 ${theme === 'light' ? 'bg-gradient-to-t from-white' : theme === 'dark' ? 'bg-gradient-to-t from-gray-900' : 'bg-gradient-to-t from-yellow-50'}`} />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L100 0 L100 100 L0 100 Z' fill='none' stroke='${theme === 'light' ? '%23000' : theme === 'dark' ? '%23fff' : '%23000'}' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '20px 20px',
            opacity: 0.1
          }}
        />
      </div>
    </section>
  );
} 