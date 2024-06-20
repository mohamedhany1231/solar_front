import { Link } from "react-router-dom";

function Button({ children, disabled, to, type = "primary", onClick }) {
  const base =
    " inline-block rounded-full bg-yellow-400   font-semibold uppercase tracking-wide text-stone-800 transition-colors  duration-300 hover:bg-yellow-300 focus:outline-none focus:ring-2  focus:ring-yellow-400 focus:ring-offset-2  disabled:cursor-not-allowed text-sm";

  const styles = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    round: base + " px-3 py-2 md:px-4 md:py-2.5 text-sm font-semibold",
    small: base + " px-4 py-2 md: px-5 py-2.5 text-xs",
    secondary:
      " inline-block rounded-full bg-stone-100   font-semibold uppercase  border border-stone-400 tracking-wide text-stone-400 transition-colors  duration-300 hover:bg-stone-300 focus:outline-none focus:ring-2 hover:text-stone-700 focus:text-sone-700 focus:ring-stone-400 focus:ring-offset-2  disabled:cursor-not-allowed px-4 py-3 md:px-6 md:py-4 text-sm",
  };
  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} className={styles[type]} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
