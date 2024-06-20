import { useParams } from "react-router-dom";
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
import useRecentReadings from "../hooks/readings/useRecentReadings";
import Loader from "./Loader";
import { useDarkMode } from "../context/DarkModeContext";
import useMonthlyReadings from "../hooks/readings/useMonthlyReadings";
import * as dateFns from "date-fns";
import Empty from "./Empty";

const months = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

function AnalyticsBarChart() {
  const {
    id,
    day: paramsDay,
    month: paramsMonth,
    year: paramsYear,
  } = useParams();
  const { readings, isLoading } = useMonthlyReadings(
    id,
    new Date(
      paramsYear || dateFns.getYear(new Date()),
      paramsMonth - 1 || dateFns.getMonth(new Date()),
      paramsDay || new Date().getDate(),
    ),
  );
  const { isDarkMode } = useDarkMode();

  if (isLoading) return <Loader />;
  if (readings.length === 0) return <Empty resourceName={`readings `} />;

  const processedReadings = readings.map((r) => {
    return {
      current: r.current,
      label: `${months[r.date.month]}`,
    };
  });

  const colors = isDarkMode
    ? {
        current: { stroke: "#FFAC34", fill: "#feb855" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        current: { stroke: "#FFAC34", fill: "#feb855" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <ResponsiveContainer width={"100%"} height={600}>
      <BarChart data={processedReadings}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="label"
          tick={{ fill: colors.text }}
          tickLine={{ stroke: colors.text }}
        />
        <YAxis
          unit="J"
          tick={{ fill: colors.text }}
          tickLine={{ stroke: colors.text }}
        />
        <Legend />
        <Bar
          dataKey="current"
          fill={colors.current.fill}
          stroke={colors.current.stroke}
        />
        {/* <Bar dataKey="used" fill="#FFF034" />
        <Bar dataKey="saved" fill="#FFAC34" /> */}
        <Tooltip contentStyle={{ backgroundColor: colors.background }} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default AnalyticsBarChart;
