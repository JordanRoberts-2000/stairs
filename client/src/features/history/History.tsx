import { Button } from "@/components/ui/button";
import HistoryIcon from "@/assets/clock.svg?react";
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
import { useActions } from "@/store";

export function History() {
  const { clearData } = useActions();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="ml-auto border-0 bg-neutral-800 text-white rounded-[8px] absolute right-1 shadow-none"
        >
          <MenuIcon className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-stone-100 gap-0">
        <SheetHeader className="border-b border-gray-500">
          <SheetTitle>History</SheetTitle>
          <SheetDescription className="sr-only">
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <HistorySection />
        <SheetFooter>
          <Button onClick={clearData}>Temp Clear History</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
