"use client";

import { useState } from "react";
import { useSettings } from "@/hooks/useSettings";
import type { StoreSettings } from "@/lib/settings";

const card =
  "rounded-[14px] border border-walnut/15 bg-cream/70 p-5 sm:p-6 dark:border-white/10 dark:bg-card";
const input =
  "w-full rounded-xl border border-walnut/15 bg-cream px-3.5 py-2.5 text-sm text-walnut placeholder:text-zinc-500 focus:border-walnut/30 dark:border-white/10 dark:bg-background dark:text-white dark:focus:border-white/30";
const label = "mb-1.5 block text-sm font-medium text-walnut dark:text-zinc-200";
const hint = "mt-1.5 text-xs text-muted dark:text-zinc-400";

// Edits are kept as text while typing and only validated on save.
export default function OrderSettings() {
  const { settings, save } = useSettings();
  const [draft, setDraft] = useState({
    whatsappNumber: settings.whatsappNumber,
    taxRate: String(settings.taxRate),
    deliveryFee: String(settings.deliveryFee),
    freeDeliveryMin: String(settings.freeDeliveryMin),
  });
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);

  const set = (k: keyof typeof draft) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraft((d) => ({ ...d, [k]: e.target.value }));
    setStatus(null);
  };

  function onSave(e: React.FormEvent) {
    e.preventDefault();
    const whatsappNumber = draft.whatsappNumber.replace(/\D/g, "");
    const taxRate = Number(draft.taxRate);
    const deliveryFee = Number(draft.deliveryFee);
    const freeDeliveryMin = Number(draft.freeDeliveryMin);
    let error = "";
    if (whatsappNumber.length < 8 || whatsappNumber.length > 15)
      error = "Ingresá el número de WhatsApp con código de país, por ejemplo 59899123456.";
    else if (!Number.isFinite(taxRate) || taxRate < 0 || taxRate > 100)
      error = "El impuesto debe estar entre 0 y 100.";
    else if (!Number.isFinite(deliveryFee) || deliveryFee < 0) error = "El costo de envío no puede ser negativo.";
    else if (!Number.isFinite(freeDeliveryMin) || freeDeliveryMin < 0)
      error = "El mínimo para envío gratis no puede ser negativo.";
    if (error) return setStatus({ ok: false, text: error });

    const next: StoreSettings = { whatsappNumber, taxRate, deliveryFee, freeDeliveryMin };
    try {
      save(next);
      setStatus({ ok: true, text: "Cambios guardados." });
    } catch {
      setStatus({ ok: false, text: "No se pudo guardar. El almacenamiento del navegador puede estar bloqueado." });
    }
  }

  return (
    <form onSubmit={onSave} noValidate>
      <h1 className="text-3xl font-semibold tracking-tight text-walnut dark:text-white">Pedidos</h1>
      <p className="mt-2 text-sm text-muted dark:text-zinc-400">
        Datos que se usan al armar el pedido y enviarlo por WhatsApp.
      </p>

      <div className={`${card} mt-8 grid gap-5 sm:grid-cols-2`}>
        <div className="sm:col-span-2">
          <label htmlFor="s-wa" className={label}>WhatsApp del negocio</label>
          <input id="s-wa" inputMode="numeric" value={draft.whatsappNumber} onChange={set("whatsappNumber")} className={input} />
          <p className={hint}>Solo números, con código de país (Uruguay: 598). Ejemplo: 59899123456.</p>
        </div>
        <div>
          <label htmlFor="s-tax" className={label}>Impuesto (%)</label>
          <input id="s-tax" inputMode="decimal" value={draft.taxRate} onChange={set("taxRate")} className={input} />
          <p className={hint}>Se suma al subtotal. IVA en Uruguay: 22. Poné 0 si los precios ya lo incluyen.</p>
        </div>
        <div>
          <label htmlFor="s-fee" className={label}>Costo de envío ($UYU)</label>
          <input id="s-fee" inputMode="numeric" value={draft.deliveryFee} onChange={set("deliveryFee")} className={input} />
          <p className={hint}>Monto fijo para pedidos a domicilio.</p>
        </div>
        <div>
          <label htmlFor="s-min" className={label}>Mínimo para envío gratis ($UYU)</label>
          <input id="s-min" inputMode="numeric" value={draft.freeDeliveryMin} onChange={set("freeDeliveryMin")} className={input} />
          <p className={hint}>Con un subtotal igual o mayor, el envío no se cobra. Poné 0 para desactivarlo.</p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          type="submit"
          className="rounded-full bg-chestnut px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-chestnut-hover active:scale-[0.97]"
        >
          Guardar cambios
        </button>
        {status && (
          <p role="status" className={`text-sm ${status.ok ? "text-muted dark:text-zinc-400" : "text-chestnut dark:text-red-400"}`}>
            {status.text}
          </p>
        )}
      </div>
    </form>
  );
}
