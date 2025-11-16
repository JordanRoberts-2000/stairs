import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SettingsIcon from "@/assets/settings.svg?react";
import { Button, Field, FieldError, Input } from "@/components/ui";
import { Label } from "@/components/ui/label";
import { useActions } from "@/store";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { FormInputNumber } from "@/utils/formInputNumber";
import type { OperatorProfile } from "@/types";
import ClearHistoryConfirm from "./ClearHistoryConfirm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = { profile: OperatorProfile };

const SettingsDialog = ({ profile }: Props) => {
  const { setTarget, setAutoClearHistory, setDarkMode, setTargetEnabled } =
    useActions();

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
              value={
                profile?.target !== undefined ? String(profile.target) : "14"
              }
              disabled={profile?.target === undefined}
              onValueChange={(value) => {
                let result = setTarget(Number(value));
                if (result.isErr()) {
                  console.error(`Failed to set target, error: ${result.error}`);
                  toast.error("Failed to set target");
                }
              }}
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
              checked={profile?.target !== undefined}
              onCheckedChange={(checked) => setTargetEnabled(checked)}
              id="target-toggle"
            />
          </Field>
        </li>
        <li className="flex items-center justify-between">
          <Label className="font-mono" htmlFor="airplane-mode">
            Dark mode:
          </Label>
          <Switch
            checked={profile.darkMode}
            onCheckedChange={(next) => {
              const result = setDarkMode(next);
              if (result.isErr()) {
                console.error("failed to toggle darkmode: ", result.error);
              }
            }}
            id="airplane-mode"
          />
        </li>
        <li className="flex items-center justify-between">
          <Label className="font-mono" htmlFor="airplane-mode">
            Automatic History Clearing:
          </Label>
          <Switch
            checked={profile.autoClearHistory}
            onCheckedChange={(next) => {
              const result = setAutoClearHistory(next);
              if (result.isErr()) {
                console.error(
                  "failed to toggle autoClearHistory: ",
                  result.error,
                );
              }
            }}
            id="airplane-mode"
          />
        </li>
      </ul>
      <DialogFooter className="flex flex-row">
        <ClearHistoryConfirm />
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
