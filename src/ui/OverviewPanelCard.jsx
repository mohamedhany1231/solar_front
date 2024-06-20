import { useNavigate } from "react-router-dom";
import useLatestReading from "../hooks/readings/useLatestReading";
import Loader from "./Loader";

export function OverviewPanelCard({
  title,
  location,
  status,
  warningsCount,
  power,
  id,
}) {
  const navigate = useNavigate();
  const color =
    status === "offline"
      ? "#888888"
      : status === "online"
        ? "#11ff00"
        : "#ff2222";

  const { reading, isLoading } = useLatestReading(id);

  if (isLoading) return <Loader />;

  return (
    <div
      onClick={() => navigate(`/panel/${id}`)}
      className="   grid cursor-pointer grid-cols-[1fr_2fr] gap-4 rounded-2xl bg-stone-100 py-4 shadow-lg  transition-colors hover:border hover:border-main-200 dark:border-orange-500 dark:bg-main-800 dark:hover:border-orange-200 sm:gap-0 sm:py-6"
    >
      <span className=" dark:border-main-700w-auto mx-auto flex items-center justify-center px-4 pb-0">
        <img src="./solar.png" alt="solar panel" />
      </span>
      <div className="  border-l pl-2 text-sm dark:border-main-700 sm:text-base xl:pl-8 xl:text-lg">
        <div className=" flex flex-col justify-between px-2 sm:flex-row">
          <h3 className=" bold mb-4 text-center  text-lg text-gray-700 dark:text-gray-300 sm:text-xl md:text-2xl">
            {title}
          </h3>
          <p>
            ⚡ {reading.current}
            <span className=" text-sm sm:text-base">kwh</span>
          </p>
        </div>
        <p className=" mt-2 pl-4 sm:mt-0 sm:pl-0" style={{ color }}>
          {status}
        </p>
      </div>
    </div>
  );
}
