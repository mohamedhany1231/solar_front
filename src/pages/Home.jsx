import { FaChartLine, FaShield } from "react-icons/fa6";
import { CiBatteryFull } from "react-icons/ci";
import { IoDiamond } from "react-icons/io5";

import Button from "../ui/Buttons";
import { HomeCard } from "../ui/HomeCard";
const Services = [
  {
    title: "Intelligent Energy Monitoring",
    description:
      "Gain complete control and visibility over your energy usage with real-time monitoring and sophisticated analysis of your solar energy generation and consumption. This allows you to achieve peak efficiency and make informed decisions about your energy use throughout the day.",
    icon: <FaChartLine />,
  },
  {
    title: "Advanced Energy Storage",
    description:
      "Optimize your solar power utilization with integrated battery solutions that efficiently store excess energy for later use. Whether it's during cloudy days or nighttime, these advanced storage systems ensure a consistent energy supply and reduce reliance on the grid.",
    icon: <CiBatteryFull />,
  },
  {
    title: "Durable and Weather-Resistant",
    description:
      "Enjoy peace of mind with solar panels engineered to endure even the harshest weather conditions. These robust panels provide consistent, long-lasting performance for years, maintaining energy production regardless of environmental challenges.",
    icon: <FaShield />,
  },
  {
    title: "Sleek and Modern Design",
    description:
      "Enhance your property's visual appeal with solar panels that seamlessly blend with your architecture. These sleek, modern panels not only boost energy generation but also add aesthetic value to your home or business.",
    icon: <IoDiamond />,
  },
];

function Home() {
  return (
    <div className="flex flex-col gap-8 bg-[#050D16] pb-20 sm:gap-12 md:gap-16 lg:gap-20">
      <div className=" h-[100vh] bg-[#494949] bg-[url(./beautiful-alternative-energy-plant-with-solar-panels.jpg)] bg-cover bg-blend-multiply sm:h-[70vh]  ">
        <div className=" flex h-full w-[100%] flex-col items-center justify-center  gap-16 text-center sm:ml-10 md:ml-6 md:w-[40%] md:items-start md:gap-20 md:text-start lg:ml-16 ">
          <div>
            <h1 className=" text-2xl font-bold capitalize tracking-wider text-[#fff] sm:text-4xl md:text-5xl lg:text-7xl  ">
              Transforming Sunlight into Smart Energy
            </h1>
            <p className=" pl-2 pt-2 text-base font-semibold text-[#b2b2b2]   sm:pl-4 sm:pt-4 sm:text-lg lg:text-2xl ">
              Experience the next generation of energy efficiency with
              intelligent solar solutions tailored for your needs.
            </p>
          </div>
          <div className="pl-2 sm:pl-4">
            <Button to={"/overview"}>
              <span
                className=" inline-block text-center text-lg 
"
              >
                Start Tracking
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* cards */}
      <h2 className=" text-center text-2xl font-bold uppercase  tracking-wider text-[#fff] sm:text-4xl md:text-5xl lg:text-7xl ">
        Services
      </h2>
      <div>
        <div className="grid grid-cols-1 gap-4 px-6 md:grid-cols-2 md:gap-10  lg:px-10">
          {Services.map((service) => (
            <HomeCard icon={service.icon} title={service.title}>
              {service.description}
            </HomeCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
