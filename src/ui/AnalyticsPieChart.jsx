import { useState } from "react";
import { useParams } from "react-router-dom";
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
import useRecentReadings from "../hooks/readings/useRecentReadings";

import Loader from "./Loader";
import * as dateFns from "date-fns";
import Empty from "./Empty";

const colors = [
  "#8884d8", // Base color
  "#84d888", // Complementary color 1
  "#d88488", // Complementary color 2
  "#d884b2", // Complementary color 2
  "#d8af84", // Complementary color 3
  "#84d8d8", // Analogous color 1
  "#d8d884", // Analogous color 2
  "#888888", // Neutral color
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g className="">
      <text
        x={cx}
        y={cy}
        dominantBaseline="middle"
        className="text-xl"
        textAnchor="middle"
        fill={fill}
      >
        {payload?.label.substring(0, 3)} {payload?.labelSub}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#808080"
      >{`${payload?.current}W`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

function AnalyticsPieChart() {
  const [active, setActive] = useState(1);

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

  const weekReadings = readings.slice(0, 7);
  const currentYear = dateFns.getYear(Date.now());
  const data = weekReadings.map((read) => {
    return {
      ...read,
      label: `${dateFns.format(
        new Date(currentYear, read.date.month, read.date.day),
        "EEEE",
      )} \n   `,
      labelSub: `${read.date.month}/${read.date.day}`,
    };
  }, {});

  // const onPieEnter = (_, index) => {
  //   this.setState({
  //     activeIndex: index,
  //   });
  // };
  return (
    <ResponsiveContainer
      className=" overflow-visible"
      width={"100%"}
      height={"100%"}
    >
      <PieChart>
        <Pie
          data={data}
          dataKey="current"
          nameKey="label"
          cx="50%"
          cy="50%"
          innerRadius={"55%"}
          outerRadius={"70%"}
          fill="#82ca9d"
          label={({ label }) => label}
          paddingAngle={5}
          // onMouseEnter={onPieEnter}
          activeIndex={active}
          activeShape={renderActiveShape}
          onMouseLeave={() => setActive(1)}
        >
          {data.map((data, i) => (
            <Cell
              onMouseEnter={() => setActive(i)}
              key={`cell-${i}`}
              fill={colors[i]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default AnalyticsPieChart;
