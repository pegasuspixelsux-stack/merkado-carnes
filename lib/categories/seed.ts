import type { Category } from "@/types/category";

// The starting categories. Products point at the ids; names can be edited freely, ids never change.
export const SEED_CATEGORIES: Category[] = [
  { id: "vaca", name: "Carne de Vaca", slug: "vaca" },
  { id: "cerdo", name: "Carne de Cerdo", slug: "cerdo" },
  { id: "pollo", name: "Pollo", slug: "pollo" },
  { id: "achuras", name: "Achuras & Embutidos", slug: "achuras" },
  { id: "paquetes", name: "Packs & Promo Familia", slug: "paquetes" },
];
