import WarningRow from "./WarningRow";

function WarningLevelList({
  warnings,
  activeWarning,
  setActiveWarning,
  header,
}) {
  if (warnings.length === 0) return;

  return (
    <div>
      <h4 className="mb-4 text-lg font-bold uppercase sm:text-xl md:text-2xl lg:text-3xl">
        {header}
      </h4>
      <ul className=" list-disc pl-4 sm:pl-8">
        {warnings.map((warning, i) => (
          <WarningRow
            title={warning.title}
            body={warning.description}
            level={warning.level}
            activeWarning={activeWarning}
            setActiveWarning={setActiveWarning}
            key={header + i}
            id={header + i}
          />
        ))}
      </ul>
    </div>
  );
}

export default WarningLevelList;
