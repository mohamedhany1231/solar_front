import { MangeAccessUserRow } from "../ui/MangeAccessUserRow";
import useViewers from "../hooks/panels/panel-access/useViewers";
import Loader from "../ui/Loader";
import usePanel from "../hooks/panels/usePanel";
import { useParams } from "react-router-dom";
import { AddPanelViewer } from "../ui/AddPanelViewer";
import EditPanel from "../ui/EditPanel";

function MangeAccess() {
  const { id } = useParams();
  const { panel, isLoading: isLoadingPanel } = usePanel(id);

  const { viewers, isLoading } = useViewers(id);

  if (isLoading || isLoadingPanel) return <Loader />;

  const { name, location, warnings, status } = panel;
  const stateEmoji =
    status === "offline" ? "⚫ " : status === "online" ? "🟢" : "🔴";

  return (
    <div className=" flex min-h-full flex-col ">
      <div className=" flex items-start justify-between">
        <h2 className=" grow text-center text-2xl font-bold md:text-3xl lg:text-4xl">
          Panel <span className=" italic ">{name}</span>
        </h2>
        <div className=" relative ">
          <EditPanel />
        </div>
      </div>
      <div className=" mx-auto mb-4 mt-[5vh] grid w-[80%] grid-cols-[1fr_2fr] gap-4 border-b-2 border-main-200 pb-4 dark:border-main-700 sm:gap-6 lg:gap-10">
        <div className=" ">
          <img src="/solar.png" alt="solar panel" className=" max-h-[20vh]" />
        </div>
        <div className=" border-l border-main-200  py-4 pl-3 text-sm dark:border-main-700 sm:pl-6 sm:text-base lg:pl-8 lg:text-xl">
          <h3 className=" bold mb-4 text-lg  sm:text-xl lg:text-2xl">
            {stateEmoji} {status}
          </h3>
          <div className=" pl-2 sm:pl-4">
            <p className=" mb-2">location : {location}</p>
            <p>⚠️ {warnings.length} warnings</p>
          </div>
        </div>
      </div>
      <div className=" flex grow flex-col">
        <div className=" grow">
          <div className=" mx-auto grid w-[90%]  items-center justify-center gap-2 p-4 text-base sm:grid-cols-[1fr_1fr_auto] sm:justify-between lg:text-xl xl:w-[70%]">
            {viewers?.map((user) => (
              <MangeAccessUserRow user={user} key={user.id} />
            ))}
          </div>
        </div>

        <div className=" mx-auto mb-10 w-[80%]">
          <AddPanelViewer />
        </div>
      </div>
    </div>
  );
}

export default MangeAccess;
