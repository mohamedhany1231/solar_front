import { useParams } from "react-router-dom";
import { AsideItem } from "./AsideItem";
import { IoGrid } from "react-icons/io5";
import { FaChartLine, FaGears } from "react-icons/fa6";
import useUser from "../hooks/user/useUser";
import Loader from "./Loader";
import usePanels from "../hooks/panels/usePanels";
import * as dateFns from "date-fns";
import { FaArrowAltCircleLeft } from "react-icons/fa";

export function PanelHeader() {
  const {
    id,
    day: paramsDay,
    month: paramsMonth,
    year: paramsYear,
  } = useParams();
  const { panels, isLoading } = usePanels([]);
  const { user, isLoading: isLoading2 } = useUser();

  if (isLoading || isLoading2) return <Loader />;

  let panel = panels.find((pan) => id === pan.id);

  const year = paramsYear || dateFns.getYear(new Date());
  const month = paramsMonth - 1 || dateFns.getMonth(new Date());
  const day = paramsDay || new Date().getDate();
  dateFns.isSameDay(new Date(year, month, day), new Date());

  return (
    <header className=" grid grid-cols-2 items-center justify-around gap-4 bg-main-950  bg-opacity-10 text-lg shadow-xl dark:bg-opacity-30 sm:flex sm:text-2xl md:text-3xl">
      {dateFns.isSameDay(new Date(year, month, day), new Date()) || (
        <AsideItem
          isCentered={true}
          icon={<FaArrowAltCircleLeft />}
          linkTo={`/panel/${id}/${dateFns.getYear(new Date())}/${dateFns.getMonth(new Date()) + 1}/${new Date().getDate()}`}
        >
          back to present
          <p className=" text-center text-base text-stone-400 ">{`${year}-${Number(month) + 1}-${day}`}</p>
        </AsideItem>
      )}

      <AsideItem
        isCentered={true}
        icon={<IoGrid />}
        linkTo={`/panel/${id}/${year}/${Number(month) + 1}/${day}`}
      >
        panel
      </AsideItem>

      <AsideItem
        isCentered={true}
        icon={<FaChartLine />}
        linkTo={`/analytics/${id}/${year}/${Number(month) + 1}/${day}`}
      >
        Analytics
      </AsideItem>
      {(user?.id === panel?.manger || user?.role === "admin") && (
        <AsideItem
          isCentered={true}
          icon={<FaGears />}
          linkTo={`/mange-access/${id}`}
        >
          mange panel
        </AsideItem>
      )}
    </header>
  );
}
