import { FaMoon, FaSun } from "react-icons/fa6";
import { useDarkMode } from "../context/DarkModeContext";
import { IoSunny } from "react-icons/io5";
import { useEffect } from "react";
import { doc } from "prettier";

function ToggleDarkMode() {
  const { toggleDarkMode, isDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className=" text-5xl font-bold text-main-700 dark:text-[#fff] "
    >
      {isDarkMode ? <IoSunny /> : <FaMoon />}
    </button>
  );
}

export default ToggleDarkMode;
