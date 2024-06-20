import { useNavigate } from "react-router-dom";

export function PanelCard({ title, location, status, warningsCount }) {
  const navigate = useNavigate();
  const stateEmoji =
    status === "offline" ? "⚫ " : status === "online" ? "🟢" : "🔴";

  return (
    <div
      onClick={() => navigate("/panel")}
      className="  grid cursor-pointer grid-cols-1 gap-4 rounded-2xl border py-4 transition-colors hover:border-main-300 dark:border-main-700 dark:hover:border-main-500 sm:grid-cols-[1fr_2fr] sm:gap-0 sm:py-6"
    >
      <span className=" mx-auto flex w-[80%] items-center justify-center border-b px-4 sm:w-auto sm:border-b-0 sm:pb-0">
        <img src="./solar.png" alt="solar panel" />
      </span>
      <div className="  pl-2 text-sm dark:border-main-800 sm:border-l-2 sm:text-lg md:pl-8 md:text-xl">
        <h3 className=" mb-4  text-xl text-gray-700 dark:text-gray-300 sm:text-2xl md:text-3xl">
          {title}
        </h3>
        <div className=" px-2">
          <p>
            {stateEmoji} {status}
          </p>
          <p>⚠️ {warningsCount} warnings</p>
          <p className=" mt-2 text-gray-700 dark:text-gray-300"> {location}</p>
        </div>
      </div>
    </div>
  );
}
