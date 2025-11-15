import Form from "./features/assemblyForm/Form";
import Header from "./components/Header";
import { Toaster } from "./components/ui/sonner";
import { useEffect } from "react";

function App() {
  // useEffect(() => {
  //   document.addEventListener("visibilitychange", () => {
  //     localStorage.clear();
  //     alert("visibilitychange");
  //   });
  // }, []);
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
