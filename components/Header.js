import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { themeVariants } from "../utils/theme";

export default function Header({ theme = "light" }) {
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const themeStyles = themeVariants[theme];

  useEffect(() => {
    if (open) {
      setShowMenu(true);
    } else {
      const timeout = setTimeout(() => setShowMenu(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  return (
    <nav className={`w-full px-6 py-4 border-b ${theme === 'dark' ? 'bg-gray-900/70 border-gray-800' : 'bg-white/70 border-gray-200'} backdrop-blur-md sticky top-0 z-50`}>
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <img 
            src={theme === 'dark' ? "/launchify-logo-light.svg" : "/launchify-logo.svg"} 
            alt="Launchify logo" 
            className="w-auto max-h-[50px]" 
          />
        </Link>

        <div className="sm:hidden">
          <button onClick={() => setOpen(!open)} aria-label="Toggle Menu">
            {open ? <X className={`w-6 h-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} /> : <Menu className={`w-6 h-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} />}
          </button>
        </div>

        <div className={`hidden sm:flex items-center space-x-6 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          <Link href="/generator" className="hover:underline">Generator</Link>
          <a href="https://github.com/Eric-Jackson/launchify" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
        </div>
      </div>

      {showMenu && (
        <div className={`absolute top-full left-0 w-full ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-t shadow-md z-40 sm:hidden ${open ? 'animate-slide-down' : 'animate-slide-up'}`}>
          <div className={`flex flex-col px-6 py-4 space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            <Link href="/generator" className="hover:underline" onClick={() => setOpen(false)}>Generator</Link>
            <a href="https://github.com/Eric-Jackson/launchify" target="_blank" rel="noopener noreferrer" className="hover:underline" onClick={() => setOpen(false)}>GitHub</a>
          </div>
        </div>
      )}
    </nav>
  );
}