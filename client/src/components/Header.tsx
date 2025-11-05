import { useEntries } from "@/store";
import { History } from "../features/history/History";
import Profile from "@/assets/basketball.svg?react";

const Header = ({}) => {
  const count = useEntries().length;
  const MAX = 14;

  return (
    <header className="flex flex-col px-2 bg-white z-50 sticky top-0">
      <div className="bg-gradient-to-b from-white to-transparent h-4 inset-x-0 translate-y-full absolute bottom-0"></div>
      <div className="flex pt-2">
        <div className="text-4xl mx-auto font-mono tracking-tighter p-1 translate-y-2.5 flex items-center">
          <div className="mr-8  flex gap-2 items-center">
            <Profile className="size-12 text-cyan-900" />
            Assembly
          </div>
        </div>

        <History />
      </div>
      <div className="ml-auto text-purple-700 text-xs font-bold bg-purple-200 px-2 py-1">
        {count} / 14
      </div>
      <div className="h-[6px] flex mb-2 *:outline *:outline-neutral-600 mt-2 *:rounded-[1px] gap-1 rounded-xl">
        {Array.from({ length: MAX }, (_, i) => (
          <div
            key={`bar-${i}`}
            className={`flex-1 ${i < count ? "bg-cyan-700" : ""}`}
          />
        ))}
      </div>
    </header>
  );
};

export default Header;
