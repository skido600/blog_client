import { useState, useEffect } from "react";
import { CiDark, CiLight } from "react-icons/ci";

function Theme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return saved || (prefersDark ? "dark" : "light");
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div>
      <button
        onClick={toggleTheme}
        aria-label={`switch to ${theme === "dark" ? "light" : "dark"} mode`}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
        {theme === "dark" ? (
          <CiDark className="text-gray-800 dark:text-white text-2xl" />
        ) : (
          <CiLight className="text-2xl" />
        )}
      </button>
    </div>
  );
}

export default Theme;
