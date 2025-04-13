import { themeVariants } from "../../utils/theme";

export default function Footer({ title, theme = "light" }) {
  return (
    <footer className={`py-6 px-6 ${themeVariants[theme].footer}`}>
      <div className="flex flex-col items-center">
        <p className={`${themeVariants[theme].footerText}`}>
          © {new Date().getFullYear()} {title || "Your Product Name"}. All rights reserved.
        </p>
      </div>
    </footer>
  );
} 