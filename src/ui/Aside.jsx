import { Link } from "react-router-dom";

import Icon from "./Icon";
import ToggleDarkMode from "./ToggleDarkMode";
import { MdMenu } from "react-icons/md";
import { useState } from "react";
import NavLinks from "./NavLinks";

function Aside({ isLargeScreen }) {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);
  return (
    <nav className="flex items-center gap-4 bg-main-50 p-4 text-main-900 shadow-xl dark:bg-main-900 dark:text-[#fff] dark:shadow-main-800 sm:p-6 lg:grid lg:h-[100vh] lg:grid-rows-[auto_1fr] lg:items-start lg:p-10 ">
      <div className=" grow lg:mb-10">
        <Icon />
      </div>
      {(isOpen || isLargeScreen) && (
        <NavLinks isLargeScreen={isLargeScreen} close={close} />
      )}
      <button className=" text-5xl lg:hidden " onClick={() => setIsOpen(true)}>
        <MdMenu />
      </button>
      <span className=" lg:hidden ">
        <ToggleDarkMode />
      </span>
    </nav>
  );
}

export default Aside;
