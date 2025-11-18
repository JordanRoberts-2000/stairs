import { Button } from "@/components/ui";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import SettingsIcon from "@/assets/settings.svg?react";
import SettingsDialog from "./SettingsDialog";
import { useSession } from "@/store";

const SettingsButton = ({}) => {
  const { operator } = useSession();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="rounded-[8px] bg-neutral-800"
          disabled={!operator}
          aria-disabled={!operator}
        >
          <SettingsIcon className="size-7 stroke-1" />
        </Button>
      </DialogTrigger>
      {operator && <SettingsDialog operator={operator} />}
    </Dialog>
  );
};

export default SettingsButton;
