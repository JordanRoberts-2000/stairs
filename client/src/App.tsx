import Form from "./features/assemblyForm/Form";
import Header from "./components/Header";
import { Toaster } from "./components/ui/sonner";
import DarkModeSync from "./utils/DarkModeSync";
import { useVisibilityClearHistoryCheck } from "./hooks/useVisibilityClearHistoryCheck";

function App() {
  useVisibilityClearHistoryCheck();

  return (
    <>
      <DarkModeSync />
      <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col border-x-2 border-neutral-800 bg-background">
        <Header />
        <Form />
        <Toaster duration={2000} />
      </div>
    </>
  );
}

export default App;
