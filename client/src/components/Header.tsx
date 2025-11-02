import { History } from "../features/history/History";
import { Button } from "./ui";
import Profile from "@/assets/basketball.svg?react";

const Header = ({}) => {
  return (
    <header className="flex flex-col px-2 relative">
      <div className="flex pt-2">
        <div className="text-3xl mx-auto font-mono tracking-tighter p-1 flex gap-2 items-center">
          <Profile className="size-8" />
          Assembly
        </div>

        <History />
      </div>
      <div className="ml-auto pr-1 pb-1 text-xs font-bold">6 / 14</div>
      <div className="h-[6px] flex mb-2 *:outline *:outline-neutral-600 *:rounded-[1px] gap-1 rounded-xl">
        {[...Array(6)].map(() => (
          <div className="flex-1 bg-cyan-700"></div>
        ))}
        {[...Array(8)].map(() => (
          <div className="flex-1"></div>
        ))}
      </div>
    </header>
  );
};

export default Header;
