import Link from "next/link"
import { Bus, Phone, MessageCircle, MapPin, Clock, Facebook, Instagram, Youtube } from "lucide-react"
import { buildWhatsappUrl } from "@/lib/data"
import type { City, SiteSettings, Trip } from "@/lib/types"

export function SiteFooter({
  settings,
  cities,
  featuredTrips,
}: {
  settings: SiteSettings
  cities: City[]
  featuredTrips: Trip[]
}) {
  const waUrl = buildWhatsappUrl(settings.whatsapp)
  const topRoutes = featuredTrips.slice(0, 10)

  return (
    <footer className="relative bg-foreground text-background mt-24">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-l from-transparent via-accent to-transparent" />

      <div className="container-wide py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Bus className="h-6 w-6" />
              </div>
              <div className="leading-tight">
                <div className="font-display font-extrabold text-xl">{settings.short_name}</div>
                <div className="text-xs text-background/70">للنقل البري الفاخر</div>
              </div>
            </div>
            <p className="text-sm text-background/75 leading-relaxed">
              الشركة الرائدة في حجوزات الباصات بين الجمهورية اليمنية والمملكة العربية السعودية،
              بأسطول حديث، سائقين محترفين، وخدمة ترقى لتوقعاتك.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 text-accent px-3 py-1 text-[11px] font-bold">
                معتمد
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-background/10 text-background px-3 py-1 text-[11px] font-semibold">
                {settings.years_of_service}+ سنة خبرة
              </span>
            </div>

            {/* Social */}
            {(settings.facebook_url ||
              settings.instagram_url ||
              settings.youtube_url) && (
              <div className="mt-5 flex items-center gap-2">
                {settings.facebook_url && (
                  <a
                    href={settings.facebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 w-9 rounded-full bg-background/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                )}
                {settings.instagram_url && (
                  <a
                    href={settings.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 w-9 rounded-full bg-background/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                )}
                {settings.youtube_url && (
                  <a
                    href={settings.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 w-9 rounded-full bg-background/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display font-bold text-base mb-4 text-accent">روابط سريعة</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/", label: "الرئيسية" },
                { href: "/trips", label: "البحث عن رحلة" },
                { href: "/routes", label: "جميع الوجهات" },
                { href: "/fleet", label: "أسطول الباصات" },
                { href: "/about", label: "من نحن" },
                { href: "/contact", label: "اتصل بنا" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-background/75 hover:text-accent transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular routes (SEO) */}
          <div>
            <h3 className="font-display font-bold text-base mb-4 text-accent">أشهر الوجهات</h3>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-3 text-xs">
              {topRoutes.map((t) => (
                <li key={t.id} className="text-background/75">
                  <Link
                    href={`/trips?from=${encodeURIComponent(t.from_city)}&to=${encodeURIComponent(t.to_city)}`}
                    className="hover:text-accent transition-colors"
                  >
                    {t.from_city} ← {t.to_city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-base mb-4 text-accent">تواصل معنا</h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <a
                  href={`tel:${settings.phone_raw}`}
                  className="flex items-start gap-3 text-background/80 hover:text-accent transition-colors"
                >
                  <Phone className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                  <span>
                    <span className="block text-background/60 text-[11px]">خدمة العملاء</span>
                    <span dir="ltr" className="font-semibold">
                      {settings.phone}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-background/80 hover:text-accent transition-colors"
                >
                  <MessageCircle className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                  <span>
                    <span className="block text-background/60 text-[11px]">
                      واتساب - إصدار تذاكر
                    </span>
                    <span dir="ltr" className="font-semibold">
                      {settings.phone}
                    </span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-background/80">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <span>
                  <span className="block text-background/60 text-[11px]">المقر الرئيسي</span>
                  {settings.address}
                </span>
              </li>
              <li className="flex items-start gap-3 text-background/80">
                <Clock className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <span>
                  <span className="block text-background/60 text-[11px]">ساعات العمل</span>
                  على مدار الساعة طوال أيام الأسبوع
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* SEO city cloud */}
        {cities.length > 0 && (
          <div className="mt-12 pt-8 border-t border-background/10">
            <h4 className="text-xs font-bold text-background/60 mb-3 uppercase tracking-wider">
              نغطي المدن التالية
            </h4>
            <div className="flex flex-wrap gap-2 text-[11px]">
              {cities.map((city) => (
                <span
                  key={city.id}
                  className="rounded-full bg-background/5 border border-background/10 px-3 py-1 text-background/65"
                >
                  {city.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-background/10">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-background/60">
          <p>
            © {new Date().getFullYear()} {settings.company_name}. جميع الحقوق محفوظة.
          </p>
          <p>صُنع بفخر لخدمة المسافر اليمني والسعودي</p>
        </div>
      </div>
    </footer>
  )
}
