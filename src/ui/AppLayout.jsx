import { Outlet } from "react-router-dom";
import Header from "./Header";
import Aside from "./Aside";

function AppLayout() {
  return (
    <div className=" min-h-screen grid grid-cols-[1fr_4fr] bg-stone-50  h-[100vh]">
      <Aside />
      <main className="  py-5 px-8 mt-5 overflow-scroll">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
