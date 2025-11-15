import { Checkbox } from "@/components/ui/checkbox";
import { useFieldContext } from "../../hooks";
import type { AssemblySchemaInput } from "../../schema";

const OneTwoCheckbox = () => {
  const field = useFieldContext<AssemblySchemaInput["isOneTwo"]>();

  return (
    <div
      role="switch"
      aria-checked={field.state.value}
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        field.setValue((value) => !value);
      }}
      className="flex absolute z-20 right-0 h-full top-1/2 -translate-y-1/2 py-2 pr-4 gap-4 items-center cursor-pointer select-none"
    >
      <div className="h-full w-px bg-black" />
      <span className="font-semibold text-xs pointer-events-none">1-2</span>
      <Checkbox
        checked={field.state.value}
        className="pointer-events-none border-cyan-700 data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-900 size-5"
        aria-hidden="true"
      />
    </div>
  );
};

export default OneTwoCheckbox;
