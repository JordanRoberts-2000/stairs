import { useUserHistory, useUserTarget } from "@/store";

const TargetCounter = ({}) => {
  const count = useUserHistory().length;
  const target = useUserTarget();

  return (
    <div className="flex flex-col">
      <div className="ml-auto text-xs font-bold px-2 py-1">
        {count} / {target}
      </div>
      <div className="h-1.5 flex mb-2 mt-2 gap-1 rounded-xl">
        {Array.from({ length: target }, (_, i) => {
          const isOverflow = count > target && i < count - target;
          return (
            <div
              key={`bar-${i}`}
              className={`flex-1 border rounded-4xl shadow ${
                isOverflow
                  ? "bg-yellow-400"
                  : !isOverflow && i < count
                  ? "bg-cyan-600"
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
