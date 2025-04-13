import { themeVariants } from "../../utils/theme";
import FeatureCard from "./FeatureCard";

export default function Features({ features, theme = "light" }) {
  return (
    <div className={`py-20 px-6 sm:px-12 ${themeVariants[theme].features}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            feature.title && (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                theme={theme}
              />
            )
          ))}
        </div>
      </div>
    </div>
  );
} 