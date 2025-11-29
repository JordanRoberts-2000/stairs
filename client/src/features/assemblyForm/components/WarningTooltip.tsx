import { Button } from "@/components/ui";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const WarningTooltip = ({}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="pointer-events-auto absolute top-1/2 right-3 my-auto flex size-6! -translate-y-1/2 items-center justify-center rounded-full border border-orange-500 bg-orange-100 p-3 text-xs font-bold text-orange-600">
          !
        </Button>
      </PopoverTrigger>
      <PopoverContent side="top" align="end" className="max-w-xs text-xs">
        'Barratt' and 'David Wilson' <span className="font-bold">winder</span>{" "}
        stairs must have corner blocks on the back of the risers
      </PopoverContent>
    </Popover>
  );
};

export default WarningTooltip;
