import { IoNewspaperOutline } from "react-icons/io5";
import { FaSolarPanel } from "react-icons/fa6";
import { TiUserAdd } from "react-icons/ti";
import { IoMdSettings } from "react-icons/io";
import { AsideItem } from "./AsideItem";

import { IoMdWarning } from "react-icons/io";
import { createPortal } from "react-dom";
import { GrUserAdmin } from "react-icons/gr";

import useUser from "../hooks/user/useUser";
import Loader from "./Loader";

function NavLinks({ isLargeScreen, close }) {
  const { user, isLoading } = useUser();

  if (isLoading) return <Loader />;

  const isAdmin = user?.role === "admin";
  const SmallScreen = (
    <>
      <div
        className="absolute left-[50%] top-[50%] flex  h-[100vh] w-[100%] translate-x-[-50%] translate-y-[-50%] transform items-center justify-center bg-black bg-opacity-70 text-stone-50  
"
      >
        <div className=" flex flex-col items-center text-center text-4xl font-bold">
          <AsideItem
            showIcon={isLargeScreen}
            icon={<IoNewspaperOutline />}
            linkTo={"overview"}
            handleClick={close}
          >
            Overview
          </AsideItem>

          <AsideItem
            showIcon={isLargeScreen}
            icon={<FaSolarPanel />}
            linkTo={"/panels"}
            handleClick={close}
          >
            panels
          </AsideItem>

          <AsideItem
            showIcon={isLargeScreen}
            icon={<IoMdWarning />}
            linkTo={"/warnings"}
            handleClick={close}
          >
            Warnings
          </AsideItem>

          {isAdmin && (
            <>
              <AsideItem
                showIcon={isLargeScreen}
                icon={<TiUserAdd />}
                linkTo={"/add-user"}
                handleClick={close}
              >
                Add User
              </AsideItem>
              <AsideItem
                showIcon={isLargeScreen}
                icon={<GrUserAdmin />}
                linkTo={"/admin-panels"}
                handleClick={close}
              >
                Admin Panels
              </AsideItem>
            </>
          )}

          <div className=" mt-10">
            <AsideItem
              showIcon={isLargeScreen}
              icon={<IoMdSettings />}
              linkTo={"/settings"}
              handleClick={close}
            >
              Settings
            </AsideItem>
          </div>
        </div>
      </div>
    </>
  );

  if (!isLargeScreen)
    return createPortal(SmallScreen, document.getElementById("root"));

  return (
    <div className=" hidden flex-col justify-between self-stretch text-2xl lg:flex">
      <ul className=" flex md:gap-5 lg:flex-col">
        <AsideItem icon={<IoNewspaperOutline />} linkTo={"overview"}>
          Overview
        </AsideItem>
        <AsideItem icon={<FaSolarPanel />} linkTo={"/panels"}>
          panels
        </AsideItem>

        <AsideItem icon={<IoMdWarning />} linkTo={"/warnings"}>
          Warnings
        </AsideItem>
        {isAdmin && (
          <>
            <AsideItem icon={<TiUserAdd />} linkTo={"/add-user"}>
              Add User
            </AsideItem>
            <AsideItem icon={<GrUserAdmin />} linkTo={"/admin-panels"}>
              Admin Panels
            </AsideItem>
          </>
        )}
      </ul>
      <ul className=" flex md:gap-5 lg:flex-col">
        <AsideItem icon={<IoMdSettings />} linkTo={"/settings"}>
          {isLargeScreen && "Settings"}
        </AsideItem>
      </ul>
    </div>
  );
}

export default NavLinks;
