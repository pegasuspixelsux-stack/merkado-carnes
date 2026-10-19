"use client";

import { useCallback, useEffect, useState } from "react";
import { ShoppingBag, X } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { formatPrice } from "@/lib/format";
import { computeTotals } from "@/lib/order";
import { useCart } from "@/store/useCart";
import CartDrawer from "./CartDrawer";

// The floating order bar, the drawer it opens, and the "added" toast.
export default function CartBar() {
  const cart = useCart();
  const { settings } = useSettings();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const { subtotal } = computeTotals(cart.items, settings, "pickup");

  // The toast clears itself after a moment; a new toast restarts the timer.
  const [hiddenId, setHiddenId] = useState(0);
  const toastId = cart.toast?.id ?? 0;
  useEffect(() => {
    if (!toastId) return;
    const t = setTimeout(() => setHiddenId(toastId), 2200);
    return () => clearTimeout(t);
  }, [toastId]);
  const toastVisible = cart.toast && cart.toast.id !== hiddenId;

  return (
    <>
      <div aria-live="polite" role="status" className="pointer-events-none fixed inset-x-0 bottom-20 z-40 flex justify-center px-4">
        {toastVisible && (
          <p className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background shadow-lg">
            {cart.toast?.message}
          </p>
        )}
      </div>

      {cart.itemCount > 0 && (
        <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
          <div className="glass pointer-events-auto flex items-center gap-1 rounded-full border border-border bg-background/80 p-1.5 shadow-xl backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97]"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              Ver pedido
              <span className="tabular-nums opacity-80">
                {cart.itemCount} {cart.itemCount === 1 ? "producto" : "productos"}, {formatPrice(subtotal)}
              </span>
            </button>
            <button
              type="button"
              onClick={() => cart.items.forEach((i) => cart.removeItem(i.product.id))}
              aria-label="Vaciar el pedido"
              className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      <CartDrawer open={open} onClose={close} />
    </>
  );
}
