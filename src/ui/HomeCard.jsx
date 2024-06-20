export function HomeCard({ icon, title, children }) {
  return (
    <div className=" flex flex-col gap-10 rounded-3xl border border-[#4b4b4b] bg-[#081524] px-6 py-8 text-center shadow-2xl md:px-10 md:pb-16 md:pt-10 md:text-start">
      <div
        className="  inline-block self-center rounded-lg  bg-gradient-to-r from-[#A15A32] to-[#173D6A] p-4 text-3xl text-[#fff] md:self-start  md:text-5xl
     "
      >
        {/* to-[#501D00] */}
        {icon}
      </div>
      <div>
        <h3 className="mb-4 text-xl font-bold uppercase text-[#fff]  lg:text-3xl xl:text-4xl">
          {title}
        </h3>
        <p className=" text-sm text-[#b2b2b2] lg:text-base xl:text-lg ">
          {children}
        </p>
      </div>
    </div>
  );
}
