import { IoNewspaperOutline } from "react-icons/io5";
import { FaChartLine } from "react-icons/fa6";
import { MdSpeed } from "react-icons/md";
import { IoMdWarning } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

function Aside() {
  return (
    <aside className="p-10 shadow-xl grid grid-rows-[auto_2fr_1fr] h-[100vh] ">
      <h2 className=" text-7xl mb-10 font-bold tracking-tighter">Solar</h2>
      <AsideTopList />
      <AsideBottomList />
    </aside>
  );
}

function AsideTopList() {
  return (
    <ul className=" flex flex-col gap-5">
      <AsideItem icon={<IoNewspaperOutline />}>Overview</AsideItem>
      <AsideItem icon={<FaChartLine />}>Analytics</AsideItem>
      <AsideItem icon={<MdSpeed />}>Performance</AsideItem>
      <AsideItem icon={<IoMdWarning />}>Warnings</AsideItem>
    </ul>
  );
}

function AsideBottomList() {
  return (
    <ul className=" flex flex-col gap-5 align-bottom justify-end">
      <AsideItem icon={<IoMdSettings />}>Settings</AsideItem>
      <AsideItem icon={<FaUserAlt />}>Profile</AsideItem>
    </ul>
  );
}

function AsideItem({ children, icon }) {
  const fontSize = "text-2xl";
  return (
    <li
      className={` ${fontSize} p-4 hover:bg-stone-100 transition-all duration-300 shadow-sm flex align-middle`}
    >
      {icon}
      <span className="ml-5">{children}</span>
    </li>
  );
}

export default Aside;
