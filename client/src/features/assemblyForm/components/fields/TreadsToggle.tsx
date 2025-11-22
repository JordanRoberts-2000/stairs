import {
  Field,
  FieldLabel,
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui";
import { useFieldContext } from "@/features/assemblyForm/hooks/useAppForm";
import { TREADS_CONFIG } from "@/constants";
import type { AssemblySchemaInput } from "@/features/assemblyForm/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  design: AssemblySchemaInput["design"];
};

const FormNumberOfTreads = ({ design }: Props) => {
  const field = useFieldContext<AssemblySchemaInput["treads"]>();
  const isInvalid = field.state.meta.isBlurred && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name} className="text-md font-black">
        Number of Treads
      </FieldLabel>
      <ToggleGroup
        className="relative flex items-stretch gap-2"
        type="single"
        value={
          field.state.value.kind === "preset" ? field.state.value.value : ""
        }
        onValueChange={(value) => {
          if (!value) return;
          field.handleChange({ kind: "preset", value });
          field.handleBlur();
        }}
      >
        {TREADS_CONFIG[design].options.map((tread_num, i) => (
          <ToggleGroupItem
            key={tread_num}
            value={tread_num.toString()}
            style={{ viewTransitionName: `tread-group-item-${i}` }}
            className="flex-1 overflow-clip rounded-[4px]! border-2 border-neutral-400 bg-white px-0 py-6 font-black shadow-md! transition data-[state=on]:border-black! data-[state=on]:bg-yellow-50!"
          >
            <div style={{ viewTransitionName: `tread-group-item-text-${i}` }}>
              {tread_num}
            </div>
          </ToggleGroupItem>
        ))}
        <div
          data-selected={
            field.state.value.kind === "custom" && field.state.value.value
              ? "true"
              : "false"
          }
          className="bg relative flex-2 overflow-clip rounded-[4px]! border-2 border-primary bg-white text-center font-black shadow-md! data-[selected=true]:bg-neutral-200"
          style={{ viewTransitionName: "tread-custom-select" }}
        >
          <Select
            value={
              field.state.value.kind === "custom" ? field.state.value.value : ""
            }
            onValueChange={(value) => {
              field.setMeta((m) => ({
                ...m,
                errors: [],
                errorMap: {},
              }));
              field.handleChange({ kind: "custom", value });
              field.handleBlur();
            }}
          >
            <SelectTrigger
              data-selected={
                field.state.value.kind === "custom" && field.state.value.value
                  ? "true"
                  : "false"
              }
              className="ml-2 flex h-full! w-full! items-center justify-center gap-1 border-none py-0 !text-center font-black text-cyan-700"
            >
              <SelectValue placeholder="Custom" />
            </SelectTrigger>
            <SelectContent className="h-[400px]">
              {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </ToggleGroup>
    </Field>
  );
};

export default FormNumberOfTreads;
