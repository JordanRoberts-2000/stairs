import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DevToolIcon from "@/assets/devtools.svg?react";
import { Button } from "@/components/ui";
import ViewStorageDialog from "./ViewStorage";
import { useSeedEntries } from "./useSeedEntries";
import { withForm } from "../assemblyForm/hooks/useAppForm";
import { FORM_DEFAULTS } from "../../constants";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useDemoStore } from "@/store/demoStore";

const DevTools = withForm({
  defaultValues: FORM_DEFAULTS,
  render: ({ form }) => {
    const { seedEntries } = useSeedEntries();
    const { redirectOnSubmit, toggleRedirectOnSubmit } = useDemoStore();

    return (
      <Popover modal={true}>
        <PopoverTrigger className="fixed bottom-0 left-0 z-50 m-4 rounded-[8px] bg-neutral-800 p-2">
          <DevToolIcon className="size-6 text-white" />
        </PopoverTrigger>
        <PopoverContent className="m-1 flex size-fit flex-col gap-3 rounded-[8px] px-2 py-3">
          <div className="border-b border-neutral-600 pb-1 text-center font-mono text-lg font-semibold">
            Devtools
          </div>
          <ViewStorageDialog>
            <Button className="onclick-bounce rounded-[8px] bg-gray-200 font-mono font-semibold text-gray-900">
              View Storage
            </Button>
          </ViewStorageDialog>
          <Button
            onClick={() => {
              const randomPlot = Math.floor(Math.random() * 800) + 1;

              form.setFieldValue("customer", "barratt");
              form.setFieldValue("site", "blakesley");
              form.setFieldValue("plot", String(randomPlot));
              form.setFieldValue("wos", "900");
            }}
            className="onclick-bounce rounded-[8px] bg-gray-200 font-mono font-semibold text-gray-900"
          >
            Populate Fields
          </Button>
          <Button
            className="onclick-bounce rounded-[8px] bg-gray-200 font-mono font-semibold text-gray-900"
            onClick={seedEntries}
          >
            Seed Local Storage
          </Button>
          <Button
            className="onclick-bounce rounded-[8px] bg-gray-200 font-mono font-semibold text-gray-900"
            onClick={() => {
              localStorage.removeItem("store");
              window.location.reload();
            }}
          >
            Clear LocalStorage
          </Button>
          <div className="flex items-center justify-between gap-4 border-t border-neutral-600 pt-2">
            <Label className="font-mono text-sm" htmlFor="airplane-mode">
              Redirect on submit:
            </Label>
            <Switch
              checked={redirectOnSubmit}
              onCheckedChange={toggleRedirectOnSubmit}
              id="airplane-mode"
            />
          </div>
        </PopoverContent>
      </Popover>
    );
  },
});

export { DevTools };
