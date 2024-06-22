import { FaExclamationTriangle } from "react-icons/fa";
import { FaBolt, FaThinkPeaks } from "react-icons/fa6";
import { PiPlugsConnectedFill } from "react-icons/pi";
import { OverviewCard } from "../ui/OverviewCard";
import OverviewBarChart from "../ui/OverviewBarChart";
import { GiSpeedometer } from "react-icons/gi";

import { TbSolarPanel2 } from "react-icons/tb";
import { OverviewPanelCard } from "../ui/OverviewPanelCard";
import usePeakPerformanceTime from "../hooks/readings/usePeakPerformanceTime";
import Loader from "../ui/Loader";
import usePanels from "../hooks/panels/usePanels";
import useBestPanel from "../hooks/panels/useBestPanel";
import useTotalEnergy from "../hooks/readings/useTotalEnergy";
import { BsThermometerSun } from "react-icons/bs";
import useUser from "../hooks/user/useUser";
import Empty from "../ui/Empty";

function Overview() {
  const { isLoading: loadingUser, user } = useUser();
  const { time, isLoading: isLoading1 } = usePeakPerformanceTime();
  const { panels, isLoading: isLoading2 } = usePanels();
  const { panel: bestPanel, isLoading: isLoading3 } = useBestPanel();
  const { reading: totalEnergy, isLoading: isLoading4 } = useTotalEnergy();

  const isLoading =
    isLoading1 || isLoading2 || isLoading3 || isLoading4 || loadingUser;
  if (isLoading) return <Loader />;
  if (user?.panels?.length === 0) return <Empty resourceName={`panels `} />;

  const warningsCount = panels.reduce(
    (acc, panel) => panel.warnings.length + acc,
    0,
  );
  const onlinePanelsCount = panels.filter(
    (panel) => panel.status === "online",
  ).length;
  return (
    <div>
      <h2 className=" mb-8 text-center text-2xl font-bold md:text-3xl lg:text-4xl">
        Overview
      </h2>

      <div className=" grid grid-cols-5 gap-2 md:gap-5">
        <div className=" col-span-5 grid grid-cols-6 grid-rows-2 gap-2  md:col-span-3 md:gap-4">
          <div className=" col-span-6 flex justify-stretch md:col-span-3">
            <OverviewCard
              title={"Energy Generated"}
              icon={<FaBolt />}
              value={totalEnergy.power}
              unit={"kw"}
            />
          </div>
          <div className=" col-span-3 flex">
            <OverviewCard
              title={"average temperature"}
              icon={<BsThermometerSun />}
              value={totalEnergy.temperature}
              unit={"°c"}
            />
          </div>

          <OverviewCard
            title={"Online Panels"}
            icon={<PiPlugsConnectedFill />}
            value={onlinePanelsCount}
            unit={`/${panels.length}`}
          />
          <OverviewCard
            title={"Alerts"}
            icon={<FaExclamationTriangle />}
            value={warningsCount}
            unit={"warnings"}
          />
          <OverviewCard
            title={"average pressure"}
            icon={<GiSpeedometer />}
            value={40}
            unit={"pa"}
          />
        </div>
        <div className=" col-span-5 grid grid-cols-6 gap-2 border-gray-200 dark:border-main-700 md:col-span-2 md:grid-cols-2 md:gap-4 md:border-l md:px-4 ">
          <OverviewCard
            icon={<FaThinkPeaks />}
            title={"Peak performance time"}
            value={`${time.startTime}:00 to ${time.endTime}:00`}
            iconBg="#7fff43"
          />

          <OverviewCard
            icon={<TbSolarPanel2 />}
            title={"Best preforming panel"}
            value={bestPanel.name}
            iconBg={"#fba13b"}
            largeText={true}
          />
        </div>
        <div className=" col-span-5 mt-6 md:col-span-3">
          <OverviewBarChart />
        </div>
        <div className="col-span-5 border-gray-200  p-4 dark:border-main-700 md:col-span-2 md:border-l ">
          <div
            className=" grid  gap-4 
           sm:grid-cols-2 md:grid-cols-1 "
          >
            {panels.map((panel) => (
              <OverviewPanelCard
                id={panel.id}
                key={panel.id}
                title={panel.name}
                location={panel.location}
                status={panel.status}
                // power={Math.random() * 1000}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
