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

const DevTools = withForm({
  defaultValues: FORM_DEFAULTS,
  render: ({ form }) => {
    const { seedEntries } = useSeedEntries();

    return (
      <Popover modal={true}>
        <PopoverTrigger className="fixed bottom-0 left-0 m-4 rounded-[8px] bg-neutral-800 p-2">
          <DevToolIcon className="size-6 text-white" />
        </PopoverTrigger>
        <PopoverContent className="m-1 flex size-fit flex-col gap-3 rounded-[8px]">
          <ViewStorageDialog>
            <Button className="rounded-[8px] bg-gray-300 font-mono font-semibold text-gray-900">
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
            className="rounded-[8px] bg-gray-300 font-mono font-semibold text-gray-900"
          >
            Populate Fields
          </Button>
          <Button
            className="rounded-[8px] bg-gray-300 font-mono font-semibold text-gray-900"
            onClick={seedEntries}
          >
            Seed Local Storage
          </Button>
          <Button
            className="rounded-[8px] bg-gray-300 font-mono font-semibold text-gray-900"
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
