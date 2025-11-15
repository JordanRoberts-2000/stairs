import Form from "./features/assemblyForm/Form";
import Header from "./components/Header";
import { Toaster } from "./components/ui/sonner";
import { useEffect } from "react";
import { useClearHistoryCheck } from "./utils/clearHistoryCheck";

function App() {
  const clearHistoryCheck = useClearHistoryCheck();

  useEffect(() => {
    const onVisibility = () => {
      clearHistoryCheck();
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [clearHistoryCheck]);
  return (
    <>
      <div className="mx-auto min-h-screen w-full max-w-xl border-x-2 border-neutral-800 flex flex-col bg-background">
        <Header />
        <Form />
        <Toaster duration={2000} />
      </div>
    </>
  );
}

export default App;
