import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MapPin } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { TripsResults } from "@/components/trips-results"
import { CtaBanner } from "@/components/cta-banner"
import { getCities, getSettings, getTrips, getCompanies } from "@/lib/queries"

export const revalidate = 60

export async function generateStaticParams() {
  const cities = await getCities()
  const yemenCities = cities.filter((c) => c.country === "yemen")
  const saudiCities = cities.filter((c) => c.country === "saudi")

  const params: { slug: string }[] = []

  // Yemen to Saudi routes
  yemenCities.forEach((yCity) => {
    saudiCities.forEach((sCity) => {
      params.push({ slug: `${yCity.slug}-to-${sCity.slug}` })
    })
  })

  // Saudi to Yemen routes
  saudiCities.forEach((sCity) => {
    yemenCities.forEach((yCity) => {
      params.push({ slug: `${sCity.slug}-to-${yCity.slug}` })
    })
  })

  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  if (!slug.includes("-to-")) return { title: "مسار غير صالح" }

  const [fromSlug, toSlug] = slug.split("-to-")
  const cities = await getCities()
  
  const fromCity = cities.find((c) => c.slug === fromSlug)
  const toCity = cities.find((c) => c.slug === toSlug)

  if (!fromCity || !toCity) return { title: "مسار غير موجود" }

  const title = `حجز باصات من ${fromCity.name} إلى ${toCity.name} | أفضل الشركات والأسعار`
  const description = `دليل شامل لرحلات النقل البري من ${fromCity.name} إلى ${toCity.name}. قارن أسعار التذاكر، واعرف المواعيد المتوفرة لجميع الشركات مثل الكاهلي، البركة وغيرها.`

  return {
    title,
    description,
    alternates: { canonical: `/routes/${slug}` },
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
    }
  }
}

export default async function RouteDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
  if (!slug.includes("-to-")) notFound()

  const [fromSlug, toSlug] = slug.split("-to-")
  
  const [settings, cities, allTrips, companies] = await Promise.all([
    getSettings(),
    getCities(),
    getTrips(),
    getCompanies(),
  ])

  const fromCity = cities.find((c) => c.slug === fromSlug)
  const toCity = cities.find((c) => c.slug === toSlug)

  if (!fromCity || !toCity) {
    notFound()
  }

  // Filter trips for this exact route
  const routeTrips = allTrips.filter(
    (t) => t.from_city === fromCity.name && t.to_city === toCity.name
  )

  // JSON-LD for this route page
  const routeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `تذاكر باصات من ${fromCity.name} إلى ${toCity.name}`,
    description: `حجز رحلات النقل البري من ${fromCity.name} إلى ${toCity.name} بأفضل الأسعار.`,
    brand: {
      "@type": "Brand",
      name: "بوابة حجز النقل البري"
    },
    offers: {
      "@type": "AggregateOffer",
      offerCount: routeTrips.length || 1,
      lowPrice: routeTrips.length > 0 ? Math.min(...routeTrips.map(t => Number(t.price))) : 250,
      highPrice: routeTrips.length > 0 ? Math.max(...routeTrips.map(t => Number(t.price))) : 400,
      priceCurrency: routeTrips.length > 0 ? routeTrips[0].currency : "SAR",
      availability: "https://schema.org/InStock"
    }
  }

  return (
    <>
      <SiteHeader settings={settings} />
      <main>
        {/* Dynamic Route Header */}
        <section className="relative overflow-hidden bg-background py-12 md:py-16 border-b border-border">
          <div className="absolute inset-0 bg-mesh opacity-40" aria-hidden />
          <div className="container-wide relative flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 text-xs font-bold mb-4">
              <MapPin className="h-3.5 w-3.5" />
              مسار معتمد
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-black text-foreground text-balance leading-tight mb-4">
              حجز باصات من <span className="text-primary">{fromCity.name}</span> إلى <span className="text-primary">{toCity.name}</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl text-balance">
              قارن أسعار التذاكر، تعرف على المواعيد، واحجز مقعدك بسهولة مع أفضل شركات النقل البري لرحلتك من {fromCity.name} إلى {toCity.name}.
            </p>
            
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(routeJsonLd) }}
            />
          </div>
        </section>

        {/* Trips Results specialized for this route */}
        <div className="-mt-6">
          <TripsResults
            allTrips={allTrips}
            companies={companies}
            settings={settings}
            from={fromCity.name}
            to={toCity.name}
          />
        </div>

        <CtaBanner settings={settings} />
      </main>
      <SiteFooter settings={settings} cities={cities} featuredTrips={allTrips} />
      <WhatsAppFloat settings={settings} />
    </>
  )
}
