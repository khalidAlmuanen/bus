import { MessageCircle, Phone, Sparkles } from "lucide-react"
import { buildWhatsappUrl } from "@/lib/data"
import type { SiteSettings } from "@/lib/types"

export function CtaBanner({ settings }: { settings: SiteSettings }) {
  const waUrl = buildWhatsappUrl(settings.whatsapp)

  return (
    <section className="py-16 md:py-20">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-3xl bg-foreground text-background p-8 md:p-14 shadow-premium">
          <div
            className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-primary/40 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-accent/30 blur-3xl"
            aria-hidden
          />

          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 text-accent px-4 py-1.5 text-xs font-bold">
                <Sparkles className="h-3.5 w-3.5" />
                احجز رحلتك اليوم
              </span>
              <h2 className="mt-4 font-display text-3xl md:text-5xl font-black text-balance leading-tight">
                جاهز لرحلة <span className="text-accent">لا تُنسى</span>؟
              </h2>
              <p className="mt-4 text-background/75 text-lg leading-relaxed max-w-lg">
                احجز تذكرتك في أقل من دقيقتين عبر الواتساب واستلم تأكيد حجزك فوراً. فريقنا
                متواجد على مدار الساعة لخدمتك.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl bg-accent text-accent-foreground p-5 hover:bg-accent/90 transition-colors shadow-premium"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-accent-foreground/15 flex items-center justify-center">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold opacity-70 uppercase">
                      الطريقة الأسرع
                    </div>
                    <div className="font-display font-black text-xl leading-tight">
                      احجز عبر الواتساب
                    </div>
                  </div>
                </div>
                <svg className="h-5 w-5 transition-transform group-hover:-translate-x-1" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M13 5L8 10l5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <a
                href={`tel:${settings.phone_raw}`}
                className="group flex items-center justify-between rounded-2xl bg-background/5 border border-background/15 text-background p-5 hover:bg-background/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-background/10 flex items-center justify-center">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold opacity-70 uppercase">
                      أو اتصل بنا مباشرة
                    </div>
                    <div dir="ltr" className="font-display font-black text-xl leading-tight">
                      {settings.phone}
                    </div>
                  </div>
                </div>
                <svg className="h-5 w-5 transition-transform group-hover:-translate-x-1" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M13 5L8 10l5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
