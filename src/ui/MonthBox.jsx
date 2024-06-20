import { MdSunny } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import usePanel from "../hooks/panels/usePanel";
import * as dateFns from "date-fns";

export function MonthBox({
  month,
  year,
  select,
  isSelected,
  isHighlighted,
  index,
}) {
  const { id } = useParams();
  const { panel, isLoading } = usePanel(id);

  if (isLoading) return <Loader />;

  const inActive =
    dateFns.isAfter(
      new Date(panel.createdAt),
      new Date(year, index, dateFns.getDaysInMonth(index)),
    ) || dateFns.isBefore(new Date(), new Date(year, index));

  const handleClick = () => {
    if (inActive) return;
    select();
  };

  return (
    <div
      onClick={handleClick}
      className={`${inActive ? "opacity-10" : "cursor-pointer dark:hover:border-main-700"} grid  grid-rows-[auto_1fr_auto] gap-2 rounded-2xl border-2 bg-opacity-10 px-3 py-2 text-center transition-colors xl:px-6 xl:py-4 ${inActive || (isHighlighted ? "border-stone-500 dark:border-stone-500" : "dark:border-main-800")}    ${isSelected && "border-4 bg-main-400 bg-opacity-50  dark:bg-main-400"}  `}
    >
      <h4 className=" text-xl uppercase sm:text-3xl">{month}</h4>
      <div className=" text-3xl sm:text-5xl ">
        <div className=" mx-auto inline-block">
          <MdSunny />
        </div>
      </div>
    </div>
  );
}
