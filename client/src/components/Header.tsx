import { History } from "../features/history/History";
import { Button } from "./ui";
import Profile from "@/assets/profile.svg?react";

const Header = ({}) => {
  return (
    <header className="flex flex-col px-2">
      <div className="flex p-2 pl-0">
        <div className="text-5xl font-mono tracking-tighter p-1"> Assembly</div>

        <History />
      </div>
      <div className="ml-auto p-1 text-xs">3 / 14</div>
      <div className="h-2 flex mb-2 outline-2 outline-neutral-500 overflow-clip rounded-4xl">
        <div className="flex-1 bg-orange-500"></div>
        <div className="flex-1 bg-orange-500"></div>
        <div className="flex-1 bg-orange-500"></div>
        <div className="flex-1 bg-orange-500"></div>
        <div className="flex-1 bg-orange-500"></div>
        <div className="flex-1 bg-orange-500"></div>
        <div className="flex-1"></div>
        <div className="flex-1"></div>
        <div className="flex-1"></div>
        <div className="flex-1"></div>
        <div className="flex-1"></div>
        <div className="flex-1"></div>
        <div className="flex-1"></div>
        <div className="flex-1"></div>
        <div className="flex-1"></div>
      </div>
    </header>
  );
};

export default Header;
