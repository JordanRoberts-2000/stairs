import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";
import App from "./App.tsx";
import "./global.css";
import { DEMO_MODE, TANSTACK_DEVTOOLS } from "./AppConfig.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    {DEMO_MODE && TANSTACK_DEVTOOLS && (
      <TanStackDevtools
        config={{ position: "middle-left" }}
        plugins={[formDevtoolsPlugin()]}
      />
    )}
  </StrictMode>,
);
