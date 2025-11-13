import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const OneTwoCheckbox = ({}) => {
  return (
    <div className="flex absolute z-50 right-0 h-full top-1/2 py-2 pr-4 -translate-y-1/2 gap-4 items-center">
      <div className="h-full w-px bg-black"></div>
      <Label htmlFor="toggle" className="font-semibold text-xs">
        1-2
      </Label>
      <Checkbox
        id="toggle"
        checked={false}
        className="border-cyan-700 data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-900 size-5"
      />
    </div>
  );
};

export default OneTwoCheckbox;
