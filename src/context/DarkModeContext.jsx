import { createContext, useContext, useEffect, useState } from "react";

const darkModeContext = createContext();

function DarkModeContext({ children }) {
  const storedValue = JSON.parse(localStorage.getItem("dark-mode"));
  const [isDarkMode, setIsDarkMode] = useState(
    storedValue === null
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : storedValue,
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    localStorage.setItem("dark-mode", !isDarkMode);
    setIsDarkMode((dark) => !dark);
    document.documentElement.classList.toggle("dark");
  };
  return (
    <darkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </darkModeContext.Provider>
  );
}

const useDarkMode = () => {
  try {
    const { isDarkMode, toggleDarkMode } = useContext(darkModeContext);
    return { isDarkMode, toggleDarkMode };
  } catch {
    throw new Error("useDarkMode  was called out of DarkModeContext.Provider");
  }
};

export { useDarkMode, DarkModeContext };
