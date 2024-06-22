import { ImPower } from "react-icons/im";
import AnalyticsCard from "./AnalyticsCard";
import { FaBatteryFull, FaBatteryHalf, FaSun } from "react-icons/fa";
import { MdBatteryCharging80, MdLightbulb } from "react-icons/md";
import useRecentReadings from "../hooks/readings/useRecentReadings";
import Loader from "./Loader";
import { GiSpeedometer } from "react-icons/gi";
import { useParams } from "react-router-dom";
import * as dateFns from "date-fns";
import Empty from "./Empty";

import { BsThermometerSun } from "react-icons/bs";

function AnalyticsCards() {
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

  const weakReadings = readings.slice(0, 6);
  const data = weakReadings.reduce((acc, read) => {
    return {
      power: acc.power || 0 + read.power,
      temperature: acc.temperature || 0 + read.temperature,
      pressure: acc.pressure || 0 + read.pressure,
      intensity: acc.intensity || 0 + read.intensity,
    };
  }, {});

  return (
    <>
      <AnalyticsCard
        value={data.power}
        color={"#4c36fa"}
        icon={<ImPower />}
        label={"power"}
        unit="kw"
      />
      <AnalyticsCard
        value={data.temperature}
        color={"#82ca9d"}
        icon={<BsThermometerSun />}
        label={"temperature"}
        unit="°C"
      />
      <AnalyticsCard
        value={data.intensity}
        color={"#ff2f2f"}
        icon={<MdLightbulb />}
        label={"intensity"}
        unit="lux"
      />
      <AnalyticsCard
        value={data.pressure}
        color={"#ff9e30"}
        icon={<GiSpeedometer />}
        label={"pressure"}
        unit="pa"
      />
    </>
  );
}

export default AnalyticsCards;
