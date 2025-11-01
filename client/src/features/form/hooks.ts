import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import FormInput from "./components/fields/FormInput";
import { FormToggleGroup } from "./components/fields/FormToggleGroup";
import FormNumberOfTreads from "./components/fields/TreadsToggle";

const { fieldContext, formContext, useFieldContext } = createFormHookContexts();

const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    Input: FormInput,
    ToggleGroup: FormToggleGroup,
    TreadNumber: FormNumberOfTreads,
  },
  formComponents: {},
  fieldContext,
  formContext,
});

export { useAppForm, useFieldContext, withForm };
