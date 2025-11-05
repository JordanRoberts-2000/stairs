import { Button } from "@/components/ui/button";
import MenuIcon from "@/assets/menu.svg?react";
import SettingsIcon from "@/assets/settings.svg?react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import HistorySection from "./HistorySection";
import { useActions } from "@/store";

export function History() {
  const { clearEntries } = useActions();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="ml-auto border-0 bg-neutral-800 text-white rounded-[8px] absolute right-1 shadow-none"
        >
          <MenuIcon className="size-7" />
        </Button>
      </SheetTrigger>
      <SheetContent className=" gap-0 border border-neutral-400">
        <SheetHeader className=" m-1 rounded-[8px] bg-neutral-800">
          <SheetTitle className="mx-auto font-black text-white! font-mono">
            History
          </SheetTitle>
          <SheetDescription className="sr-only">
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <HistorySection />
        <SheetFooter className="flex flex-row bg-white">
          <SheetClose asChild>
            <Button
              variant="outline"
              className="flex-1 rounded-[8px] font-mono"
            >
              Close
            </Button>
          </SheetClose>
          <Button
            className="bg-neutral-800 rounded-[8px]"
            onClick={clearEntries}
          >
            <SettingsIcon className="size-7 stroke-1" />
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
