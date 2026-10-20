import type { Category } from "@/types/category";

// The starting categories. Products point at the ids; names can be edited freely, ids never change.
export const SEED_CATEGORIES: Category[] = [
  { id: "vaca", name: "Vacunos", slug: "vaca" },
  { id: "cerdo", name: "Cerdos", slug: "cerdo" },
  { id: "pollo", name: "Pollos", slug: "pollo" },
  { id: "achuras", name: "Embutidos", slug: "achuras" },
  { id: "paquetes", name: "Packs & Promo Familia", slug: "paquetes" },
];
