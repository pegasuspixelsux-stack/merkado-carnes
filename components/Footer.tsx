import Link from "next/link";
import { Check, Clock, MapPin, MessageCircle, Settings } from "lucide-react";
import { siFacebook, siInstagram, siWhatsapp } from "simple-icons";
import { storeInfo } from "@/config/storeInfo";
import WhatsAppAnchor from "@/components/WhatsAppAnchor";
import OpenAboutLink from "@/components/OpenAboutLink";
import ThemeToggle from "@/components/ThemeToggle";

// Brand marks come from the simple-icons package, drawn in the current text colour.
const brandCls =
  "grid h-10 w-10 place-items-center rounded-full border border-walnut/15 text-muted transition-colors hover:border-walnut/30 hover:text-walnut dark:border-white/10 dark:text-zinc-400 dark:hover:border-white/25 dark:hover:text-white";

function BrandMark({ icon }: { icon: { path: string } }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current" aria-hidden="true">
      <path d={icon.path} />
    </svg>
  );
}

function Brand({ icon, label, href }: { icon: { path: string }; label: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={brandCls}>
      <BrandMark icon={icon} />
    </a>
  );
}

const heading = "text-sm font-semibold text-walnut dark:text-white";
const linkCls =
  "text-sm text-muted transition-colors hover:text-walnut dark:text-zinc-400 dark:hover:text-white";
const row = "flex items-start gap-3 text-sm text-muted dark:text-zinc-400";

// The category slugs match the seeded categories; a link to a deleted one just shows everything.
const sections = [
  { label: "Cortes de Vaca", cat: "vaca" },
  { label: "Cerdo", cat: "cerdo" },
  { label: "Pollo", cat: "pollo" },
  { label: "Achuras", cat: "achuras" },
  { label: "Packs Familiares", cat: "paquetes" },
];

export default function Footer() {
  const { name, summary, hours, pickup, delivery, region, contactNote, social, about } = storeInfo;

  return (
    <footer className="relative isolate overflow-hidden border-t border-walnut/15 bg-walnut/[0.04] dark:border-white/10 dark:bg-white/[0.02]">
      {/* Decorative butchery photo, faded into the background on large screens. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={about.secondaryImageUrl}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden h-full w-1/3 object-cover opacity-[0.08] [mask-image:linear-gradient(to_left,black,transparent)] lg:block dark:opacity-[0.12]"
      />
      <div className="mx-auto max-w-[1440px] px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* 1. Brand and overview */}
          <div>
            <p className="text-xl font-bold tracking-tight text-walnut dark:text-white">{name}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted dark:text-zinc-400">{summary}</p>
            <div className="mt-5 flex items-center gap-2">
              <Brand icon={siInstagram} label={`${name} en Instagram`} href={social.instagram} />
              <Brand icon={siFacebook} label={`${name} en Facebook`} href={social.facebook} />
              <WhatsAppAnchor message="Hola!" aria-label={`Pedile a ${name} por WhatsApp`} className={brandCls}>
                <BrandMark icon={siWhatsapp} />
              </WhatsAppAnchor>
            </div>
          </div>

          {/* 2. Sections */}
          <nav aria-label="Secciones">
            <h2 className={heading}>Secciones</h2>
            <ul className="mt-4 space-y-3">
              {sections.map((s) => (
                <li key={s.cat}>
                  <Link href={`/?cat=${s.cat}#catalog`} className={linkCls}>{s.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 3. About us */}
          <nav aria-label="Nosotros">
            <h2 className={heading}>Nosotros</h2>
            <ul className="mt-4 space-y-3">
              <li><OpenAboutLink className={linkCls}>Nuestra Historia</OpenAboutLink></li>
              <li><OpenAboutLink className={linkCls}>Compromiso de Calidad</OpenAboutLink></li>
              <li><a href="#hours" className={linkCls}>Envíos y Horarios</a></li>
            </ul>
          </nav>

          {/* 4. Contact, location and hours */}
          <div id="contact">
            <h2 className={heading}>Contacto y ubicación</h2>
            <ul className="mt-4 space-y-3">
              <li className={row}>
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <address className="not-italic">{region}</address>
              </li>
              <li className={row}>
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  {contactNote}{" "}
                  <WhatsAppAnchor message="Hola! Quiero hacer un pedido." className={`${linkCls} underline underline-offset-2`}>
                    Escribinos
                  </WhatsAppAnchor>
                </span>
              </li>
            </ul>
            <div id="hours" className="mt-4 scroll-mt-24">
              <ul className="space-y-3">
                {hours.map((h) => (
                  <li key={h.days} className={row}>
                    <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>
                      <span className="block font-medium text-walnut dark:text-zinc-200">{h.days}</span>
                      {h.times}
                    </span>
                  </li>
                ))}
              </ul>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Formas de recibir tu pedido">
                {[
                  { label: "Retiro en el local", on: pickup },
                  { label: "Envío a domicilio", on: delivery },
                ].map((s) => (
                  <li
                    key={s.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-walnut/15 px-3 py-1 text-xs font-medium text-walnut dark:border-white/10 dark:text-zinc-200"
                  >
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    {s.label}
                    <span className="sr-only">{s.on ? " disponible" : " no disponible"}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sub-footer: copyright and configuration */}
        <hr className="mt-12 border-walnut/15 dark:border-white/10" />
        <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-xs text-muted dark:text-zinc-500">
            &copy; {storeInfo.copyrightYear} {name}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              aria-label="Panel de Administración"
              className="flex items-center gap-1 text-xs text-muted opacity-60 transition hover:text-walnut hover:opacity-100 dark:text-zinc-400 dark:hover:text-white"
            >
              <Settings className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Admin</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
