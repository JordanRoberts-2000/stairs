import { Checkbox } from "@/components/ui/checkbox";
import { useFieldContext } from "../../hooks/useAppForm";
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
      className="absolute top-1/2 right-0 z-20 flex h-full -translate-y-1/2 cursor-pointer items-center gap-4 py-2 pr-4 select-none"
    >
      <div className="h-full w-px bg-black" />
      <span className="pointer-events-none text-xs font-semibold">1-2</span>
      <Checkbox
        checked={field.state.value}
        className="pointer-events-none size-5 border-cyan-700 data-[state=checked]:border-cyan-900 data-[state=checked]:bg-cyan-600"
        aria-hidden="true"
      />
    </div>
  );
};

export default OneTwoCheckbox;
