import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import type { OperatorProfile } from "@/types";

const TEMP_AUTOCOMPLETE_FIELDS = ["barratt", "david wilson"];

type Props = {
  children: React.ReactNode;
  open: boolean;
  profile: OperatorProfile | null;
  selectAutocomplete: (label: string) => void;
};

const AutoCompletePopover = ({
  children,
  open,
  profile,
  selectAutocomplete,
}: Props) => {
  if (profile && !profile.autoComplete) return <>{children}</>;

  return (
    <Popover open={open}>
      <PopoverAnchor>{children}</PopoverAnchor>
      <PopoverContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="my-2 w-[var(--radix-popover-trigger-width)] rounded-[8px] border border-neutral-200 bg-white/95 p-2 shadow-lg backdrop-blur-sm"
      >
        <ul className="divide-y divide-neutral-100 text-sm">
          {TEMP_AUTOCOMPLETE_FIELDS.map((label, idx) => (
            <li key={label + idx}>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectAutocomplete(label);
                }}
                onClick={() => selectAutocomplete(label)}
                className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-left hover:bg-neutral-100/80"
              >
                <span className="font-mono font-black text-neutral-800 capitalize">
                  {label}
                </span>

                {idx === 0 && (
                  <span className="text-xs tracking-wide text-neutral-400 uppercase">
                    @ autocomplete
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default AutoCompletePopover;
