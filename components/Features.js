import { motion } from "framer-motion";
import { Box, Code, Zap, Shield, Clock, Users } from "lucide-react";
import { generatedThemeVariants } from "../utils/theme";

const features = [
  {
    icon: <Box className="w-6 h-6" />,
    title: "Modern Design",
    description: "Clean and professional design that works on all devices"
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "Customizable",
    description: "Easily customize colors, fonts, and content to match your brand"
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Fast Loading",
    description: "Optimized for performance and fast loading times"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure",
    description: "Built with security best practices in mind"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Time-Saving",
    description: "Get your landing page up and running in minutes"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "User-Friendly",
    description: "Easy to use and maintain for non-technical users"
  }
];

export default function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to create a professional landing page
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-6 rounded-lg ${generatedThemeVariants.light.featureCard}`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${generatedThemeVariants.light.featureIcon}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 