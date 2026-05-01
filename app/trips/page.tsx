import type { Metadata } from "next"
import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { BookingSearch } from "@/components/booking-search"
import { TripsResults } from "@/components/trips-results"
import { getCities, getSettings, getTrips, getCompanies } from "@/lib/queries"

export const revalidate = 60

export const metadata: Metadata = {
  title: "البحث عن رحلات | جميع رحلات اليمن - السعودية",
  description:
    "ابحث عن رحلاتك واحجز تذكرتك الآن. عرض جميع الرحلات المتاحة بين اليمن والسعودية مع الأسعار والمواعيد.",
  alternates: { canonical: "/trips" },
}

export default async function TripsPage(props: {
  searchParams: Promise<{ from?: string; to?: string; date?: string; passengers?: string }>
}) {
  const params = await props.searchParams

  const [settings, cities, trips, companies] = await Promise.all([
    getSettings(),
    getCities(),
    getTrips(),
    getCompanies(),
  ])

  return (
    <>
      <SiteHeader settings={settings} />
      <main>
        <section className="relative overflow-hidden bg-background py-10 md:py-14">
          <div className="absolute inset-0 bg-mesh opacity-60" aria-hidden />
          <div className="container-wide relative">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 text-primary px-4 py-1.5 text-xs font-bold">
                نتائج البحث
              </span>
              <h1 className="mt-4 font-display text-3xl md:text-5xl font-black text-foreground text-balance leading-tight">
                رحلاتك بين{" "}
                <span className="text-primary">{params.from || "اليمن"}</span> و{" "}
                <span className="text-primary">{params.to || "السعودية"}</span>
              </h1>
              <p className="mt-3 text-muted-foreground">
                عدّل محددات البحث للحصول على النتائج الأنسب لك
              </p>
            </div>

            <div className="mt-8">
              <Suspense fallback={null}>
                <BookingSearch
                  cities={cities}
                  initialFrom={params.from}
                  initialTo={params.to}
                />
              </Suspense>
            </div>
          </div>
        </section>

        <TripsResults
          allTrips={trips}
          companies={companies}
          settings={settings}
          from={params.from}
          to={params.to}
          passengers={params.passengers}
        />
      </main>
      <SiteFooter settings={settings} cities={cities} featuredTrips={trips} />
      <WhatsAppFloat settings={settings} />
    </>
  )
}
