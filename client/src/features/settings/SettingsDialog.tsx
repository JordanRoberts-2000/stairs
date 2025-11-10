import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SettingsIcon from "@/assets/settings.svg?react";
import { Button, Input } from "@/components/ui";
import { Label } from "@/components/ui/label";
import { useActions } from "@/store";
import { Switch } from "@/components/ui/switch";

const SettingsDialog = ({}) => {
  const { setTarget } = useActions();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-neutral-800 rounded-[8px]">
          <SettingsIcon className="size-7 stroke-1" />
        </Button>
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-[425px] rounded-2xl"
      >
        <DialogHeader>
          <DialogTitle className="font-black">Settings</DialogTitle>
        </DialogHeader>
        <ul className="flex flex-col gap-6 mb-6">
          <li className="flex justify-between items-center">
            <Label className="font-mono">Target</Label>
            <Input
              onChange={(e) => setTarget(Number(e.target.value))}
              className="w-16"
            />
          </li>
          <li className="flex items-center justify-between">
            <Label className="font-mono" htmlFor="airplane-mode">
              Dark Mode
            </Label>
            <Switch id="airplane-mode" />
          </li>
          <li className="flex items-center justify-between">
            <Label className="font-mono" htmlFor="airplane-mode">
              Automatic History Clearing
            </Label>
            <Switch id="airplane-mode" />
          </li>
        </ul>
        <DialogFooter className="flex flex-row">
          <Button className="flex-1 bg-neutral-800">Clear History</Button>
          <DialogClose asChild>
            <Button className="flex-1" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
