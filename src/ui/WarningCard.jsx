import { MdExpandLess, MdExpandMore } from "react-icons/md";

function WarningCard({
  title,
  body,
  level,
  activeWarning,
  setActiveWarning,
  id,
  isDarkMode,
}) {
  const color = isDarkMode
    ? {
        bg:
          level === "advisory"
            ? "#00ff1aa3"
            : level === "caution"
              ? "#ffe100b1"
              : "#ff0000a6",
        border:
          level === "advisory"
            ? "#00ff1a"
            : level === "caution"
              ? "#ffff00"
              : "#ff0000",
      }
    : {
        bg:
          level === "advisory"
            ? "#00ff1a45"
            : level === "caution"
              ? "#ffff003d"
              : "#ff00004a",
        border:
          level === "advisory"
            ? "#00ff1a"
            : level === "caution"
              ? "#ffff00"
              : "#ff0000",
      };

  const isActive = activeWarning === id;

  function handleClick() {
    if (isActive) return setActiveWarning(null);
    setActiveWarning(id);
  }
  function handleClickTitle() {
    if (isActive) return;
    setActiveWarning(id);
  }

  return (
    <div
      className="rounded-md  border-2 bg-opacity-10 px-8 py-4 "
      style={{ backgroundColor: color.bg, borderColor: color.border }}
    >
      <div className="mb-6 flex justify-between align-middle">
        <h3
          className="  cursor-pointer text-3xl font-bold"
          onClick={handleClickTitle}
        >
          {title}
        </h3>
        <button
          className="transform text-4xl transition-all hover:scale-125 hover:text-gray-400 "
          onClick={handleClick}
        >
          {isActive ? <MdExpandLess /> : <MdExpandMore />}
        </button>
      </div>
      {isActive && <p className=" text-2xl">{body}</p>}
    </div>
  );
}

export default WarningCard;
