import { useOperatorProfile, useSession } from "@/store";
import StairsIcon from "@/assets/stairs.svg?react";

const TargetCounter = () => {
  const { operator } = useSession();
  const profile = useOperatorProfile(operator);

  const count = profile?.history.length ?? 0;
  const target = profile?.target ?? 14;

  if (!profile || profile.target === undefined) {
    // no profile or target disabled → simple icon version
    return (
      <div className="flex">
        <div className="ml-auto flex items-center gap-2 px-2 py-1 text-sm font-semibold text-white">
          <div>{count}</div>
          <StairsIcon className="size-8" />
        </div>
      </div>
    );
  }

  // profile + target defined → show progress bar
  return (
    <div className="flex flex-col">
      <div className="ml-auto px-2 py-1 text-xs font-bold">
        {count} / {target}
      </div>
      <div className="mt-2 mb-2 flex h-1.5 gap-1 rounded-xl">
        {Array.from({ length: target }, (_, i) => {
          const isOverflow = count > target && i < count - target;
          return (
            <div
              key={`bar-${i}`}
              className={`flex-1 border shadow ${
                isOverflow
                  ? "bg-cyan-300"
                  : !isOverflow && i < count
                    ? "bg-yellow-100"
                    : ""
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TargetCounter;
