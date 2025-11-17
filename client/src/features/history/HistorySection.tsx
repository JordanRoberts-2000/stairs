import DesignIcon from "@/components/DesignIcon";
import { GOOGLE_DESIGN_VALUES } from "@/constants";
import { useOperatorProfile } from "@/store";
import { formatTime } from "@/utils/formatTime";

const HistorySection = () => {
  const profile = useOperatorProfile();

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      {/* top fade */}
      <div className="absolute top-0 z-10 h-8 w-full bg-linear-to-b from-white/95 to-transparent" />
      {/* bottom fade */}
      <div className="absolute bottom-0 z-10 h-8 w-full bg-linear-to-t from-white to-transparent" />

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-2">
        {!profile || profile.history.length === 0 ? (
          <div className="my-2 grid h-40 place-items-center rounded-[8px] border border-gray-200 font-mono shadow">
            no entries
          </div>
        ) : (
          [...profile.history].reverse().map((entry, i) => {
            const plot = String(entry.plot);
            const hasHalf = /(?:\s|-)?1\/2$/.test(plot);
            const basePlot = hasHalf
              ? plot.replace(/(?:\s|-)?1\/2$/, "")
              : plot;

            return (
              <div
                key={`${entry.customer}-${entry.plot}-${i}`}
                className="relative flex flex-col gap-1 border-b border-neutral-400 bg-background px-2 pt-3 pb-1 font-serif"
              >
                <div className="absolute right-0 bottom-0 mr-2 ml-auto font-mono text-lg font-bold text-black">
                  {hasHalf && (
                    <span className="mr-2 text-xs font-normal">1/2</span>
                  )}
                  {basePlot}
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <DesignIcon design={entry.design} variant="outline" />
                  <div className="font-semibold capitalize">
                    {GOOGLE_DESIGN_VALUES[entry.design]}
                  </div>
                  <div className="ml-auto text-xs">
                    {formatTime(entry.timestamp)}
                  </div>
                </div>

                <div className="mt-3 flex gap-1 capitalize">
                  <div className="font-black">{entry.customer}</div>
                  <div>/</div>
                  <div className="text-gray-500">{entry.site}</div>
                </div>

                <div className="mt-1 flex gap-4 font-mono text-xs">
                  <div>Treads: {entry.treads}</div>
                  <div>Wos: {entry.wos}</div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HistorySection;
