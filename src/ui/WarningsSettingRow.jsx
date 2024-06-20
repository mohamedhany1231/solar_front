import { useState } from "react";
import { WarningSettingsButton } from "./WarningSettingsButton";
import useUpdateSettings from "../hooks/user/useUpdateSettings";
import toast from "react-hot-toast";

const levels = ["low", "mid", "high"];
function WarningsSettingRow({ type, selected }) {
  const {
    updateSettings,
    isLoading: isUpdating,
    response,
  } = useUpdateSettings();

  async function update(lvl) {
    const toastId = toast.loading("updating settings", { duration: 5000 });

    const res = await updateSettings({ [type]: lvl });

    toast.dismiss(toastId);
    if (res?.status === "success") toast.success(" settings updated");
    else toast.error("error updating settings");
  }

  // avoid rendering row for field : id
  if (type === "_id") return;
  return (
    <>
      <p className=" flex items-center justify-self-stretch  border-b-2 border-gray-200  py-6 dark:border-gray-700 ">
        {type}
      </p>
      {levels.map((lvl) => (
        <WarningSettingsButton
          level={lvl}
          isSelected={selected === lvl}
          handleClick={() => update(lvl)}
          disabled={isUpdating}
          key={`${lvl}-${type}`}
        />
      ))}
    </>
  );
}

export default WarningsSettingRow;
