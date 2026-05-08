import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { CompanyHeader } from "@/components/company-header"
import { CompanyAbout } from "@/components/company-about"
import { CompanyGallery } from "@/components/company-gallery"
import { CompanyFleet } from "@/components/company-fleet"
import { getCompanies, getCompanyBySlug, getTrips, getSettings } from "@/lib/queries"
import type { Company, Trip } from "@/lib/types"
import { Star, Clock, Users } from "lucide-react"
import { BookNowButton } from "@/components/book-now-button"

export async function generateStaticParams() {
  const companies = await getCompanies()
  return companies.map((company) => ({
    slug: company.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const company = await getCompanyBySlug(slug)
  
  if (!company) {
    return {
      title: "الشركة غير موجودة",
    }
  }

  return {
    title: `${company.name} | رحلات النقل البري`,
    description: company.description,
  }
}

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const company = await getCompanyBySlug(slug)
  
  if (!company) {
    notFound()
  }

  const [settings, trips] = await Promise.all([
    getSettings(),
    getTrips({ company_id: company.id }),
  ])

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: company.name,
    description: company.description,
    url: `https://alkohali-bus.com/companies/${company.slug}`,
    telephone: company.phone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: ["YE", "SA"],
    }
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: "https://alkohali-bus.com/"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: company.name,
        item: `https://alkohali-bus.com/companies/${company.slug}`
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SiteHeader settings={settings} />
      <main>
        <CompanyHeader company={company} />
        <CompanyAbout company={company} />
        <CompanyGallery company={company} />
        <CompanyFleet company={company} />
        
        {/* Trips Section */}
        {trips.length > 0 && (
          <section className="py-16 md:py-20 bg-secondary/40">
            <div className="container-wide">
              <h2 className="font-display text-3xl md:text-4xl font-black text-foreground mb-8 text-center">
                رحلات {company.short_name}
              </h2>
              <div className="space-y-4">
                {trips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} company={company} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter settings={settings} cities={[]} featuredTrips={[]} />
      <WhatsAppFloat settings={settings} />
    </>
  )
}

function TripCard({ trip, company }: { trip: Trip; company: Company }) {
  const currencyLabel = trip.currency === "SAR" ? "ر.س" : "ر.ي"

  return (
    <article className="group rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-premium transition-all overflow-hidden">
      <div className="grid md:grid-cols-12 gap-0">
        <div className="md:col-span-8 p-5 md:p-6 md:border-l border-border">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span 
              className="inline-flex items-center gap-1 rounded-full text-[11px] font-black px-2.5 py-1"
              style={{ backgroundColor: company.color + "20", color: company.color }}
            >
              {company.short_name}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary text-[11px] font-black px-2.5 py-1">
              {trip.bus_type}
            </span>
            {trip.featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent text-accent-foreground text-[11px] font-black px-2.5 py-1">
                <Star className="h-3 w-3 fill-accent-foreground" />
                مميزة
              </span>
            )}
          </div>

          <div className="grid grid-cols-[1fr_auto-1fr] items-center gap-3">
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
              <div className="text-[10px] text-muted-foreground">مباشر</div>
            </div>

            <div className="text-right">
              <div className="text-[11px] font-bold text-muted-foreground uppercase">وصول</div>
              <div className="font-display font-black text-xl md:text-2xl text-foreground">
                {trip.to_city}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 bg-secondary/50 p-5 md:p-6 flex flex-col justify-between">
          <div>
            <div className="text-[11px] text-muted-foreground font-bold uppercase">
              السعر للفرد
            </div>
            <div className="font-display font-black text-3xl text-primary leading-none">
              {Number(trip.price).toLocaleString("ar")}{" "}
              <span className="text-base">{currencyLabel}</span>
            </div>
            <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="h-3 w-3 text-primary" />
              {trip.seats_available} مقعد متاح
            </div>
          </div>
          <BookNowButton
            trip={trip}
            company={company}
            size="lg"
          />
        </div>
      </div>
    </article>
  )
}
