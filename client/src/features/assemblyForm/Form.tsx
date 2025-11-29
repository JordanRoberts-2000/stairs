import { DesignTreadsSection } from "./components/DesignTreadsSection";
import { DevTools } from "../devTools/DevToolsDialog";
import { useAssemblyForm } from "./hooks/useAssemblyForm";
import { DEMO_MODE } from "@/AppConfig";
import { SubmitButton } from "./components/SubmitButton";
import { CustomerDetailsSection } from "./components/CustomerDetailsSection";

const Form = ({}) => {
  const form = useAssemblyForm();
  return (
    <>
      <form
        className="mx-2 mt-2 flex flex-col bg-background px-4 pt-4 pb-20"
        onSubmit={async (e) => {
          e.preventDefault();
          await form.handleSubmit();
        }}
      >
        <CustomerDetailsSection form={form} />
        <DesignTreadsSection form={form} />
        <SubmitButton form={form} />
      </form>
      {(DEMO_MODE || import.meta.env.DEV) && <DevTools form={form} />}
    </>
  );
};

export default Form;
