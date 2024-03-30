"use client";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ModeNightIcon from "@mui/icons-material/ModeNight";

import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    let theme;
    if (sessionStorage) {
      theme = sessionStorage.getItem("theme");
    }
    if (theme === "dark") setDarkMode(true);
  }, []);

  const updateTheme = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      sessionStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      sessionStorage.setItem("theme", "ligth");
    }
  }, [darkMode]);
  return (
    <div onClick={updateTheme}>
      {darkMode ? (
        <WbSunnyIcon className="dark:text-slate-300 dark:hover:text-white cursor-pointer" />
      ) : (
        <ModeNightIcon className="dark:text-slate-300 hover:text-slate-700 cursor-pointer" />
      )}
    </div>
  );
};

export default ThemeToggle;
