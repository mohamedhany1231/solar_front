import { Link, useLocation } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";

export function AsideItem({
  children,
  icon,
  linkTo,
  showIcon = true,
  handleClick,
  isCentered = false,
}) {
  const { pathname: path } = useLocation();
  const { isDarkMode } = useDarkMode();

  return (
    <Link
      className={` flex ${isCentered && "justify-center"}  p-2 align-middle  shadow-sm transition-all  duration-300 hover:bg-stone-200  dark:hover:bg-main-800 sm:p-4 `}
      to={linkTo}
      onClick={handleClick}
    >
      <div
        className=" flex items-center "
        style={
          path === linkTo
            ? isDarkMode
              ? { color: "#2665B0" }
              : { color: "#173D6A" }
            : {}
        }
      >
        <span className=" mr-2">{showIcon && icon}</span>
        <span className="sm:ml-5">{children}</span>
      </div>
    </Link>
  );
}
