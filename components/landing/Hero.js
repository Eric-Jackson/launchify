import CTAButton from "../../components/CTAButton";
import { themeVariants } from "../../utils/theme";
import { motion } from "framer-motion";

export default function Hero({ title, description, ctaText, ctaLink, theme = "light" }) {
  const themeStyles = themeVariants[theme];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 ${theme === 'light' ? 'bg-gradient-to-br from-indigo-50 via-white to-blue-50' : theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-black to-purple-900' : 'bg-gradient-to-br from-yellow-50 via-white to-orange-50'}`} />
        
        {/* Animated dots background */}
        <motion.div
          className="absolute inset-0 opacity-20"
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
            backgroundImage: `radial-gradient(circle at 50% 50%, ${theme === 'light' ? '#4f46e5' : theme === 'dark' ? '#7c3aed' : '#f97316'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative px-6">
        <div className="text-center max-w-3xl mx-auto">
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
            className={`text-xl sm:text-2xl ${themeStyles.textSecondary} mb-8`}
          >
            {description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative z-10"
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
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: theme === 'light' 
              ? 'radial-gradient(circle, #4f46e5 0%, transparent 70%)'
              : theme === 'dark'
              ? 'radial-gradient(circle, #7c3aed 0%, transparent 70%)'
              : 'radial-gradient(circle, #f97316 0%, transparent 70%)'
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          style={{
            background: theme === 'light' 
              ? 'radial-gradient(circle, #2563eb 0%, transparent 70%)'
              : theme === 'dark'
              ? 'radial-gradient(circle, #9333ea 0%, transparent 70%)'
              : 'radial-gradient(circle, #f59e0b 0%, transparent 70%)'
          }}
        />

        {/* Animated grid overlay */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L100 0 L100 100 L0 100 Z' fill='none' stroke='${theme === 'light' ? '%234f46e5' : theme === 'dark' ? '%237c3aed' : '%23f97316'}' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px',
          }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: theme === 'light' ? '#4f46e5' : theme === 'dark' ? '#7c3aed' : '#f97316',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </section>
  );
} 