import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import FormInput from "./components/fields/FormInput";
import { DesignToggle } from "./components/fields/DesignToggle";
import FormNumberOfTreads from "./components/fields/TreadsToggle";

const { fieldContext, formContext, useFieldContext } = createFormHookContexts();

const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    Input: FormInput,
    ToggleGroup: DesignToggle,
    TreadNumber: FormNumberOfTreads,
  },
  formComponents: {},
  fieldContext,
  formContext,
});

export { useAppForm, useFieldContext, withForm };
