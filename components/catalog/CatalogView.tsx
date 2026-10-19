"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchX } from "lucide-react";
import CategoryIcon from "@/components/CategoryIcon";
import { useCategories } from "@/hooks/useCategories";
import { normalize } from "@/lib/format";
import { usePastaInventory } from "@/hooks/usePastaInventory";
import HeroSlideshow from "@/components/HeroSlideshow";
import { useHeroConfig } from "@/hooks/useHeroConfig";
import CartBar from "./CartBar";
import PastaCard from "./PastaCard";

type Filter = string; // a category id, or "all"

const pill =
  "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors";
const pillOff =
  "border-walnut/15 text-muted hover:border-walnut/30 hover:text-walnut dark:border-white/10 dark:text-zinc-400 dark:hover:border-white/25 dark:hover:text-white";
const pillOn =
  "border-chestnut bg-chestnut text-white";

// The search text lives in the URL (?q=), written by the top nav search. This view only reads it.
export default function CatalogView() {
  const { items, hydrated } = usePastaInventory();
  const { config: heroConfig } = useHeroConfig();
  const query = useSearchParams().get("q") ?? "";
  const { categories } = useCategories();
  // ?cat=<slug> (the footer's section links) preselects a category. A pill click wins until the
  // link changes again.
  const catParam = useSearchParams().get("cat");
  const paramId = categories.find((c) => c.slug === catParam)?.id ?? "all";
  const [picked, setPicked] = useState<{ from: string | null; id: Filter } | null>(null);
  const chosen = picked && picked.from === catParam ? picked.id : paramId;
  const setCategory = (id: Filter) => setPicked({ from: catParam, id });
  // If the chosen category was deleted in the meantime, fall back to All instead of an empty grid.
  const category = chosen === "all" || categories.some((c) => c.id === chosen) ? chosen : "all";

  const visible = useMemo(() => {
    const q = normalize(query.trim());
    return items.filter((i) => {
      if (category !== "all" && i.category !== category) return false;
      if (!q) return true;
      return normalize(i.title).includes(q) || normalize(i.description).includes(q);
    });
  }, [items, query, category]);

  const filtering = query.trim() !== "" || category !== "all";

  function clearFilters() {
    setCategory("all");
    // The nav search follows the URL, so clearing ?q= clears it too.
    window.history.replaceState(null, "", window.location.pathname);
  }

  return (
    <>
      {/* Full-bleed: sits outside the narrow content column, flush under the nav. */}
      <HeroSlideshow config={heroConfig} />

      <main id="catalog" className="mx-auto w-full max-w-[1440px] flex-1 px-6 pb-10 pt-8">
        {/* Visually hidden: announces result counts to screen readers. */}
        <p aria-live="polite" className="sr-only">
          {hydrated
            ? `${visible.length} ${visible.length === 1 ? "producto" : "productos"}${
                query.trim() ? ` para "${query.trim()}"` : ""
              }`
            : "Cargando el catálogo"}
        </p>

        {/* Category filters, above the grid. */}
        <div role="group" aria-label="Filtrar por categoría" className="mb-8 flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={category === "all"}
            onClick={() => setCategory("all")}
            className={`${pill} ${category === "all" ? pillOn : pillOff}`}
          >
            Todos
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={category === c.id}
              onClick={() => setCategory(c.id)}
              className={`${pill} inline-flex items-center gap-1.5 ${category === c.id ? pillOn : pillOff}`}
            >
              <CategoryIcon key={c.icon} icon={c.icon} className="h-4 w-4 rounded-full" />
              {c.name}
            </button>
          ))}
        </div>

        {!hydrated ? (
          // Skeleton shaped like the final grid, shown until the saved inventory is read.
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
            {Array.from({ length: 4 }).map((_, i) => (
              <li
                key={i}
                className="h-48 animate-pulse rounded-[14px] border border-walnut/15 bg-cream/70 dark:border-white/10 dark:bg-card"
              />
            ))}
          </ul>
        ) : visible.length === 0 ? (
          <div className="mx-auto flex max-w-sm flex-col items-center py-24 text-center">
            <SearchX className="h-8 w-8 text-zinc-400" strokeWidth={1.5} aria-hidden="true" />
            <h2 className="mt-4 text-lg font-semibold text-walnut dark:text-white">
              {filtering ? "No hay resultados para esa búsqueda" : "El catálogo está vacío"}
            </h2>
            <p className="mt-2 text-sm text-muted dark:text-zinc-400">
              {filtering
                ? "Probá con otra palabra o quitá los filtros."
                : "Los productos que agregues en el panel van a aparecer acá."}
            </p>
            {filtering && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-full bg-chestnut px-5 py-2 text-sm font-medium text-white hover:bg-chestnut-hover"
              >
                Quitar filtros
              </button>
            )}
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((item) => (
              <PastaCard key={item.id} item={item} />
            ))}
          </ul>
        )}
      </main>

      <CartBar />
    </>
  );
}
