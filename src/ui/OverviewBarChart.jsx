import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useWeeklyOverview from "../hooks/readings/useWeeklyOverview";
import Loader from "./Loader";

function OverviewBarChart() {
  const { readings, isLoading } = useWeeklyOverview();

  if (isLoading) return <Loader />;

  return (
    <ResponsiveContainer width={"100%"} height={600}>
      <BarChart data={readings}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="panel.name" />
        <YAxis unit="KW" />
        <Legend />
        <Bar dataKey="current" fill="#FFAC34" />
        <Tooltip contentStyle={{ backgroundColor: "#18212f" }} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default OverviewBarChart;
