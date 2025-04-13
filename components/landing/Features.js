import { generatedThemeVariants } from "../../utils/theme";
import FeatureCard from "./FeatureCard";

export default function Features({ features = [], theme = "light" }) {
  const themeStyles = generatedThemeVariants[theme];
  
  return (
    <div className={`py-24 ${themeStyles.features}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl font-extrabold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Features
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 