import Image from "next/image"
import { Shield, Star, Users, Award } from "lucide-react"
import { BookingSearch } from "@/components/booking-search"
import type { City, SiteSettings, Trip } from "@/lib/types"

export function Hero({
  cities,
  settings,
  featuredTrip,
}: {
  cities: City[]
  settings: SiteSettings
  featuredTrip?: Trip
}) {
  const trip =
    featuredTrip ?? {
      from_city: "صنعاء",
      to_city: "جدة",
      departure_time: "6:00 صباحاً",
      price: 450,
      currency: "SAR" as const,
    }

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-mesh opacity-70" aria-hidden />
      <div className="absolute inset-0 bg-dot opacity-[0.35]" aria-hidden />
      <div
        className="absolute top-0 inset-x-0 h-[80%] bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none"
        aria-hidden
      />

      <div className="container-wide relative pt-10 md:pt-16 pb-24 md:pb-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-bold text-primary animate-fade-up">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              الرحلات متاحة يومياً بين اليمن والسعودية
            </div>

            <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] text-foreground text-balance animate-fade-up">
              أسفارك البرية بين{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-primary">اليمن</span>
                <span className="absolute inset-x-0 bottom-1 h-3 bg-accent/40 -z-0 rounded-md" />
              </span>{" "}
              و{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-primary">السعودية</span>
                <span className="absolute inset-x-0 bottom-1 h-3 bg-accent/40 -z-0 rounded-md" />
              </span>
              <br />
              براحة وأمان لا يُضاهى
            </h1>

            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-2xl animate-fade-up">
              <strong className="text-foreground">{settings.company_name}</strong> تقدم
              لك تجربة سفر VIP متكاملة: باصات حديثة، مقاعد استلقاء، واي فاي، شاشات
              ترفيه، والتزام صارم بالمواعيد. احجز تذكرتك خلال دقيقتين.
            </p>

            <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-up">
              {[
                { icon: Users, label: settings.passengers_served, sub: "مسافر سعيد" },
                { icon: Star, label: "4.9/5", sub: "تقييم العملاء" },
                { icon: Shield, label: `${settings.years_of_service}+`, sub: "سنة خبرة" },
                { icon: Award, label: "#1", sub: "في اليمن" },
              ].map((t) => (
                <div
                  key={t.sub}
                  className="rounded-xl bg-card border border-border px-3 py-3 shadow-soft"
                >
                  <div className="flex items-center gap-2">
                    <t.icon className="h-4 w-4 text-accent" />
                    <div className="font-display font-extrabold text-lg text-foreground leading-none">
                      {t.label}
                    </div>
                  </div>
                  <div className="mt-1.5 text-[11px] text-muted-foreground font-medium">
                    {t.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 relative animate-fade-up">
            <div className="relative aspect-[4/5] sm:aspect-[5/6] rounded-3xl overflow-hidden shadow-premium">
              <Image
                src="/images/hero-bus.jpg"
                alt="باص فاخر VIP على الطريق بين اليمن والسعودية"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
              <div className="absolute bottom-4 inset-x-4 rounded-2xl bg-card/95 backdrop-blur-md border border-border p-4 shadow-premium">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    رحلة قادمة
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold px-2 py-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    ينطلق غداً
                  </span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <span className="font-display font-extrabold text-lg">{trip.from_city}</span>
                  <svg viewBox="0 0 40 12" className="h-3 w-10 text-primary flex-1">
                    <path
                      d="M1 6 H35 M35 6 L31 2 M35 6 L31 10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="font-display font-extrabold text-lg">{trip.to_city}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{trip.departure_time}</span>
                  <span className="font-bold text-primary">
                    من {Number(trip.price).toLocaleString("ar")}{" "}
                    {trip.currency === "SAR" ? "ر.س" : "ر.ي"}
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden md:block absolute -top-4 -right-4 rounded-2xl bg-accent text-accent-foreground px-4 py-3 shadow-premium rotate-[-6deg] animate-drive">
              <div className="text-[11px] font-bold opacity-80">VIP</div>
              <div className="font-display font-black text-xl leading-none">فاخر</div>
            </div>
          </div>
        </div>

        <div className="mt-10 lg:-mt-8 relative z-10">
          <BookingSearch cities={cities} />
        </div>
      </div>
    </section>
  )
}
