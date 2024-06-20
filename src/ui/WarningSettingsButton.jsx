import { useDarkMode } from "../context/DarkModeContext";

export function WarningSettingsButton({
  level,
  isSelected,
  handleClick,
  disabled,
}) {
  const { isDarkMode } = useDarkMode();
  const color = isDarkMode
    ? {
        bg:
          level === "low"
            ? "#00ff1aa3"
            : level === "mid"
              ? "#ffe100b1"
              : "#ff0000a6",
        border:
          level === "low" ? "#00ff1a" : level === "mid" ? "#ffff00" : "#ff0000",
      }
    : {
        bg:
          level === "low" ? "#00ff1a" : level === "mid" ? "#ffff00" : "#ff0000",
        border:
          level === "low" ? "#00ff1a" : level === "mid" ? "#ffff00" : "#ff0000",
      };
  return (
    <button
      className=" h-10 w-10 rounded-full border-2 text-center sm:h-12 sm:w-12 "
      style={{
        backgroundColor: isSelected ? color.bg : "transparent",
        borderColor: color.border,

        opacity: isSelected ? 1 : 0.5,
      }}
      onClick={handleClick}
      disabled={disabled}
    >
      {/* {isSelected ? "-" : ""} */}
    </button>
  );
}
