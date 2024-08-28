import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Aside from "./Aside";
import { useWindowWidth } from "@react-hook/window-size";
import useUser from "../hooks/user/useUser";
import Loader from "./Loader";

import { PanelHeader } from "./PanelHeader";
import { useEffect } from "react";

//
//
//

function UseNavigationLogger() {
  const location = useLocation();

  useEffect(() => {
    console.log("Current path:", location.pathname);

    // Adding an event listener for the "popstate" event to track back/forward navigation
    const handlePopState = () => {
      console.log("Navigated to:", window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location]);
}
//
//
//

function AppLayout() {
  const { user, isLoading, error } = useUser();
  const navigate = useNavigate();

  const width = useWindowWidth();
  const isLargeScreen = width >= 1024;
  const { pathname: path } = useLocation();
  if (!isLoading && !user?.email) navigate("/login");
  const isPanelPage =
    (path.startsWith("/panel") && path !== "/panels") ||
    path.startsWith("/analytics") ||
    path.startsWith("/mange-access");
  return (
    <div className=" grid h-[100vh] grid-rows-[auto_1fr]     bg-stone-50  dark:bg-main-900 dark:text-[#fff] lg:grid-cols-[1fr_4fr]">
      <UseNavigationLogger />
      <Aside isLargeScreen={isLargeScreen} />
      <main
        className="flex max-h-fit  flex-col overflow-auto
         lg:h-[100vh]"
      >
        {isLargeScreen && <Header />}
        {isPanelPage && <PanelHeader />}
        <div className="my-6 grow overflow-auto px-4 sm:px-8">
          {isLoading ? <Loader /> : <Outlet />}
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
