const levels = ["advisory", "caution", "critical"];

function WarningSettingHeader() {
  return (
    <>
      <div className="mb-6  flex items-center justify-self-stretch   text-lg italic   text-gray-600 dark:text-gray-400 md:text-xl lg:text-2xl">
        <p>Warning </p>
      </div>
      {levels.map((lvl) => (
        <p className=" self-start text-sm   italic text-gray-600 dark:text-gray-400 sm:text-lg md:text-xl lg:text-2xl">
          <span>{lvl}</span>
        </p>
      ))}
    </>
  );
}

export default WarningSettingHeader;
