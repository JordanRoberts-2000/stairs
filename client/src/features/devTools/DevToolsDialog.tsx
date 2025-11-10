import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DevToolIcon from "@/assets/devtools.svg?react";
import { Button } from "@/components/ui";
import ViewStorageDialog from "./ViewStorage";
import { useSeedEntries } from "./useSeedEntries";
import { withForm } from "../form/hooks";
import { FORM_DEFAULTS } from "../../constants";

const DevTools = withForm({
  defaultValues: FORM_DEFAULTS,
  render: ({ form }) => {
    const { seedEntries } = useSeedEntries();

    return (
      <Popover>
        <PopoverTrigger className="fixed bottom-0 left-0 bg-neutral-800 rounded-[8px] p-2 m-4">
          <DevToolIcon className="text-white size-6" />
        </PopoverTrigger>
        <PopoverContent className="size-fit m-1 flex flex-col gap-3 rounded-[8px]">
          <ViewStorageDialog>
            <Button className="rounded-[8px] bg-gray-300 text-gray-900 font-semibold font-mono">
              View Storage
            </Button>
          </ViewStorageDialog>
          <Button
            onClick={() => {
              form.setFieldValue("customer", "barratt");
              form.setFieldValue("site", "blakesley");
              form.setFieldValue("plot", "76");
              form.setFieldValue("wos", "900");
            }}
            className="rounded-[8px] bg-gray-300 text-gray-900 font-semibold font-mono"
          >
            Populate Fields
          </Button>
          <Button
            className="rounded-[8px] bg-gray-300 text-gray-900 font-semibold font-mono"
            onClick={seedEntries}
          >
            Seed Local Storage
          </Button>
          <Button
            className="rounded-[8px] bg-gray-300 text-gray-900 font-semibold font-mono"
            onClick={() => {
              localStorage.removeItem("store");
              window.location.reload();
            }}
          >
            Clear LocalStorage
          </Button>
        </PopoverContent>
      </Popover>
    );
  },
});

export { DevTools };
