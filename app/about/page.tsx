import Image from "next/image"
import type { Metadata } from "next"
import { Award, Target, Heart, Users, Bus, MapPin } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { StatsBand } from "@/components/stats-band"
import { CtaBanner } from "@/components/cta-banner"
import { getCities, getSettings, getStats, getTrips } from "@/lib/queries"

export const revalidate = 60

export const metadata: Metadata = {
  title: "من نحن | خبرة طويلة في النقل البري",
  description:
    "تعرف على بوابة الحجز: دليلك الأول لرحلات النقل البري بين اليمن والسعودية. منصة متكاملة تجمع أفضل الشركات لضمان تجربة سفر مريحة.",
  alternates: { canonical: "/about" },
}

const VALUES = [
  {
    icon: Award,
    title: "الجودة",
    desc: "نلتزم بأعلى معايير الجودة في أسطولنا وخدماتنا لتقديم أفضل تجربة سفر لعملائنا.",
  },
  {
    icon: Target,
    title: "الأمانة",
    desc: "نحمل أمانة نقل ركابنا بكل مسؤولية، ونتعامل معها كأنها أعز ما نملك.",
  },
  {
    icon: Heart,
    title: "خدمة العميل",
    desc: "راحة المسافر هي محور كل قراراتنا. نستمع ونتعلم ونحسن باستمرار.",
  },
  {
    icon: Users,
    title: "فريق محترف",
    desc: "سائقون مدربون ومضيفون يتعاملون مع الركاب باحترافية وود.",
  },
]

export default async function AboutPage() {
  const [settings, cities, trips, stats] = await Promise.all([
    getSettings(),
    getCities(),
    getTrips(),
    getStats(),
  ])

  const yemenCities = cities.filter((c) => c.country === "yemen").map((c) => c.name)
  const saudiCities = cities.filter((c) => c.country === "saudi").map((c) => c.name)

  return (
    <>
      <SiteHeader settings={settings} />
      <main>
        <section className="relative overflow-hidden bg-background py-16 md:py-24">
          <div className="absolute inset-0 bg-mesh opacity-70" aria-hidden />
          <div className="container-wide relative">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 text-primary px-4 py-1.5 text-xs font-bold">
                <Bus className="h-3.5 w-3.5" />
                عن {settings.company_name}
              </span>
              <h1 className="mt-5 font-display text-4xl md:text-6xl font-black text-foreground text-balance leading-tight">
                رواد النقل البري الفاخر بين{" "}
                <span className="text-primary">اليمن</span> و{" "}
                <span className="text-primary">السعودية</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                منذ {settings.years_of_service}+ سنة، وشركة {settings.short_name} تقود ثورة
                النقل البري بين اليمن والسعودية، بأسطول من أحدث الباصات وطاقم من السائقين
                المحترفين، لنقدم لكم تجربة سفر ترقى لتطلعاتكم.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-3xl overflow-hidden shadow-premium aspect-[4/5]">
                <Image
                  src="/images/driver.jpg"
                  alt="طاقم السائقين المحترفين"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
                <div className="absolute bottom-6 inset-x-6 rounded-2xl bg-background/95 backdrop-blur p-5 shadow-soft">
                  <div className="font-display font-black text-2xl text-foreground">
                    {settings.passengers_served}
                  </div>
                  <div className="text-sm text-muted-foreground">مسافر وثقوا بنا</div>
                </div>
              </div>

              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 text-xs font-bold">
                  قصتنا
                </span>
                <h2 className="mt-4 font-display text-3xl md:text-4xl font-black text-foreground text-balance leading-tight">
                  رحلة بدأت بحلم وأصبحت الخيار الأول لآلاف المسافرين
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    بدأت {settings.company_name} بباص واحد وحلم كبير: تقديم تجربة سفر تليق
                    بالمسافر اليمني والسعودي. على مدى {settings.years_of_service} سنة، نمت
                    الشركة لتصبح واحدة من أكبر شركات النقل البري في المنطقة.
                  </p>
                  <p>
                    اليوم، نمتلك أسطولاً من {settings.fleet_size}+ باص حديث من أفضل الماركات
                    العالمية، وطاقماً من السائقين المحترفين الذين يعرفون طرق اليمن والسعودية
                    كالكف في اليد.
                  </p>
                  <p>
                    نفخر بأننا نقلنا أكثر من {settings.passengers_served} مسافر بأمان إلى
                    وجهاتهم، وسنواصل الالتزام بتقديم الأفضل دائماً.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-secondary p-5">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Target className="h-5 w-5" />
                      <span className="font-bold">رؤيتنا</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      أن نكون الشركة الأولى والأكثر ثقة في قطاع النقل البري إقليمياً.
                    </p>
                  </div>
                  <div className="rounded-xl bg-secondary p-5">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Heart className="h-5 w-5" />
                      <span className="font-bold">رسالتنا</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      تقديم خدمة نقل ركاب بكفاءة عالية وأسعار تنافسية وراحة لا تُضاهى.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-secondary/40">
          <div className="container-wide">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 text-primary px-4 py-1.5 text-xs font-bold">
                قيمنا
              </span>
              <h2 className="mt-4 font-display text-3xl md:text-5xl font-black text-foreground text-balance">
                القيم التي نبني عليها كل رحلة
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {VALUES.map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl bg-card border border-border p-6 text-center shadow-soft hover:shadow-premium transition-shadow"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                    <v.icon className="h-7 w-7" strokeWidth={1.7} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <StatsBand stats={stats} />

        <section className="py-16 md:py-24 bg-background">
          <div className="container-wide">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 text-primary px-4 py-1.5 text-xs font-bold">
                <MapPin className="h-3.5 w-3.5" />
                خريطة التغطية
              </span>
              <h2 className="mt-4 font-display text-3xl md:text-5xl font-black text-foreground text-balance">
                نغطي أهم المدن في اليمن والسعودية
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-card border border-border p-7 shadow-soft">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-black">
                    YE
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground">
                    الجمهورية اليمنية
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {yemenCities.map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-semibold"
                    >
                      <MapPin className="h-3 w-3 text-accent" />
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl bg-card border border-border p-7 shadow-soft">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-black">
                    SA
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground">
                    المملكة العربية السعودية
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {saudiCities.map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-semibold"
                    >
                      <MapPin className="h-3 w-3 text-accent" />
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <CtaBanner settings={settings} />
      </main>
      <SiteFooter settings={settings} cities={cities} featuredTrips={trips} />
      <WhatsAppFloat settings={settings} />
    </>
  )
}
