import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../context/DarkModeContext";
import useRecentReadings from "../hooks/readings/useRecentReadings";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
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

function AnalyticsChart() {
  const { isDarkMode } = useDarkMode();
  const {
    id,
    day: paramsDay,
    month: paramsMonth,
    year: paramsYear,
  } = useParams();
  const { readings, isLoading } = useRecentReadings(
    id,
    new Date(
      paramsYear || dateFns.getYear(new Date()),
      paramsMonth - 1 || dateFns.getMonth(new Date()),
      paramsDay || new Date().getDate(),
    ),
  );

  if (isLoading) return <Loader />;
  if (readings.length === 0) return <Empty resourceName={`readings `} />;

  const processedReadings = readings.map((r) => {
    return {
      power: r.power,
      label: `${months[r.date.month]} ${r.date.day}`,
    };
  });

  const colors = isDarkMode
    ? {
        power: { stroke: "#4841ce", fill: "#4f46e5" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        power: { stroke: "#4f46e5", fill: "#c7d2fe" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <>
      <ResponsiveContainer width={"100%"} height={600}>
        <AreaChart data={processedReadings}>
          <XAxis
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            dataKey={"label"}
          />
          <YAxis
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            unit={"W"}
          />
          <CartesianGrid strokeDasharray={4} />
          <Area
            dataKey={"power"}
            stroke={colors.power.stroke}
            fill={colors.power.fill}
            strokeWidth={3}
          />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}

export default AnalyticsChart;
