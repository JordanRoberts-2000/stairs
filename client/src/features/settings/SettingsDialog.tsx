import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button, Field } from "@/components/ui";
import { Label } from "@/components/ui/label";
import { useActions, useOperatorProfile } from "@/store";
import { Switch } from "@/components/ui/switch";
import type { Operator } from "@/types";
import ClearHistoryConfirm from "./ClearHistoryConfirm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = { operator: Operator };

const SettingsDialog = ({ operator }: Props) => {
  const { setTarget, setAutoClearHistory, setDarkMode, setTargetEnabled } =
    useActions();

  const profile = useOperatorProfile(operator);
  if (!profile) return;
  const { target, darkMode, autoClearHistory } = profile;

  return (
    <DialogContent
      onOpenAutoFocus={(e) => e.preventDefault()}
      className="rounded-2xl sm:max-w-[425px]"
    >
      <DialogHeader>
        <DialogTitle className="border-b pb-4 font-black">Settings</DialogTitle>
      </DialogHeader>
      <ul className="mb-6 flex flex-col gap-8">
        <li className="flex items-center justify-between">
          <Field orientation={"horizontal"} className={"relative"}>
            <Label className="font-mono">Target:</Label>
            <Select
              value={target !== undefined ? String(target) : "14"}
              disabled={target === undefined}
              onValueChange={(value) => setTarget(operator, Number(value))}
            >
              <SelectTrigger className="ml-auto h-fit w-18 gap-2 text-center">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[300px] overflow-y-auto">
                {Array.from({ length: 23 }, (_, i) => i + 6).map((num) => (
                  <SelectItem key={num} value={String(num)}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Switch
              checked={target !== undefined}
              onCheckedChange={(next) => setTargetEnabled(operator, next)}
              id="target-toggle"
            />
          </Field>
        </li>
        <li className="flex items-center justify-between">
          <Label className="font-mono" htmlFor="airplane-mode">
            Dark mode:
          </Label>
          <Switch
            checked={darkMode}
            onCheckedChange={(next) => setDarkMode(operator, next)}
            id="airplane-mode"
          />
        </li>
        <li className="flex items-center justify-between">
          <Label className="font-mono" htmlFor="airplane-mode">
            Automatic History Clearing:
          </Label>
          <Switch
            checked={autoClearHistory}
            onCheckedChange={(next) => setAutoClearHistory(operator, next)}
            id="airplane-mode"
          />
        </li>
      </ul>
      <DialogFooter className="flex flex-row">
        <ClearHistoryConfirm operator={operator} />
        <DialogClose asChild>
          <Button className="flex-1 rounded-[8px]" variant="outline">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default SettingsDialog;
