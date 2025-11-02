import StraightIcon from "@/assets/design/straight.svg?react";

const HistorySection = ({}) => {
  return (
    <div className="flex flex-col p-2 gap-2 overflow-scroll">
      {[...Array(14)].map(() => (
        <div className="bg-background border flex font-serif flex-col gap-1 border-neutral-400 rounded-[8px] p-2">
          <div className="flex items-center gap-2">
            <StraightIcon className="size-5" />
            <div>Straight</div>
            <div className="ml-auto text-xs">08:40 AM</div>
          </div>
          <div className="flex gap-1 font-semibold">
            <div>Barratt</div>
            <div>/</div>
            <div className="text-gray-700">David</div>
          </div>
          <div className="text-xs flex gap-4">
            <div>Treads: 12</div> <div>Wos: 950</div>
            <div className="ml-auto font-black text-cyan-700">2</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistorySection;
