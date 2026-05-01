import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, MapPin } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { CtaBanner } from "@/components/cta-banner"
import { getCities, getSettings, getTrips } from "@/lib/queries"
import type { Trip, City } from "@/lib/types"

export const revalidate = 60

export const metadata: Metadata = {
  title: "جميع الوجهات | خطوط رحلات اليمن - السعودية",
  description:
    "اكتشف جميع خطوط الرحلات التي نغطيها: من صنعاء، تعز، إب، المكلا إلى جدة، الرياض، مكة المكرمة. أسعار ومواعيد كاملة.",
  alternates: { canonical: "/routes" },
}

export default async function RoutesPage() {
  const [settings, cities, trips] = await Promise.all([
    getSettings(),
    getCities(),
    getTrips(),
  ])

  const yemenCities = cities.filter((c) => c.country === "yemen")
  const saudiCities = cities.filter((c) => c.country === "saudi")

  return (
    <>
      <SiteHeader settings={settings} />
      <main>
        <section className="relative overflow-hidden bg-background py-16 md:py-20">
          <div className="absolute inset-0 bg-mesh opacity-70" aria-hidden />
          <div className="container-wide relative">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 text-primary px-4 py-1.5 text-xs font-bold">
                <MapPin className="h-3.5 w-3.5" />
                شبكة وجهاتنا
              </span>
              <h1 className="mt-5 font-display text-4xl md:text-6xl font-black text-foreground text-balance leading-tight">
                نربط <span className="text-primary">كل المدن</span> بين اليمن والسعودية
              </h1>
              <p className="mt-5 text-lg text-muted-foreground">
                شبكة واسعة من خطوط الرحلات اليومية تصل إلى جميع المدن الرئيسية. اختر وجهتك
                وابدأ حجزك الآن.
              </p>
            </div>
          </div>
        </section>

        <RoutesGroup
          title="من اليمن إلى السعودية"
          subtitle="رحلات يومية منتظمة من جميع المحافظات اليمنية"
          origins={yemenCities}
          destinations={saudiCities}
          trips={trips}
        />

        <RoutesGroup
          title="من السعودية إلى اليمن"
          subtitle="رحلات عودة مريحة إلى وطنك"
          origins={saudiCities}
          destinations={yemenCities}
          trips={trips}
          alt
        />

        <CtaBanner settings={settings} />
      </main>
      <SiteFooter settings={settings} cities={cities} featuredTrips={trips} />
      <WhatsAppFloat settings={settings} />
    </>
  )
}

function RoutesGroup({
  title,
  subtitle,
  origins,
  destinations,
  trips,
  alt,
}: {
  title: string
  subtitle: string
  origins: City[]
  destinations: City[]
  trips: Trip[]
  alt?: boolean
}) {
  if (origins.length === 0 || destinations.length === 0) return null

  return (
    <section className={alt ? "py-16 md:py-20 bg-secondary/40" : "py-16 md:py-20"}>
      <div className="container-wide">
        <div className="mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-black text-foreground">
            {title}
          </h2>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {origins.map((origin) => (
            <div
              key={origin.id}
              className="rounded-2xl bg-card border border-border p-6 shadow-soft"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="font-display font-black text-lg text-foreground">
                  من {origin.name}
                </div>
              </div>
              <ul className="space-y-2">
                {destinations.map((dest) => {
                  const trip = trips.find(
                    (t) => t.from_city === origin.name && t.to_city === dest.name
                  )
                  return (
                    <li key={dest.id}>
                      <Link
                        href={`/routes/${origin.slug}-to-${dest.slug}`}
                        className="group flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-secondary/70 transition-colors"
                      >
                        <span className="text-sm font-semibold text-foreground/85 group-hover:text-primary inline-flex items-center gap-2">
                          <ArrowLeft className="h-3.5 w-3.5 text-accent" />
                          إلى {dest.name}
                        </span>
                        {trip ? (
                          <span className="text-xs font-bold text-primary">
                            من {Number(trip.price).toLocaleString("ar")}{" "}
                            {trip.currency === "SAR" ? "ر.س" : "ر.ي"}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">متاح</span>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
