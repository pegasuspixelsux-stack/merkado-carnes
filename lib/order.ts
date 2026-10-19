import type { CartItem, Fulfillment } from "@/store/useCart";
import type { StoreSettings } from "@/lib/settings";

export interface OrderTotals {
  subtotal: number;
  tax: number;
  delivery: number;
  freeDelivery: boolean; // delivery order that qualified for the free-delivery minimum
  total: number;
}

// Tax is added on top of the subtotal. Delivery is a flat fee, waived once the subtotal reaches
// the free-delivery minimum (0 disables the waiver).
export function computeTotals(
  items: CartItem[],
  settings: StoreSettings,
  fulfillment: Fulfillment,
): OrderTotals {
  const subtotal = Math.round(items.reduce((sum, i) => sum + i.product.price * i.quantity, 0));
  const tax = Math.round((subtotal * settings.taxRate) / 100);
  const isDelivery = fulfillment === "delivery";
  const freeDelivery = isDelivery && settings.freeDeliveryMin > 0 && subtotal >= settings.freeDeliveryMin;
  const delivery = isDelivery && !freeDelivery ? settings.deliveryFee : 0;
  return { subtotal, tax, delivery, freeDelivery, total: subtotal + tax + delivery };
}
