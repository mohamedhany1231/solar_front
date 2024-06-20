import AnalyticsCards from "../ui/AnalyticsCards";
import AnalyticsChart from "../ui/AnalyticsChart";
import AnalyticsBarChart from "../ui/AnalyticsBarChart";
import AnalyticsPieChart from "../ui/AnalyticsPieChart";

function Analytics() {
  return (
    <div className=" grid h-full grid-cols-12  grid-rows-[auto_auto_auto_1fr] gap-6 sm:grid-cols-12   sm:grid-rows-[auto_auto_1fr]   lg:gap-10 xl:gap-16">
      <div className=" col-span-8 row-span-2 lg:col-span-6">
        <AnalyticsPieChart />
      </div>
      <div className=" col-span-4 row-span-2 grid grid-cols-1 gap-4 lg:col-span-6 lg:grid-cols-[1fr_1fr]   ">
        <AnalyticsCards />
      </div>

      <div className="col-span-12 self-center lg:col-span-7">
        <AnalyticsChart />
      </div>

      <div className=" col-span-12 self-end lg:col-span-5">
        <AnalyticsBarChart />
      </div>
    </div>
  );
}

export default Analytics;
