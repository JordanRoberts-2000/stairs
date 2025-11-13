import { useActions, useSession } from "@/store";
import Profile from "@/assets/profile.svg?react";
import Desk from "@/assets/desk.svg?react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SessionToggles = ({}) => {
  const { setBench, setOperator } = useActions();
  const { operator, bench } = useSession();

  return (
    <div className="absolute top-2 left-1 flex flex-col gap-2">
      <Select value={operator} onValueChange={(value) => setOperator(value)}>
        <SelectTrigger className="border-none text-xs h-6! flex gap-2 rounded-[8px] px-2 font-semibold font-mono">
          <Profile className="size-5 fill-white" />
          <SelectValue placeholder="User" className="text-white" />
        </SelectTrigger>
        <SelectContent className="-translate-x-1.5 p-1 min-w-0 duration-300 rounded font-semibold shadow-2xl">
          <SelectGroup>
            <SelectLabel className="text-xs font-mono text-center">
              Operator
            </SelectLabel>
            <SelectItem value="jordan" className="text-sm rounded">
              Jordan
            </SelectItem>
            <SelectItem value="sadman" className="text-sm rounded">
              Sadman
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        value={bench == undefined ? undefined : String(bench)}
        onValueChange={(value) => setBench(Number(value))}
      >
        <SelectTrigger className="border-none text-xs h-6! flex gap-2 rounded-[8px] px-2 font-semibold font-mono">
          <Desk className="size-5 text-white" />
          <SelectValue placeholder="Bench" className="text-white" />
        </SelectTrigger>
        <SelectContent className="-translate-x-1.5 p-1 min-w-0 duration-300 rounded font-semibold shadow-2xl">
          <SelectGroup>
            <SelectLabel className="text-xs font-mono">
              Bench number
            </SelectLabel>
            {Array.from({ length: 12 }, (_, i) => {
              const value = (i + 1).toString();
              return (
                <SelectItem
                  key={value}
                  value={value}
                  className="text-sm rounded"
                >
                  {value}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SessionToggles;
