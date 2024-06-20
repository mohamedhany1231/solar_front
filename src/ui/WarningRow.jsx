import { MdExpandLess, MdExpandMore } from "react-icons/md";

function WarningRow({
  title,
  body,
  level,
  activeWarning,
  setActiveWarning,
  id,
}) {
  const isActive = activeWarning === id;

  function handleClick() {
    if (isActive) return setActiveWarning(null);
    setActiveWarning(id);
  }

  return (
    <li className=" ">
      <div className=" group mb-2 flex justify-between gap-1 align-middle ">
        <h5
          className="  cursor-pointer text-base font-bold italic sm:text-lg lg:text-2xl"
          onClick={handleClick}
        >
          {title}
        </h5>
        <button
          className="transform text-xl transition-all hover:scale-125 group-hover:text-main-400 sm:text-4xl  "
          onClick={handleClick}
        >
          {isActive ? <MdExpandLess /> : <MdExpandMore />}
        </button>
      </div>
      {isActive && (
        <p className=" mb-4 border-b border-gray-500 border-opacity-30  pb-4 text-sm text-gray-700 dark:border-opacity-30 dark:text-gray-400 sm:text-base lg:text-lg">
          {body}
        </p>
      )}
    </li>
  );
}

export default WarningRow;
