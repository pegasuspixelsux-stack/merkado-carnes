"use client";

import { useSyncExternalStore } from "react";
import { settingsBackend } from "@/lib/settings";

export function useSettings() {
  const settings = useSyncExternalStore(
    settingsBackend.subscribe,
    settingsBackend.getSnapshot,
    settingsBackend.getServerSnapshot,
  );
  return { settings, save: settingsBackend.save };
}
