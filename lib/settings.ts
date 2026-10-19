// Order settings the store owner edits in the dashboard. Saved in the browser like the rest of
// the catalog data (see lib/pasta/local.ts), behind a small subscribe/snapshot API.

export interface StoreSettings {
  whatsappNumber: string; // digits with country code, e.g. 59899123456
  taxRate: number; // percent added on top of the subtotal (IVA is 22)
  deliveryFee: number; // flat fee in pesos for delivery orders
  freeDeliveryMin: number; // subtotal at or above which delivery is free; 0 turns it off
}

export const DEFAULT_SETTINGS: StoreSettings = {
  whatsappNumber: "59899123456",
  taxRate: 22,
  deliveryFee: 200,
  freeDeliveryMin: 2500,
};

const KEY = "merkado:settings:v1";
const listeners = new Set<() => void>();
let cache: StoreSettings | null = null;

function isSettings(v: unknown): v is StoreSettings {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.whatsappNumber === "string" &&
    typeof o.taxRate === "number" &&
    typeof o.deliveryFee === "number" &&
    typeof o.freeDeliveryMin === "number"
  );
}

function load(): StoreSettings {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (isSettings(parsed)) {
        cache = parsed;
        return cache;
      }
    }
  } catch {
    // Blocked or corrupt storage: fall back to the defaults.
  }
  cache = DEFAULT_SETTINGS;
  return cache;
}

// Keeps other open tabs in sync.
function onStorage(e: StorageEvent) {
  if (e.key === KEY || e.key === null) {
    cache = null;
    listeners.forEach((l) => l());
  }
}

export const settingsBackend = {
  subscribe(onChange: () => void) {
    listeners.add(onChange);
    if (listeners.size === 1) window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(onChange);
      if (listeners.size === 0) window.removeEventListener("storage", onStorage);
    };
  },
  getSnapshot: load,
  getServerSnapshot: () => DEFAULT_SETTINGS,
  // Write first. If storage is full or blocked this throws and nothing in memory changes.
  save(next: StoreSettings) {
    window.localStorage.setItem(KEY, JSON.stringify(next));
    cache = next;
    listeners.forEach((l) => l());
  },
};
