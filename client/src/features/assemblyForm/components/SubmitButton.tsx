import { FORM_DEFAULTS } from "@/constants";
import { withForm } from "../hooks/useAppForm";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/Spinner";
import { useIsMutating } from "@tanstack/react-query";
import { useIsPosting } from "@/store";

export const SubmitButton = withForm({
  defaultValues: FORM_DEFAULTS,
  render: ({ form }) => {
    const isPosting = useIsPosting();

    return (
      <form.Subscribe
        selector={(state) => state.isSubmitting}
        children={(isSubmitting) => (
          <Button
            type="submit"
            style={{ viewTransitionName: "submit-button" }}
            disabled={isSubmitting}
            aria-busy={isPosting}
            className={cn(
              "mx-auto mt-8 rounded-[8px] bg-neutral-800 px-12 font-mono text-2xl disabled:opacity-100",
              isPosting ? "size-fit cursor-wait" : "size-fit",
            )}
          >
            <span style={{ viewTransitionName: "submit-button-text" }}>
              {isPosting ? <Spinner /> : "Submit"}
            </span>
          </Button>
        )}
      />
    );
  },
});
