import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";
import App from "./App.tsx";
import "./global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    {/* {import.meta.env.DEV && (
      <TanStackDevtools
        config={{ position: "middle-left" }}
        plugins={[formDevtoolsPlugin()]}
      />
    )} */}
  </StrictMode>,
);
