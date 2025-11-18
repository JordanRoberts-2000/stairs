import { useOperatorProfile, useSession } from "@/store";
import { useEffect } from "react"; // your zustand store

function DarkModeSync() {
  const { operator } = useSession();
  const profile = useOperatorProfile(operator);

  const darkMode = profile?.darkMode ?? false;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return null;
}

export default DarkModeSync;
