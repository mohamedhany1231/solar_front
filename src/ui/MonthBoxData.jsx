import { useParams } from "react-router-dom";
import Loader from "./Loader";
import useMonthlyReadings from "../hooks/readings/useMonthlyReadings";

export function MonthBoxData({ year, month }) {
  const { id } = useParams();

  const { isLoading, readings } = useMonthlyReadings(id, new Date(year, month));
  if (isLoading) return <Loader />;
  const powerMonth = readings[readings.length - 1];
  return (
    <div>
      <div className=" flex justify-between gap-4 border-b px-2 py-2 text-base dark:border-main-800  sm:px-4 sm:text-xl ">
        <p>Power Generated</p>
        <p className=" text-main-700 dark:text-main-400">
          {powerMonth?.power}kw
        </p>
      </div>
      <div className=" flex justify-between gap-4 border-b px-4  py-2 text-base dark:border-main-800 sm:text-xl ">
        <p>Month</p>
        <p className="  opacity-40">
          {year}-{month}
        </p>
      </div>
    </div>
  );
}
