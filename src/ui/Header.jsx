import { Link } from "react-router-dom";
import ToggleDarkMode from "./ToggleDarkMode";

import { slide as Menu } from "react-burger-menu";
import useUser from "../hooks/user/useUser";

function Header() {
  const { user, isLoading } = useUser();

  if (isLoading) return null;
  return (
    <header className="flex items-center justify-between  gap-8 border-b    px-20  uppercase dark:border-main-700   ">
      <Link
        to="settings"
        className="hover:stone-500 h-full py-2  text-xl transition-transform hover:scale-110 "
      >
        <img
          src={user?.photo || "/no-picture.webp"}
          alt="profile "
          className="h-14 w-14 rounded-full object-cover"
        />
      </Link>

      <div className="flex gap-10">
        <ToggleDarkMode />
      </div>
    </header>
  );
}

export default Header;
