import { useSelector } from "react-redux";

function Panel() {
  const panel = useSelector((state) => state.panel);
  const { temp, humidity, id, panelState, power, pressure, battery } = panel;

  const stateEmoji =
    panelState === "loading" ? "🟡 " : panelState === "active" ? "🟢" : "🔴";

  // console.log(panel);
  return (
    <div>
      <h2 className=" text-stone-900 text-2xl  ">
        {stateEmoji} panel is currently
        <span className="font-bold ml-2 capitalize">{panelState}</span>
      </h2>
      <h3 className=" text-stone-500 translate-x-4 text-lg">{id}</h3>
      <div className="mt-10 border-t-2  border-stone-200 drop-shadow-sm   p-8 ">
        <h3 className=" text-stone-900 text-4xl font-bold text-center mb-5">
          Panel Data
        </h3>
        <div className="grid grid-cols-[2fr_1fr] p-8">
          <div className="p-8">
            <div className="grid grid-cols-2 shadow-sm hover:bg-stone-100 p-6 mb-4">
              <p className="text-2xl">⚡ POWER</p>
              <p className="text-2xl text-center">{power} W</p>
            </div>
            <div className="grid grid-cols-2 shadow-sm hover:bg-stone-100 p-6 mb-4">
              <p className="text-2xl">☀️ Temperature</p>
              <p className="text-2xl text-center">{temp} &deg;C</p>
            </div>
            <div className="grid grid-cols-2 shadow-sm hover:bg-stone-100 p-6 mb-4">
              <p className="text-2xl">🌪️ Pressure</p>
              <p className="text-2xl text-center">{pressure} hPa</p>
            </div>
            <div className="grid grid-cols-2 shadow-sm hover:bg-stone-100 p-6 mb-4">
              <p className="text-2xl">💦 Humidity</p>
              <p className="text-2xl text-center">{humidity} RH</p>
            </div>
            <div className="grid grid-cols-2 shadow-sm hover:bg-stone-100 p-6 mb-4">
              <p className="text-2xl">🔋 Batter</p>
              <p className="text-2xl text-center">{battery} %</p>
            </div>
          </div>
          <div className="bg-blue-950 text-stone-100 p-6">
            <h3 className=" text-3xl mb-5">Previous reads</h3>
            <div className="grid grid-cols-[2fr_1fr_1fr] gap-5  w-full border-b-2 border-stone-300 py-3 ">
              <p className="text-2xl">Date</p>
              <p className="text-2xl">Power</p>
              <p className="text-2xl">Temperature</p>
            </div>
            <div className="divide-y divide-stone-400">
              {Array.from({ length: 5 }, () => "_").map((x, i) => (
                <PreviousRead day={i + 1} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviousRead({ day }) {
  const today = new Date();
  const date = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - day
  );
  const power = 160 + Math.round(Math.random() * 40);
  const temp = 20 + Math.round(Math.random() * 10);
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr] gap-5 py-5 ">
      <h4 className="text-2xl">{date.toISOString().slice(0, 10)}</h4>
      <p className="text-2xl text-center">{power} W</p>
      <p className="text-2xl text-center">{temp} &deg;C</p>
    </div>
  );
}
export default Panel;
