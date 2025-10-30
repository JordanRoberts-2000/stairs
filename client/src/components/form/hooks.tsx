import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import FormInput from "./FormInput";
import FormToggleGroup from "./FormToggleGroup";
import FormNumberOfTreads from "./TreadsToggle";

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input: FormInput,
    ToggleGroup: FormToggleGroup,
    TreadNumber: FormNumberOfTreads,
  },
  formComponents: {},
  fieldContext,
  formContext,
});

export { useAppForm, useFieldContext, useFormContext };
