import Hero from "./Hero";
import Features from "./Features";
import Footer from "./Footer";
import { themeVariants } from "../../utils/theme";
import { Twitter, Linkedin, Github } from "lucide-react";

export default function LandingPage({ form = {} }) {
  const { 
    title = "", 
    description = "", 
    features = [], 
    ctaText = "", 
    ctaLink = "", 
    theme = "light", 
    logo = "",
    twitter = "",
    linkedin = "",
    github = ""
  } = form;
  const themeStyles = themeVariants[theme];

  return (
    <div className={`${themeStyles.wrapper} min-h-0 overflow-hidden`}>
      <div>
        <header className={`px-6 py-4 ${themeStyles.header} backdrop-blur-md sticky top-0 z-50`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              {logo ? (
                <img
                  src={logo}
                  alt={title}
                  className={`max-h-[50px] ${theme === 'dark' ? 'invert brightness-0' : ''}`}
                />
              ) : (
                <h1 className={`text-2xl font-bold ${themeStyles.textPrimary}`}>
                  {title}
                </h1>
              )}
            </div>
            <div className="flex items-center gap-4">
              {twitter && (
                <a href={twitter} target="_blank" rel="noopener noreferrer" className={themeStyles.textSecondary}>
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className={themeStyles.textSecondary}>
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {github && (
                <a href={github} target="_blank" rel="noopener noreferrer" className={themeStyles.textSecondary}>
                  <Github className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </header>

        <Hero
          title={title}
          description={description}
          ctaText={ctaText}
          ctaLink={ctaLink}
          theme={theme}
        />

        {features.filter(feature => feature.title.trim() || feature.description.trim()).length > 0 && (
          <Features features={features} theme={theme} />
        )}

        <Footer 
          theme={theme}
          socialLinks={{
            twitter,
            linkedin,
            github
          }}
        />
      </div>
    </div>
  );
} 