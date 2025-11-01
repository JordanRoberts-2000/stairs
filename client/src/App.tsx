import Form from "./features/form/Form";
import Header from "./components/Header";

function App() {
  return (
    <div className="mx-auto w-full max-w-xl border flex flex-col bg-background">
      <Header />
      <Form />
    </div>
  );
}

export default App;
