import Link from "next/link"
import { ArrowLeft, Clock, Sparkles, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Trip } from "@/lib/types"

export function PopularTrips({ trips }: { trips: Trip[] }) {
  if (!trips || trips.length === 0) return null
  const list = trips.slice(0, 8)

  return (
    <section className="py-20 md:py-28 bg-secondary/40">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 text-xs font-bold">
              <Sparkles className="h-3.5 w-3.5" />
              الرحلات الأكثر طلباً
            </span>
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-black text-foreground text-balance">
              احجز مقعدك الآن على أشهر خطوطنا
            </h2>
            <p className="mt-3 text-muted-foreground text-lg">
              رحلات يومية بأوقات مرنة وأسعار تنافسية بين اليمن والسعودية
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="self-start md:self-end border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold"
          >
            <Link href="/routes">
              عرض جميع الوجهات
              <ArrowLeft className="h-4 w-4 mr-2" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((trip) => (
            <article
              key={trip.id}
              className="group relative flex flex-col rounded-2xl bg-card border border-border shadow-soft hover:shadow-premium hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {trip.featured && (
                <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 rounded-full bg-accent text-accent-foreground px-2.5 py-1 text-[10px] font-black uppercase tracking-wide">
                  <Star className="h-3 w-3 fill-accent-foreground" />
                  مميزة
                </div>
              )}

              <div className="bg-primary text-primary-foreground p-5">
                <div className="flex items-center justify-between text-[11px] opacity-80">
                  <span className="font-bold">رحلة {trip.bus_type}</span>
                  <span>{trip.duration}</span>
                </div>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-[10px] opacity-70 font-bold uppercase">من</div>
                    <div className="font-display text-xl font-extrabold truncate">
                      {trip.from_city}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <svg viewBox="0 0 48 14" className="h-3.5 w-12 text-accent">
                      <path
                        d="M46 7 H6 M6 7 L11 2 M6 7 L11 12"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="46" cy="7" r="1.5" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="min-w-0 text-right">
                    <div className="text-[10px] opacity-70 font-bold uppercase">إلى</div>
                    <div className="font-display text-xl font-extrabold truncate">
                      {trip.to_city}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col p-5">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    {trip.departure_time}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-primary" />
                    {trip.seats_available} مقعد متاح
                  </span>
                </div>

                <div className="flex items-end justify-between mt-auto">
                  <div>
                    <div className="text-[11px] text-muted-foreground font-bold">تبدأ من</div>
                    <div className="font-display font-black text-2xl text-primary leading-none">
                      {Number(trip.price).toLocaleString("ar")}
                      <span className="text-sm mr-1">
                        {trip.currency === "SAR" ? "ر.س" : "ر.ي"}
                      </span>
                    </div>
                  </div>
                  <Button
                    asChild
                    size="sm"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
                  >
                    <Link
                      href={`/trips?from=${encodeURIComponent(
                        trip.from_city
                      )}&to=${encodeURIComponent(trip.to_city)}`}
                    >
                      احجز
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
