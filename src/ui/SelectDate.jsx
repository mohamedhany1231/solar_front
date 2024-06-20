import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from "react-icons/ri";
import { useState } from "react";
import { getDaysInMonth } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import usePanel from "../hooks/panels/usePanel";
import * as dateFns from "date-fns";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { MonthBoxData } from "./MonthBoxData";
import { MonthBox } from "./MonthBox";

export function SelectDate() {
  const {
    day: paramsDay,
    month: paramsMonth,
    year: paramsYear,
    id,
  } = useParams();

  const navigate = useNavigate();

  const date = new Date(
    paramsYear || dateFns.getYear(new Date()),
    paramsMonth - 1 || dateFns.getMonth(new Date()),
    paramsDay || new Date().getDate(),
  );
  const day = new Date(date).getDate();
  const [month, setMonth] = useState(dateFns.getMonth(date));
  const [year, setYear] = useState(dateFns.getYear(date));

  const [monthGroup, setMonthGroup] = useState(Math.floor(month / 2));

  const { panel, isLoading } = usePanel(id);

  const startIndex = monthGroup * 2;

  const isLowestYear = dateFns.isSameYear(
    new Date(panel.createdAt),
    new Date(year, month),
  );
  const isHighestYear = dateFns.isSameYear(new Date(year, month), new Date());

  const isLowestMonth =
    isLowestYear &&
    dateFns.isSameMonth(new Date(panel.createdAt), new Date(year, month));
  const isHighestMonth =
    isHighestYear &&
    (dateFns.isSameMonth(new Date(year, month), new Date()) ||
      dateFns.isAfter(new Date(year, month), new Date()));
  function incrementYear() {
    if (isHighestYear) return;
    setYear((y) => y + 1);
  }
  function decrementYear() {
    if (isLowestYear) return;

    setYear((y) => y - 1);
  }

  function incrementMonthGroup() {
    if (isHighestMonth) return;
    if (monthGroup === 5) {
      setMonthGroup(0);
      incrementYear();
      return setMonth(0);
    }
    setMonthGroup((month) => month + 1);
    setMonth((m) => m + 2);
  }
  function decrementMonthGroup() {
    if (isLowestMonth) return;
    if (monthGroup === 0) {
      setMonthGroup(5);
      decrementYear();
      return setMonth(11);
    }
    setMonthGroup((month) => month - 1);
    if (
      dateFns.isAfter(
        new Date(panel.createdAt),
        new Date(year, month - 2, dateFns.getDaysInMonth(month - 2)),
      )
    )
      setMonth((m) => m - 1);
    else setMonth((m) => m - 2);
  }

  const data = [
    { date: new Date(2000, 0), index: 0 },
    { date: new Date(2000, 1), index: 1 },
    { date: new Date(2000, 2), index: 2 },
    { date: new Date(2000, 3), index: 3 },
    { date: new Date(2000, 4), index: 4 },
    { date: new Date(2000, 5), index: 5 },
    { date: new Date(2000, 6), index: 6 },
    { date: new Date(2000, 7), index: 7 },
    { date: new Date(2000, 8), index: 8 },
    { date: new Date(2000, 9), index: 9 },
    { date: new Date(2000, 10), index: 10 },
    { date: new Date(2000, 11), index: 11 },
  ];

  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  const visibleMonths = data.slice(startIndex, startIndex + 2);

  const daysInMonth = getDaysInMonth(data[month].date);

  if (isLoading) return <Loader />;

  return (
    <div className=" flex flex-col gap-4 px-2 sm:px-4 ">
      <div className=" grid grid-rows-[1fr_auto] gap-4">
        <div className=" grid grid-cols-[auto_1fr_auto] items-center gap-6 sm:gap-0">
          <div>
            {isLowestYear || (
              <button
                className="  p-2  text-4xl  sm:text-3xl"
                onClick={decrementYear}
              >
                <MdArrowBackIos />
              </button>
            )}
          </div>
          <div
            className={` text-center text-4xl font-bold  ${year === dateFns.getYear(date) && "text-main-400 "}`}
          >
            {year}
          </div>

          <div>
            {isHighestYear || (
              <button
                className="  p-2  text-4xl  sm:text-3xl"
                onClick={incrementYear}
                disabled={year + 1 > dateFns.getYear(Date.now())}
              >
                <MdArrowForwardIos />
              </button>
            )}
          </div>
        </div>

        <div className=" grid grid-cols-[auto_1fr_auto] items-center gap-6 sm:gap-0">
          <div>
            {isLowestMonth || (
              <button
                className=" transform text-4xl transition-transform hover:translate-x-[-0.25rem] sm:text-6xl lg:text-4xl xl:text-6xl"
                onClick={decrementMonthGroup}
              >
                <RiArrowLeftDoubleFill />
              </button>
            )}
          </div>
          <div className=" flex flex-col flex-nowrap justify-center  gap-4 ">
            {visibleMonths.map((m, i) => (
              <MonthBox
                month={months[dateFns.getMonth(m.date)]}
                year={year}
                index={startIndex + i}
                isSelected={
                  dateFns.getMonth(date) === m.index &&
                  year === dateFns.getYear(date)
                }
                isHighlighted={month === m.index}
                select={() => {
                  setMonth(m.index);
                  setYear(year);
                }}
              />
            ))}
          </div>
          <div>
            {isHighestMonth || (
              <button
                className=" transform text-4xl transition-transform hover:translate-x-1 sm:text-6xl lg:text-4xl xl:text-6xl"
                onClick={incrementMonthGroup}
              >
                <RiArrowRightDoubleFill />
              </button>
            )}
          </div>
        </div>

        <div className=" grid grid-cols-6 gap-2 text-lg text-gray-500 sm:grid-cols-8 md:grid-cols-12 lg:gap-x-2 ">
          {Array.from(Array(daysInMonth)).map((e, i) => {
            if (dateFns.isAfter(new Date(year, month, i + 1), new Date())) {
              return;
            }
            if (
              panel.createdAt &&
              dateFns.isBefore(
                new Date(year, month, i + 1),
                new Date(panel.createdAt),
              )
            )
              return;
            return (
              <span
                onClick={() => {
                  navigate(`/panel/${id}/${year}/${month + 1}/${i + 1}`);
                }}
                className={`h-fit cursor-pointer text-center text-xl  sm:text-2xl lg:text-lg  ${day === i + 1 && month === dateFns.getMonth(date) && year === dateFns.getYear(date) && "text-main-400"} hover:text-main-500 `}
              >
                {i + 1}
              </span>
            );
          })}
        </div>
      </div>

      <MonthBoxData year={year} month={month} />
    </div>
  );
}
