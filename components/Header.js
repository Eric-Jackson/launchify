import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { builderThemeVariants } from "../utils/theme";

export default function Header({ theme = "light" }) {
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(theme);
  const themeStyles = builderThemeVariants[currentTheme];

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || theme;
    setCurrentTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    document.body.classList.toggle('dark:bg-gray-900', savedTheme === 'dark');
    document.body.classList.toggle('dark:text-white', savedTheme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
    document.body.classList.toggle('dark:bg-gray-900');
    document.body.classList.toggle('dark:text-white');
  };

  useEffect(() => {
    if (open) {
      setShowMenu(true);
    } else {
      const timeout = setTimeout(() => setShowMenu(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  return (
    <nav className={`w-full px-6 py-4 bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800 backdrop-blur-md sticky top-0 z-50`}>
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
          <img 
            src="/launchify-logo.svg" 
            alt="Launchify logo" 
            className={`w-auto max-h-[50px] ${currentTheme === 'dark' ? 'invert brightness-0' : ''}`} 
          />
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {currentTheme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>

          <div className="sm:hidden">
            <button onClick={() => setOpen(!open)} aria-label="Toggle Menu">
              {open ? <X className="w-6 h-6 text-gray-900 dark:text-white" /> : <Menu className="w-6 h-6 text-gray-900 dark:text-white" />}
            </button>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-6 text-sm text-gray-700 dark:text-gray-300">
          <Link href="/generator" className="hover:underline">Generator</Link>
          <a href="https://github.com/Eric-Jackson/launchify" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
        </div>
      </div>

      {showMenu && (
        <div className="absolute top-full left-0 w-full bg-white/70 dark:bg-gray-900/70 border-t border-gray-200 dark:border-gray-800 shadow-md z-40 sm:hidden animate-slide-down">
          <div className="flex flex-col px-6 py-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <Link href="/generator" className="hover:underline" onClick={() => setOpen(false)}>Generator</Link>
            <a href="https://github.com/Eric-Jackson/launchify" target="_blank" rel="noopener noreferrer" className="hover:underline" onClick={() => setOpen(false)}>GitHub</a>
          </div>
        </div>
      )}
    </nav>
  );
}