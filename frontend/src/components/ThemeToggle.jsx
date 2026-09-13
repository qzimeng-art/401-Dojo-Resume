import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`p-2 rounded-xl border transition-all duration-200 flex items-center justify-center gap-2 ${
        theme === 'dark'
          ? 'bg-brand-800 border-brand-700 text-yellow-400 hover:bg-brand-700 hover:border-brand-600'
          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900 shadow-sm'
      } ${className}`}
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <>
          <Sun size={18} className="animate-spin-slow" />
          <span className="text-xs font-semibold hidden lg:inline text-gray-200">Light</span>
        </>
      ) : (
        <>
          <Moon size={18} />
          <span className="text-xs font-semibold hidden lg:inline text-gray-700">Dark</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
