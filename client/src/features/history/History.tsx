import { Button } from "@/components/ui/button";
import MenuIcon from "@/assets/menu.svg?react";
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
import SettingsButton from "../settings/SettingsButton";

export function History() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="onclick-bounce absolute top-2 right-1 ml-auto rounded-[8px] border-0 bg-neutral-800 text-white shadow-none"
        >
          <MenuIcon className="size-8" />
        </Button>
      </SheetTrigger>
      <SheetContent className="gap-0 border border-neutral-400">
        <SheetHeader className="m-1 rounded-[8px] bg-neutral-800">
          <SheetTitle className="mx-auto font-mono font-black text-white!">
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
          <SettingsButton />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
