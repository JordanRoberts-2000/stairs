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
import { useClearHistoryCheck } from "@/utils/clearHistoryCheck";
import { useEffect } from "react";
import { useOperators } from "@/hooks/useOperators";
import { Spinner } from "@/components/Spinner";
import { toast } from "sonner";

const DISPLAY_NAME_FIXES: Record<string, string> = {
  "Jordon Roberts": "Jordan Roberts",
};

function formatFullDisplayName(value: string): string {
  return DISPLAY_NAME_FIXES[value] ?? value;
}

function formatFirstNameDisplay(value: string): string {
  const fixed = formatFullDisplayName(value);
  return fixed.split(" ")[0] ?? fixed;
}

const SessionToggles = ({}) => {
  const { setBench, setOperator } = useActions();
  const { operator, bench } = useSession();
  const clearHistoryCheck = useClearHistoryCheck();
  const { isLoading, data: operators, error } = useOperators();

  useEffect(() => {
    if (!operator) return;
    clearHistoryCheck();
  }, [operator, clearHistoryCheck]);

  if (isLoading) return <Spinner />;
  if (error) {
    toast.error("Failed to fetch operaters");
    console.error("Failed to fetch operators:", error);
    return <div>Failed to fetch operaters</div>;
  }

  return (
    <div className="flex flex-col gap-1">
      <Select
        value={operator ?? ""}
        onValueChange={(value) => {
          setOperator(value);
        }}
      >
        <SelectTrigger className="onclick-bounce flex h-6! gap-2 rounded-[8px] border-none px-2 font-mono text-xs font-semibold transition duration-75">
          <Profile className="size-4 fill-white" />
          {operator ? formatFirstNameDisplay(operator) : "Operator"}
        </SelectTrigger>
        <SelectContent className="min-w-0 -translate-x-1.5 rounded p-1 font-semibold shadow-2xl duration-300">
          <SelectGroup>
            <SelectLabel className="text-center font-mono text-xs">
              Operator
            </SelectLabel>
            {operators?.map((operator) => (
              <SelectItem
                key={operator}
                value={operator}
                className="rounded text-sm"
              >
                {formatFullDisplayName(operator)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        value={bench == undefined ? "" : String(bench)}
        onValueChange={(value) => setBench(Number(value))}
      >
        <SelectTrigger className="onclick-bounce flex h-6! gap-2 rounded-[8px] border-none px-2 font-mono text-xs font-semibold transition duration-75">
          <Desk className="size-4 text-white" />
          <SelectValue placeholder="Bench" className="text-white" />
        </SelectTrigger>
        <SelectContent className="min-w-0 -translate-x-1.5 rounded p-1 font-semibold shadow-2xl duration-300">
          <SelectGroup>
            <SelectLabel className="font-mono text-xs">
              Bench number
            </SelectLabel>
            {Array.from({ length: 12 }, (_, i) => {
              const value = (i + 1).toString();
              return (
                <SelectItem
                  key={value}
                  value={value}
                  className="rounded text-sm"
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
