import type { PastaItem } from "@/types/pasta";

// Starter inventory. Prices are sample values in pesos uruguayos; edit them (and add photos)
// from the dashboard. An empty imageUrl shows the placeholder.
const item = (
  id: string,
  title: string,
  category: string,
  price: number,
  unit: string,
  description: string,
): PastaItem => ({ id: `seed-${id}`, title, category, description, price, unit, imageUrl: "", available: true });

export const SEED_ITEMS: PastaItem[] = [
  // Carne de Vaca
  item("asado-tira", "Asado de Tira", "vaca", 690, "kg", "El corte clásico de la parrilla uruguaya: costillas con buen hueso y veta de grasa que se hace lenta y jugosa al fuego."),
  item("pulpon-vacio", "Pulpón de Vacío", "vaca", 790, "kg", "Corte tierno y sabroso del flanco, ideal para cocinar entero a fuego medio y cortar en tiras al servir."),
  item("colita-cuadril", "Colita de Cuadril", "vaca", 820, "kg", "Magra y muy tierna, con una capa fina de grasa. Va perfecta a la parrilla o al horno."),
  item("entrana-fina", "Entraña Fina", "vaca", 980, "kg", "De sabor intenso y textura suave. Se hace rápido, bien caliente, y se sirve jugosa."),
  item("picana", "Picaña (Tapa de Cuadril)", "vaca", 890, "kg", "Con su capa de grasa por arriba, se asa entera o en medallones y rinde un sabor profundo."),
  item("bife-ancho", "Bife Ancho", "vaca", 890, "kg", "Jugoso y bien marmolado, con el hueso y la grasa que le dan sabor. Para plancha o parrilla."),
  item("bife-angosto", "Bife Angosto", "vaca", 920, "kg", "Corte con hueso, más magro y firme que el ancho. Muy buen punto a la parrilla."),
  item("nalga", "Nalga (para milanesas)", "vaca", 650, "kg", "Cortada fina y sin nervios, lista para hacer milanesas parejas y tiernas."),
  item("bola-lomo", "Bola de Lomo", "vaca", 720, "kg", "Magra y versátil: va al horno, a la olla o cortada en bifes para milanesas."),
  item("peceto", "Peceto", "vaca", 760, "kg", "Magro y de forma pareja, ideal para el horno, relleno o fiambre casero."),

  // Carne de Cerdo
  item("bondiola", "Bondiola", "cerdo", 580, "kg", "Tierna y con grasa justa. Se asa entera a fuego lento o en lonjas gruesas para sándwich."),
  item("solomillo", "Solomillo de Cerdo", "cerdo", 620, "kg", "El corte más tierno del cerdo, magro y de cocción rápida. Va al horno o a la plancha."),
  item("matambrito-cerdo", "Matambrito de Cerdo", "cerdo", 560, "kg", "Fino y sabroso, se hace en minutos a la parrilla; también queda bien arrollado y relleno."),
  item("costillitas", "Costillitas (Baby Backs)", "cerdo", 640, "kg", "Costillas chicas y carnosas, para cocinar lento con su salsa preferida hasta que se despeguen del hueso."),
  item("pechito-cerdo", "Pechito de Cerdo", "cerdo", 520, "kg", "Con su capa de grasa y cartílago, rinde mucho. Para horno lento o parrilla baja."),

  // Pollo
  item("pollo-entero", "Pollo Entero", "pollo", 270, "kg", "Pollo fresco para el horno, la parrilla o la olla. Se entrega limpio y listo para condimentar."),
  item("pechuga", "Pechuga deshuesada", "pollo", 420, "kg", "Sin hueso ni piel, magra y versátil: para milanesas, plancha, salteados o rellenos."),
  item("muslos-encuentro", "Muslos con Encuentro", "pollo", 290, "kg", "Muslo y contramuslo unidos, jugosos y con sabor. Perfectos para horno, parrilla o guiso."),
  item("milanesas-pollo", "Milanesas de Pollo preparadas", "pollo", 480, "kg", "Pechuga cortada fina y empanada, lista para freír u hornear."),
  item("alitas", "Alitas", "pollo", 310, "kg", "Alitas frescas para horno o parrilla, con o sin salsa picante."),

  // Achuras & Embutidos
  item("chorizo-criollo", "Chorizo Criollo", "achuras", 420, "kg", "Mezcla de carne vacuna y cerdo con especias criollas. Para el choripán o la parrilla."),
  item("chorizo-cerdo", "Chorizo de Cerdo", "achuras", 380, "kg", "Chorizo fresco de cerdo, jugoso y de sabor suave."),
  item("morcilla", "Morcilla Dulce/Salada", "achuras", 320, "kg", "Tradicional morcilla uruguaya. Consultá si la querés dulce o salada."),
  item("chinchulines", "Chinchulines", "achuras", 340, "kg", "Intestino delgado vacuno, limpio y listo para hacer crocante en la parrilla."),
  item("mollejas", "Mollejas", "achuras", 980, "kg", "Tiernas y cremosas por dentro, se doran a la parrilla con limón."),

  // Packs & Promo Familia
  item("pack-parri", "Pack Parri Clásico", "paquetes", 2900, "pack", "2 kg de asado, 1 kg de chorizos y 1 kg de colita de cuadril. Todo para una parrillada de ocho."),
  item("pack-semana", "Pack Semana Familiar", "paquetes", 3200, "pack", "1 kg de nalga para milanesas, 1 kg de carne picada especial, 2 kg de pechuga y 1 kg de carne de cerdo."),
  item("pack-domingo", "Pack Asado Domingo", "paquetes", 4200, "pack", "3 kg de asado de tira, 1,5 kg de pulpón, chorizos y morcillas para la mesa del domingo."),
];
