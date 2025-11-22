type AppMode = "production" | "demo";

const RAW_MODE = import.meta.env.VITE_APP_MODE as AppMode | undefined;

export const APP_MODE: AppMode = RAW_MODE ?? "production";

export const DEMO_MODE = APP_MODE === "demo";

export const TANSTACK_DEVTOOLS: boolean = false;
