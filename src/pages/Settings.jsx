import { MdOutlineAddAlert } from "react-icons/md";
import WarningsSettings from "../ui/WarningsSettings";
import Profile from "../ui/Profile";
import { LogoutButton } from "../ui/LogoutButton";

function Settings() {
  return (
    <div>
      <h1 className=" text-center text-5xl font-bold capitalize md:mb-8 ">
        settings
      </h1>
      <div className=" flex flex-col gap-10 pb-20 md:px-[10%]">
        <Profile />
        <LogoutButton />
        <WarningsSettings />
      </div>
    </div>
  );
}

export default Settings;
