import { Link } from "react-router-dom";

function PanelHeaderItem({
  children,
  icon,
  linkTo,
  showIcon = true,
  handleClick,
}) {
  return (
    <Link
      className=" flex p-2 align-middle  shadow-sm transition-all  duration-300 hover:bg-stone-200 hover:text-main-900 dark:hover:bg-[#fff] sm:p-4 "
      to={linkTo}
      onClick={handleClick}
    >
      {showIcon && icon}
      <span className="sm:ml-5">{children}</span>
    </Link>
  );
}

export default PanelHeaderItem;
