import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import FormInput from "./components/fields/FormInput";
import { DesignToggle } from "./components/fields/DesignToggle";
import FormNumberOfTreads from "./components/fields/TreadsToggle";
import OneTwoCheckbox from "./components/fields/OneTwoCheckbox";

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    Input: FormInput,
    ToggleGroup: DesignToggle,
    TreadNumber: FormNumberOfTreads,
    CheckBox: OneTwoCheckbox,
  },
  formComponents: {},
  fieldContext,
  formContext,
});

export { useAppForm, useFieldContext, withForm, useFormContext };
