import { History } from "../features/history/History";
import TargetCounter from "@/features/TargetCounter";
import SessionToggles from "@/features/SessionToggles";
import LogoIcon from "@/assets/logo.svg?react";
import { DEMO_MODE } from "@/AppConfig";

const Header = ({}) => {
  return (
    <header className="sticky top-2 z-50 mx-2 mb-4 flex flex-col rounded-2xl bg-neutral-800 px-3 py-2 text-white! shadow-md">
      <div className="absolute inset-x-0 bottom-0 h-4 translate-y-full bg-linear-to-b from-white to-transparent" />

      <div className="flex">
        <SessionToggles />
        <History />
      </div>

      <div className="absolute top-7 left-1/2 z-10 flex -translate-x-1/2 flex-col">
        <LogoIcon className="scale-110" />
        <div className="mx-auto w-fit rounded-[8px] bg-amber-100 px-4 font-mono text-sm font-black whitespace-nowrap text-black">
          {`Assembly ${DEMO_MODE ? "Demo" : "Form"}`}
        </div>
      </div>
      <TargetCounter />
    </header>
  );
};

export default Header;
