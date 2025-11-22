import { useOperatorProfile, useSession } from "@/store";
import StairsIcon from "@/assets/stairs.svg?react";

const TargetCounter = () => {
  const { operator } = useSession();
  const profile = useOperatorProfile(operator);

  const count = profile?.history.length ?? 0;
  const target = profile?.target ?? 14;

  if (profile && profile.target === undefined) {
    // no profile or target disabled → simple icon version
    return (
      <div className="relative mt-2 flex items-center justify-end gap-2 border-t border-neutral-600 pt-4 text-sm font-semibold text-white">
        <div className="absolute bottom-full mb-1 flex items-center gap-2">
          <div>{count}</div>
          <StairsIcon className="size-5" />
        </div>
      </div>
    );
  }

  // profile + target defined → show progress bar
  return (
    <div className="relative mt-2 flex flex-col border-t border-neutral-600 pt-6">
      <div className="absolute top-2 right-0 px-2 text-xs font-bold">
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
