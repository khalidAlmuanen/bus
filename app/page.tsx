import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Hero } from "@/components/hero"
import { CitiesMarquee } from "@/components/cities-marquee"
import { TrustGuarantees } from "@/components/trust-guarantees"
import { Features } from "@/components/features"
import { PopularTrips } from "@/components/popular-trips"
import { FleetShowcase } from "@/components/fleet-showcase"
import { CompaniesShowcase } from "@/components/companies-showcase"
import { HowItWorks } from "@/components/how-it-works"
import { StatsBand } from "@/components/stats-band"
import { Testimonials } from "@/components/testimonials"
import { FaqSection } from "@/components/faq-section"
import { CtaBanner } from "@/components/cta-banner"
import {
  getSettings,
  getCities,
  getTrips,
  getFeatures,
  getTestimonials,
  getFaqs,
  getStats,
  getCompanies,
} from "@/lib/queries"

export const revalidate = 60

export default async function HomePage() {
  const [settings, cities, featuredTrips, allTrips, features, testimonials, faqs, stats, companies] =
    await Promise.all([
      getSettings(),
      getCities(),
      getTrips({ featured: true, limit: 8 }),
      getTrips({ limit: 12 }),
      getFeatures(),
      getTestimonials(),
      getFaqs(),
      getStats(),
      getCompanies(),
    ])

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SiteHeader settings={settings} />
      <main>
        <Hero cities={cities} settings={settings} featuredTrip={featuredTrips[0]} />
        <PopularTrips trips={featuredTrips.length ? featuredTrips : allTrips} />
        <HowItWorks />
        <CompaniesShowcase companies={companies} />
        <CitiesMarquee trips={allTrips} />
        <TrustGuarantees />
        <Features features={features} />
        <FleetShowcase />
        <StatsBand stats={stats} />
        <Testimonials testimonials={testimonials} settings={settings} />
        <FaqSection faqs={faqs} settings={settings} />
        <CtaBanner settings={settings} />
      </main>
      <SiteFooter settings={settings} cities={cities} featuredTrips={allTrips} />
      <WhatsAppFloat settings={settings} />
    </>
  )
}
