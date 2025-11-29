import { withForm } from "../../hooks/useAppForm";
import { FIELD_DELIMITER, FORM_DEFAULTS } from "@/constants";
import { useOperatorProfile, useSession } from "@/store";
import { viewTransition } from "@/utils";
import { flushSync } from "react-dom";
import WarningTooltip from "../WarningTooltip";
import type { AnyFormApi } from "@tanstack/react-form";
import type { OperatorProfile } from "@/types";

const shouldShowWarning = (raw: string): boolean => {
  const input = (raw.split("@")[0] ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s.'"]/g, "");

  if (!input) return false;

  const triggers = ["dw", "david", "davidwilson", "barratt", "barrat"];
  return triggers.some((trigger) => input.includes(trigger));
};

const handleFormShortcut = (value: string, form: AnyFormApi) => {
  if (!value?.includes(FIELD_DELIMITER)) return;

  const [customer, site, plot, wos] = value
    .split(FIELD_DELIMITER)
    .map((part) => part.trim())
    .filter(Boolean);

  const fields = { customer, site, plot, wos };

  Object.entries(fields).forEach(([name, value]) => {
    if (value) {
      form.setFieldValue(name, value);
      form.validateField(name, "submit");
    }
  });
};

const handleHistoryShortcut = (
  value: string,
  profile: OperatorProfile | null,
  form: AnyFormApi,
) => {
  if (!value.startsWith(FIELD_DELIMITER) || !profile?.history.length) return;

  const last = profile.history[profile.history.length - 1];
  if (!last) return;

  const parts = value.split(FIELD_DELIMITER).filter(Boolean);
  const [newPlot, newWos] = parts.map((p) => p.trim()).filter(Boolean);

  viewTransition(() => {
    form.setFieldValue("customer", last.customer);
    form.validateField("customer", "submit");

    form.setFieldValue("site", last.site);
    form.validateField("site", "submit");

    form.setFieldValue("design", last.design);

    form.setFieldValue("treads", {
      kind: "custom",
      value: String(last.treads),
    });

    if (newPlot) {
      form.setFieldValue("plot", newPlot);
      form.validateField("plot", "submit");
    }

    const wosValue = newWos || String(last.wos);
    form.setFieldValue("wos", wosValue);
    form.validateField("wos", "submit");
  });
};

const CustomerInput = withForm({
  defaultValues: FORM_DEFAULTS,
  render: ({ form }) => {
    const { operator } = useSession();
    const profile = useOperatorProfile(operator);

    return (
      <form.AppField name="customer">
        {(field) => {
          const value = field.state.value;
          const showWarning = shouldShowWarning(value);
          return (
            <field.Input
              inputMode="email"
              inputClassName={showWarning ? "border-orange-500!" : ""}
              onBlur={() => {
                handleFormShortcut(value, form);
                handleHistoryShortcut(value, profile, form);
              }}
            >
              {showWarning && <WarningTooltip />}
              {/* <AutoCompletePopover /> */}
            </field.Input>
          );
        }}
      </form.AppField>
    );
  },
});

export { CustomerInput };
