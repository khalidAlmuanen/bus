"use client"

import { useMemo, useState } from "react"
import {
  Clock,
  Users,
  Wifi,
  Tv,
  Armchair,
  Wind,
  MessageCircle,
  Filter,
  Star,
  Inbox,
  Building2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookNowButton } from "@/components/book-now-button"
import { ShareTrip } from "@/components/share-trip"
import type { Trip, SiteSettings, Company } from "@/lib/types"
import { buildWhatsappUrl, sendNotification } from "@/lib/data"

type Props = {
  allTrips: Trip[]
  companies: Company[]
  settings: SiteSettings
  from?: string
  to?: string
  passengers?: string
}

const DIRECTION_FILTERS = [
  { key: "all", label: "جميع الرحلات" },
  { key: "yemen-to-saudi", label: "من اليمن إلى السعودية" },
  { key: "saudi-to-yemen", label: "من السعودية إلى اليمن" },
]

export function TripsResults({ allTrips, companies, settings, from, to, passengers }: Props) {
  const [directionFilter, setDirectionFilter] = useState<string>("all")
  const [companyFilter, setCompanyFilter] = useState<string>("all")

  const results = useMemo(() => {
    let list = allTrips
    if (from) list = list.filter((t) => t.from_city === from)
    if (to) list = list.filter((t) => t.to_city === to)
    if (directionFilter !== "all") list = list.filter((t) => t.direction === directionFilter)
    if (companyFilter !== "all") list = list.filter((t) => t.company_id === companyFilter)
    return list
  }, [allTrips, from, to, directionFilter, companyFilter])

  const hasFilters = Boolean(from || to)

  return (
    <section className="py-10 md:py-16 bg-background">
      <div className="container-wide">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 text-sm">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">عرض</span>
            <span className="font-bold text-foreground">
              {results.length} رحلة متاحة
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {DIRECTION_FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setDirectionFilter(f.key)}
                className={[
                  "rounded-full border px-4 py-1.5 text-xs font-bold transition-all",
                  directionFilter === f.key
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-foreground/70 hover:border-primary/50",
                ].join(" ")}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Company Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">فلتر حسب الشركة</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCompanyFilter("all")}
              className={[
                "rounded-lg border px-3 py-1.5 text-xs font-bold transition-all",
                companyFilter === "all"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border text-foreground/70 hover:border-primary/50",
              ].join(" ")}
            >
              جميع الشركات
            </button>
            {companies.map((c) => (
              <button
                key={c.id}
                onClick={() => setCompanyFilter(c.id)}
                className={[
                  "rounded-lg border px-3 py-1.5 text-xs font-bold transition-all",
                  companyFilter === c.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-foreground/70 hover:border-primary/50",
                ].join(" ")}
              >
                {c.short_name}
              </button>
            ))}
          </div>
        </div>

        {results.length === 0 ? (
          <div className="rounded-3xl bg-card border border-border p-10 text-center shadow-soft">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
              <Inbox className="h-8 w-8" />
            </div>
            <h3 className="font-display font-black text-xl text-foreground mb-2">
              {hasFilters
                ? "لا توجد رحلات مطابقة للبحث"
                : "لا توجد رحلات متاحة حالياً"}
            </h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto mb-5">
              تواصل معنا مباشرة عبر الواتساب أو الاتصال وسنساعدك في إيجاد أقرب رحلة
              متوفرة.
            </p>
            <Button
              asChild
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
            >
              <a
                href={buildWhatsappUrl(
                  settings.whatsapp,
                  `السلام عليكم، أبحث عن رحلة من ${from || ""} إلى ${to || ""}`
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4 ml-1.5" />
                تواصل عبر الواتساب
              </a>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((trip) => {
              const company = companies.find(c => c.id === trip.company_id)
              return (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  passengers={passengers}
                  settings={settings}
                  company={company}
                />
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

function TripCard({
  trip,
  passengers,
  settings,
  company,
}: {
  trip: Trip
  passengers?: string
  settings: SiteSettings
  company?: Company
}) {
  const total = Number(trip.price) * Number(passengers || 1)
  const waUrl = buildWhatsappUrl(settings.whatsapp, `السلام عليكم، أرغب في حجز ${passengers || 1} مقعد على رحلة ${trip.from_city} إلى ${trip.to_city} - ${trip.departure_time}`)

  const currencyLabel = trip.currency === "SAR" ? "ر.س" : "ر.ي"

  return (
    <article className="group rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-premium transition-all overflow-hidden">
      <div className="grid md:grid-cols-12 gap-0">
        <div className="md:col-span-6 p-5 md:p-6 md:border-l border-border">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {company && (
              <span 
                className="inline-flex items-center gap-1 rounded-full text-[11px] font-black px-2.5 py-1"
                style={{ backgroundColor: company.color + "20", color: company.color }}
              >
                {company.short_name}
              </span>
            )}
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary text-[11px] font-black px-2.5 py-1">
              {trip.bus_type}
            </span>
            {trip.featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent text-accent-foreground text-[11px] font-black px-2.5 py-1">
                <Star className="h-3 w-3 fill-accent-foreground" />
                الأكثر حجزاً
              </span>
            )}
            <span className="text-[11px] text-muted-foreground">
              رقم الرحلة #{trip.id.slice(0, 6).toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div>
              <div className="text-[11px] font-bold text-muted-foreground uppercase">انطلاق</div>
              <div className="font-display font-black text-xl md:text-2xl text-foreground">
                {trip.from_city}
              </div>
              <div className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {trip.departure_time}
              </div>
            </div>

            <div className="flex flex-col items-center gap-1 px-2">
              <div className="text-[10px] font-bold text-primary bg-primary/10 rounded-full px-2 py-0.5">
                {trip.duration}
              </div>
              <svg viewBox="0 0 64 10" className="w-full h-2.5 text-primary">
                <line
                  x1="2"
                  y1="5"
                  x2="62"
                  y2="5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                />
                <circle cx="62" cy="5" r="2" fill="currentColor" />
                <path
                  d="M2 5 L6 2 M2 5 L6 8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
              <div className="text-[10px] text-muted-foreground">مباشر</div>
            </div>

            <div className="text-right">
              <div className="text-[11px] font-bold text-muted-foreground uppercase">وصول</div>
              <div className="font-display font-black text-xl md:text-2xl text-foreground">
                {trip.to_city}
              </div>
              <div className="text-xs text-muted-foreground mt-1">في الموعد المحدد</div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {[
              { icon: Armchair, label: "مقاعد استلقاء" },
              { icon: Wifi, label: "واي فاي" },
              { icon: Tv, label: "شاشات HD" },
              { icon: Wind, label: "تكييف" },
            ].map((a) => (
              <span
                key={a.label}
                className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-foreground/80"
              >
                <a.icon className="h-3 w-3 text-primary" />
                {a.label}
              </span>
            ))}
          </div>
        </div>

        <div className="md:col-span-6 bg-secondary/50 p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-[11px] text-muted-foreground font-bold uppercase">
              السعر للفرد
            </div>
            <div className="font-display font-black text-3xl md:text-4xl text-primary leading-none">
              {Number(trip.price).toLocaleString("ar")}{" "}
              <span className="text-base">{currencyLabel}</span>
            </div>
            <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
              <span className="inline-flex items-center gap-1">
                <Users className="h-3 w-3 text-primary" />
                {trip.seats_available} مقعد متاح
              </span>
              {passengers && Number(passengers) > 1 && (
                <span>
                  الإجمالي:{" "}
                  <strong className="text-foreground">
                    {total.toLocaleString("ar")} {currencyLabel}
                  </strong>
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {company ? (
              <BookNowButton
                trip={trip}
                company={company}
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold gap-2 md:min-w-[180px]"
              />
            ) : (
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold gap-2 md:min-w-[180px]"
              >
                <a href={waUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  احجز الآن
                </a>
              </Button>
            )}
            <ShareTrip
              fromCity={trip.from_city}
              toCity={trip.to_city}
              price={trip.price}
              company={company?.short_name}
            />
          </div>
        </div>
      </div>
    </article>
  )
}
