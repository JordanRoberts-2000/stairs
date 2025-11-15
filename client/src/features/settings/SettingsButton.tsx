import { Button } from "@/components/ui";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import SettingsIcon from "@/assets/settings.svg?react";
import { useOperatorProfile } from "@/store";
import SettingsDialog from "./SettingsDialog";

const SettingsButton = ({}) => {
  const profile = useOperatorProfile();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-neutral-800 rounded-[8px]"
          disabled={!profile}
          aria-disabled={!profile}
        >
          <SettingsIcon className="size-7 stroke-1" />
        </Button>
      </DialogTrigger>
      {profile && <SettingsDialog profile={profile} />}
    </Dialog>
  );
};

export default SettingsButton;
