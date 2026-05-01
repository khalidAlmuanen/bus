import type { Metadata } from "next"
import { Phone, MessageCircle, MapPin, Mail, Clock } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { ContactForm } from "@/components/contact-form"
import { buildWhatsappUrl } from "@/lib/data"
import { getCities, getSettings, getTrips } from "@/lib/queries"

export const revalidate = 60

export const metadata: Metadata = {
  title: "اتصل بنا | خدمة 24/7",
  description:
    "تواصل معنا على مدار الساعة. خدمة عملاء، واتساب، بريد إلكتروني للحجز والاستفسار.",
  alternates: { canonical: "/contact" },
}

export default async function ContactPage() {
  const [settings, cities, trips] = await Promise.all([
    getSettings(),
    getCities(),
    getTrips(),
  ])
  const waUrl = buildWhatsappUrl(settings.whatsapp)

  const METHODS = [
    {
      icon: Phone,
      title: "خدمة العملاء",
      sub: "متاحون على مدار الساعة",
      value: settings.phone,
      href: `tel:${settings.phone_raw}`,
      dir: "ltr" as const,
    },
    {
      icon: MessageCircle,
      title: "واتساب",
      sub: "لإصدار التذاكر والاستفسارات",
      value: settings.phone,
      href: waUrl,
      dir: "ltr" as const,
      highlight: true,
    },
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      sub: "للشكاوى والاقتراحات",
      value: settings.email,
      href: `mailto:${settings.email}`,
      dir: "ltr" as const,
    },
    {
      icon: MapPin,
      title: "المقر الرئيسي",
      sub: "المملكة العربية السعودية",
      value: settings.address,
    },
  ]

  return (
    <>
      <SiteHeader settings={settings} />
      <main>
        <section className="relative overflow-hidden bg-background py-16 md:py-20">
          <div className="absolute inset-0 bg-mesh opacity-70" aria-hidden />
          <div className="container-wide relative">
            <div className="max-w-3xl text-center mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 text-primary px-4 py-1.5 text-xs font-bold">
                <Clock className="h-3.5 w-3.5" />
                متواجدون على مدار الساعة
              </span>
              <h1 className="mt-5 font-display text-4xl md:text-6xl font-black text-foreground text-balance leading-tight">
                نحن <span className="text-primary">هنا</span> لخدمتك
              </h1>
              <p className="mt-5 text-lg text-muted-foreground">
                اختر الطريقة التي تناسبك للتواصل معنا. فريقنا في خدمتك أياً كان الوقت.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-10 md:pb-14">
          <div className="container-wide">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {METHODS.map((m) => {
                const content = (
                  <>
                    <div
                      className={[
                        "flex h-12 w-12 items-center justify-center rounded-xl mb-4",
                        m.highlight
                          ? "bg-accent text-accent-foreground"
                          : "bg-primary/10 text-primary",
                      ].join(" ")}
                    >
                      <m.icon className="h-6 w-6" strokeWidth={1.8} />
                    </div>
                    <div className="text-[11px] font-bold uppercase tracking-wide opacity-70">
                      {m.sub}
                    </div>
                    <div className="mt-1 font-display font-bold text-lg">{m.title}</div>
                    <div
                      dir={m.dir}
                      className="mt-2 font-semibold text-base opacity-95 break-all"
                    >
                      {m.value}
                    </div>
                  </>
                )
                const className = [
                  "group rounded-2xl p-6 border transition-all",
                  m.highlight
                    ? "bg-primary text-primary-foreground border-primary shadow-premium"
                    : "bg-card border-border shadow-soft hover:shadow-premium hover:-translate-y-0.5",
                ].join(" ")
                if (m.href) {
                  return (
                    <a
                      key={m.title}
                      href={m.href}
                      target={m.href.startsWith("http") ? "_blank" : undefined}
                      rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={className}
                    >
                      {content}
                    </a>
                  )
                }
                return (
                  <div key={m.title} className={className}>
                    {content}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-secondary/40">
          <div className="container-tight">
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 text-xs font-bold">
                  نموذج التواصل
                </span>
                <h2 className="mt-4 font-display text-3xl md:text-4xl font-black text-foreground text-balance leading-tight">
                  أرسل لنا رسالة، سنرد عليك خلال ساعة
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  سواء كان لديك استفسار، شكوى، اقتراح، أو تريد الحجز لمجموعة كبيرة، فريقنا
                  جاهز لخدمتك. اترك رسالتك أدناه وسنتواصل معك في أسرع وقت.
                </p>

                <div className="mt-8 rounded-2xl bg-card border border-border p-5 shadow-soft">
                  <div className="font-bold text-foreground mb-2">نصيحة: للحجز السريع</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    إذا كنت تريد حجز تذكرة بشكل فوري، أسرع طريقة هي التواصل عبر الواتساب حيث
                    يرد عليك فريقنا خلال دقائق.
                  </p>
                </div>
              </div>

              <ContactForm settings={settings} />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter settings={settings} cities={cities} featuredTrips={trips} />
      <WhatsAppFloat settings={settings} />
    </>
  )
}
