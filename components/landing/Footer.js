import { generatedThemeVariants } from "../../utils/theme";

export default function Footer({ theme = "light", socialLinks = {} }) {
  const themeStyles = generatedThemeVariants[theme];

  return (
    <footer className={`py-6 px-6 ${themeStyles.footer}`}>
      <div className="max-w-7xl mx-auto">
        <p className={`${themeStyles.footerText}`}>
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
} 