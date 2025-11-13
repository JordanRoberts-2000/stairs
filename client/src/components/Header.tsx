import { useActions, useSession, useUserHistory, useUserTarget } from "@/store";
import { History } from "../features/history/History";
import Logo from "@/assets/basketball.svg?react";
import Profile from "@/assets/profile.svg?react";
import Desk from "@/assets/desk.svg?react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import TargetCounter from "@/features/TargetCounter";
import SessionToggles from "@/features/SessionToggles";

const Header = ({}) => {
  return (
    <header className="flex flex-col shadow-md px-3 py-2 mb-4 bg-neutral-800 rounded-2xl mx-2 text-white! z-50 sticky top-2">
      <div className="bg-gradient-to-b from-white to-transparent h-4 inset-x-0 translate-y-full absolute bottom-0"></div>
      <SessionToggles />
      <div className="flex pt-2">
        <div className="text-3xl mx-auto font-mono tracking-tighter translate-y-2 p-1 flex items-center">
          <div className="mr-2 gap-1  flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={0.5}
              stroke="currentColor"
              className="size-8 fill-cyan-700 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
              />
            </svg>
            Assembly
          </div>
        </div>
        <History />
      </div>
      <TargetCounter />
    </header>
  );
};

export default Header;
