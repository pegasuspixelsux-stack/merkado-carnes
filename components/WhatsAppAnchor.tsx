"use client";

import { useSettings } from "@/hooks/useSettings";

// A link that opens a chat with the business number saved in the admin Pedidos tab. Falls back to
// WhatsApp's chat picker when no number is set.
export default function WhatsAppAnchor({
  message,
  className,
  children,
  "aria-label": ariaLabel,
}: {
  message: string;
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
}) {
  const { settings } = useSettings();
  const number = settings.whatsappNumber.replace(/\D/g, "");
  return (
    <a
      href={`https://wa.me/${number}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </a>
  );
}
