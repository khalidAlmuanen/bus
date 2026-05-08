import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Calendar, Clock, MapPin, Armchair, Info } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { BookNowButton } from "@/components/book-now-button"
import { getSettings, getTrips, getCompanyById, getCities } from "@/lib/queries"

export const revalidate = 60

export async function generateStaticParams() {
  const trips = await getTrips()
  return trips.map((trip) => ({
    id: trip.id,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const trips = await getTrips()
  const trip = trips.find((t) => t.id === id)
  
  if (!trip) return { title: "رحلة غير موجودة" }

  const company = await getCompanyById(trip.company_id)
  
  const title = `حجز باص ${company?.short_name || ''} من ${trip.from_city} إلى ${trip.to_city} | ${trip.bus_type}`
  const description = `تفاصيل رحلة النقل البري عبر شركة ${company?.name || ''} من ${trip.from_city} إلى ${trip.to_city}. السعر: ${trip.price} ${trip.currency}، نوع الباص: ${trip.bus_type}. احجز تذكرتك الآن.`

  return {
    title,
    description,
    alternates: { canonical: `/trips/${trip.id}` },
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

export default async function TripDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  const [settings, trips, cities] = await Promise.all([
    getSettings(),
    getTrips(),
    getCities(),
  ])

  const trip = trips.find((t) => t.id === id)

  if (!trip) {
    notFound()
  }

  const company = await getCompanyById(trip.company_id)
  if (!company) notFound()

  // SEO Rich Snippets specifically for this trip
  const tripJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `تذكرة باص ${company.short_name} من ${trip.from_city} إلى ${trip.to_city}`,
    description: `رحلة برية ${trip.bus_type} مع شركة ${company.name}`,
    brand: {
      "@type": "Brand",
      name: company.name
    },
    offers: {
      "@type": "Offer",
      price: trip.price,
      priceCurrency: trip.currency,
      availability: trip.seats_available > 0 ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
      url: `https://alkohali-bus.com/trips/${trip.id}`
    }
  }

  return (
    <>
      <SiteHeader settings={settings} />
      <main className="min-h-screen bg-muted/30">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(tripJsonLd) }}
        />
        
        {/* Dynamic Trip Header */}
        <section className="relative overflow-hidden bg-background py-12 border-b border-border">
          <div className="absolute inset-0 bg-mesh opacity-20" aria-hidden />
          <div className="container-wide relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-bold mb-3">
                  <MapPin className="h-3 w-3" />
                  رحلة مباشرة
                </span>
                <h1 className="font-display text-3xl md:text-4xl font-black text-foreground mb-2">
                  من {trip.from_city} إلى {trip.to_city}
                </h1>
                <p className="text-muted-foreground text-lg flex items-center gap-2">
                  عبر <span className="font-bold text-foreground" style={{ color: company.color }}>{company.name}</span>
                </p>
              </div>
              <div className="flex flex-col md:items-end gap-2 bg-muted/50 p-4 rounded-xl border border-border">
                <span className="text-sm text-muted-foreground font-medium">سعر التذكرة</span>
                <div className="text-3xl font-black text-primary">
                  {trip.price} <span className="text-base font-bold">{trip.currency}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trip Details */}
        <section className="py-8">
          <div className="container-wide max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Main Info */}
              <div className="md:col-span-2 space-y-6">
                <div className="bg-background rounded-2xl border border-border p-6 shadow-sm">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    تفاصيل الرحلة
                  </h2>
                  <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                    <div>
                      <span className="text-sm text-muted-foreground flex items-center gap-1.5 mb-1">
                        <Clock className="h-4 w-4" /> وقت الانطلاق
                      </span>
                      <p className="font-bold text-lg">{trip.departure_time}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground flex items-center gap-1.5 mb-1">
                        <Calendar className="h-4 w-4" /> مدة الرحلة المتوقعة
                      </span>
                      <p className="font-bold text-lg">{trip.duration}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground flex items-center gap-1.5 mb-1">
                        <Armchair className="h-4 w-4" /> نوع الباص
                      </span>
                      <p className="font-bold text-lg">{trip.bus_type}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground flex items-center gap-1.5 mb-1">
                        <Info className="h-4 w-4" /> المقاعد المتاحة
                      </span>
                      <p className="font-bold text-lg text-emerald-600">{trip.seats_available} مقعد</p>
                    </div>
                  </div>
                </div>

                <div className="bg-background rounded-2xl border border-border p-6 shadow-sm">
                  <h2 className="text-xl font-bold mb-4">مميزات الشركة الناقلة</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {company.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Booking Sidebar */}
              <div className="md:col-span-1">
                <div className="bg-background rounded-2xl border border-border p-6 shadow-sm sticky top-24">
                  <h3 className="text-lg font-bold mb-4 text-center">تأكيد الحجز</h3>
                  <p className="text-sm text-muted-foreground text-center mb-6">
                    سيتم تحويلك مباشرة لموظف الحجوزات عبر الواتساب لإتمام عملية تأكيد المقعد والدفع.
                  </p>
                  <BookNowButton 
                    trip={trip}
                    company={company}
                    className="w-full text-lg py-6"
                  />
                  <div className="mt-4 text-center text-xs text-muted-foreground">
                    <p>دعم فني متواصل 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter settings={settings} cities={cities} featuredTrips={trips} />
      <WhatsAppFloat settings={settings} />
    </>
  )
}
