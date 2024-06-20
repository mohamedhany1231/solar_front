import { useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import Loader from "./Loader";
import useUser from "../hooks/user/useUser";
import WarningLevelList from "./WarningLevelList";

export function PanelWarningCard({ panel: { name, id, warnings } }) {
  const { isDarkMode } = useDarkMode();
  const [activeWarning, setActiveWarning] = useState(null);

  const { user, isLoading } = useUser();

  if (warnings.length === 0) return;

  if (isLoading) return <Loader />;

  function categorizeWarnings(warnings) {
    const warningsObj = { low: [], mid: [], high: [] };

    warnings.forEach((warning) =>
      warningsObj[user.settings[warning.type] || "mid"].push(warning),
    );
    return warningsObj;
  }

  const categorizedWarnings = categorizeWarnings(warnings);

  return (
    <div
      className=" grid grid-rows-[auto_auto] gap-8 rounded-xl border border-main-200 border-opacity-80 p-2
     pb-8  dark:border-main-700 sm:rounded-3xl sm:p-4 md:grid-cols-[1fr_2fr] md:grid-rows-1 md:gap-20 md:p-8"
    >
      <div className=" flex justify-center md:pt-10">
        <img
          src="./solar.png"
          alt="solar panel"
          className=" max-h-36 md:max-h-[20vh]"
        />
      </div>
      <div className=" border-gray-600 border-opacity-10 pl-2 dark:border-gray-400 dark:border-opacity-10 sm:pl-4 md:border-l-2 md:pl-10 ">
        <h3
          className={
            " mb-6 pl-8 text-2xl font-bold text-gray-600 dark:text-gray-400 sm:text-3xl lg:text-5xl "
          }
        >
          {name}
        </h3>
        <div className=" flex flex-col gap-6">
          <WarningLevelList
            warnings={categorizedWarnings.high}
            header={"🔴 Critical"}
            activeWarning={activeWarning}
            setActiveWarning={setActiveWarning}
          />
          <WarningLevelList
            warnings={categorizedWarnings.mid}
            header={"🟡 caution"}
            activeWarning={activeWarning}
            setActiveWarning={setActiveWarning}
          />
          <WarningLevelList
            warnings={categorizedWarnings.low}
            header={"🟢 advisory"}
            activeWarning={activeWarning}
            setActiveWarning={setActiveWarning}
          />
        </div>
      </div>
    </div>
  );
}
