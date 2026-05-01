import type { Metadata } from "next"
import Image from "next/image"
import {
  Armchair,
  Wifi,
  Tv,
  Wind,
  BatteryCharging,
  ShieldCheck,
  Check,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { CtaBanner } from "@/components/cta-banner"
import { getCities, getSettings, getTrips } from "@/lib/queries"

export const revalidate = 60

export const metadata: Metadata = {
  title: "الأسطول | باصات النقل البري الفاخرة",
  description:
    "تعرف على أسطول الباصات الفاخر: مواصفات كاملة، خدمات VIP، صور داخلية وخارجية لمختلف الشركات. باصات حديثة مجهزة بأحدث التقنيات لضمان راحتك وأمانك.",
  alternates: { canonical: "/fleet" },
}

const BUS_TYPES = [
  {
    name: "الباص الذهبي VIP",
    subtitle: "الفاخر",
    seats: 28,
    price: "من 450 ر.س",
    image: "/images/hero-bus.jpg",
    features: [
      "مقاعد جلدية بإمكانية استلقاء كامل 180°",
      "شاشة ترفيه HD شخصية مقاس 14 بوصة",
      "واي فاي عالي السرعة Fiber",
      "مسند للقدمين وبطانيات ومخدات",
      "خدمة مشروبات ووجبات",
      "منفذ USB و220 فولت",
    ],
    badges: ["الأكثر فخامة", "حصري"],
  },
  {
    name: "الباص الفاخر",
    subtitle: "الاختيار الأمثل",
    seats: 36,
    price: "من 380 ر.س",
    image: "/images/bus-interior.jpg",
    features: [
      "مقاعد جلدية استلقاء 160°",
      "شاشة ترفيه HD مقاس 10 بوصة",
      "واي فاي مجاني",
      "تكييف مركزي ممتاز",
      "منفذ شحن USB",
      "مساحة أرجل واسعة",
    ],
    badges: ["الأكثر طلباً"],
  },
  {
    name: "الباص السياحي",
    subtitle: "الاقتصادي الأنيق",
    seats: 45,
    price: "من 320 ر.س",
    image: "/images/fleet.jpg",
    features: [
      "مقاعد مريحة قابلة للإمالة",
      "تكييف قوي",
      "موسيقى وقرآن مباشر",
      "منفذ شحن USB",
      "مساحة أمتعة كبيرة",
      "أنظمة سلامة متقدمة",
    ],
    badges: ["أفضل قيمة"],
  },
]

export default async function FleetPage() {
  const [settings, cities, trips] = await Promise.all([
    getSettings(),
    getCities(),
    getTrips(),
  ])

  return (
    <>
      <SiteHeader settings={settings} />
      <main>
        <section className="relative overflow-hidden bg-background py-16 md:py-20">
          <div className="absolute inset-0 bg-mesh opacity-70" aria-hidden />
          <div className="container-wide relative">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 text-primary px-4 py-1.5 text-xs font-bold">
                أسطول {settings.short_name}
              </span>
              <h1 className="mt-5 font-display text-4xl md:text-6xl font-black text-foreground text-balance leading-tight">
                <span className="text-primary">{settings.fleet_size}+ باص</span> حديث
                <br />
                لتجربة سفر استثنائية
              </h1>
              <p className="mt-5 text-lg text-muted-foreground">
                اختر من بين ثلاث فئات من الباصات، كل منها مصممة لتلبي توقعاتك وميزانيتك.
                جميع باصاتنا تخضع لصيانة دورية صارمة.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { icon: Armchair, label: "مقاعد استلقاء" },
                  { icon: Wifi, label: "واي فاي" },
                  { icon: Tv, label: "شاشات HD" },
                  { icon: Wind, label: "تكييف ممتاز" },
                  { icon: BatteryCharging, label: "شواحن USB" },
                  { icon: ShieldCheck, label: "أمان أوروبي" },
                ].map((f) => (
                  <span
                    key={f.label}
                    className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-3 py-1.5 text-xs font-semibold shadow-soft"
                  >
                    <f.icon className="h-3.5 w-3.5 text-primary" />
                    {f.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-16">
          <div className="container-wide space-y-16">
            {BUS_TYPES.map((bus, i) => (
              <article
                key={bus.name}
                className={`grid lg:grid-cols-2 gap-10 items-center ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-premium">
                  <Image
                    src={bus.image}
                    alt={`${bus.name} - ${bus.subtitle}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
                  <div className="absolute top-5 right-5 flex flex-col gap-1.5">
                    {bus.badges.map((b) => (
                      <span
                        key={b}
                        className="self-start inline-block rounded-full bg-accent text-accent-foreground px-3 py-1 text-[11px] font-black"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-bold text-accent uppercase tracking-wider">
                    {bus.subtitle}
                  </div>
                  <h2 className="mt-2 font-display text-3xl md:text-4xl font-black text-foreground leading-tight">
                    {bus.name}
                  </h2>
                  <div className="mt-4 flex items-center gap-6 text-sm">
                    <div>
                      <span className="text-muted-foreground">السعة: </span>
                      <strong className="text-foreground">{bus.seats} راكب</strong>
                    </div>
                    <div className="text-primary font-display font-black text-xl">
                      {bus.price}
                    </div>
                  </div>

                  <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                    {bus.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-sm text-foreground/85"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <CtaBanner settings={settings} />
      </main>
      <SiteFooter settings={settings} cities={cities} featuredTrips={trips} />
      <WhatsAppFloat settings={settings} />
    </>
  )
}
