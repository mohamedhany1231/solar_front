import useLatestReading from "../hooks/readings/useLatestReading";
import { useParams } from "react-router-dom";
import Loader from "../ui/Loader";
import usePanel from "../hooks/panels/usePanel";
import * as dateFns from "date-fns";
import { SelectDate } from "../ui/SelectDate";
import Empty from "../ui/Empty";
function Panel() {
  const {
    id,
    day: paramsDay,
    month: paramsMonth,
    year: paramsYear,
  } = useParams();

  const date = new Date(
    paramsYear || dateFns.getYear(new Date()),
    paramsMonth - 1 || dateFns.getMonth(new Date()),
    paramsDay || new Date().getDate(),
  );
  const { reading, isLoading: isLoading2 } = useLatestReading(id, date);

  const { panel, isLoading } = usePanel(id);

  if (isLoading || isLoading2) return <Loader />;
  if (!reading)
    return <Empty resourceName={`readings at ${date.toDateString()} `} />;

  const { temperature, intensity, current, pressure, color } = reading;

  const stateEmoji =
    panel.state === "offline" ? "⚫" : panel.state === "online" ? "🟢" : "🔴";

  return (
    <div>
      <h2 className=" text-lg text-stone-900 dark:text-stone-50 sm:text-2xl  ">
        {stateEmoji} panel is currently
        <span className="ml-2 font-bold capitalize">{panel.state}</span>
      </h2>
      <h3 className=" translate-x-4 text-lg text-stone-500 opacity-70 dark:text-stone-200">
        {id}
      </h3>
      <div className="mt-10 border-t-2  border-stone-200 py-8 drop-shadow-sm   dark:border-main-800 ">
        <h3 className=" mb-5 text-center text-4xl font-bold text-stone-900 dark:text-stone-50">
          Panel Data
        </h3>
        <div className="grid gap-4 px-4 py-8 md:text-xl lg:grid-cols-[1fr_auto] 2xl:text-2xl">
          <div className="py-8">
            <div className="mb-4 grid grid-cols-2 py-6 shadow-sm hover:bg-stone-100 dark:hover:bg-main-800">
              <p className="">⚡ current</p>
              <p className=" text-right lg:text-center ">{current} mA</p>
            </div>
            <div className="mb-4 grid grid-cols-2 py-6 shadow-sm hover:bg-stone-100 dark:hover:bg-main-800">
              <p className="">🌡️ Temperature</p>
              <p className=" text-right lg:text-center ">
                {temperature} &deg;C
              </p>
            </div>
            <div className="mb-4 grid grid-cols-2 py-6 shadow-sm hover:bg-stone-100 dark:hover:bg-main-800">
              <p className="">🗜 pressure</p>
              <p className=" text-right lg:text-center ">{pressure} pa</p>
            </div>
            <div className="mb-4 grid grid-cols-2 py-6 shadow-sm hover:bg-stone-100 dark:hover:bg-main-800">
              <p className=""> ✨ intensity</p>
              <p className=" text-right lg:text-center ">{intensity} RH</p>
            </div>
            <div className="mb-4 grid grid-cols-2 py-6 shadow-sm hover:bg-stone-100 dark:hover:bg-main-800">
              <p className="">🎨 Color</p>
              <p className=" text-right lg:text-center ">{color} cd</p>
            </div>
          </div>
          <div className="overflow-hidden bg-stone-100 p-6 shadow-lg dark:bg-main-950 ">
            <h3 className=" mb-5 text-3xl uppercase"> reads</h3>
            <SelectDate />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Panel;
