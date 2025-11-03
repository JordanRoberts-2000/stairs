import DesignIcon from "@/components/DesignIcon";
import { useEntries } from "@/store";

const HistorySection = ({}) => {
  const entries = useEntries();

  return (
    <div className="flex flex-col p-2 gap-2 overflow-scroll">
      {entries.reverse().map((entry, i) => (
        <div
          key={`${entry.customer}-${entry.plot}-${i}`}
          className="bg-background relative border flex font-serif flex-col gap-1 border-neutral-400 rounded-[8px] p-2"
        >
          <div className="absolute bottom-0 right-0 ml-auto mr-2 font-mono text-cyan-700 text-lg">
            {entry.plot}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <DesignIcon design={entry.design} />
            <div className="capitalize font-semibold">{entry.design}</div>
            <div className="ml-auto text-xs">08:40 AM</div>
          </div>
          <div className="flex gap-1 capitalize">
            <div className="font-black">{entry.customer}</div>
            <div>/</div>
            <div className="text-gray-500">{entry.site}</div>
          </div>
          <div className="text-xs flex gap-4 mt-1">
            <div>Treads: {entry.treads}</div> <div>Wos: {entry.wos}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistorySection;
