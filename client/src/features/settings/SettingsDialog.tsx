import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SettingsIcon from "@/assets/settings.svg?react";
import { Button, Field, FieldError, Input } from "@/components/ui";
import { Label } from "@/components/ui/label";
import { useActions, useSession, useUserTarget } from "@/store";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { FormInputNumber } from "../form/schema";

const targetSchema = FormInputNumber((n) =>
  n
    .int("Invalid Target number")
    .min(8, "Target must be ≥ 8")
    .max(24, "Target must be ≤ 24")
);

const SettingsDialog = ({}) => {
  const { setTarget } = useActions();
  const { operator } = useSession();
  const target = useUserTarget();

  const settingsForm = useForm({
    defaultValues: { target: String(target) },
  });

  const isDisabled = operator === undefined;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-neutral-800 rounded-[8px]"
          disabled={isDisabled}
          aria-disabled={isDisabled}
        >
          <SettingsIcon className="size-7 stroke-1" />
        </Button>
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-[425px] rounded-2xl"
      >
        <DialogHeader>
          <DialogTitle className="font-black">Settings</DialogTitle>
        </DialogHeader>
        <ul className="flex flex-col gap-6 mb-6">
          <li className="flex justify-between items-center">
            <settingsForm.Field
              name="target"
              asyncDebounceMs={1000}
              validators={{
                onBlur: ({ value }) => {
                  const parsed = targetSchema.safeParse(value);
                  if (!parsed.success) {
                    const msg =
                      parsed.error.issues[0]?.message ?? "Invalid value";
                    return { message: msg };
                  }

                  let { error } = setTarget(parsed.data);
                  if (error) {
                    console.error(`Failed to set target, error: ${error}`);
                    toast.error("Failed to set target");
                  }
                  return undefined;
                },
                onChangeAsync: ({ value }) => {
                  const parsed = targetSchema.safeParse(value);
                  if (!parsed.success) {
                    const msg =
                      parsed.error.issues[0]?.message ?? "Invalid value";
                    return { message: msg };
                  }

                  let { error } = setTarget(parsed.data);
                  if (error) {
                    console.error(`Failed to set target, error: ${error}`);
                    toast.error("Failed to set target");
                  }
                  return undefined;
                },
              }}
            >
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} className={"relative"}>
                    <Label className="font-mono">Target</Label>
                    <Input
                      maxLength={2}
                      inputMode="numeric"
                      className="w-16"
                      min={8}
                      max={24}
                      id={field.name}
                      aria-invalid={isInvalid}
                      name={field.name}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError
                        className="absolute text-xs bottom-0 pt-1 translate-y-full font-bold pr-2"
                        errors={field.state.meta.errors}
                      />
                    )}
                  </Field>
                );
              }}
            </settingsForm.Field>
          </li>
          <li className="flex items-center justify-between">
            <Label className="font-mono" htmlFor="airplane-mode">
              Dark Mode
            </Label>
            <Switch id="airplane-mode" />
          </li>
          <li className="flex items-center justify-between">
            <Label className="font-mono" htmlFor="airplane-mode">
              Automatic History Clearing
            </Label>
            <Switch id="airplane-mode" />
          </li>
        </ul>
        <DialogFooter className="flex flex-row">
          <Button className="flex-1 bg-neutral-800">Clear History</Button>
          <DialogClose asChild>
            <Button className="flex-1" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
