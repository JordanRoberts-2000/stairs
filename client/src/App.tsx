import Form from "./features/form/Form";
import Header from "./components/Header";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-xl border flex flex-col bg-background">
      <Header />
      <Form />
      <Toaster duration={1500} />
    </div>
  );
}

export default App;
