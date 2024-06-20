import useUpdateSettings from "../hooks/user/useUpdateSettings";
import useUser from "../hooks/user/useUser";
import Loader from "./Loader";
import WarningSettingHeader from "./WarningSettingHeader";
import WarningsSettingRow from "./WarningsSettingRow";

const activeWarnings = [
  {
    title: "High Temperature Alert",
    body: "The solar panel is operating at an unusually high temperature. This may be due to a lack of ventilation around the panels, extended exposure to direct sunlight without adequate cooling, or ambient temperature spikes. It is recommended to check the installation for any potential obstructions, ensure proper airflow, and monitor the temperature closely to prevent overheating, which could cause damage to the panels or other components of the system.",
    level: "caution",
  },
  {
    title: "Low Power Output",
    body: "The power output is significantly lower than expected. This issue could be caused by various factors, such as shading on the panels, dust accumulation, or equipment degradation over time. We recommend inspecting the panels for any obstructions or damage, cleaning them if necessary, and verifying the integrity of electrical connections. Consistent low output may warrant a professional assessment to diagnose the issue.",
    level: "caution",
  },
  {
    title: "Voltage Fluctuation",
    body: "The solar panel system is experiencing voltage fluctuations. This may be a result of changes in sunlight intensity, environmental factors, or electrical system instability. These fluctuations can affect the performance of connected devices and appliances. Monitor the situation and consider installing a voltage regulator or surge protector to protect your equipment and maintain consistent power delivery.",
    level: "advisory",
  },
  {
    title: "Inverter Error",
    body: "The system's inverter has reported an error. This could indicate a malfunction in the inverter or related components, such as wiring or connections. Inverters play a critical role in converting solar energy to usable electricity, so it's important to investigate the error message, check for loose connections, and consider professional repair if necessary. Continued operation with a faulty inverter may cause further damage to the system.",
    level: "critical",
  },
  {
    title: "Maintenance Required",
    body: "Regular maintenance is overdue. It is essential to keep the solar panel system in optimal condition by conducting routine inspections, cleaning, and upkeep. This includes checking for debris on the panels, testing electrical connections, and verifying the performance of inverters and other components. Delaying maintenance can lead to decreased efficiency, performance issues, and potential safety hazards.",
    level: "advisory",
  },
  {
    title: "Obstruction Detected",
    body: "An obstruction has been detected, potentially affecting panel performance. This obstruction could be due to tree branches, debris, or other objects blocking sunlight from reaching the panels. To maintain optimal energy production, inspect the area around the panels and clear any obstructions. Failure to do so may lead to decreased power generation and uneven wear on the panels.",
    level: "caution",
  },
  {
    title: "Grid Connection Lost",
    body: "The system has lost its connection to the grid. Check the grid connection immediately to ensure consistent power supply and proper functioning of the system. This loss could be due to network issues, power outages, or damage to the connection points. Investigate the cause and attempt to restore the connection to avoid disruptions in your solar energy system's performance.",
    level: "critical",
  },
  {
    title: "Low Battery Capacity",
    body: "The battery storage is running low on capacity. This can affect the availability of stored solar energy for use during low sunlight periods. Consider reducing power consumption, particularly during peak usage times, to conserve energy and extend battery life. If low capacity persists, you may need to investigate battery health and consider replacing aging or faulty batteries to ensure optimal system performance.",
    level: "caution",
  },
  {
    title: "System Overload",
    body: "The system is experiencing an overload condition. This can be caused by excessive energy demand, faults in the electrical system, or issues with connected devices. Reduce power usage immediately and investigate the cause of the overload. Continued operation under these conditions may lead to damage to the system components and create potential safety hazards.",
    level: "critical",
  },
  {
    title: "Panel Shading",
    body: "One or more panels are being shaded, affecting performance. Shading can result from nearby trees, buildings, or other objects casting shadows on the panels. This can significantly reduce energy production and overall system efficiency. Inspect the installation site and take measures to minimize shading, such as trimming trees or repositioning panels for maximum sun exposure.",
    level: "advisory",
  },
];

function WarningsSettings() {
  const { user, isLoading } = useUser();
  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="flex items-center gap-4">
        <h2 className=" text-3xl uppercase md:text-4xl lg:text-5xl">
          warnings
        </h2>
        <span className=" h-[1px] grow bg-gray-500"></span>
      </div>
      <div className=" mt-6 grid grid-cols-[1fr_auto_auto_auto]    items-center justify-items-center gap-x-3 text-base sm:gap-x-8  sm:text-lg md:mt-12 md:text-2xl lg:text-3xl">
        <WarningSettingHeader />
        {Object.keys(user?.settings).map((warningKey) => (
          <WarningsSettingRow
            type={warningKey}
            selected={user.settings[warningKey]}
          />
        ))}
      </div>
    </div>
  );
}

export default WarningsSettings;
