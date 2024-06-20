function AnalyticsCard({ value, icon, color, label, unit }) {
  return (
    <div
      className={`   flex flex-col items-center justify-around gap-2 rounded-xl border-2 border-stone-200 bg-stone-100 px-4 font-bold text-main-800  shadow-lg  dark:border-main-700 dark:bg-main-800 dark:text-stone-50 sm:py-0  lg:py-5 xl:flex-row xl:py-12 2xl:px-8 `}
    >
      <div
        className={` rounded-full p-2 text-xl text-main-50 md:p-6 md:text-2xl lg:text-3xl `}
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
      <div className=" text-center text-base sm:text-lg md:text-xl 2xl:text-3xl">
        <h3 className=" mb-2 capitalize">{label} </h3>
        <p className=" m-auto inline-block whitespace-nowrap text-sm md:text-base xl:text-lg 2xl:text-xl">
          {value}
          <span className="inline-block text-xs   opacity-70 sm:text-base   xl:text-lg">
            {unit}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AnalyticsCard;
