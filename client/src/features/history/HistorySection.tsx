import StraightIcon from "@/assets/design/straight.svg?react";
import { useEntries } from "@/store";

const HistorySection = ({}) => {
  const entries = useEntries();

  return (
    <div className="flex flex-col p-2 gap-2 overflow-scroll">
      {entries.map((entry, i) => (
        <div
          key={`${entry.customer}-${entry.plot}-${i}`}
          className="bg-background relative border flex font-serif flex-col gap-1 border-neutral-400 rounded-[8px] p-2"
        >
          <div className="absolute bottom-0 right-0 ml-auto mr-2 font-black text-cyan-700 text-lg">
            {entry.plot}
          </div>
          <div className="flex items-center gap-2">
            <StraightIcon className="size-5" />
            <div>{entry.design}</div>
            <div className="ml-auto text-xs">08:40 AM</div>
          </div>
          <div className="flex gap-1 font-semibold">
            <div>{entry.customer}</div>
            <div>/</div>
            <div className="text-gray-700">{entry.site}</div>
          </div>
          <div className="text-xs flex gap-4">
            <div>Treads: {entry.treads}</div> <div>Wos: {entry.wos}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistorySection;
