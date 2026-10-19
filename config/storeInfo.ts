// The single source of truth for business details. The About section and the footer both read
// from here, so update the hours, a link or the story in one place.
//
// PLACEHOLDERS: the hours and social links below are sample values. Replace them with the real
// business details. The WhatsApp number for orders is set in the admin Pedidos tab.

export interface HoursRow {
  days: string;
  times: string;
}

export const storeInfo = {
  name: "Merkado de Carnes",
  summary:
    "Merkado de Carnes — Tu boutique de carnes de confianza. Cortes seleccionados, achuras de primera y packs parrilleros directos a tu puerta.",
  copyrightYear: 2026,

  region: "Maldonado & Punta del Este, Uruguay",
  contactNote: "Atención al cliente y pedidos por WhatsApp.",

  hours: [
    { days: "Martes a domingo", times: "11:30 a 15:30 y 19:00 a 23:00" },
    { days: "Lunes", times: "Cerrado" },
  ] satisfies HoursRow[],
  pickup: true,
  delivery: true,

  // Social profiles. These point at each network's home page until you add your own handles.
  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
  },

  about: {
    headline: "Tradición Familiar en Cada Corte",
    subheadline: "Más de 30 años seleccionando la mejor carne para la mesa uruguaya.",
    body: "Merkado Carnes nació como una carnicería boutique de barrio, impulsada por la pasión de nuestra familia por el buen asado y el respeto por el oficio tradicional. Seleccionamos cuidadosamente los mejores cortes de vacuno, cerdo y ave de productores locales, garantizando frescura, maduración óptima y un sabor inconfundible. Hoy combinamos el saber artesanal de toda la vida con la comodidad digital para que recibas en tu hogar la calidad que nos caracteriza.",
    highlights: [
      { title: "Cortes de Selección", text: "Ganadería local seleccionada y trazabilidad garantizada." },
      { title: "Desposte Artesanal", text: "Atención personalizada y cortes a medida para tu parrilla o cocina." },
      { title: "Envío y Cadena de Frío", text: "Empaquetado al vacío en bolsas térmicas para máxima frescura." },
    ],
    // Photos from Unsplash (Unsplash License).
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Preparación artesanal de carne sobre una tabla de madera",
    secondaryImageUrl: "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=800&auto=format&fit=crop",
    secondaryImageAlt: "Cortes listos para la parrilla tradicional",
  },
} as const;
