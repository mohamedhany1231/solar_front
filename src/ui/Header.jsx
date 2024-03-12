import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex gap-8 bg-stone-50  stroke-neutral-600 opacity-75 items-center justify-center border-b px-3  uppercase sm:px-6 ">
      <Link
        to="."
        className="hover:stone-500 hover:translate-y-[-0.25rem] hover:underline  transition-transform text-xl h-full py-6"
      >
        Home
      </Link>
      <Link
        to="panel"
        className="hover:stone-500 hover:translate-y-[-0.25rem] hover:underline  transition-transform text-xl h-full py-6"
      >
        Panel
      </Link>
      <Link
        to="account"
        className="hover:stone-500 hover:translate-y-[-0.25rem] hover:underline  transition-transform text-xl h-full py-6"
      >
        Account
      </Link>
    </header>
  );
}

export default Header;
