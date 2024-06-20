export function OverviewCard({
  title,
  icon,
  value,
  unit,
  iconBg = "transparent",
  largeText = false,
}) {
  return (
    <div
      className={` col-span-3 flex grow   flex-col items-center justify-around gap-2 rounded-xl border-2 border-stone-200 bg-stone-100 px-4 py-2 font-bold text-main-800 shadow-lg  dark:border-main-700  dark:bg-main-800 dark:text-stone-50 sm:py-0 md:col-span-2  lg:py-5 xl:flex-row 2xl:px-8 `}
    >
      <div
        className={` rounded-full p-2 text-3xl  md:p-6 md:text-2xl lg:text-5xl `}
        style={{ backgroundColor: iconBg }}
      >
        {icon}
      </div>
      <div className=" text-center text-base sm:text-lg md:text-xl 2xl:text-3xl">
        <h3 className=" mb-2 capitalize">{title} </h3>
        <p className=" m-auto inline-block whitespace-nowrap text-sm md:text-base xl:text-lg 2xl:text-xl">
          {largeText ? (
            <span className="text-base  sm:text-lg md:text-xl 2xl:text-3xl">
              {value}
            </span>
          ) : (
            value
          )}
          <span className=" ml-1 inline-block text-xs   opacity-70 sm:text-base   ">
            {unit}
          </span>
        </p>
      </div>
    </div>
  );
}
