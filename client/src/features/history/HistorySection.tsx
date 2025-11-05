import DesignIcon from "@/components/DesignIcon";
import { useEntries } from "@/store";

const formatTime = (timestamp: string) => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(timestamp));
};

const HistorySection = () => {
  const entries = useEntries();
  const hasEntries = entries && entries.length > 0;

  return (
    <div className="flex flex-col flex-1 min-h-0 relative">
      {/* top fade */}
      <div className="absolute top-0 w-full h-8 z-10 bg-gradient-to-b from-white/95 to-transparent" />
      {/* bottom fade */}
      <div className="absolute bottom-0 w-full h-8 z-10 bg-gradient-to-t from-white to-transparent" />

      <div className="flex flex-1 min-h-0 overflow-y-auto flex-col px-2">
        {!hasEntries ? (
          <div className="my-2 border font-mono border-gray-200 shadow rounded-[8px] h-40 grid place-items-center">
            no entries
          </div>
        ) : (
          [...entries].reverse().map((entry, i) => (
            <div
              key={`${entry.customer}-${entry.plot}-${i}`}
              className="bg-background relative border-b flex font-serif flex-col gap-1 border-neutral-400 p-2 pt-4"
            >
              <div className="absolute bottom-0 right-0 ml-auto mr-2 font-mono font-bold text-black text-lg">
                {entry.plot}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <DesignIcon design={entry.design} />
                <div className="capitalize font-semibold">{entry.design}</div>
                <div className="ml-auto text-xs">
                  {formatTime(entry.timestamp)}
                </div>
              </div>
              <div className="flex gap-1 capitalize">
                <div className="font-black">{entry.customer}</div>
                <div>/</div>
                <div className="text-gray-500">{entry.site}</div>
              </div>
              <div className="text-xs flex font-mono gap-4 mt-1">
                <div className="bg-emerald-100 text-emerald-700 px-2 py-1">
                  Treads: {entry.treads}
                </div>
                <div className="bg-purple-100 text-purple-700 px-2 py-1">
                  Wos: {entry.wos}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistorySection;
